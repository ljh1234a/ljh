const express = require("express");
const ejs = require("ejs");
const fs = require("fs");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const port = 8888;

const client = mysql.createConnection({
  user: "root",
  password: "0000",
  database: "aws",
});

client.connect((err) => {
  if (err) throw err;
  console.log("MySQL 연결중...");

  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        person VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

  client.query(createTableQuery, (err, result) => {
    if (err) throw err;
    console.log("Posts 테이블 생성중...");
  });
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const query = "SELECT * FROM posts ORDER BY created DESC";

  client.query(query, (err, result) => {
    if (err) console.log(err.message);
    else {
      fs.readFile("noticeBoard.html", "utf-8", (err, data) => {
        if (err) console.log(err.message);
        else {
          res.send(
            ejs.render(data, {
              posts: result,
            })
          );
        }
      });
    }
  });
});

// app.post("/", (req, res) => {});

app.get("/write", (req, res) => {
  fs.readFile("noticeBoardWrite.html", "utf-8", (err, data) => {
    if (err) console.log(err.message);
    else {
      res.send(ejs.render(data, {}));
    }
  });
});

app.post("/write", (req, res) => {
  const { title, person, content } = req.body;

  const insertQuery =
    "INSERT INTO posts (title, person, content) VALUES (?, ?, ?)";
  client.query(insertQuery, [title, person, content], (err, result) => {
    if (err) console.log(err.message);
    else {
      res.redirect("/");
    }
  });
});

app.get("/content/:id", (req, res) => {
  const { id } = req.params;

  const contentQuery = "SELECT * FROM posts WHERE id = ?";
  client.query(contentQuery, [id], (err, result) => {
    if (err) console.log(err.message);
    else {
      fs.readFile("noticeBoardContent.html", "utf-8", (err, data) => {
        if (err) console.log(err);
        else {
          res.send(
            ejs.render(data, {
              posts: result[0],
            })
          );
        }
      });
    }
  });
});

app.post("/delete", (req, res) => {
  const dropQuery = "DELETE FROM posts";
  client.query(dropQuery, (err, result) => {
    if (err) console.log(err.message);
    else {
      res.redirect("/");
    }
  });
});

app.post("/delete/:id", (req, res) => {
  const { id } = req.params;

  const deleteQuery = "DELETE FROM posts WHERE id = ?";
  client.query(deleteQuery, [id], (err, result) => {
    if (err) console.log(err.message);
    else {
      res.redirect("/");
    }
  });
});

app.get("/update/:id", (req, res) => {
  const { id } = req.params;
});

app.post("/update/:id", (req, res) => {
  const { id } = req.params;
  const { title, person, content } = req.body;

  const updateQuery = "UPDATE posts SET content = ? WHERE id = ?";
  client.query(updateQuery, [id, content], (err, result) => {
    if (err) console.log(err.message);
    else {
      res.redirect("/");
    }
  });
});

app.post("/search/:id", (req, res) => {
  const { id } = req.params;

  const searchQuery = "SELECT * FROM posts WHERE id = ?";
  client.query(searchQuery, [id], (err, result) => {
    if (err) console.log(err.message);
    else {
      res.redirect("/");
    }
  });
});

app.listen(port, () => {
  console.log(port);
});
