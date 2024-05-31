const express = require("express");
const exB = express.Router();

exB.get("/", (req, res) => {
  res.send("B 메인 페이지입니다");
});

exB.get("/title", (req, res) => {
  res.send("B title 페이지입니다");
});

exB.get("/title/subtitle", (req, res) => {
  res.send("B title-subtitle 페이지입니다");
});

exports.exB = exB;
