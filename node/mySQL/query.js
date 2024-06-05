const fs = require("fs");
const ejs = require("ejs");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

const client = mysql.createConnection({
  user: "root",
  password: "0000",
  database: "aws",
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  fs.readFile("query.html", "utf-8", (err, data) => {
    res.send(
      ejs.render(data, {
        code: -1,
        query: "",
        error: null,
        result: null,
      })
    );
  });
});

app.post("/", (req, res) => {
  const { query } = req.body;

  // \n 개행문자(new line)
  // \r 개행문자(캐리지 리턴)
  const run = query.replace(/\n|\r/g, " ");
  fs.readFile("query.html", "utf-8", (err, data) => {
    client.query(run, (sqlErr, result) => {
      if (sqlErr) {
        res.send(
          ejs.render(data, {
            code: 0,
            error: sqlErr,
            result: null,
            query: query,
          })
        );
      } else {
        res.send(
          ejs.render(data, {
            code: 1,
            error: null,
            result: result,
            query: query,
          })
        );
      }
    });
  });
});

app.listen(8888, () => {
  console.log(8888);
});
