// 3가지 hok 관련된 팁
// 1. 함수 컴포넌트, 커스텀 훅 내부에서만 호출 가능
// 2. 조건부(조건문, 반복문 안에서)로 호출될 수는 없다
// 3. 나만의 훅(Custom Hook) 직접 만들 수 있다.

import useInput from "../hooks/useInput";

const HookExam = () => {
  const [input, onChange] = useInput();
  const [input2, onChange2] = useInput();

  return (
    <div>
      <input value={input} onChange={onChange} />
      <input value={input2} onChange={onChange2} />
    </div>
  );
};

export default HookExam;
