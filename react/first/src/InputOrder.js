import "./InputOrder.css"

function InputOrder({giftName, countControl, giftCount, allowOrder, standardValue, onChange, onCreate}) {
 
    return(
        <div>
            <div>
                <label>상품명</label>
                <input 
                    type="text" 
                    name="giftName" 
                    onChange={onChange} 
                    value={giftName}/>
            </div>
            <div>
                <label>본 상품의 재고를 관리합니까?</label>
                <input 
                    type="checkbox" 
                    name="countControl" 
                    checked
                    onChange={onChange} 
                    value={countControl}/>
                <span>상품 단위 수준에서 재고 관리</span>
            </div>
            <div>
                <label>재고 수량</label>
                <input 
                    type="number" 
                    name="giftCount" 
                    onChange={onChange} 
                    value={giftCount}/>
            </div>
            <div>
                <label>품절 후 주문을 허용합니까?</label>
                <select
                    name="allowOrder" 
                    onChange={onChange} 
                    value={allowOrder}
                    >
                        <option value="yes">허용함</option>
                        <option value="no">허용하지 않음</option>
                </select>
            </div>
            <div>
                <label>재고 소진 경고 기준값</label>
                <input 
                    type="text" 
                    name="standardValue" 
                    placeholder="스토어 전체 임계값(2)" 
                    onChange={onChange} 
                    value={standardValue}/>
            </div>
            <button onClick={onCreate}>등록</button>
        </div>
    );
}

export default InputOrder;