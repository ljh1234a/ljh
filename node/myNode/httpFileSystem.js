const fs = require('fs');
const http = require('http');

const port = 7777;

function getExtension(url) {
    let fileName = url.substring(1);
    let arrFileName = fileName.split('.');
    console.log(arrFileName);
    return {
        name: arrFileName[0],
        ext: arrFileName[1]
    };
}


function fileType(path, res) {
    const extensions = ['/', 'html', 'jpg', 'css', 'mp3', 'js'];
    const contentTypes = ['text/html', 'text/html', 'image/jpg', 'text/css', 'audio/mp3', 'text/script'];

    if (path === extensions[0]) {
        readFile('index', 'html', res, contentTypes[0]);
    } else {
        const {name, ext} = getExtension(path);

        for (let i = 1; i < extensions.length; i++) {
            if (ext === extensions[i]) {
                readFile(name, ext, res, contentTypes[i]);
                break;
            }
        }
        return;
    }
}

// 쿠키: 서버에서 클라이언트에게 심어놓은 정보 파일

function readFile(name, ext, res, type) {
    fs.readFile(`${name}.${ext}`, function(err, data) {
        if (name === 'index') 
            res.writeHead(200, {'Content-type': type});
        else
            res.writeHead(200, {'Content-type': type});

        res.end(data);
    })
}

http.createServer(function(req, res) {
    
    fileType(req.url, res);
    // console.log(req.url);
    // getExtension(req.url);
    
    // if (req.url === '/')
    //     fs.readFile('index.html', function(err, data) {
    //         res.writeHead(200, {'Content-type': 'text/html'});
    //         res.end(data);
    //     });

    // if (ext === 'jpg')
    // fs.readFile(name + '.' + ext, function(err, data) {
    //         res.writeHead(200, {'Content-type': 'image/jpg'});
    //         res.end(data);
    //     });

    // if (ext === 'mp3')
    // fs.readFile(name + '.' + ext, function(err, data) {
    //         res.writeHead(200, {'Content-type': 'audio/mp3'});
    //         res.end(data);
    //     });

}).listen(port, function() {
    console.log(`run at ${port}`);
})