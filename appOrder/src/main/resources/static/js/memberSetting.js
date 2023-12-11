// 이전 페이지로 이동
function back() {
  window.location.href = "/more";
}

// 회원정보 관리 페이지로 이동
function memberManage() {
  window.location.href = "/memberManage";
}

// 모달창 기능 구현
function openModal() {
  let modal = document.getElementById("modal");
  modal.style.display = "flex";
}

// 모달 창 닫기 버튼 기능 구현
function closeModal(){
  let modal = document.getElementById("modal");
  modal.style.display = "none";
}


function logout() {
  fetch("/logout", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.result === 1) {
        // 로그아웃 성공
        alert("로그아웃되었습니다.");
        window.location.href = "/login"; // 로그아웃 후 리다이렉트할 경로 설정
      } else {
        // 로그아웃 실패
        alert("로그아웃에 실패했습니다.");
      }
    })
    .catch((error) => {
      console.error("Error during logout:", error);
    });
}
