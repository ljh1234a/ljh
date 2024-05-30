/*
    파일 전송 모듈: connect-multiparty
    npm i connect-multiparty
*/

const fs = require('fs');
const express = require('express');
const multiparty = require('connect-multiparty');

const app = express();

// multiparty 미들웨어 설정
app.use(multiparty({uploadDir: __dirname}));

app.get('/', (req, res) => {
    fs.readFile('fileUploader.html', 'utf-8', (err, data) => {
        res.send(data);
    });
});

app.post("/", function(req, res) {
    // console.log(req.body);
    // console.log(req.files);
    let textContent = req.body.textContent;
    let img = req.files.img;
    if(img) {
        let name = img.name;
        let path = img.path;
        let type = img.type;
        if(type.indexOf('image') != -1) {
            let outputPath = __dirname + '/' + Date.now() + name;
            console.log(outputPath);
            fs.rename(path, outputPath, function(err) {
                if (err) res.sendStatus(500);
                else res.send(textContent + '<br>전송 성공');
            }) 
        } else {
            fs.unlink(path, (err) => {
                res.sendStatus(500);
            });
        }
    }
});

app.listen(8888, () => {
    console.log(8888);
});
