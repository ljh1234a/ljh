// // 내장 모듈
// const http = require('http');
// // 사용자 모듈
// const dt = require('./myModule');
// // console.dir(dt);
// // url 내장 모듈
// const url = require('url');
// // fs 내장 모듈
// const fs = require('fs');

// 내장 모듈
import http from 'http';
import url from 'url';
import fs from 'fs';
import events from 'events';

import * as formidable from 'formidable';

// 사용자 모듈
import {myDateTime} from './myModule.js';

// import {upperCase} from 'upper-case';
// console.log(upperCase('test'));

const eventEmitter = new events.EventEmitter();

// 'myEvent'라는 이름으로 이벤트 등록
eventEmitter.on('myEvent', function() {
    console.log('이벤트 발동');
})

http.createServer(function(req, res) {
    // console.dir(req.url);
    res.writeHead(200, {'Content-type': 'text/html; charset=utf-8', 'access-control-allow-origin':'*'});

    let pathname = url.parse(req.url).pathname;

    let menu = `<a href='/'>HOME</a> <a href='/about'>ABOUT</a> <a href='/event?name=홍길동&age=30'>EVENT</a> `;
    menu += `<a href='/up'>파일 업로드</a>`;
    // var q = url.parse(req.url, true).query;
    // console.log(q.name);
    // console.log(q.age);
    

    switch(pathname) {
        case '/':
        case '/home':
            res.end(`${menu}<h1>HOME</h1><br>${myDateTime()}`);
            break;
        case '/about':
            // res.end(`${menu}<h1>ABOUT</h1><br>${dt.myDateTime()}`);
            fs.readFile('demofile1.html', function(err, data) {
                if (err) console.log(err);
                res.end(`${menu}${data}`);
            });
            break;
        case '/event':
            // 'myEvent' 이벤트 실행
            eventEmitter.emit('myEvent');
            let q = url.parse(req.url, true).query;
            const {name, age} = q;
            res.end(`${menu}<h1>EVENT</h1><br>이름: ${name}<br>나이: ${age}<br>${myDateTime()}`);
            break;
        case '/up':
            res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
            res.write('<input type="file" name="filetoupload"><br>');
            res.write('<input type="submit">');
            res.write('</form>');
            return res.end();
        case '/fileupload':
            const form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                let oldpath = files.filetoupload[0].filepath;
                let newpath = 'C:/Users/' + files.filetoupload[0].originalFilename;
                
                fs.rename(oldpath, newpath, function(err) {
                    if (err) res.end(err);
                    else res.end('File uploaded!');
                });
            });
            break;
        default:
            res.end(`${menu}<h1>404 NOT FOUND ERROR</h1>`)
        
    }
    // res.end(`<h1 style="color:violet">안녕하세요 ${q.name}</h1> ${dt.myDateTime()}`);
}).listen(777, function() {
    console.log('port: 777');
    // setInterval(() => {
    //     console.log(dt.myDateTime());
    // }, 1000)
});

/* 
    node.js는 비동기 이벤트 기반 프로그래밍 언어

    노드몬 설치: npm i -g nodemon
    설치 확인: npm list -g

    실행: nodemon 실행파일이름
    의존성: 플러그인
*/