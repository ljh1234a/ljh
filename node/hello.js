const http = require('http');
const dt = require('./myModule');
const url = require('url');
const fs = require('fs');
// const events = require('events');
// const eventEmitter2 = new events.EventEmitter();

// eventEmitter2.on('myEvent', function() {
//     console.log('이벤트 발생');
// })

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-type': 'text/html; charset=utf-8', 'access-control-allow-origin':'*'});

    let pathname = url.parse(req.url).pathname;
    let menu = `<a href='/'>HOME</a> <a href='/about'>ABOUT</a> <a href='/event?name=이준호&age=27'>EVENT</a>` ;

    switch (pathname) {
        case '/':
        case '/home': 
            res.end(`${menu}<h1>HOME</h1>`);
            break;
        case '/about':
            // res.end(`${menu}<h1>ABOUT</h1>`);
            fs.readFile('demofile1.html', function(err, data) {
                if (err) {
                    // console.log(err);
                } else {
                    res.end(`${menu} ${data}`);
                }
            })
            break;
        case '/event':
            // eventEmitter2.emit('myEvent');
            let q = url.parse(req.url, true).query;
            let {name, age} = q;
            res.end(`${menu}<h1>${name}(${age})님 어서오세요</h1>`);
            break;
        default:
            res.end(`404 PAGE NOT FOUND!`);
    }
    // res.end(`${dt.myDateTime()} 안녕하세요`);
}).listen(8080);