function DisplayOrder({order, onToggle, onRemove}) {
    const {id, giftName, countControl, giftCount, allowOrder, standardValue} = order;


    return (
        <div>
            <b
                // style={{
                //     cursor: 'pointer',
                //     color: active ? 'green' : 'black'
                // }}

                onClick={() => onToggle(id)}
            ></b>
            상품명: <b>{giftName}</b>,
            재고 관리 여부: <b>{countControl}</b>,
            재고 수량: <b>{giftCount}</b>, 
            품절 후 주문 허용: <b>{allowOrder}</b>,
            기준값: <b>{standardValue}</b>
            <button onClick={() => onRemove(id)}>삭제</button>
        </div>
    );
}

export default DisplayOrder;