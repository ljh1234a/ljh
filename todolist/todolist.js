// 오늘 날짜 보이기
let todoList = document.getElementById("todoList"); // ul
// const toDoForm = document.querySelector("#form");
// let toDoInput = toDoForm.querySelector("input");
let day = new Date();
let options = {year: "numeric", month: "long", day: "numeric", weekday: "long"};
let today = day.toLocaleDateString("kr-KR", options);

showDate.innerHTML = today;
showDate.style.fontSize = "24px";
showDate.style.padding = "10px";
// showDate.style.background = "#6190E8";  /* fallback for old browsers */
// showDate.style.background = "-webkit-linear-gradient(to right, #A7BFE8, #6190E8)";  /* Chrome 10-25, Safari 5.1-6 */
// showDate.style.background = "linear-gradient(to right, #A7BFE8, #6190E8)"; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
// showDate.style.color = "#fff";
// showDate.style.width = "40%";
showDate.style.margin = "10px auto";
// showDate.style.borderRadius = "50%";
showDate.style.fontWeight = "bold";

let flag = 1;

let undoList = 0; // 남은 일
let doList = 0;   // 한 일

leftTodo.innerHTML = `남은 일: ${undoList}개, 한 일: ${doList}개`;


// const ToDo_LocalStroage = "toDos";
// let toDos = [];


// let saveToDos = () => {
//     localStorage.setItem(ToDo_LocalStroage, JSON.stringify(toDos));
// }

// let loadToDos = () => {
//     const loadedToDos = localStorage.getItem(ToDo_LocalStroage);

//     if (loadedToDos !== null) {
//         const parsedToDos = JSON.parse(loadedToDos);
//         parsedToDos.forEach((toDo) => {
//             addList(toDo.text);
//         })
//     }
// }

// handleSubmit = (event) => {
//     event.preventDefault();
//     const currentValue = toDoInput.value;
//     (currentValue === ''? emptyToDo() : existToDo(currentValue))
// }

// let init = () => {
//     loadToDos();
//     toDoForm.addEventListener("submit", handleSubmit);
    
// }

// 리스트 추가 함수
function addList() {
    let checkBtn = document.createElement("button");    // 체크 버튼
    
    checkBtn.className = "checkBtn";  
    checkBtn.style.background = "#fff";
    checkBtn.style.width = "25px";
    checkBtn.style.height = "25px";
    checkBtn.style.marginRight = "10px";
    checkBtn.style.marginTop = "2px";
    checkBtn.style.float = "left";
    checkBtn.style.border = "1px solid #aaa";
    checkBtn.style.color = "black";
    
    checkBtn.addEventListener("click", checkList);  // 체크 버튼이 클릭되면 checkList 함수 작동
    
    let li = document.createElement("li");
    let deleteBtn = document.createElement("button");  // 삭제 버튼
    let todoValue = document.getElementById("todo").value;  // input의 입력 값

    li.append(todoValue);
    li.append(checkBtn);
    li.append(deleteBtn);

    deleteBtn.innerHTML = "삭제";
    deleteBtn.style.float = "right";
    deleteBtn.style.padding = "10px";
    deleteBtn.addEventListener("click", delOneList);  // 삭제버튼 클릭시 리스트 지우기
    
    if (todoValue === "") { // 입력창이 비어있다면
        alert("할 일을 입력해주세요");  // 경고창 띄욱
    } else {
        todoList.appendChild(li);
        undoList += 1;
        leftTodo.innerHTML = `남은 일: ${undoList}개, 한 일: ${doList}개`;
        // toDos.push(todoValue);
        // saveToDos();
    }

}

// 엔터로 리스트 추가되게 만들기
function EnterList(event) {
    if (event.keyCode == "13") {
        addList();
        document.getElementById("todo").value = "";
    }
}

// 완료한 일 체크
function checkList(e) {
    let check = e.target.parentElement; // li
    let chkBtn = e.target;  // 체크 버튼
    
    flag = 0;

    if (flag == 1 || chkBtn.innerHTML == "") {
        check.style.backgroundColor = "#bbb";
        check.style.textDecoration = "line-through";
        check.style.opacity = "0.5";
        chkBtn.innerText = "✔";
        chkBtn.style.lineHeight = "5px";
        console.log(`전 flag: ${flag}`);
        flag = 0;
        console.log(`후 flag: ${flag}, 체크`);
        doList += 1;
        leftTodo.innerHTML = `남은 일: ${undoList}개, 한 일: ${doList}개`;
    } else {
        check.style.backgroundColor = "#eee";
        check.style.textDecoration = "none";
        check.style.opacity = "1";
        chkBtn.innerHTML = "";
        console.log(`전 flag: ${flag}`);
        flag = 1;
        console.log(`flag: ${flag}, 체크 취소`);
        doList -= 1;
        leftTodo.innerHTML = `남은 일: ${undoList}개, 한 일: ${doList}개`;
    }
    
    console.log(flag);
}

// 리스트 삭제 함수
function delOneList(e) {
    // let delOne = e.target.parentElement;
    // delOne.remove();
    let li = e.target.parentNode;
    todoList.removeChild(li);



    undoList -= 1;
    
    leftTodo.innerHTML = `남은 일: ${undoList}개, 한 일: ${doList}개`;
}


// 리스트 모두 삭제
function delAllList() {
    let yesDel = confirm("정말로 모든 리스트를 삭제하시겠습니까?", "");

    if (todoList.innerHTML == "") {    // 리스트가 비어있다면
        alert("삭제할 리스트가 없습니다.");
    } else if (yesDel) {
        todoList.innerHTML = "";  // 확인을 클릭하면 리스트 비우기
        undoList = 0;
        leftTodo.innerHTML = `남은 일: ${undoList}개, 한 일: ${doList}개`;
    }
}





