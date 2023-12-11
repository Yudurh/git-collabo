$(document).ready(function () {
  $(".icon1").show();
  $(".icon2").hide();
});

function icon2Change() {
  $(".icon1").click(function () {
    $(".icon1").hide();
    $(".icon2").show();
  });
}

function icon1Change() {
  $(".icon2").click(function () {
    $(".icon1").show();
    $(".icon2").hide();
  });
}

//모달창 기능 구현
function openModal() {
  const modal = document.createElement("div");
  modal.className = "modal";

  // 모달 html 설정
  const modalContent = `
      <div class="modal_content">
        <div class="modal_main">
          <div class="modal_title">'의정부역점'에서 주문하시겠습니까?</div>
          <div id="map" style="width: 300px; height: 200px"></div>
        <div class="text">주문 확인 후 취소가 불가합니다.</div>
       </div>
        <div class="modal_footer">
          <div class="back" onclick="closeModal()">취소</div>
          <div class="order" onclick="menu()">주문하기</div>
        </div>
      </div>`;

  modal.innerHTML = modalContent;

  $(document).ready(function () {
    // 지도 api
    var mapContainer = document.getElementById("map"); // 지도를 표시할 div
    var mapOption = {
      center: new kakao.maps.LatLng(37.73587, 127.043654), // 지도의 중심좌표
      level: 1, // 지도의 확대 레벨
    };

    // 지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 마커 이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(
      "./img/marker.png",
      new kakao.maps.Size(30, 40),
      { offset: new kakao.maps.Point(15, 30) }
    );

    // 마커의 좌표를 설정합니다
    var markerPosition = new kakao.maps.LatLng(37.738574, 127.043625);

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    // 마커를 지도에 표시합니다
    marker.setMap(map);

    // 지도의 중심을 마커의 위치로 이동시킵니다
    map.setCenter(markerPosition);
  });

  // 모달 창을 body에 뿌리기
  document.body.appendChild(modal);
}
function closeModal() {
  const modal = document.querySelector(".modal");
  document.body.removeChild(modal);
}

function menu() {
  let key = document.getElementById("key").innerHTML;

  if (key == "") {
    window.location.href = "/menu";
  } else {
    window.location.href = "/itemInfo?itemName=" + key;
  }
}

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

  window.location.href = "/store";
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
