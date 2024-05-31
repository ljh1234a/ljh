/**
 * 라우터: 페이지 분배 기능
 */

const express = require("express");
const app = express();

const routerA = express.Router();
const routerB = express.Router();

// localhost:8888/a/---
routerA.get("/", (req, res) => {
  res.send("routerA");
});

routerA.get("/about", (req, res) => {
  res.send("routerA about");
});

// localhost:8888/b/---
routerB.get("/", (req, res) => {
  res.send("routerB");
});

routerB.get("/show", (req, res) => {
  res.send("routerB show");
});

app.use("/a", routerA);
app.use("/b", routerB);

app.get("/", (req, res) => {
  res.send("main");
});

app.all("*", (req, res) => {
  res.status(404).send("NOT FOUND!");
});

app.listen(8888, () => {
  console.log(8888);
});
