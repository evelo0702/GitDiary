const express = require("express");
const router = express.Router();
const axios = require("axios");
router.post("/", async (req, res) => {
  const { code } = req.body;
  console.log(req.body.code);
  const data = {
    client_id: process.env.VITE_GITHUB_CLIENT_ID,
    code: req.body.code,
    client_secret: process.env.VITE_GITHUB_CLIENT_PW,
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
  console.log(result.data.access_token);
  const githubData = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${result.data.access_token}`,
      accept: "application/json",
    },
  });
  console.log(githubData.data);
});

module.exports = router;
