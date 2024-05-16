let todoList = document.getElementById("todoList"); // 리스트를 추가할 ul

// 오늘 날짜 보이기
let day = new Date();
let options = {year: "numeric", month: "long", day: "numeric", weekday: "short"};
let today = day.toDateString("en-EN", options);
showDate.innerHTML = today;

let taskCount = 0;

function displayCount() {
    countValue.innerHTML = taskCount;
    saveList();
}

function taskPlus(n) {
    taskCount += n;
}

// 리스트 추가 함수
function addList() {
    if (todo.value === "") { // 입력창이 비어있다면
        alert("할 일을 입력해주세요");  // 경고창 띄우기
    } else {
        let li = document.createElement("li");  // 리스트를 저장할 li
        li.innerHTML = todo.value;
        let editBtn = document.createElement("button"); // 수정버튼
        let deleteBtn = document.createElement("span");  // 삭제버튼

        editBtn.setAttribute("class", "editBtn far fa-edit")
        deleteBtn.setAttribute("class", "deleteBtn fa-solid fa-trash-can"); 
        
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
        todo.value = ""; // 입력창 비우기
        
        taskPlus(1);
        displayCount();
        
        todo.focus();
    }
}


todoList.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") { // span(삭제버튼)이 아닌 li가 클릭되면
        checkList(e); // 완료한 일 체크함수 실행
    } else if (e.target.tagName === "SPAN") { // span(삭제버튼)이 클릭되면
        delOneList(e); // 리스트 삭제 함수 실행
    } else if (e.target.tagName === "BUTTON") { // button(수정버튼)이 클릭되면
        editList(e); // 리스트 수정 함수 실행
    }
}, false);

// 엔터로 리스트 추가 가능하게
function EnterList(event) {
    if (event.keyCode == "13") {
        addList();
    }
}

// 완료한 일 체크 함수
function checkList(e) {
    e.target.classList.toggle("checked");

    if (e.target.className === "checked") {
        taskPlus(-1);
        displayCount();
    } else {
        taskPlus(1);
        displayCount();
    }
}

// 리스트 삭제 함수
function delOneList(e) {
    e.target.parentElement.remove(); // e.target.parentElement: 타겟의 부모 = li
    
    console.log(e.target.parentElement.className);
    if (e.target.parentElement.className !== "checked") {
        taskPlus(-1);
        displayCount();
        
    } else {
        displayCount();
        
    }
}

// 리스트 모두 삭제 함수
function delAllList() {
    let yesDel = confirm("정말로 모든 리스트를 삭제하시겠습니까?", "");

    if (todoList.innerHTML == "") {    // 리스트가 비어있다면
        alert("삭제할 리스트가 없습니다.");
    } else if (yesDel) {
        todoList.innerHTML = "";  // 확인을 클릭하면 리스트 비우기
        taskCount = 0;
        
        displayCount();
    }
    todo.value = "";
    todo.focus();
}

// 리스트 수정 함수
function editList(e) {
    if (e.target.style.color === "black" || e.target.style.color === "") {
        e.target.style.color = "red";
        todo.value = e.target.parentElement.firstChild.data;
        todo.focus();
    } else {
        if (todo.value === "") {
            alert("수정할 내용을 입력해주세요.")
            todo.focus();
        } else {
            e.target.parentElement.firstChild.data = todo.value;
            todo.value = "";
            todo.placeholder = "할 일을 입력하세요";
            e.target.style.color = "black";
            todo.focus();
        }
    }
    saveList();
}

function saveList() {
    localStorage.setItem("list", JSON.stringify(todoList.innerHTML));;
    localStorage.setItem("count", JSON.stringify(countValue.innerHTML));
}

function showList() {
    todoList.innerHTML = JSON.parse(localStorage.getItem("list"));
    countValue.innerHTML = JSON.parse(localStorage.getItem("count"));
}

showList();







