const express = require("express");
const Diary = require("../schemas/Diary");
const router = express.Router();

router.get("/", async (req, res) => {
  const diary = await Diary.find();
  return res.status(200).json({ diary });
});

module.exports = router;
