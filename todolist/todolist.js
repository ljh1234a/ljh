// let li = document.getElementsByTagName("li");
// let span = document.getElementsByTagName("span");

// 오늘 날짜 보이기
let day = new Date();
let options = {year: "numeric", month: "long", day: "numeric", weekday: "long"};
let today = day.toLocaleDateString("ko-KR", options);


showDate.innerHTML = today;
showDate.style.fontSize = "28px";
showDate.style.padding = "10px";
// showDate.style.background = "#6190E8";  /* fallback for old browsers */
// showDate.style.background = "-webkit-linear-gradient(to right, #A7BFE8, #6190E8)";  /* Chrome 10-25, Safari 5.1-6 */
// showDate.style.background = "linear-gradient(to right, #A7BFE8, #6190E8)"; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
showDate.style.color = "#fff";
// showDate.style.width = "40%";
showDate.style.margin = "30px auto";
// showDate.style.borderRadius = "50%";
showDate.style.fontWeight = "bold";

// let todo = document.getElementById("todo");
let displayList = document.getElementById("displayList");
let flag = 1;

// 리스트 추가 함수
function addList() {
    let checkBtn = document.createElement("button");    // 체크 버튼
    
    checkBtn.className = "checkBtn";  
    checkBtn.style.background = "#fff";
    checkBtn.style.width = "40px";
    checkBtn.style.height = "20px";
    checkBtn.style.marginRight = "10px";
    checkBtn.style.marginTop = "5px";
    // checkBtn.style.marginBottom = "10px";
    checkBtn.style.float = "left";
    checkBtn.style.border = "1px solid #aaa";
    checkBtn.style.borderRadius = "50%";
    checkBtn.style.color = "black";
    
    checkBtn.addEventListener("click", checkList);  // 체크 버튼이 클릭되면 checkList 함수 작동
    
    let li = document.createElement("li");
    let modifyBtn = document.createElement("button"); // 수정
    let deleteBtn = document.createElement("button");  // 삭제 버튼
    let todoValue = document.getElementById("todo").value;  // input의 입력 값
    // let todoInput = todo.value;
    // let text = document.createTextNode(todoInput);
    li.append(todoValue);
    li.append(checkBtn);
    li.append(deleteBtn);
    li.append(modifyBtn);
    
    modifyBtn.innerHTML = "수정";
    modifyBtn.style.float = "right";
    modifyBtn.style.padding = "5px";
    modifyBtn.style.marginRight = "5px";
    modifyBtn.addEventListener("click", modOneList);  // 수정버튼 클릭시 리스트 수정하기

    deleteBtn.innerHTML = "삭제";
    deleteBtn.style.float = "right";
    deleteBtn.style.padding = "5px";
    deleteBtn.addEventListener("click", delOneList);  // 삭제버튼 클릭시 리스트 지우기
    
    if (todoValue === "") { // 입력창이 비어있다면
        alert("할 일을 입력해주세요");  // 경고창 띄욱
    } else {
        // document.getElementById("list").appendChild(li);
        document.getElementById("displayList").appendChild(li);
    }
}

// 엔터로 리스트 추가되게 만들기
function EnterList(event) {
    if (event.keyCode == "13") {
        addList();
        todo.value = "";
    }
}

// 완료한 일 체크
function checkList(e) {
    let check = e.target.parentElement; // li
    let chkBtn = e.target;  // 체크 버튼
    
    // console.log(check);
    // console.log(chkBtn);

    flag = 0;

    if (flag == 1 || chkBtn.innerHTML == "") {
        check.style.backgroundColor = "#ddd";
        check.style.textDecoration = "line-through";
        check.style.opacity = "0.5";
        chkBtn.innerHTML = "✔";
        chkBtn.style.lineHeight = "5px";
        console.log(`전 flag: ${flag}`);
        flag = 0;
        console.log(`후 flag: ${flag}, 체크`);
    } else {
        check.style.backgroundColor = "#fff";
        check.style.textDecoration = "none";
        check.style.opacity = "1";
        chkBtn.innerHTML = "";
        console.log(`전 flag: ${flag}`);
        flag = 1;
        console.log(`flag: ${flag}, 체크 취소`);
    }
    
    console.log(flag);
        // for (let i = 0; i < checkBtn.length; i++) {
        //     if (checkBtn[i].onclick) {
        //         console.log("a");
        //     li[i].style.textDecoration = "line-through";
        //     li[i].style.opacity = "0.5";
        //     li[i].style.backgroundColor = "#ccc";
        //     }
            
        // }
        
    
}

function modOneList(e) {
    let modOne = e.target.parentElement;
    console.log(modOne);
    todo.focus();
    
}

// 리스트 1개 삭제
function delOneList(e) {
    let delOne = e.target.parentElement;
    delOne.remove();

    // let li = document.getElementsByTagName("li");
    // let span = document.getElementsByTagName("span");
    
    
    // for (let i = 0; i < span.length; i++) {
    //     span[i].onclick = function() {
    //         li[i].style.display = "none";
    //     }
        
    // }
}

// 리스트 모두 삭제
function delAllList() {
    let yesDel = confirm("정말로 모든 리스트를 삭제하시겠습니까?", "");

    if (displayList.innerHTML == "") {    // 리스트가 비어있다면
        alert("삭제할 리스트가 없습니다.");
    } else if (yesDel) {
        displayList.innerHTML = "";  // 확인을 클릭하면 리스트 비우기
    }
}

