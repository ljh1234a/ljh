function InputOrder({giftName, countControl, giftCount, allowOrder, standardValue, onChange, onCreate}) {
    const styleObj = {
        
        // bottom: "0",
        // left: "50%",
        transform: "translate(50%)"
    };

    const styleForm = {
        width: '80%',
        margin: '0 auto',
        border: '1px solid',
        position: 'relative'
    }
    
    return (
        <div>
            <div style={styleForm}>
                <div>
                    <label>상품명</label>
                    <input 
                        type="text"
                        name="giftName"
                        value={giftName}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <label>본 상품의 재고를 관리합니까?</label>
                    <input 
                        type="checkbox" 
                        name="countControl"
                        value={countControl}
                        onChange={onChange}
                    />
                    <span>상품 단위 수준에서 재고 관리</span>
                </div>
                <div>
                    <label>재고 수량</label>
                    <input 
                        type="number" 
                        name="giftCount"
                        value={giftCount}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <label>품절 후 주문을 허용합니까?</label>
                    <select 
                        name="allowOrder"
                        value={allowOrder}
                        onChange={onChange}
                        >
                            <option value="허용하지 않음">허용하지 않음</option>
                            <option value="허용함">허용함</option>
                    </select>
                </div>
                <div>
                    <label>재고 소진 경고 기준값</label>
                    <input 
                        type="text" 
                        name="standardValue"
                        value={standardValue}
                        onChange={onChange}
                        placeholder="스토어 전체 임계값(2)"/>
                </div>
                <div className="btn">
                    <button style={styleObj} onClick={onCreate}>등록</button>
                </div>
            </div>
        </div>
    );
}

export default InputOrder;