function toggleNoticeList() {
  var lists = document.querySelectorAll(".noticeList");

  lists.forEach(function (list) {
    if (list.style.display === "none") {
      list.style.display = "block";
    } else {
      list.style.display = "none";
    }
  });
}
// 멤버 리스트 페이지 이동
function click_member() {
  let menu_member = document.getElementById("menu_member");
  let menu_item = document.getElementById("menu_item");
  let menu_order = document.getElementById("menu_order");
  let menu_event = document.getElementById("menu_event");
  let menu_notice = document.getElementById("menu_notice");

  menu_member.classList.remove("menu_height");
  menu_item.classList.remove("menu_height");
  menu_order.classList.remove("menu_height");
  menu_event.classList.remove("menu_height");
  menu_notice.classList.remove("menu_height");

  menu_member.classList.add("menu_height");

  window.location.href = "/adminMemberList";
}
// 상품 리스트 페이지 이동
function click_item() {
  let menu_member = document.getElementById("menu_member");
  let menu_item = document.getElementById("menu_item");
  let menu_order = document.getElementById("menu_order");
  let menu_event = document.getElementById("menu_event");
  let menu_notice = document.getElementById("menu_notice");

  menu_member.classList.remove("menu_height");
  menu_item.classList.remove("menu_height");
  menu_order.classList.remove("menu_height");
  menu_event.classList.remove("menu_height");
  menu_notice.classList.remove("menu_height");

  menu_item.classList.add("menu_height");

  window.location.href = "/adminItemList";
}
// 주문 리스트 페이지 이동
function click_order() {
  let menu_member = document.getElementById("menu_member");
  let menu_item = document.getElementById("menu_item");
  let menu_order = document.getElementById("menu_order");
  let menu_event = document.getElementById("menu_event");
  let menu_notice = document.getElementById("menu_notice");

  menu_member.classList.remove("menu_height");
  menu_item.classList.remove("menu_height");
  menu_order.classList.remove("menu_height");
  menu_event.classList.remove("menu_height");
  menu_notice.classList.remove("menu_height");

  menu_order.classList.add("menu_height");

  window.location.href = "/adminOrderList";
}
// 이벤트 페이지 이동
function click_order() {
  let menu_member = document.getElementById("menu_member");
  let menu_item = document.getElementById("menu_item");
  let menu_order = document.getElementById("menu_order");
  let menu_event = document.getElementById("menu_event");
  let menu_notice = document.getElementById("menu_notice");

  menu_member.classList.remove("menu_height");
  menu_item.classList.remove("menu_height");
  menu_order.classList.remove("menu_height");
  menu_event.classList.remove("menu_height");
  menu_notice.classList.remove("menu_height");

  menu_event.classList.add("menu_height");

  window.location.href = "/adminEventList";
}
// 공지사항 페이지 이동
function click_order() {
  let menu_member = document.getElementById("menu_member");
  let menu_item = document.getElementById("menu_item");
  let menu_order = document.getElementById("menu_order");
  let menu_event = document.getElementById("menu_event");
  let menu_notice = document.getElementById("menu_notice");

  menu_member.classList.remove("menu_height");
  menu_item.classList.remove("menu_height");
  menu_order.classList.remove("menu_height");
  menu_event.classList.remove("menu_height");
  menu_notice.classList.remove("menu_height");

  menu_notice.classList.add("menu_height");

  window.location.href = "/adminNoticeList";
}
