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
    userName: "홍길동",
    userId: "hong",
    userPass: "hong123",
  },
  {
    userName: "김길동",
    userId: "kim",
    userPass: "kim123",
  },
  {
    userName: "마길동",
    userId: "ma",
    userPass: "ma123",
  },
  {
    userName: "차길동",
    userId: "cha",
    userPass: "cha123",
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
    res.send("<a href='/login'>로그인</a><br><a href='/signup'>회원가입</a>");
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
    <form action='POST'>
        <input type='text' name='uname' placeholder='이름'><br>
        <input type='text' name='uid' placeholder='아이디'><br>
        <input type='password' name='upass' placeholder='비밀번호'><br>
        <input type='submit' value='회원가입'>
    </form>
    `);
});

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
  let user = users.find((user) => user.uid === uid && users.upass);
  if (user) return user.uname;
  return false;
}

// 로그아웃 페이지
app.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});

app.listen(8888, () => {
  console.log("server: 8888");
});
