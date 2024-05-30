const express = require("express");
const cookie = require("cookie-parser");

const app = express();

app.use(cookie());

app.get("/setCookie", (req, res) => {
  res.cookie("string", "cookie", {
    secure: true,
    maxAge: 6000,
  });
  // secure: https에서만 적용
  // maxAge: 만료 시간 설정
  // path: cookie 경로 설정 기본값: '/'
  // httpOnly: 웹서버에서만 적용
  res.cookie("json", {
    name: "홍길동",
    age: "30",
  });

  res.redirect("/getCookie");
});

app.get("/getCookie", (req, res) => {
  let uname = "";
  if (req.cookies.json) {
    uname = req.cookies.json.name;
  }
  res.send(
    uname +
      '<br><a href="/setCookie">쿠키 설정</a><br><a href="/clearCookie">쿠키 삭제</a><br><a href="/somePage">다른 페이지</a>'
  );
});

app.get("/somePage", (req, res) => {
  let isCookie = "";
  if (req.cookies.json) {
    isCookie = req.cookies.json.name + '<br><a href="/getCookie">메인</a>';
  } else {
    isCookie = '<a href="/setCookie">로그인</a>';
  }
  res.send(isCookie);
});

app.get("/clearCookie", (req, res) => {
  res.clearCookie("json");
  res.redirect("getCookie");
});

app.listen(8888, () => {
  console.log("run at 8888");
});
