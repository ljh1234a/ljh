// Celsius : 섭씨 온도, Farhreheit : 화씨 온도
let Celsius = 0, Farhreheit = 0;
// let str = "";

Celsius = Number(prompt("섭씨 온도(°C)를 입력해주세요. (단위 없이 숫자만 입력)" ));

Farhreheit = (9 / 5) * Celsius + 32;

document.getElementById("degree").innerHTML = ("섭씨 온도 " + Celsius + "°C를 화씨 온도로 변환하면 " + Farhreheit + "°F 입니다.");

// str = `
//     <p>섭씨 ${Celsius}°C를 화씨로 변환하면 ${Farhreheit}°F 입니다.</p>
//     `;
//     degree.innerHTML = str;

