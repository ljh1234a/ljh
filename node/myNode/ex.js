const express = require("express");
const app = express();

const exA = require("./exA").exA;
const exB = require("./exB").exB;

app.use("/a", exA);
app.use("/b", exB);

app.get("/", (req, res) => {
  res.send("메인 페이지입니다");
});

app.all("*", (req, res) => {
  res.status(404).send("존재하지 않는 페이지입니다");
});

app.listen(8888, () => {
  console.log(8888);
});
