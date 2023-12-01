// 더보기 기능
$(function () {
  // 처음 화면에 보여질 갯수
  $(".contentBox").slice(0, 5).show();
  $("#load").click(function (e) {
    // preventDefault() : a의 링크 이동 or submit 기능을 하지 못하게 함
    e.preventDefault();
    // 클릭시 더 보여질 갯수 지정
    $(".contentBox:hidden").slice(0, 1).show();
    if ($(".contentBox:hidden").length == 0) {
      alert("더 이상 표시할 글이 없습니다.");
    }
  });
});

// 이벤트 페이지 이동
function newsEvent() {
  let news_event = document.getElementById("news_event");
  let news_notice = document.getElementById("news_notice");

  news_event.classList.remove("menu_height");
  news_notice.classList.remove("menu_height");

  news_event.classList.add("menu_height");

  window.location.href = "/newsEvent";
}

// 공지사항 페이지 이동
function newsNotice() {
  let news_event = document.getElementById("news_event");
  let news_notice = document.getElementById("news_notice");

  news_event.classList.remove("menu_height");
  news_notice.classList.remove("menu_height");

  news_notice.classList.add("menu_height");

  window.location.href = "/newsNotice";
}

function back() {
  window.history.back();
}
