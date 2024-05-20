let todoList = document.getElementById("todoList"); // 리스트를 추가할 ul
let separate = document.getElementById("separate");

// 날짜와 시간을 보여주는 함수
function getTime() {
    let date = new Date();
    let option1 = {weekday:"long"}
    let option2 = {year: "numeric", month: "long"};
    let day = `<span id="day">${date.getDate()}</span>`
    let day2 = `${date.toLocaleDateString("en-EN", option1)}<br>
                <span id="day2">${date.toLocaleDateString("en-EN", option2)}</span>`;
    showDate.innerHTML = day + day2;
}

getTime();
setInterval(getTime, 1000); // 1초마다 시간이 갱신되게

let taskCount = 0; // 남은 일
let flag = 1;  // 리스트 수정중에 리스트 추가, 삭제 방지를 위한 flag

// 남은 일 카운트하는 함수
function displayCount() {
    countValue.innerHTML = taskCount;
}

// 리스트에 일이 추가되면 남은 일 +1, 완료 or 삭제되면 남은 일 -1
function taskPlus(n) {
    taskCount += n;
}

// 리스트 추가 함수
function addList() {
    if (flag === 0) { // flag = 0 => 수정중이라면 addList() 함수 실행 x
        todo.focus();
    } else { // flag != 0 => 수정중이 아니면 addList() 함수 실행 o
        if (todo.value === "") { // 입력창이 비어있다면
            alert("할 일을 입력해주세요");  // 경고창 띄우기
            todo.focus();
        } else { // 제대로 입력했으면
            let li = document.createElement("li");  // 리스트를 저장할 li
            li.innerHTML = todo.value; 
            let editBtn = document.createElement("button"); // 수정버튼
            let deleteBtn = document.createElement("span");  // 삭제버튼
    
            editBtn.title = "수정";
            editBtn.setAttribute("class", "editBtn far fa-edit")
    
            deleteBtn.title = "삭제";
            deleteBtn.setAttribute("class", "deleteBtn fa-solid fa-trash-can"); 
            
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);
            todo.value = ""; // 입력창 비우기
            
            taskPlus(1); // 리스트가 추가되면 남은 일 +1
            displayCount();
            saveList();
    
            todo.focus();
        }
    }
}

todoList.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") { // 삭제버튼, 수정버튼이 아닌 li가 클릭되면
        checkList(e); // 완료한 일 체크함수 실행
    } else if (e.target.tagName === "BUTTON") { // button(수정버튼)이 클릭되면
        editList(e); // 리스트 수정 함수 실행
    } else if (e.target.tagName === "SPAN") { // span(삭제버튼)이 클릭되면
        delOneList(e); // 리스트 삭제 함수 실행
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
    e.target.classList.toggle("checked"); // 체크되면 class 이름에 checked 추가

    if (e.target.className === "checked") { // 체크되었으면
        taskPlus(-1); // 남은 일 -1
        displayCount();

        if (all.style.backgroundColor === "white") {
            for (let i = 0; i < todoList.children.length; i++) {
                if (todoList.children[i].className === "checked") {
                    todoList.children[i].style.display = "none";
                } else {
                    todoList.children[i].style.display = "block";
                }
            }
        }
        
    } else { // 체크를 해제하면
        taskPlus(1); // 남은 일 + 1
        displayCount();
        
        if (all.style.backgroundColor === "white") {
            for (let i = 0; i < todoList.children.length; i++) {
                if (todoList.children[i].className === "checked") {
                    todoList.children[i].style.display = "block";
                } else {
                    todoList.children[i].style.display = "none";
                }
            }
        }
    }
    saveList();
}

// 리스트 삭제 함수
function delOneList(e) {
    if (flag === 0) { // flag = 0 => 수정중이라면 delOneList(e) 함수 실행 x
        todo.focus();
    } else if (flag !== 0) { // flag != 0 => 수정중이 아니면 delOneList(e) 함수 실행 o
        e.target.parentElement.remove(); // e.target.parentElement: 타겟의 부모 = li
    
        if (e.target.parentElement.className !== "checked") { // 체크된 상태가 아니면
            taskPlus(-1); // 남은 일 -1
            displayCount();
        } else { // 체크된 상태라면 남은 일 중복 삭제 방지를 위해 남은 일 -1 하지않음
            displayCount();
        }
        saveList();
    }
}

// 리스트 전체 삭제 함수
function delAllList() {
    if (flag === 0) { // flag = 0 => 수정중이라면 delAllList() 함수 실행 x
        todo.focus();
    } else if (flag !== 0) { // flag != 0 => 수정중이 아니면 delAllList() 함수 실행 o
        let yesDel = confirm("정말로 모든 리스트를 삭제하시겠습니까?", "");

        if (todoList.innerHTML == "") {    // 리스트가 비어있다면
            alert("삭제할 리스트가 없습니다."); // 경고창 띄우기
        } else if (yesDel) { // 확인 버틀을 누르면
            todoList.innerHTML = "";  // 리스트 비우기
            taskCount = 0; // 남은 일 0으로 초기화
            
            displayCount();
        }
        todo.value = "";
        todo.focus();
        saveList();
    }
}

