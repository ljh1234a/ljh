import styled from "styled-components";

const TodoHeadBlock = styled.div`
    padding: 32px 24px 24px 24px;
    border-bottom :1px solid #ccc;
    h1 {
        margin: 0;
        font-size: 32px;
    }
    .day {
        font-size: 20px;
        color: #aaa;
        margin-top: 10px;
    }
    .tasks-left {
        font-size: 18px;
        font-weight: bold;
        margin-top: 30px;
        color: #20c997;
    }
`;

function TodoHead() {
    const option = {year: 'numeric', month: 'long', day: 'numeric'}
    const option2 = {weekday: 'long'};
    const date = new Date().toLocaleDateString('ko-KR', option);
    const week = new Date().toLocaleDateString('ko-KR', option2);

    return (
        <TodoHeadBlock>
            <h1>{date}</h1>
            <div className="day">{week}</div>
            <div className="tasks-left">할 일 2개 남음</div>
        </TodoHeadBlock>
    );
}

export default TodoHead;
