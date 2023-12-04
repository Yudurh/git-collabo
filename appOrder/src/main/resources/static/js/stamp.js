let stampCount = document.getElementById("stamp");
let count = Number(stampCount.innerHTML) % 10;
console.log(count);
let emptyCount = 10 - count;
console.log(emptyCount);

for (let i = 1; i <= count; i++) {
  addStamp();
}

for (let i = 1; i <= emptyCount; i++) {
  addEmpty();
}

function addStamp() {
  const mainContent = document.getElementById("main_content");
  const stamp = document.createElement("div");
  stamp.classList.add("stamp");

  // 이미지를 스탬프에 추가하는 부분을 수정해야 합니다.
  let stampShape = `<img src="./img/메가커피로고1.png" width="60px" height="60px" style="border-radius: 50%; margin: 5px" />`;
  stamp.innerHTML = stampShape;
  mainContent.appendChild(stamp);
}

function addEmpty() {
  const mainContent = document.getElementById("main_content");
  const empty = document.createElement("div");
  empty.classList.add("empty");

  let emptyShape = `<div
      clss="shape"
      style="width: 60px;
      height: 60px;
      background-color: darkgray;
      opacity: 0.7;
      border-radius: 50%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin:5px;"
      >빈</div>`;
  empty.innerHTML = emptyShape;

  mainContent.appendChild(empty);
}

// 메인 페이지로 이동
function back() {
  window.history.back();
}

function reload() {
  window.location.reload();
  console.log("새로고침");
}
