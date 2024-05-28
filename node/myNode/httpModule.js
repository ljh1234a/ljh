/*
    http모듈: 웹 서버 제작

    server 모듈: 웹 서버
    response 모듈: 응답 객체(서버에서 클라이언트로 전송)
    request 모듈: 요청 객체(클라이언트에서 서버로 전송)

    이벤트: request 요청 받을 때, connection 접속할 때, close 종료할 때
*/

const server = require('http').createServer();
// listen(포트번호[, 콜백함수]): 서버 오픈
server.listen(1234, function() {
    console.log(`run at 1234`);
});

// 서버에 이벤트 추가
server.on('connection', function(socket) {
    console.log('사용자 접속');
});

server.on('request', function(socket) {
    console.log('사용자 요구');
});

server.on('close', function(socket) {
    console.log('서버 종료');
})

setTimeout(() => {
    server.close(); // 서버 종료
}, 30000);