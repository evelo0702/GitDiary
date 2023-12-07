const express = require("express");
const path = require("path");
const PORT = 8000;
const HOST = "0.0.0.0";
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

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
app.use(cors());
app.use("/diary", require("./routes/diary"));
app.use("/login", require("./routes/login"));
app.use(express.static(path.join(__dirname, "../uploads")));

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});
