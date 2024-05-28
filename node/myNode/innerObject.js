/*
    내장 모듈
    os 모듈: 실행도는 서버의 운영체제
    url 모듈: 웹 주소에 관한 정보
    crypto 모듈: 암호화 모듈
*/

let os = require('os');
let url = require('url');
let crypto = require('crypto');

// console.dir(os);
console.log(os.hostname());
console.log(os.uptime());

// console.dir(url);
let address = 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash';
let urlObject = url.parse(address);
console.log(urlObject.port);

//  복구 불가능
let sha = crypto.createHash('sha256');
sha.update('test1234'); // key- 텍스트
console.log(sha.digest('base64'));
console.log('\n');

let sha2 = crypto.createHash('sha256');
sha2.update('test1234');
console.log(sha2.digest('hex'));

// 복구 가능
// 암호화(encoding)
let key = '효성';
let pass = 'korea';
let Cipheriv = crypto.createCipher('aes192', key);
Cipheriv.update(pass, 'utf8', 'hex');
let coutput = Cipheriv.final('hex');

console.log(`원본: ${pass}`);
console.log(`암호화: ${coutput}`);

// 복호화(decoding)
let deCipheriv = crypto.createDecipher('aes192', key);
deCipheriv.update(coutput, 'hex', 'utf8');
let doutput = deCipheriv.final('utf8');
console.log(`복호화: ${doutput}`);