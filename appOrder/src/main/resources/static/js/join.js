function joinAction() {
  let idValue = document.getElementById("inputId").value;
  let pwValue = document.getElementById("inputPw").value;
  let nameValue = document.getElementById("inputName").value;

  let params = {
    loginId: idValue,
    loginPw: pwValue,
    loginName: nameValue,
  };
  console.log(JSON.stringify(params));

  fetch("/joinAction", {
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

      if (json.result == 1) {
        //회원가입 성공
        //다음페이지로 이동
        alert("회원가입 성공했습니다.");
        window.location.href = "/login";
      } else {
        //회원가입 실패
        alert("회원가입 실패했습니다.");
      }
    }) //실제 데이타
    .catch((error) => {
      console.log(error);
    });
}
