function User({user}) {
    const {id, username, email} = user;

    return (
        <div>
            <b>{id}. {username}: {email}</b>
        </div>
    );
};

export default User;