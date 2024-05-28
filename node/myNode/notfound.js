const http = require('http');
const fs = require('fs');
// HTTP 상태 코드
// 1xx 처리중
// 2xx 성공
// 3xx 리다이렉트
// 4xx 클라이언트 오류
// 5xx 서버 오류

http.createServer(function(req, res) {
    // res.writeHead(302, {Location: 'http://hscampus.com/'});
    // res.end();
    fs.readFile('notfound.html', function(err, data) {
        res.writeHead(404);
        res.end(data);
    });
    
}).listen(8888, function() {
    console.log('8888');
})