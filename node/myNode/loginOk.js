let fs = require("fs");
let ejs = require("ejs");
let express = require("express");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");

let app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

const users = [
  {
    uname: "홍길동",
    uid: "hong",
    upass: "hong123",
  },
  {
    uname: "김길동",
    uid: "kim",
    upass: "kim123",
  },
  {
    uname: "마길동",
    uid: "ma",
    upass: "ma123",
  },
  {
    uname: "차길동",
    uid: "cha",
    upass: "cha123",
  },
];

// let userId = "abc";
// let userPass = "123";
// let userName = "홍길동";

// 메인 페이지
app.get("/", (req, res) => {
  if (req.cookies.auth) {
    res.send(
      `${req.cookies.uname}님, 환영합니다!<br><a href='/logout'>로그아웃</a>`
    );
  } else {
    res.send(
      `
      <style>
        a {
          text-decoration: none;
          color: black;
          font-size: 18px;
        }
        a:hover {
          background-color: #ccc;
        }
      </style>
      <a href='/login'>로그인</a><br><a href='/signup'>회원가입</a><br><a href='/userlist'>회원목록</a>`
    );
  }
});

// 로그인 페이지
app.get("/login", (req, res) => {
  fs.readFile("login.html", "utf-8", (err, data) => {
    // console.log(req.query);
    if (req.query) {
      log = req.query.log;
    }
    res.send(ejs.render(data, { log: log }));
  });
});

// 회원가입 페이지
app.get("/signup", (req, res) => {
  res.send(`
    <form method='POST'>
        <input type='text' name='uname' placeholder='이름'><br>
        <input type='text' name='uid' placeholder='아이디'><br>
        <input type='password' name='upass' placeholder='비밀번호'><br>
        <input type='submit' value='회원가입'>
    </form>
    `);
});

// 회원가입 처리 페이지
app.post("/signup", (req, res) => {
  const { uid, uname, upass } = req.body;

  let user = {
    uid: uid,
    uname: uname,
    upass: upass,
  };
  users.push(user);

  res.send(`
        <script>
            alert('환영합니다. ${uname}님. \\n 로그인 해주세요.');
            location.href = '/login';
        </script>
    `);
});

// 로그인 처리 페이지
app.post("/login", (req, res) => {
  const { uid, upass } = req.body;
  if ((uname = isUser(uid, upass))) {
    res.cookie("auth", true);
    res.cookie("uname", uname);
    res.redirect("/");
  } else {
    res.redirect("/login?log=true");
  }
});

function isUser(uid, upass) {
  let user = users.find((user) => user.uid === uid && user.upass);
  if (user) return user.uname;
  return false;
}

// 로그아웃 페이지
app.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});

// 회원목록 페이지
app.get("/userlist", (req, res) => {
  let str = "<table><tr><th>이름</th><th>아이디</th><th>비밀번호</th></tr>";

  // for (let i = 0; i < users.length; i++) {
  //   str += `<td>${users[i].uname}</td><td>${users[i].uid}</td><td>${users[i].upass}</td>`;
  // }

  users.forEach(
    (user) =>
      (str += `<tr><td>${user.uname}</td><td>${user.uid}</td><td>${user.upass}</td></tr>`)
  );

  str += "</table>";
  res.send(`
    <style>
      h1 {
        text-align: center;
        margin: 0;
      }
      #home {
        text-align: center;
      }
      #home a {
        color: black;
        text-decoration: none;
      }
      #home a:hover {
        background-color: #ccc;
      }
      table {
        border-collapse: collapse;
        margin: 10px auto;
      }
      th {
        background-color: #eee;
      }
      tr, th, td {
        border: 1px solid;
        padding: 15px;
        text-align: center;
        font-size: 18px;
      }
    </style>
  <div>
    <h1>회원목록</h1>
    <div id='home'><a href='/'>돌아가기</a></div>
    ${str}
  </div>`);
});

app.listen(8888, () => {
  console.log("server: 8888");
});
