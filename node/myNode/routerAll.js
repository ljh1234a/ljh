const express = require("express");
const routerA = require("./routerA").routerA;
const routerB = require("./routerB").routerB;

const app = express();

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
