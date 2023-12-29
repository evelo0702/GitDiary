const express = require("express");
const path = require("path");
const PORT = 8000;
const HOST = "0.0.0.0";
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
let db;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB 연결 완료");
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(PORT, () => {
  console.log(`Server is Running PORT ${PORT} `);
});

app.use(express.json());
// body에 담겨져오는 파일을 json 파싱해서 데이터를 가져오게해줌
app.use(cors());
app.use("/diary", require("./routes/diary"));
app.use("/login", require("./routes/login"));
app.use("/logout", require("./routes/logout"));
app.use(express.static(path.join(__dirname, "../uploads")));
// localhost:8000/파일명 으로 uploads폴더 안의 이미지를 불러올수있음
