const express = require("express");
const exA = express.Router();

exA.get("/", (req, res) => {
  res.send("A 메인 페이지입니다");
});

exA.get("/about", (req, res) => {
  res.send("A about 페이지입니다");
});

exA.get("/about/next", (req, res) => {
  res.send("A about 다음 페이지입니다");
});

exports.exA = exA;
