import { useRef, useState } from "react";
import User from "./User";
import CreateUser from "./CreateUser";

function UserList() {
    const temp = [
        {
            id: 1,
            username: 'velopert',
            email: 'public.velopert@gmail.com',
            active: false
        },
        {
            id: 2,
            username: 'tester',
            email: 'tester@example.com',
            active: false
        },
        {
            id: 3,
            username: 'liz',
            email: 'liz@example.com',
            active: false
        },
        {
            id: 4,
            username: 'liz2',
            email: 'liz2@example.com',
            active: false
        }
    ];

    const [users, setUsers] = useState(temp);

    const [inputs, setInputs] = useState({
        username: '',
        email: ''
    });

    const {username, email} = inputs;
    const onChange = (e) => {
        const {name, value} = e.target
        setInputs({
            ...inputs,
            [name]: value
        })
    };

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
        console.log(users);

        setInputs({
            username: '',
            email: ''
        });
        nextId.current += 1;
    }

    const onToggle = id => {
        console.log(id);
        setInputs(users.map((val, i, arr) => {
            // console.log(val.id === id);
            // val.id === id ? {
            //     ...val,
            //     active: !val.active
            // } : val;
        }));
        console.log(users);
    }

    const onRemove = id => {
        console.log(id);
        setUsers(users.filter(user => user.id !== id));
        console.log(users);
        // setUsers(users.filter(user => user.id !== id))
        // const arr = [1, 2, 3, 4, 5];

        // console.log(arr.filter((val, i, ar) => {
        //     console.log(val, i, ar);
        //     return val < 3;
        // }));
        return;

        const newUsers = users.map((val, i, arr) => {
            return val.id === id ? {
                ...val,
                active: !val.active
            } : val;
        })
    }

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

                        // console.log(value.id + " : " + index + ": " + array);
                        return <User 
                                key={value.id}
                                user={value} 
                                onToggle={onToggle}
                                onRemove={onRemove}/>;
                    })
                }
            </div>
        </div>
    );
}

export default UserList;