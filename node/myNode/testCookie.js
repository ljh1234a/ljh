const http = require('http');

http.createServer(function(req, res) {
    let date = new Date();
    date.setDate(date.getDate() + 1);

    // 쿠키에 한글 사용은 에러
    res.writeHead(200, {"Content-Type": "text/html", "Set-Cookie": ["uname=korean;Expires=" + date.toUTCString()]});
    res.end(req.headers.cookie);
}).listen(9999, function() {
    console.log('9999');
});