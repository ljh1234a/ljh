let todoList = document.getElementById("todoList"); // 리스트를 추가할 ul

// 오늘 날짜 보이기
let day = new Date();
let options = {year: "numeric", month: "long", day: "numeric", weekday: "short"};
let today = day.toDateString("en-EN", options);
showDate.innerHTML = today;

// 플래그
let flag = 1;

// 완료한 일 카운트
let comp = 0;
leftTodo.innerHTML = `남은 일: ${todoList.children.length}개 / 완료한 일: ${comp}개`;



// 완료한 일 계산 함수
function compCal(n) {
    return comp += n;
}

// 리스트 추가 함수
function addList() {
    let checkBtn = document.createElement("button");    // 체크 버튼
    checkBtn.className = "checkBtn";  
    checkBtn.addEventListener("click", checkList);  // 체크 버튼이 클릭되면 checkList 함수 작동
    
    let li = document.createElement("li");  // 리스트를 저장할 li

    let deleteBtn = document.createElement("button");  // 삭제 버튼
    let todoValue = document.getElementById("todo").value;  // input의 입력 값

    li.append(todoValue);
    li.append(checkBtn);
    li.append(deleteBtn);
    
    deleteBtn.setAttribute("class", "trash deleteBtn fa-solid fa-trash-can");
    deleteBtn.addEventListener("click", delOneList);  // 삭제버튼 클릭시 리스트 지우기
    
    if (todoValue === "") { // 입력창이 비어있다면
        alert("할 일을 입력해주세요");  // 경고창 띄욱
    } else {
        todoList.appendChild(li);
        document.getElementById("todo").value = "";

        leftTodo.innerHTML = `남은 일: ${todoList.children.length}개 / 완료한 일: ${comp}개`;
    }
    todo.focus();
    // console.log(li.innerText);

    
}

// 엔터로 리스트 추가 가능하게
function EnterList(event) {
    if (event.keyCode == "13") {
        addList();
    }
}


// 완료한 일 체크 함수
function checkList(e) {
    let check = e.target.parentElement; // li
    let chkBtn = e.target;  // 체크 버튼
    // let left = todoList.children.length - comp;
    flag = 0;

    if (flag == 1 || chkBtn.innerHTML == "") {
        check.style.backgroundColor = "#bbb";
        check.style.textDecoration = "line-through";
        check.style.opacity = "0.5";
        chkBtn.innerHTML = "✔";
        chkBtn.style.lineHeight = "5px";
        flag = 0;
        
        compCal(1); // comp + 1
        
        leftTodo.innerHTML = `남은 일: ${todoList.children.length}개 / 완료한 일: ${comp}개`;
        // console.log(`comp: ${comp}, left: ${left}`);
        
    } else {
        check.style.backgroundColor = "#eee";
        check.style.textDecoration = "none";
        check.style.opacity = "1";
        chkBtn.innerHTML = "";
        flag = 1;

        compCal(-1); // comp - 1

        leftTodo.innerHTML = `남은 일: ${todoList.children.length}개 / 완료한 일: ${comp}개`;
        // console.log(`comp: ${comp}, left: ${left}`);
    }
}

// 리스트 삭제 함수
function delOneList(e) {
    let li = e.target.parentNode;
    todoList.removeChild(li);

    leftTodo.innerHTML = `남은 일: ${todoList.children.length}개 / 완료한 일: ${comp}개`
    
}

// 리스트 모두 삭제 함수
function delAllList() {
    let yesDel = confirm("정말로 모든 리스트를 삭제하시겠습니까?", "");

    if (todoList.innerHTML == "") {    // 리스트가 비어있다면
        alert("삭제할 리스트가 없습니다.");
    } else if (yesDel) {
        todoList.innerHTML = "";  // 확인을 클릭하면 리스트 비우기
        leftTodo.innerHTML = `남은 일: ${todoList.children.length - todoList.children.length}개, 완료한 일: ${comp}개`
    }
}





