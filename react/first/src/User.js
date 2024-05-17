function User({user, onRemove, onToggle}) {
    const {id, username, email, active} = user;

    return (
        <div>
            <b
                // style={{
                //     cursor: 'pointer',
                //     color: active ? 'green' : 'black'
                // }}

                onClick={() => onToggle(id)}
            >
            {id}. {username}</b>: {email}
            <button onClick={() => onRemove(id)}>삭제</button>
        </div>
    );
}

export default User;