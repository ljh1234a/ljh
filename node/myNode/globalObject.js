/*
    전역 변수/객체: node.js에서 지원(어디서나 사용)

    전역 변수: __filename, __dirname
    전역 모듈: console(명령프롬포트), process(현재 실행중인 프로그램)
*/
console.log(__filename); // 자신의 파일 이름
console.log(__dirname);  // 실행되고 있는 폴더 이름

// 시간 측정
console.time('timer');    // 여기의 시간을 기록
let sum = 0;
for (let i = 0; i <= 100; i++) {
    sum += i;
}
console.log(`sum: ${sum}`);
console.timeEnd('timer'); // 걸린 시간 타입을 표시

// console.dir(console);
// console.dir(process);

// 프로그램의 인자값 전송
if (process.argv[2] === 'good') {
    console.log('Good')
} else if (process.argv[2] === 'bad') {
    console.log('Bad');
} else {
    console.log('Nothing');
    process.exit();
}

// process.exit();