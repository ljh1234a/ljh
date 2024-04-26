let realWeight = 0; //실제 체중
let realHeight = 0; //실제 신장
let standardWeight = 0; //표준체중
let obesity = 0; //비만도
let bmi = "";
let str = "";

let bgStyle = "";
const arrBgColors = ["low", "normal", "big1", "big2"];
const arrBmiWords = ["저체중", "정상", "비만 1단계", "비만 2단계"];

realWeight = Number(prompt("실제 체중을 입력하세요. (단위 없이)"));
if (isNaN(realWeight)) { // 사용자가 문자를 넣었다면
    alert("체중 숫자만 입력해주세요.");
    location.reload();  // 새로고침
}
else {  // 사용자가 숫자만 제대로 넣었다면
    realHeight = Number(prompt("실제 신장을 입력하세요. (단위 없이)"));
    if (isNaN(realHeight)) {
        alert("신장 숫자만 입력해주세요.");
        location.reload();  // 새로고침
    }
    else {  // 사용자가 숫자만 제대로 넣었다면
        if (realHeight >= 160) {
            standardWeight = (realHeight - 100) * 0.9;
        }
        else if (realHeight >= 150) {
            standardWeight = (realHeight - 150) * 0.5 + 50;
        }
        else {
            standardWeight = realHeight - 100;
        }

        obesity = realWeight / ((realHeight * 0.01) ** 2);

        if (obesity < 18.5) {
            bmi = arrBmiWords[0];
            bgStyle = arrBgColors[0];
        }
        else if (obesity <= 24.9) {
            bmi = arrBmiWords[1];
            bgStyle = arrBgColors[1];
        }
        else if (obesity <= 29.9) {
            bmi = arrBmiWords[2];
            bgStyle = arrBgColors[2];
        }
        else {
            bmi = arrBmiWords[3];
            bgStyle = arrBgColors[3];
        }

        document.body.classList.remove(...arrBgColors);
        document.body.classList.add(bgStyle);

        str = `
            <p>당신의 체중은 <span>${realWeight}kg</span> 이고, 신장은 <span>${realHeight}cm</span> 입니다.</p>
            <p>당신의 키에 대한 표준 체중은 ${standardWeight}kg 이고, 비만도는 ${obesity.toFixed(2)} 이므로</p>
            <p>당신은 <span>${bmi}</span>입니다.</p>
        `;
        display.innerHTML = str;
    }
}