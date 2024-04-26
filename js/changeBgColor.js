// function changeBgColor() {
//     let arrColorList = ['red', 'green', 'blue'];

//     // 초기화
//     this.init = function(target) {
//         // 요소 만드는 방법
//         // 1. 문자로 생성
//         // 2. 객체로 생성
//         if (!target) {
//             document.body.insertAdjacentHTML('afterbegin', '<button>색상변경</button>')
//         } else {
//             let btnColor = document.createElement('button');
//             btnColor.innerText = '색상변경';
//             btnColor.onclick = changeBackground;
//             document.body.insertAdjacentElement('afterbegin', btnColor);
//         }
//     }

//     function changeBackground() {
//         document.body.style.backgroundColor = arrColorList[0];
//     }
// }

function changeBgColor() {
    
    let pallet = ['red', 'orange', 'yellow', 'green', 'skyblue', 'blue', 'violet', 'white'];
    
    this.init = function(target) {
        if (!target) {
            document.body.insertAdjacentHTML('afterbegin', '<button>색상</button>');
        } else {

            for (let i = 0; i < pallet.length; i++) {
                
                let btnColor = document.createElement('button');
                btnColor.style.backgroundColor = pallet[i];
                const changeBackground = () => {
                    document.body.style.backgroundColor = pallet[i];
                };
                btnColor.onclick = changeBackground; 
                document.getElementById(target).insertAdjacentElement('beforeend', btnColor);
                
            }
            
        }
    }

    // function changeBackground(btnColor) {
        
    //     // let x = parseInt(Math.random() * pallet.length);
    //     // console.log(x);
        
    // }
}