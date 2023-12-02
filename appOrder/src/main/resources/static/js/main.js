// < 페이지 이동 함수 >
// 메인 페이지 이동
function click_main() {
  let menu = document.getElementsByName("menu");

  menu[0].classList.remove("menu_height");
  menu[1].classList.remove("menu_height");
  menu[2].classList.remove("menu_height");

  menu[0].classList.add("menu_height");

  window.location.href = "/main";
}

// 주소 페이지 이동
function click_megaOrder() {
  let menu = document.getElementsByName("menu");

  menu[0].classList.remove("menu_height");
  menu[1].classList.remove("menu_height");
  menu[2].classList.remove("menu_height");

  menu[1].classList.add("menu_height");

  window.location.href = "/menu";
}

// 더보기 페이지 이동
function click_more() {
  let menu = document.getElementsByName("menu");

  menu[0].classList.remove("menu_height");
  menu[1].classList.remove("menu_height");
  menu[2].classList.remove("menu_height");

  menu[2].classList.add("menu_height");

  window.location.href = "/more";
}

// 쇼핑몰 아이콘 클릭시, 쇼핑몰 사이트로 이동
function click_icon() {
  let element = document.getElementById("icon");
  window.location.href = "https://www.megamgccoffee.co.kr/";
}

const images = ["./img/광고1.jpg", "./img/광고2_2.jpg"];

// 광고 반복 기능 구현
const changingImage = document.getElementById("changingImage");
let currentIndex = 0;

function changeImage() {
  changingImage.src = images[currentIndex];
  currentIndex = (currentIndex + 1) % images.length;
}

setInterval(changeImage, 2000);

// 모달창 기능 구현
function openModal(itemName, itemImageUrl, itemContent) {
// 아이템 이름, 이미지, 내용을 잘 가지고 오는지 확인
  console.log("정보: " + itemImageUrl + itemName + itemContent);
  const modal = document.createElement("div");
  modal.className = "modal";

  // 모달 html 설정
  const modalContent = `
    <div class="modal-content">
      <img src="${itemImageUrl}"  width="130px" style="margin: 10px;" />
      <div class="itemName">${itemName}</div>
      <div class="itemContent">${itemContent}</div>
      <div class="modal-btn">
        <button class="order">
          <img src="./img/whitecoffee.png" width="30px" style="margin-bottom: 5px" />
          주문하기
        </button>
        <button class="gift">
          <img src="./img/whitegift.png" width="30px" style="margin-bottom: 5px" />
          선물하기
        </button>
      </div>
      <div class="modal-footer" onclick="closeModal()">닫기</div>
    </div>
  `;

  modal.innerHTML = modalContent;

  // 모달 창을 body에 뿌리기
  document.body.appendChild(modal);
}

// 모달 창 닫기 버튼 기능 구현
function closeModal() {
  const modal = document.querySelector(".modal");
  document.body.removeChild(modal);
}
