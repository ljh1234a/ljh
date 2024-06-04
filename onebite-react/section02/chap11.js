console.log(1);

// 비동기 작업은 Web APIs에서
setTimeout(() => {
  console.log(2);
}, 3000);

console.log(3);