// 리스트 수정 함수
function editList(e) {
    if (e.target.style.color === "white" || e.target.style.color === "") {
        e.target.style.color = "red"; // 수정 버튼을 누르면 버튼색을 빨간색으로 변경
        todo.placeholder = "수정중...";
        todo.value = "";
        todo.focus();
        flag = 0; // 수정중에 리스트 추가, 삭제 방지를 위해 flag값 변경
    } else {
        if (todo.value === "") { // 수정할 내용을 입력하지 않았으면
            alert("수정할 내용을 입력해주세요.") // 경고창 띄우기
            todo.focus();
        } else {
            e.target.parentElement.firstChild.data = todo.value;
            todo.value = "";
            todo.placeholder = "할 일을 입력하세요";
            e.target.style.color = "white"; // 수정이 끝나면 버튼색을 다시 하얀색으로 변경
            todo.focus();
            flag = 1; // 수정이 끝나면 리스트 추가, 삭제가 가능하게 flag값 변경
        }
    }
    saveList();
}



// 리스트 검색 함수
function searchList() {
    for (let i = 0; i < todoList.children.length; i++) {
        if (all.style.color === "white") { // 전체상태에서는
            if (todoList.children[i].childNodes[0].data.includes(search.value)) { 
                todoList.children[i].style.display = "block";
            }  else {
                todoList.children[i].style.display = "none";
            }
        } else if (active.style.color === "white") { // 미완상태에서는
            if (todoList.children[i].childNodes[0].data.includes(search.value) && todoList.children[i].className !== "checked") { 
                todoList.children[i].style.display = "block";
            }  else {
                todoList.children[i].style.display = "none";
            }
            
        } else if (complete.style.color === "white") { // 완료상태에서는
            if (todoList.children[i].childNodes[0].data.includes(search.value) && todoList.children[i].className === "checked") {
                todoList.children[i].style.display = "block";
            }  else {
                todoList.children[i].style.display = "none";
            }
        }
    }
    saveList();
}

// 필터 함수
function filterList(e) {
    if (e.target.id === "all") {   // 전체 버튼을 누르면
        for (let i = 0; i < todoList.children.length; i++) {
            if (todoList.children[i].childNodes[0].data.includes(search.value)) {
                todoList.children[i].style.display = "block"; // 리스트 전체 보이기
            } else {
                todoList.children[i].style.display = "none";
            }
        }
        all.style.background = "#34e89e";
        all.style.background = "-webkit-linear-gradient(to right, #0f3443, #34e89e)";
        all.style.background = "linear-gradient(to right, #0f3443, #34e89e)";
        all.style.color ="white";

        active.style.background = "white";
        active.style.color = "#34e89e";

        complete.style.background = "white";
        complete.style.color = "#34e89e";
        
    } else if (e.target.id === "active") { // 미완 버튼을 누르면 
        for (let i = 0; i < todoList.children.length; i++) {
            if (todoList.children[i].childNodes[0].data.includes(search.value)) {
                if (todoList.children[i].className === "checked") { // 완료된 일은
                    todoList.children[i].style.display = "none"; // 안보이게 함
                } else { // 완료되지 않은 일은
                    todoList.children[i].style.display = "block"; // 보이게 함
                }
            } else {
                todoList.children[i].style.display = "none"; // 안보이게 함
            }
        }
        all.style.background = "white";
        all.style.color = "#34e89e";
        active.style.background = "#34e89e";
        active.style.background = "-webkit-linear-gradient(to right, #0f3443, #34e89e)";
        active.style.background = "linear-gradient(to right, #0f3443, #34e89e)";
        active.style.color = "white";
        complete.style.background = "white";
        complete.style.color = "#34e89e";

    } else if (e.target.id === "complete") { // 완료 버튼을 누르면 
        for (let i = 0; i < todoList.children.length; i++) {
            if (todoList.children[i].childNodes[0].data.includes(search.value)) {
                if (todoList.children[i].className === "checked") { // 완료된 일은
                    todoList.children[i].style.display = "block";  // 보이게 함
                } else { // 완료되지 않은 일은
                    todoList.children[i].style.display = "none"; // 안보이게 함
                }
            } else {
                todoList.children[i].style.display = "none"; // 안보이게 함
            }
        }
        all.style.background = "white";
        all.style.color = "#34e89e";
        active.style.background = "white";
        active.style.color = "#34e89e";
        complete.style.background = "#34e89e";
        complete.style.background = "-webkit-linear-gradient(to right, #0f3443, #34e89e)";
        complete.style.background = "linear-gradient(to right, #0f3443, #34e89e)";
        complete.style.color = "white";
    }
    saveList();
}

separate.addEventListener("click", function(e) {
    filterList(e);
})

// 로컬 저장소 기억 함수
function saveList() {
    localStorage.setItem("list", JSON.stringify(todoList.innerHTML));;
    localStorage.setItem("taskCount", JSON.stringify(taskCount));
    localStorage.setItem("countValue", JSON.stringify(countValue.innerHTML));
    localStorage.setItem("separate", JSON.stringify(separate.innerHTML));
    localStorage.setItem("search", JSON.stringify(search.value));
}

function showList() {
    todoList.innerHTML = JSON.parse(localStorage.getItem("list"));
    taskCount = JSON.parse(localStorage.getItem("taskCount"));
    countValue.innerHTML = JSON.parse(localStorage.getItem("countValue"));
    separate.innerHTML = JSON.parse(localStorage.getItem("separate"));
    search.value = JSON.parse(localStorage.getItem("search"));
}

showList();







