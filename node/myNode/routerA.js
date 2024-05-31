const express = require("express");

const routerA = express.Router();

routerA.get("/", (req, res) => {
  res.send("routerA");
});

routerA.get("/about", (req, res) => {
  res.send("routerA about");
});

exports.routerA = routerA;
