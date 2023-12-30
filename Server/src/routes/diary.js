const express = require("express");
const Diary = require("../schemas/Diary");
const router = express.Router();

router.get("/", async (req, res) => {
  const diary = await Diary.find({ author: req.query.author });
  return res.status(200).json(diary);
});
router.post("/", async (req, res) => {
  const newNote = req.body.newData;
  try {
    await Diary.create({
      date: newNote.date,
      author: newNote.author,
      lang: newNote.lang,
      title: newNote.title,
      content: newNote.content,
      link: newNote.link,
      repo: newNote.repo,
      code: newNote.code,
      commit: newNote.commit,
    });
    res.status(200).send("전송완료");
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
