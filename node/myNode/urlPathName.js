let http = require('http');
let url = require('url');

http.createServer(function(req, res) {
    let pathname = url.parse(req.url).pathname;
    

    switch (pathname) {
        case '/':
            res.writeHead(200, {'Content-type': 'text/plain'});
            res.end('index.html');
            break;
        case 'show':
            res.writeHead(200, {'Content-type': 'text/plain'});
            res.end('show.html');
            break;
        case 'test':
            res.writeHead(200, {'Content-type': 'text/plain'});
            res.end('test.html');
            break;
        case '/show/test':
            res.writeHead(200, {'Content-type': 'text/plain'});
            res.end('/show/test.html');
            break;
        default:
            res.writeHead(404);
            res.end('404 NOT FOUND ERROR');
    }

}).listen(9999, function() {
    console.log('9999');
});