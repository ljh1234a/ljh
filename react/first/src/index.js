import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Hello from './Hello';
import Counter from './Counter';
import Game from './Game';
import InputSample from './InputSample';
import UserList from './UserList';
import InputOrder from './InputOrder';
import Order from './Order';

// react 단일페이지 애플리케이션 - SPA

const root = ReactDOM.createRoot(document.getElementById('root'));

// props
let userName = "홍길동";
let fontSize = 20;
let userObject = {
  userImg: 'https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg',
  userAge: 50
};

// 사용자 컴포넌트는 이벤트가 작동하지 않음

// 부모 컴포넌트의 자료는 props로 자식 컴포넌트에게 전송
// 자식 컴포넌트의 자료는 부모에게 받은 함수를 사용
// 컴포넌트 자신의 자료는 state로 관리

root.render(
  <>
    {/* <Order /> */}
    <UserList />
    {/* <InputSample /> */}
    {/* <Game /> */}
    {/* <button onClick={() => {
      alert('test');
      }}>click</button>
      {true ? <Hello name={userName} color="red" fsize={fontSize} userObject={userObject} onClick= {() => {
        alert('test');
      }} isSpecial={'test'}>
        <h1>React</h1>
        <input type='text' />
      </Hello> : <App />}
      <Counter /> */}
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// 최적화 - 메모이제이션, 캐쉬 (CDN)
// 한번 실행된 구문이나 내용을 저장 후 다시 실행시 값만 리턴

// 조건과 값을 저장할 공간 - 캐쉬
// let props = [];   // 조건 저장
// let result = [];  // 조건에 대한 결과값 저장

// function someFunc(i) {
//   // 조건을 비교
//   const index = props.indexOf(i); // i와 같은 값이 존재하면 해당 인덱스 리턴, 없으면 -1 리턴
//   if (index === -1) {
//     // 복잡한 구문
//     console.log('복잡한 처리');
//     props.push(i);
//     result.push("cashe: " + i * 10);
//     return console.log(i * 10);
//   } else {
//     return console.log(result[index]);
//   }
// }

// someFunc(10);
// someFunc(20);
// someFunc(10);
// someFunc(20);
// someFunc(10);
// someFunc(20);


// let counter = 0;

// Function to increment counter
// const add = (function () {
//   let counter = 0;
//   console.log(counter);
//   return function () {
//     counter += 1;
//     return counter;
//   }
// })();

// // Call add() 3 times
// console.log(add());
// console.log(add());
// console.log(add());

// function someFunc() {
//   // 클로저
//   let props = [];
//   let result = [];

//   return (i) => {
//     const index = props.indexOf(i);

//     if (index === -1) {
//       console.log('복잡한 처리');
//       props.push(i);
//       result.push("cashe: " + i * 10);
//       return console.log(i * 10);
//     } else {
//       return console.log(result[index]);
//     }
//   }
// }

// let func = someFunc();
// func(10);
// func(20);
// func(10);
// func(20);
// func(10);
// func(20);

// 클로저: 내부 함수에서 외부 함수의 범위에 대한 접근을 제공
// function c() {
//   let inC = 7; // 클로저 메소드

//   console.log(inC);
//   return function innerC() {
//     console.log(inC);
//   }
// }

// c();

// let innerC = c();
// innerC();
// innerC();
// innerC();

// function counter() {
//   let i = 0;

//   return () => {
//     i++;
//     console.log(i);
//   }
// }

// let closer = counter();
// closer();
// closer();
// closer();

// let newCloser = counter();
// newCloser();
// newCloser();
// newCloser();

// 비동기
// setTimeout(콜백함수, 시간(ms)) - 특정 시간이 지난 후 작동
// setInterval(콜백함수, 시간(ms)) - 특정 시간 간격마다 작동

setTimeout(() => {
  console.log('100');
}, 500)
console.log(1);
setTimeout(() => {
  console.log('100');
}, 100);


