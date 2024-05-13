import Hello from "./Hello";

function App2() {
    const name = 'React';
    const style = {
        backgroundColor: 'black',
        color: 'aqua',
        fontSize: '32px',
        padding: '20px',
        textAlign: 'center',
        
    };
    return (
        <>
            <div style={style}>{name}</div>
        </>
        
    )
}

export default App2;