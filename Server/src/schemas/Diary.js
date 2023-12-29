const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema({
  author: { type: String },
  lang: {
    type: String,
  },
  date: {
    type: Number,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },

  link: {
    type: String,
    trim: true,
  },
  repo: {
    type: String,
  },
  code: {
    type: String,
  },
  commit: {
    type: Object,
  },
});
module.exports = mongoose.model("devNote", noteSchema);
