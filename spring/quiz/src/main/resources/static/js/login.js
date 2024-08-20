document.addEventListener("DOMContentLoaded", function() {
    const userIdInput = document.getElementById("userId");
    const rememberMeCheckbox = document.getElementById("rememberMe");

    // 페이지 로드 시 로컬 스토리지에서 아이디와 체크박스 상태를 불러오기
    const savedUserId = localStorage.getItem("savedUserId");
    const savedRememberMe = localStorage.getItem("savedRememberMe") === "true";

    if (savedUserId) {
        userIdInput.value = savedUserId;
        rememberMeCheckbox.checked = savedRememberMe;
    }

    // 폼 제출 시 체크박스 상태에 따라 로컬 스토리지에 저장
    document.getElementById("loginForm").addEventListener("submit", function() {
        if (rememberMeCheckbox.checked) {
            localStorage.setItem("savedUserId", userIdInput.value);
            localStorage.setItem("savedRememberMe", "true");
        } else {
            localStorage.removeItem("savedUserId");
            localStorage.removeItem("savedRememberMe");
        }
    });
});