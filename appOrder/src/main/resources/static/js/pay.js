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
      alert("결제완료");
      setPoint();
    }) //실제 데이타
    .catch((error) => {
      console.log(error);
    });
}, 10000);
function setPoint() {
  let cartQuantity = document.getElementsByClassName("cartQuantity");
  let point = 0;
  for (let i = 0; i < cartQuantity.length; i++) {
    point += Number(cartQuantity[i].innerHTML.replace("개", ""));
  }
  value = {
    memberPoint: point,
  };
  fetch("/setPoint", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(value),
  })
    .then((response) => {
      console.log("response:" + response);
      return response.json();
    }) //HTTP 응답
    .then((json) => {
      //{ status: "ok", result: 5 }
      console.log("json:" + json);
    }) //실제 데이타
    .catch((error) => {
      console.log(error);
    });
}
function back() {
  window.history.back();
}
