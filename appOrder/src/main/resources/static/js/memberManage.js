// 이전 페이지로 이동
function back() {
  window.location.href = "/memberSetting";
}

// 탈퇴 페이지로 이동
function withdrawal(){
  window.location.href = "/withdrawal";

}


// 모달창 기능 구현
function openModal() {
  let modal = document.getElementById("modal");
  modal.style.display = "flex";
}

// 모달 창 닫기 버튼 기능 구현
function closeModal() {
  let modal = document.getElementById("modal");
  modal.style.display = "none";
}

function changeModal() {
  let memberName = document.getElementById("newName").value;

  let params = {
    memberName: memberName,
  };
  console.log(JSON.stringify(params));

  fetch("/manageForm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  })
    .then((response) => {
      console.log("response:" + response);
      console.log("response:" + JSON.stringify(response));
      return response.json();
    }) //HTTP 응답
    .then((json) => {
      console.log("json:" + json);
      console.log("response:" + JSON.stringify(json));

      if (json.result == 1) {
        //회원 정보 수정 성공
        //다음페이지로 이동
        alert("회원 정보를 수정하였습니다.");
        window.location.href = "/memberManage";
      } else {
        //회원 정보 수정 성공
        alert("회원 정보를 수정 실패했습니다.");
      }
    }) //실제 데이타
    .catch((error) => {
      console.log(error);
    });
}
