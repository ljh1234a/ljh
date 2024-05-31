const express = require("express");

const routerB = express.Router();

routerB.get("/", (req, res) => {
  res.send("routerB");
});

routerB.get("/show", (req, res) => {
  res.send("routerB show");
});

exports.routerB = routerB;
