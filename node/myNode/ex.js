const http = require('http');
const fs = require('fs');

function fileType(path, res) {
    const extensions = ['/', 'html', 'jpg', 'css', 'mp3', 'js'];
    const contentTypes = ['text/html', 'text/html', 'image/jpg', 'text/css', 'audio/mp3', 'text/script'];

    if (path === extensions[0]) {
        
    }
}

function readFile(name, ext, res, type) {
    fs.readFile(`${name}.${ext}`, (err, data) => {
        if (name === 'index')
            res.writeHead(200, {'Content-type': type});
        else    
            res.writeHead(200, {'Content-type': type});
        res.end(data);
    })
}

http.createServer((req, res) => {

}).listen(2000, () => {
    console.log(2000);
})