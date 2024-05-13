function Wrapper({children}) {
    const style = {
        border: '2px solid black',
        padding: '16px',
        textAlign: 'center',
        fontSize: '28px'
    };

    return (
        <div style={style}>
            {children}
        </div>
    )
}

export default Wrapper;