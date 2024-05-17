import { useRef, useState } from "react";
import InputSample2 from "./InputSample2";

function InputSample() {
    const [inputs, setInputs] = useState({
        name: '',
        age: '',
        job: '',
    });

    const {name, age, job} = inputs;

    const nameInput = useRef();
    // const ageInput = useRef();
    // const jobInput = useRef();

    const onChange = (e) => {
        const {name, value} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const onReset = () => {
        setInputs({
            name: '',
            age: '',
            job: '',
        });
        nameInput.current.focus();
    };

    return (
        <div>
            <InputSample2 
                name={name}
                age={age}
                job={job}
                onChange={onChange}
                onReset={onReset}
                nameInput={nameInput}
                />
        </div>
    );
}

export default InputSample;