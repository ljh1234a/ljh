const fs = require("fs");
const ejs = require("ejs");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const port = 9900;

const app = express();

const client = mysql.createConnection({
  user: "root",
  password: "0000",
  database: "aws",
  multipleStatements: true,
});

app.use(bodyParser.urlencoded({ extended: false }));

client.query(
  "SELECT count(*) as recodeCount FROM board",
  function (err, result) {
    const today = new Date();
    const strDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    if (result[0].recodeCount < 100) {
      for (let i = 0; i < 1000; i++) {
        client.query(
          `INSERT INTO board(board_content, board_date) VALUES ('${i}', '${strDate}')`,
          function (err) {
            if (err) {
              console.log(err.sqlMessage);
              return;
            }
          }
        );
      }
    }
  }
);

app.get(["/", "/:page"], function (req, res) {
  const per = 41;
  const block = 10;
  let { page } = req.params;
  if (!page) page = 0;

  fs.readFile("list.html", "utf-8", function (err, data) {
    const sql1 = `SELECT * FROM board ORDER BY board_id DESC LIMIT ${page}, ${per};`;
    const sql2 = "SELECT count(*) as recodeCount FROM board;";
    client.query(sql1 + sql2, function (err, results) {
      console.log(results);
      res.send(
        ejs.render(data, {
          results: results,
          per: per,
          page: page,
          block: block,
        })
      );
    });
  });
});
app.get("/insert", function (req, res) {
  fs.readFile("insert.html", "utf-8", function (err, data) {
    res.send(ejs.render(data));
  });
});
app.post("/insert", function (req, res) {
  const { content } = req.body;
  const today = new Date();
  const strDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  client.query(
    `INSERT INTO board (board_content, board_date) values ('${content}', '${strDate}')`,
    function (err) {
      if (err) {
        console.log(err.sqlMessage);
        return;
      } else {
        res.redirect("/");
      }
    }
  );
});
app.get("/view/:id", function (req, res) {
  const { id } = req.params;

  if (!id) {
    res.redirect("/");
  }

  fs.readFile("view.html", function (err, data) {
    client.query(
      `SELECT * FROM board WHERE board_id = ${id}`,
      function (err, result) {
        res.send(ejs.render(data.toString(), { result: result }));
      }
    );
  });
});
app.get("/edit/:id", function (req, res) {
  fs.readFile("edit.html", "utf-8", function (err, data) {
    client.query(
      `SELECT * FROM board WHERE board_id = ${req.params.id}`,
      function (err, result) {
        res.send(ejs.render(data, { result: result }));
      }
    );
  });
});
app.post("/edit/:id", function (req, res) {
  const { content } = req.body;
  const { id } = req.params;
  console.log(id, content);
  client.query(
    `UPDATE board SET board_content = '${content}' WHERE board_id = ${id}`,
    function (err) {
      if (err) {
        console.log(err.sqlMessage);
        return;
      } else {
        res.redirect(`/view/${id}`);
      }
    }
  );
});
app.get("/delete/:id", function (req, res) {
  client.query(
    `DELETE FROM board WHERE board_id = ${req.params.id}`,
    function (err) {
      if (err) {
        console.log(err);
        return;
      }
      res.redirect("/");
    }
  );
});

app.all("*", function (req, res) {
  res.send("<b>404!</b><hr><a href='/'>메인으로</a>");
});

app.listen(port, function () {
  console.log(port);
});
