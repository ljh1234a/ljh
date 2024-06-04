const http = require("http");
const fs = require("fs");
const ejs = require("ejs");

const mysql = require("mysql");
const client = mysql.createConnection({
  // host: 'localhost:',
  user: "root",
  password: "0000",
  database: "aws",
});

// IF NOT EXIST: 테이블이 없을때만 만듦
// const query = `CREATE TABLE IF NOT EXISTS member (
//                 uid int NOT NULL PRIMARY KEY AUTO_INCREMENT,
//                 uname varchar(20) NOT NULL,
//                 uage int
//             );`;

// client.query(query, function (err, result) {
//   if (err) {
//     console.log(err.errno);
//     console.log(err.message);
//   } else {
//     console.log(result);
//   }
// });

// client.query("SHOW tables", function (err, result) {
//   console.log(result);
// });

// client.query("SELECT * FROM users", function (err, result) {
//   if (err) {
//     console.log(err.message);
//     return;
//   }
// });

let query = "SELECT * FROM users";

http
  .createServer((req, res) => {
    client.query(query, function (err, result) {
      if (req.method === "GET") {
        fs.readFile("testSQL.ejs", "utf-8", (err, data) => {
          if (err) {
            console.log(err.message);
          } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(
              ejs.render(data, {
                query: query,
                result: result,
                show: true,
              })
            );
          }
        });
      } else {
        fs.readFile("testSQL.ejs", "utf-8", (err, data) => {
          if (err) {
            console.log(err.message);
          } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(
              ejs.render(`
                
                `)
            );
          }
        });
      }
    });
  })
  .listen(7777, () => {
    console.log(7777);
  });
