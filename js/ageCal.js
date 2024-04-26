let now = new Date();
let year = now.getFullYear();
let birthYear = prompt("생년을 입력하세요. (YYYY)", "");

Number.isInteger(birthYear) ? null : alert('숫자만 입력해주세요.');

// 형변환 - 문자를 숫자로 변경해주는 Number 생성자 함수
birthYear = Number(birthYear);
console.log(typeof birthYear);

let age = year - birthYear + 1;
const ADULTAGE = 18;

let grownup = age > ADULTAGE ? "성인" : "미성년자";

let display = document.getElementById("display");
display.innerHTML = !Number.isInteger(birthYear) ? "<p style='color: red'>숫자만 입력해주세요</p>" : "<h1>당신의 나이는 " + age + "이며, " + grownup + "이군요.</h1>";

let hyosung = {
    d3: 4,
    aws: 5,
    web: 7
};
console.dir(window);
console.log(typeof hyosung);
console.dir(hyosung.aws);

let man = {name: '홍길동', age: 25, height: 180, weight: 70};
console.dir(man);
console.log(man.height);

let str;
console.log(str);
str = "";
console.log(typeof str);
console.log("test \" test");
console.log("나\b는 " + man.name + "\n입 \t니다.");
console.log(`나는 ${man.name}입니다.`);
console.log(typeof `나는 ${man.name} 입니다.`);
console.dir(String);
console.log(man.name.length);

alert("We are the so-called \"Vikings\" \nfrom the north.");
let backticks = `
&nbsp; &nbsp;  우리나라<br>
좋은나라
`;
alert(backticks);
display.innerHTML += backticks;

let x = "John";
let y = "John";
console.log(`x == y : ${x == y}`);
console.log(`x === y : ${x === y}`);
// 사용 x
y = new String("John");
console.log(`x == new y : ${x == y}`);
console.log(`x === new y : ${x === y}`);

x = new String("John");
console.log(`new x == new y : ${x == y}`);
console.log(`new x === new y : ${x === y}`);

console.log(999999999999999);   
console.log(9999999999999999);

let myNumber = 2;
let txt = "";
display.innerHTML += "<br><hr>";
while (myNumber != Infinity) {
    myNumber *= myNumber;
    txt += myNumber + "<br>";
}
display.innerHTML += txt;

console.log(2/0);
console.log(-2/0);

myNumber = 25000;
// .toString(x) -> x진수로 표현
console.log(myNumber.toString(32));
console.log(myNumber.toString(16));
console.log(myNumber.toString(12));
console.log(myNumber.toString(10));
console.log(myNumber.toString(8));
console.log(myNumber.toString(2));