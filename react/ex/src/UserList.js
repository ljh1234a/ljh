import { useRef, useState } from "react";
import User from "./User";
import CreateUser from "./CreateUser";

function UserList() {
    const temp = [
        {
            id: 1,
            username: 'velopert',
            email: 'public.velopert@gmail.com'
        },
        {
            id: 2,
            username: 'tester',
            email: 'tester@example.com'
        },
        {
            id: 3,
            username: 'liz',
            email: 'liz@example.com'
        },
        {
            id: 4,
            username: 'liz2',
            email: 'liz2@example.com'
        }
    ];

    const [users, setUsers] = useState(temp);

    const [inputs, setInputs] = useState({
        username: '',
        email: ''
    });
    const {username, email} = inputs;

    const onChange = (e) => {
        const {name, value} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const nextId = useRef(5);

    const onCreate = () => {
        const user = {
            id: nextId.current,
            username: username,
            email: email
        };

        setUsers([
            ...users,
            user
        ]);

        setInputs({
            username: '',
            email: ''
        });
        nextId.current += 1; 
    };

    return (
        <div>
            <CreateUser 
                username={username}
                email={email}
                onChange={onChange}
                onCreate={onCreate}
            />
            <div>
                {
                    users.map((value, index, array) => {
                        return <User user={value} key={value.id}/>;
                    })
                }
            </div>
        </div>
    );
}


export default UserList;