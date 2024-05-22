import { useCallback, useMemo, useRef, useState } from "react";
import User from "./User";
import CreateUser from "./CreateUser";

function countActiveUsers(users) {
    console.log('활성 사용자 수를 세는 중...');
    return users.filter(user => user.active).length;
}

function UserList() {
    const temp = [
        {
            id: 1,
            username: 'velopert',
            email: 'public.velopert@gmail.com',
            active: true
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
            active: true
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

    const onChange = useCallback(e => {
        const {name, value} = e.target;
        setInputs(inputs => ({
            ...inputs,
            [name]: value
        }));
    }, []);

    const nextId = useRef(5);

    const onCreate = useCallback(() => {
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
    }, [users, username, email]);

    const onToggle = useCallback( 
        id => {
        // console.log(id);
            setUsers(user =>
                users.map(user => 
                    user.id === id ? {...user, active: !user.active} : user
            )
        );

        setInputs(users.map((val, i, arr) => {
            }));
            // console.log(users);
        }, []);

    const onRemove = useCallback(
        id => {
            // console.log(id);
            setUsers(users.filter(user => user.id !== id));
            // console.log(users);
        },[]);

    const count = useMemo(() => countActiveUsers(users), [users]);

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
                        return <User 
                                key={value.id}
                                user={value}
                                onToggle = {onToggle}
                                onRemove = {onRemove}
                                />;
                    })
                        
                }
            </div>
            <div>활성사용자 수: {count}</div>
        </div>
    );
}


export default UserList;