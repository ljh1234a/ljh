const promise = new Promise(() => {
  // 비동기 작업 실행하는 함수
  // executor

  setTimeout(() => {
    console.log("안녕");
  }, 2000);
});

console.log(promise);
