const fs = require("fs");
const express = require("express");
const cookie = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

app.use(cookie());

app.use(bodyParser.urlencoded({ extended: true }));

// Dummy user data for authentication
const users = {
  홍길동: { username: "홍길동", password: "1234" },
  이준호: { username: "이준호", password: "5678" },
};

app.get("/", (req, res) => {
  res.send(`
    <div style="display: flex; justify-content:center; align-items:center; height: 100vh;">
      <form method="POST" action="/login" style="text-align:center">
        <h1>Login</h1>
        <div>
          <input type="text" id="username" name="username" placeholder= "이름을 입력하세요"
          style="padding: 10px; font-size:20px; margin: 5px 0; border: 1px solid #bbb; border-radius: 15px;" required>
        </div>
        <div>
          <input type="password" id="password" name="password" placeholder= "비밀번호를 입력하세요" 
          style="padding: 10px; font-size:20px; margin: 5px 0; border: 1px solid #bbb; border-radius: 15px;" required>
        </div>
        <button type="submit" style="font-size: 20px; padding: 10px; border:none; width: 265px; 
        font-weight:bold; border-radius: 10px; background-color:skyblue; color:white; cursor:pointer;" >로그인</button>
        <br><a href='/signup' style="padding:10px; text-decoration:none; 
        font-size:20px; color: black;">회원 가입</a>
      </form>
    </div>
  `);
});

app.get("/signup", (req, res) => {
  res.send(`
    <div style="display: flex; justify-content:center; align-items:center; height: 100vh;">
      <form method="POST" action="/signup" style="text-align:center">
      <h1>Sign Up</h1>
        <div>
          <input type="text" id="newUsername" name="username" placeholder= "이름을 입력하세요"
          style="padding: 10px; font-size:20px; margin: 5px 0; border: 1px solid #bbb; border-radius: 15px;" required>
        </div>
        <div>
          <input type="password" id="newPassword" name="password" placeholder= "비밀번호를 입력하세요" 
          style="padding: 10px; font-size:20px; margin: 5px 0; border: 1px solid #bbb; border-radius: 15px;" required>
        </div>
        <button type="submit" style="font-size: 20px; padding: 10px; border:none; width: 265px; 
        font-weight:bold; border-radius: 10px; background-color:lightgreen; color:white; cursor:pointer;" >회원가입</button>
        <br><a href="/" style="padding:10px; text-decoration:none;
        font-size:20px; color: black;">로그인</a>
      </form>
    </div>
  `);
});

app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (users[username]) {
    res.send("사용자가 이미 존재합니다.");
  } else {
    users[username] = { username, password };
    res.cookie("user", username, {
      maxAge: 600000,
      httpOnly: true,
    });
    res.redirect("/loginOk");
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (users[username] && users[username].password === password) {
    res.cookie("user", username, {
      maxAge: 600000,
      httpOnly: true,
    });
    res.redirect("/loginOk");
  } else {
    res.send("아이디 또는 비밀번호가 틀렸습니다.");
  }
});

const authMiddleware = (req, res, next) => {
  if (req.cookies.user && users[req.cookies.user]) {
    next();
  } else {
    res.redirect("/");
  }
};

app.get("/loginOk", authMiddleware, (req, res) => {
  res.send(
    `${req.cookies.user}님, 환영합니다!<br><a href="/logout">로그아웃</a>`
  );
});

app.get("/logout", (req, res) => {
  res.clearCookie("user");
  res.redirect("/");
});

app.listen(8888, () => {
  console.log("server is run at 8888");
});
