import { useState } from "react";

function Counter() { 

    const arrImgSrc = ['https://i.pinimg.com/736x/60/b3/b8/60b3b888914534cfa940f458c2143798.jpg', 'https://i.etsystatic.com/21654192/r/il/2e5170/4547408392/il_570xN.4547408392_4911.jpg'];

    const [number, setNumber] = useState(0);    // 초기값
    const [imgSrc, setImgSrc] = useState(arrImgSrc[0]); // 초기값
    const [i, setI] = useState(1);
    // const u = useState(0);
    // console.dir(u[0]);
    // console.dir(u[1]);

    // state 컴포넌트 내에서 사용하는 저장 공간
    // 불변성을 유지해야 한다 - 리액트가 값이 변경되었는지 알아야 리렌더링을 함
    // 리액트가 리렌더링을 하는 조건
    // 1. state 값이 변경되었을 때
    // 2. props 값이 변경되었을 때
    // 3. 부모 컴포넌트가 리렌더링하면 자식 컴포넌트도 리렌더링 

    const onIncrease = () => {
        setNumber(pre => pre + 1);
    };

    const onDecrease = () => {
        setNumber(pre => pre - 1);
    };

    

    const onChangeImg = () => {
        setI(i => {
            if (i + 1 >= 2) return 0;
            else return i + 1;
        });
        setImgSrc(arrImgSrc[i]);
        
    };

    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
            <img src={imgSrc} alt={imgSrc} width={100} onClick={onChangeImg}/>
        </div>
    )
}

export default Counter;