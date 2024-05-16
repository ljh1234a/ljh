import { useEffect, useRef, useState } from "react";

function InputSample() {
    const [inputs, setInputs] = useState({
        name: '',
        age: '',
        job: '',
    });
    
    const {name, age, job} = inputs;

    const nameInput = useRef();
    const ageInput = useRef();
    const jobInput = useRef();
    
    useEffect(() => {   // 메서드가 마운트 되고나서 작업하라는 것
        // nameInput.current.style = "background-color: pink";
        ageInput.current.onclick = function() {
            // alert("test");
        };
    }, []);

    const onChange = (e) => {
        const {id, value} = e.target;

        setInputs({
            ...inputs,
            [id]: value
        });
    }

    const onReset = () => {
        setInputs({
            name: '',
            age: '',
            job: '',
        });
        nameInput.current.focus();
        ageInput.current.style = "background-color: lightgreen";
    }

    // const onSubmit = () => {
    //     if (nameInput.current.value === "") {
    //         alert("이름을 입력하세요");
    //         nameInput.current.focus();
    //     } else if (ageInput.current.value === "") {
    //         alert("나이를 입력하세요");
    //         ageInput.current.focus();
    //     } else if (jobInput.current.value === "") {
    //         alert("직업을 입력하세요");
    //         jobInput.current.focus();
    //     }
    // }

    // SPA - 단일 페이지 맵

    const checkSubmit = (e) => {
        if (name === "") {
            alert("이름을 입력해주세요");
            nameInput.current.focus();
            e.preventDefault(); // 전송 취소
        } else if (age === "") {
            alert("나이를 입력해주세요");
            ageInput.current.focus();
            e.preventDefault(); // 전송 취소
        } else if (job === "") {
            alert("직업을 입력해주세요");
            jobInput.current.focus();
            e.preventDefault(); // 전송 취소
        }
        
    }

    return (
        <div>
            <form action="http://www.naver.com" method="post" onSubmit={checkSubmit}>
                <input id="name" placeholder="이름" onChange={onChange} value={name} ref={nameInput}/>
                <input id="age" placeholder="나이" onChange={onChange} value={age} ref={ageInput}/>
                <input id="job" placeholder="직업" onChange={onChange} value={job} ref={jobInput}/>
                <button onClick={onReset}>초기화</button>
                <div>
                    {name}({age}) {job}
                </div>
                <button>전송</button>
            </form>
            
        </div>
    );
}

export default InputSample;



