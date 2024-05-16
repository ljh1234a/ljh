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
