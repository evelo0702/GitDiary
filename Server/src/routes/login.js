const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }

    const data = {
      client_id: process.env.VITE_GITHUB_CLIENT_ID,
      client_secret: process.env.VITE_GITHUB_CLIENT_PW, // 확인된 변수명 사용
      code: code,
    };

    const result = await axios.post(
      "https://github.com/login/oauth/access_token",
      data,
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    console.log("Access Token Response:", result.data); // Access Token 응답 로그 출력

    if (!result.data.access_token) {
      console.error("Access token not received:", result.data);
      return res.status(400).json({ error: "Access token not received" });
    }

    const githubData = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${result.data.access_token}`,
        accept: "application/json",
      },
    });

    console.log("GitHub User Data Response:", githubData.data); // 사용자 데이터 응답 로그 출력

    if (!githubData.data.repos_url) {
      console.error("User repos URL not found:", githubData.data);
      return res.status(400).json({ error: "User repos URL not found" });
    }

    const repo = await axios.get(githubData.data.repos_url, {
      headers: {
        Authorization: `Bearer ${result.data.access_token}`,
        accept: "application/json",
      },
    });

    const sendGitData = [
      {
        code: code,
        id: githubData.data.login,
        img: githubData.data.avatar_url,
        repo: Array.isArray(repo.data)
          ? repo.data.map((item) => item.name)
          : [],
      },
    ];
    res.json(sendGitData);
  } catch (error) {
    console.error("Error during GitHub authentication:", error); // 전체 에러 로그 출력
    res
      .status(500)
      .json({
        error: "An error occurred",
        details: error.response?.data || error.message,
      });
  }
});

module.exports = router;
