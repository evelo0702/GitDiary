const { default: mongoose } = require("mongoose");
const DiarySchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  lang: {
    type: String,
  },
  date: {
    type: Number,
  },
  content: {
    type: String,
  },
  title: {
    type: String,
  },
  link: {
    type: String,
    default: "",
    trim: true,
  },
});
module.exports = mongoose.model("Diary", DiarySchema);
