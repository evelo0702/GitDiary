const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  const { code } = req.body;

  const data = {
    client_id: process.env.VITE_GITHUB_CLIENT_ID,
    client_secret: process.env.VITE_GITHUB_CLIENT_PW,
    code: req.body.code,
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
  const githubData = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${result.data.access_token}`,
      accept: "application/json",
    },
  });
  const repo = await axios.get(githubData.data.repos_url);
  const sendGitData = [
    {
      code: code,
      id: githubData.data.login,
      img: githubData.data.avatar_url,
      repo: repo.data.map((item) => item.name),
    },
  ];
  res.json(sendGitData);
});

module.exports = router;
