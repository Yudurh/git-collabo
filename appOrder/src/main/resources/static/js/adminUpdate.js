function memberUpdate() {
  let memberId = document.getElementById("inputMemberId").value;
  let memberPw = document.getElementById("inputMemberPw").value;
  let memberName = document.getElementById("inputMemberName").value;
  let memberRole = document.getElementById("inputMemberRole").value;
  let memberPoint = document.getElementById("inputMemberPoint").value;
  let memberNo = document.getElementById("memberNo").value;
  let memberJoinDatetime = document.getElementById("memberJoinDatetime").value;

  let params = {
    memberId: memberId,
    memberPw: memberPw,
    memberName: memberName,
    memberRole: memberRole,
    memberPoint: memberPoint,
    memberNo: memberNo,
    memberJoinDatetime: memberJoinDatetime,
  };
  console.log(JSON.stringify(params));

  fetch("/memberUpdateForm", {
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
        window.location.href = "/adminMemberList";
      } else {
        //회원 정보 수정 성공
        alert("회원 정보를 수정 실패했습니다.");
      }
    }) //실제 데이타
    .catch((error) => {
      console.log(error);
    });
}
