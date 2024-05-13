import logo from './logo.svg';
import './App.css';

function App() {
  let bgColor = '#aaa';

  return (
    /*
      JSX
        1. 꼭 닫혀야 하는 태그
        2. 꼭 감싸져야하는 태그(부모) - 부모로 대신 사용 (Fragment) => <></>, <Fragment></Fragment>
        3. JSX안에서의 JS 내용은 중괄호 {}로 감싸기
        4. class 속성은 className으로 사용, style은 객체로 값을 지정
        5. JSX의 주석은 중괄호 {}로 감싸기
        리액트는 값을 유지함. (리로드 하지 않음)
    */
    <>
      <div className="App" style={{backgroundColor: bgColor, borderRadius: '100px'}} data-value={bgColor}>
        <hr></hr>
        <br></br>
        {/* JSX의 주석 */}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hello World!
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </>
  );
}

export default App;
