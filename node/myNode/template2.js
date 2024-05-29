const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

const val  = {
    name: '고길동',
    age: 28
};

const users = [
    val,
    {
        name: '김길동',
        age: 20
    },
    {
        name: '마길동',
        age: 25
    },
    {
        name: '장길동',
        age: 30
    },
    {
        name: '홍길동',
        age: 35
    },

];

function makeObject(str) {
    let arrProps = str.split('&');
    let obj = {};
    arrProps.forEach(val => {
        let arrProp = val.split('=');
        obj[arrProp[0]] = decodeURI(arrProp[1]);
    });
    return obj;
}

http.createServer(function(req, res) {
    if (req.method === 'GET') {
        fs.readFile('useEjs2.ejs', 'utf-8', function(err, data) {
            if (err) console.log(err.message);
            else {
                res.writeHead(200, {'Content-type': 'text/html'});
                res.end(ejs.render(data, {
                    users: users,
                    show: false
                }));
            }
        });
    } else {
        req.on('data', function(user) {
            fs.readFile('useEjs2.ejs', 'utf-8', function(err, data) {
                let objUser = makeObject(user.toString());
                let valUser = {
                    name: objUser.name,
                    age: objUser.age
                };
                users.push(valUser);
                if (objUser.sortOn) {
                    let flag = objUser.sortOn === 'name'
                        ? objUser.flagName
                        : objUser.flagAge;
                    sort(objUser.sortOn, flag);
                }

                res.writeHead(200, {'Content-type': 'text/html'});
                res.end(ejs.render(data, {
                    users: users,
                    show: true
                }));
            })
        })
    }
}).listen(8888, () => {
    console.log('8888');
});

function sort(type, flag) {
    users.sort(function(a, b) {
        if (flag) {
            if (type === 'name') 
                return a[type] == b[type] ? 0 : a[type] > b[type] ? 1 : -1;
            else return a[type] - b[type];
        } else {
            if (type === 'name') 
                return a[type] == b[type] ? 0 : a[type] > b[type] ? -1 : 1;
            else return b[type] - a[type]
        }
    });
}