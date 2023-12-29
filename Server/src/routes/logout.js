const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Octokit } = require("@octokit/core");
router.delete("/", async (req, res) => {
  const CLIENT_ID = process.env.VITE_GITHUB_CLIENT_ID;
  const CLIENT_SECRET = process.env.VITE_GITHUB_CLIENT_PW;
  const TOKEN = process.env.VITE_GITHUB_OCTOKIT_TOKEN;
  const { accessToken } = req.body;
  // await axios
  //   .delete(`https://api.github.com/applications/${CLIENT_ID}/token`, {
  //     data: { access_token: accessToken },
  //     auth: {
  //       username: CLIENT_ID,
  //       password: CLIENT_SECRET,
  //     },
  //   })
  // .then(() => {
  //   res.status(205).send("LogOut");
  // })
  // .catch((e) => {
  //   console.log(e.response);
  // });
  const octokit = new Octokit({
    auth: TOKEN,
  });
  await octokit.request(`DELETE /applications/${CLIENT_ID}/token`, {
    client_id: CLIENT_ID,
    access_token: accessToken,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
});
module.exports = router;
