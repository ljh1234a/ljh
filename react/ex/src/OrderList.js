import { useRef, useState } from "react";
import InputOrder from "./InputOrder";
import Order from "./Order";
import './Order.css'

function OrderList() {
    const temp = [
        {
            id: 1,
            giftName: '',
            countControl: 'false',
            giftCount: '0',
            allowOrder: 'true',
            standardValue: '0',
        }
    ];

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
        });
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

        setInputs({
            giftName: '',
            countControl: '',
            giftCount: '',
            allowOrder: '',
            standardValue: '',
        });
        nextId.current += 1;
    };

    
    
    const onToggle = (id) => {
        setInputs(orders.map((val, index, array) => {

        }));
    }

    const onRemove = (id) => {
        setOrders(orders.filter(order => order.id !== id));
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
                        return <Order 
                                key={value.id}
                                order={value} 
                                onToggle={onToggle}
                                onRemove={onRemove}
                                />;
                    })
                }
            
            </div>
        </div>
    );
}

export default OrderList;