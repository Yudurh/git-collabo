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