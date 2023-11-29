$(document).ready(function () {
  let cartPrice = document.getElementsByClassName("cartPrice");
  let pPrice = document.getElementById("pPrice");
  let dPrice = document.getElementById("dPrice");
  let total = document.getElementById("total");
  let totalValue = document.getElementById("totalValue");
  let orderNumber = Math.floor((Math.random() + 1) * 100);
  let orderCode = uuidv4();
  let orderTime = getKST();
  let price = 0;
  for (let i = 0; i < cartPrice.length; i++) {
    price += Number(cartPrice[i].innerHTML.replace("원", ""));
  }
  price = price - Number(dPrice.innerHTML.replace("원", ""));
  pPrice.innerHTML = price + "원";
  dPrice.innerHTML = 0 + "원";
  total.innerHTML = price + "원";
  totalValue.innerHTML = price;

  let itemCode = document.getElementsByName("itemCode");
  let itemCode1 = 0;
  let itemCode2 = 0;
  let itemCode3 = 0;
  let itemCode4 = 0;
  let itemCode5 = 0;

  console.log(itemCode[2].innerHTML);

  for (let i = 0; i < itemCode.length; i++) {
    console.log(itemCode[i]);
    if (i == 0) {
      itemCode1 = itemCode[i].innerHTML;
    } else if (i == 3) {
      itemCode4 = itemCode[i].innerHTML;
    } else if (i == 2) {
      itemCode3 = itemCode[i].innerHTML;
    } else if (i == 1) {
      itemCode2 = itemCode[i].innerHTML;
    } else if (i == 4) {
      itemCode5 = itemCode[i].innerHTML;
    }
  }
  console.log(itemCode1);

  $("#order").click(function () {
    let pay = $("input:radio[name=pay]:checked").val();

    let param = {
      orderNo: 0,
      orderCode: orderCode,
      cartItemCode1: itemCode1,
      cartItemCode2: itemCode2,
      cartItemCode3: itemCode3,
      cartItemCode4: itemCode4,
      cartItemCode5: itemCode5,
      orderTotalPrice: totalValue.innerHTML,
      orderTotalCount: itemCode.length,
      orderNumber: orderNumber,
      orderPayType: pay,
      orderDatetime: orderTime,
    };

    fetch("/setOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(param),
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
  });
});
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
function getKST() {
  // 1. 현재 시간(Locale)
  const curr = new Date();
  console.log("현재시간(Locale) : " + curr + "<br>"); // 현재시간(Locale) : Tue May 31 2022 09:00:30

  // 2. UTC 시간 계산
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;

  // 3. UTC to KST (UTC + 9시간)
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000; //한국 시간(KST)은 UTC시간보다 9시간 더 빠르므로 9시간을 밀리초 단위로 변환.
  const kr_curr = new Date(utc + KR_TIME_DIFF); //UTC 시간을 한국 시간으로 변환하기 위해 utc 밀리초 값에 9시간을 더함.

  console.log("한국시간 : " + kr_curr); // 한국시간 : Tue May 31 2022 09:00:30 GMT+0900 (한국 표준시)

  return kr_curr;
}
