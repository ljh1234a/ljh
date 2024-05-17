function Order({order, onToggle, onRemove}) {
    const {id, giftName, countControl, giftCount, allowOrder, standardValue} = order;
    return (
        <div>
            <b onClick={() => onToggle(id)}></b>
            {/* <table>
                <tr>
                    <th>상품명</th>
                    <th>관리유무</th>
                    <th>재고 수량</th>
                    <th>주문허용</th>
                    <th>기준값</th>
                    <th>수정</th>
                    <th>삭제</th>
                </tr>
                <tr>
                    <td>{giftName}</td>
                    <td>{countControl}</td>
                    <td>{giftCount}</td>
                    <td>{allowOrder}</td>
                    <td>{standardValue}</td>
                    <td>수정</td>
                    <td><button onClick={() => onRemove(id)}>삭제</button></td>
                </tr>
            </table> */}
            
            {id}. {giftName}, {countControl}, {giftCount}, {allowOrder}, {standardValue}
            <button onClick={() => onRemove(id)}>삭제</button>
            
        </div>
    );
}

export default Order;