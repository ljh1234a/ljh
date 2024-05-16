let todoList = document.getElementById("todoList"); // 리스트를 추가할 ul

// 오늘 날짜 보이기
let day = new Date();
let options = {year: "numeric", month: "long", day: "numeric", weekday: "short"};
let today = day.toDateString("en-EN", options);
showDate.innerHTML = today;

let taskCount = 0;
// countValue.innerHTML = taskCount;
// displayCount();

function displayCount() {
    countValue.innerHTML = taskCount;
    saveList();
}

function taskPlus(n) {
    taskCount += n;
}

// 리스트 추가 함수
function addList() {
    let todoValue = document.getElementById("todo").value;  // input의 입력 값

    if (todoValue === "") { // 입력창이 비어있다면
        alert("할 일을 입력해주세요");  // 경고창 띄욱
    } else {
        let li = document.createElement("li");  // 리스트를 저장할 li
        li.innerHTML = todoValue;
        let edit = document.createElement("button"); // 수정버튼
        let span = document.createElement("span");  // 삭제버튼
        span.setAttribute("class", "trash deleteBtn fa-solid fa-trash-can"); // 삭제버튼에 휴지통 이미지 추가

        edit.className = "editBtn";
        edit.innerHTML = "수정";
        li.appendChild(edit);
        li.appendChild(span);
        todoList.appendChild(li);
        document.getElementById("todo").value = ""; // 입력창 비우기
        
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
    } else if (e.target.className === "editBtn") {
        editList(e);
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
        todoList.innerHTML = "";  // 확인을 클릭하면 리스트 비우기/
        taskCount = 0;
        displayCount();
        
    }
}

function editList(e) {
    if (e.target.innerHTML === "수정") {
        e.target.innerHTML = "완료";
        todo.focus();
    } else {
        // console.log(todo.value);
        console.log(e.target.parentElement);
        todo.value = "";
        e.target.innerHTML = "수정";
    }
}

function saveList() {
    localStorage.setItem("list", JSON.stringify(todoList.innerHTML));;
    localStorage.setItem("count", JSON.stringify(countValue.innerHTML));
    // localStorage.setItem("count", JSON.stringify(taskCount));
}

function showList() {
    todoList.innerHTML = JSON.parse(localStorage.getItem("list"));
    countValue.innerHTML = JSON.parse(localStorage.getItem("count"));
    // taskCount = JSON.parse(localStorage.getItem("count"));
}

showList();







