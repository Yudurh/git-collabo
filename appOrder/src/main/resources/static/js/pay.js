$(document).ready(function () {
  let itemPrice = document.getElementsByName("itemPrice");
  let cartPrice = document.getElementById("cartPrice");
  let dPrice = document.getElementById("dprice");
});

setTimeout(function () {
  fetch("/delData", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  })
    .then((response) => {
      console.log("response:" + response);
      return response.json();
    }) //HTTP 응답
    .then((json) => {
      //{ status: "ok", result: 5 }
      console.log("json:" + json);
      alert("장바구니에 담겼습니다");
    }) //실제 데이타
    .catch((error) => {
      console.log(error);
    });
}, 10000);
