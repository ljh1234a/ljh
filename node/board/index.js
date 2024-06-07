// REST - HTTP와 URI 기반으로 자원에 접근할 수 있도록 제공하는 애플리케이션 개발 인터페이스
// CRUD - Create, Read, Update, Delete

// app.get('/'):          리스트 표시       - list.html
// app.get('/insert'):    사용자 입력       - insert.html
// app.post('/insert'):   데이터 저장
// app.get('view/:id'):   내용 표시         - view.html
// app.get('edit/:id'):   수정할 데이터 표시 - edit.html
// app.post('edit/:id'):  수정할 데이터 저장
// app.get('delete/:id'): 데이터 삭제

// 외부 모듈
// fs, ejs, mysql, express, body-parser
// 데이터베이스 디자인
// board_id: int PK AUTO_INCREMENT 아이디
// board_date: 날짜(date)
// board_content: 내용(text)

// CREATE TABLE board (
//  board_id int NOT NULL AUTO_INCREMENT,
//  board_date date,
//  board_content text,
//  PRIMARY KEY(board_id)
// );

const fs = require("fs");
const ejs = require("ejs");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const port = 9999;

const app = express();

const client = mysql.createConnection({
  user: "root",
  password: "0000",
  database: "aws",
  multipleStatements: true,
});

client.query("SELECT count(*) as recodeCount FROM board", (err, result) => {
  const date = new Date();
  const created_time = `
    ${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

  if (result[0].recodeCount < 100) {
    for (let i = 0; i < 1000; i++) {
      client.query(
        `INSERT INTO board(board_title, board_content, board_date) VALUES ('title ${i}', '${i}', '${created_time}')`,
        (err) => {
          if (err) {
            console.log(err.sqlMessage);
            return;
          }
        }
      );
    }
  }
});

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  fs.readFile("list.html", "utf-8", (err, data) => {
    const sql1 = "SELECT * FROM board ORDER BY board_id DESC;";
    const sql2 = "SELECT count(*) as recodeCount FROM board;";
    client.query(sql1 + sql2, (err, result) => {
      res.send(
        ejs.render(data, {
          result: result,
        })
      );
    });
  });
});

app.get("/insert", (req, res) => {
  fs.readFile("insert.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.post("/insert", (req, res) => {
  const { title, content } = req.body;
  const date = new Date();
  const created_time = `
    ${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
  client.query(
    `INSERT INTO board (board_title, board_content, board_date) VALUES ('${title}', '${content}', '${created_time}')`,
    (err, result) => {
      if (err) {
        console.log(err.sqlMessage);
        return;
      } else {
        res.redirect("/");
      }
    }
  );
});

app.get("/view/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.redirect("/");
  }
  fs.readFile("view.html", "utf-8", (err, data) => {
    client.query(
      `SELECT * FROM board WHERE board_id = ${id}`,
      (err, result) => {
        res.send(
          ejs.render(data, {
            result: result[0],
          })
        );
      }
    );
  });
});

app.get("/edit/:id", (req, res) => {
  const { id } = req.params;

  fs.readFile("edit.html", "utf-8", (err, data) => {
    client.query(
      `SELECT * FROM board WHERE board_id = ${id}`,
      (err, result) => {
        res.send(
          ejs.render(data, {
            result: result[0],
          })
        );
      }
    );
  });
});

app.post("/edit/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  client.query(
    `UPDATE board SET board_title = '${title}', board_content = '${content}' WHERE board_id = ${id}`,
    (err, result) => {
      if (err) {
        console.log(err.sqlMessage);
        return;
      } else {
        res.redirect(`/view/${id}`);
      }
    }
  );
});

app.get("/delete/:id", (req, res) => {
  const { id } = req.params;

  client.query(`DELETE FROM board WHERE board_id = ${id}`, (err, result) => {
    if (err) {
      console.log(err.sqlMessage);
      return;
    } else {
      res.redirect("/");
    }
  });
});

// app.get("/", "/:page", (req, res) => {
//   const per = 15;
//   const block = 10;
//   let { page } = req.params;
//   if (!page) page = 0;

//   fs.readFile("list.html", "utf-8", (err, data) => {
//     const sql1 = `SELECT * FROM board ORDER BY board_id DESC LIMIT ${page}, ${per};`;
//     const sql2 = "SELECT count(*) as recodeCount FROM board;";
//     client.query(sql1 + sql2, (err, result) => {
//       res.send(
//         ejs.render(data, {
//           result: result,
//           per: per,
//           page: page,
//           block: block,
//         })
//       );
//     });
//   });
// });

app.get(["/", "/:page"], function (req, res) {
  const per = 15;
  const block = 10;
  let { page } = req.params;
  if (!page) page = 0;

  fs.readFile("list.html", "utf-8", function (err, data) {
    const sql1 = `SELECT * FROM board ORDER BY board_id DESC LIMIT ${page}, ${per};`;
    const sql2 = "SELECT count(*) as recodeCount FROM board;";
    client.query(sql1 + sql2, function (err, result) {
      res.send(
        ejs.render(data, {
          result: result,
          per: per,
          page: page,
          block: block,
        })
      );
    });
  });
});

app.all("*", (req, res) => {
  res.send('존재하지 않는 페이지<br><a href="/">돌아가기</a>');
});

app.listen(port, () => {
  console.log(port);
});
