function loginAction() {
  let memberId = document.getElementById("inputId").value;
  let memberPw = document.getElementById("inputPw").value;
  console.log("아이디 : " + memberId);
  console.log("비밀번호 : " + memberPw);

  let params = {
    loginId: memberId,
    loginPw: memberPw,
  };
  console.log(JSON.stringify(params));

  fetch("/loginAction", {
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
      //{ status: "ok", result: 5 }
      console.log("json:" + json);
      console.log("response:" + JSON.stringify(json));

   if( json.result == 2 ){
      //관리자페이지로 이동
      window.location.href = "/adminMemberList";
    }else if( json.result == 1 ){
        //로그인 성공
        //다음페이지로 이동
        window.location.href = "/main";
    }else{
        //로그인 실패
        alert('로그인 실패입니다.');
    }

    }) //실제 데이타
    .catch((error) => {
      console.log(error);
    });
}

function join() {
  window.location.href = "/join";
}