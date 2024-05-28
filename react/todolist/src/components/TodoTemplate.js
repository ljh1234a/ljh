import styled from "styled-components";

const TodoTemplateBock = styled.div`
    width: 512px;
    height: 768px;
    
    position: relative;
    background: white;
    border-radius: 16px;

    margin: 90px auto;
    
`;

function TodoTemplate({children}) {
    return (
        <TodoTemplateBock>
            {children}
        </TodoTemplateBock>
    );
}

export default TodoTemplate;