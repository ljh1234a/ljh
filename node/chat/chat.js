const fs = require("fs");
const http = require("http");
const socket = require("socket.io");
const port = 9999;

const server = http
  .createServer(function (req, res) {
    fs.readFile("chat.html", "utf-8", function (err, data) {
      res.writeHead(200, { "Content-type": "text/html" });
      res.end(data);
    });
  })
  .listen(port, function () {
    console.log(port);
  });

const io = socket.listen(server);

let users = {};

// connection 이벤트, disconnection 이벤트가 발생
io.sockets.on("connection", function (so) {
  console.dir(so);

  so.on("In", function (data) {
    users[so.id] = data.uname;
    io.sockets.emit("userIn", { uname: data.uname });
    io.sockets.emit("updateUsers", Object.values(users));
  });

  so.on("msg", function (data) {
    io.sockets.emit("showMsg", data);
  });

  // so.on("msg", function (data) {
  //   console.log(data);

  //   users[so.id] = data.uname;

  //   io.sockets.emit("updateUsers", Object.values(users));

  //   // public 모든 클라이언트에게 전송
  //   io.sockets.emit("showMsg", data);

  //   // broadcast 자신을 제외한 클라이언트들에게 전송
  //   // so.broadcast.emit("showMsg", data);

  //   // private 특정 클라이언트에게만 전송
  //   // io.sockets.to(id).emit()
  // });

  // 클라이언트가 연결을 끊을 때 참여자 업데이트
  so.on("disconnect", function () {
    const uname = users[so.id];
    delete users[so.id];
    io.sockets.emit("userOut", { uname: uname });
    io.sockets.emit("updateUsers", Object.values(users));
  });

  // so.on("redUp", function (data) {
  //   console.log(data);
  //   io.sockets.emit("redUp", data);
  // });
});
