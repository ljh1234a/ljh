import { useRef, useState } from "react";
import InputOrder from "./InputOrder";
import DisplayOrder from "./DisplayOrder";

function Order() {
    const temp = [
        {
            id: 1,
            giftName: "상품명",
            countControl: "재고 관리",
            giftCount: "재고 수량",
            allowOrder: "주문 허용",
            standardValue: 3
        }
    ]

    const [orders, setOrders] = useState(temp);
        
    const [inputs, setInputs] = useState({
        giftName: '',
        countControl: '',
        giftCount: '',
        allowOrder: '',
        standardValue: '',
    });

    

    const {giftName, countControl, giftCount, allowOrder, standardValue} = inputs;
    const onChange = (e) => {
        const {name, value} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    };

    const nextId = useRef(2);

    const onCreate = () => {
        const order = {
            id: nextId.current,
            giftName: giftName,
            countControl: countControl,
            giftCount: giftCount,
            allowOrder: allowOrder,
            standardValue: standardValue,
        };

        setOrders([
            ...orders,
            order
        ]);
        console.log(orders);

        setInputs({
            giftName:'',
            countControl:'',
            giftCount:'',
            allowOrder:'',
            standardValue:'',
        });
        nextId.current += 1;
    }

    const onToggle = id => {
        
        setInputs(orders.map((val, i, arr) => {
            // console.log(val.id === id);
            // val.id === id ? {
            //     ...val,
            //     active: !val.active
            // } : val;
        }));
        
    }

    const onRemove = id => {
        
        setOrders(orders.filter(order => order.id !== id));
        
        // setUsers(users.filter(user => user.id !== id))
        // const arr = [1, 2, 3, 4, 5];

        // console.log(arr.filter((val, i, ar) => {
        //     console.log(val, i, ar);
        //     return val < 3;
        // }));
        return;

        const newOrders = orders.map((val, i, arr) => {
            return val.id === id ? {
                ...val,
                // active: !val.active
            } : val;
        })
    }

    return (
        <div>
            <InputOrder 
                giftName={giftName}    
                countControl={countControl}
                giftCount={giftCount}
                allowOrder={allowOrder}
                standardValue={standardValue}
                onChange={onChange}
                onCreate={onCreate}
            />
            <div>
                {
                    orders.map((value, index, array) => {
                        return <DisplayOrder
                                    key={value.id}
                                    order={value}
                                    onToggle={onToggle}
                                    onRemove={onRemove}/>;
                    })
                }
            </div>
        </div>
    );
}

export default Order;