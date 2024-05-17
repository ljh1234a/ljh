function InputSample2({name, age, job, nameInput, onChange, onReset}) {
    
    return (
        <div>
            <input name="name" placeholder="이름" onChange={onChange} value={name} ref={nameInput} />
            <input name="age" placeholder="나이" onChange={onChange} value={age} />
            <input name="job" placeholder="직업" onChange={onChange} value={job} />
            <button onClick={onReset}>초기화</button>
            <div>
                {name}({age}): {job}
            </div>
        </div>
    );
}

export default InputSample2;