// function plus() {
//   let quantityElement = document.getElementById("quantity");
//   let quantity = parseInt(quantityElement.innerHTML);
//   let priceElement = document.getElementById("price");
//   let price = parseInt(priceElement.innerHTML);
//   let optionPrice = document.getElementById("optionPrice").innerHTML;
//   let priceValue = document.getElementById("priceValue").innerHTML;
//   let optionName = document.getElementsByClassName("optionName");
//   console.log("Original quantity: " + quantity);
//   console.log("Original price: " + price);
//   console.log("Original price: " + optionPrice);
//   console.log("Original price: " + priceValue);

//   if (quantity >= 1) {
//     newQuantity = quantity + 1;

//     // 수량 표시
//     document.getElementById("quantity").innerHTML = newQuantity;
//     priceElement.innerText =
//       Number(priceElement.innerHTML) * Number(newQuantity);
//     console.log("quantity: " + newQuantity);
//   }
// }

function minus() {
  let quantityElement = document.getElementById("quantity");
  let quantity = parseInt(quantityElement.innerHTML);

  console.log("Original quantity: " + quantity);

  if (quantity > 1) {
    newQuantity = quantity - 1;
    document.getElementById("quantity").innerHTML = newQuantity;
    console.log("Updated quantity: " + newQuantity);
  }
}

//옵션 선택시 가격변경
$(document).ready(function () {
  let optionNameN = document.getElementsByName("optionNameN");
  let optionNameG = document.getElementsByName("optionNameG");
  let optionNameT = document.getElementsByName("optionNameT");
  if (optionNameN.length > 0) {
    $("input:radio[name=optionNameN]")[0].checked = true;
  }
  if (optionNameG.length > 0) {
    $("input:radio[name=optionNameG]")[0].checked = true;
  }
  if (optionNameT.length > 0) {
    $("input:radio[name=optionNameT]")[0].checked = true;
  }

  $(".optionName").click(function () {
    let priceElement = document.getElementById("price");
    let priceValue = document.getElementById("priceValue").innerHTML;
    let quantity = document.getElementById("quantity");
    let totalPrice = document.getElementById("totalItemPrice");

    if (optionNameN.length > 0 && optionNameG.length > 0) {
      priceElement.innerHTML =
        (Number(priceValue) +
          Number($("input:radio[name=optionNameN]:checked").val()) +
          Number($("input:radio[name=optionNameG]:checked").val())) *
          Number(quantity.innerHTML) +
        "원";

      if ($("#recomCh").is(":checked") == true) {
        totalPrice.innerHTML =
          (Number(priceValue) +
            Number($("input:radio[name=optionNameN]:checked").val()) +
            Number($("input:radio[name=optionNameG]:checked").val())) *
            Number(quantity.innerHTML) +
          Number($("#recomCh:checked").val()) +
          "원";
      } else {
        totalPrice.innerHTML =
          (Number(priceValue) +
            Number($("input:radio[name=optionNameN]:checked").val()) +
            Number($("input:radio[name=optionNameG]:checked").val())) *
            Number(quantity.innerHTML) +
          "원";
      }
    } else {
      priceElement.innerHTML =
        Number(priceValue) * Number(quantity.innerHTML) + "원";

      if ($("#recomCh").is(":checked") == true) {
        totalPrice.innerHTML =
          Number(priceValue) * Number(quantity.innerHTML) +
          Number($("#recomCh:checked").val()) +
          "원";
      } else {
        totalPrice.innerHTML =
          Number(priceValue) * Number(quantity.innerHTML) + "원";
      }
    }
  });
});

//플러스 버튼 클릭시 가격변경
$(document).ready(function () {
  let optionNameN = document.getElementsByName("optionNameN");
  let optionNameG = document.getElementsByName("optionNameG");
  let optionNameT = document.getElementsByName("optionNameT");
  $(".plus").click(function () {
    let priceElement = document.getElementById("price");
    let priceValue = document.getElementById("priceValue").innerHTML;
    let quantity = document.getElementById("quantity");
    let totalPrice = document.getElementById("totalItemPrice");
    quantity.innerHTML = Number(quantity.innerHTML) + 1;

    if (optionNameN.length > 0 && optionNameG.length > 0) {
      priceElement.innerHTML =
        (Number(priceValue) +
          Number($("input:radio[name=optionNameN]:checked").val()) +
          Number($("input:radio[name=optionNameG]:checked").val())) *
          Number(quantity.innerHTML) +
        "원";
      if ($("#recomCh").is(":checked") == true) {
        totalPrice.innerHTML =
          (Number(priceValue) +
            Number($("input:radio[name=optionNameN]:checked").val()) +
            Number($("input:radio[name=optionNameG]:checked").val())) *
            Number(quantity.innerHTML) +
          Number($("#recomCh:checked").val()) +
          "원";
      } else {
        totalPrice.innerHTML =
          (Number(priceValue) +
            Number($("input:radio[name=optionNameN]:checked").val()) +
            Number($("input:radio[name=optionNameG]:checked").val())) *
            Number(quantity.innerHTML) +
          "원";
      }
    } else {
      priceElement.innerHTML =
        Number(priceValue) * Number(quantity.innerHTML) + "원";
      if ($("#recomCh").is(":checked") == true) {
        totalPrice.innerHTML =
          Number(priceValue) * Number(quantity.innerHTML) +
          Number($("#recomCh:checked").val()) +
          "원";
      } else {
        totalPrice.innerHTML =
          Number(priceValue) * Number(quantity.innerHTML) + "원";
      }
    }
  });
});

// 마이너스 버튼 클릭시 가격변경

$(document).ready(function () {
  let optionNameN = document.getElementsByName("optionNameN");
  let optionNameG = document.getElementsByName("optionNameG");
  let optionNameT = document.getElementsByName("optionNameT");
  $(".minus").click(function () {
    let priceElement = document.getElementById("price");
    let priceValue = document.getElementById("priceValue").innerHTML;
    let quantity = document.getElementById("quantity");
    let totalPrice = document.getElementById("totalItemPrice");
    if (quantity.innerHTML > 1) {
      quantity.innerHTML = Number(quantity.innerHTML) - 1;

      if (optionNameN.length > 0 && optionNameG.length > 0) {
        priceElement.innerHTML =
          (Number(priceValue) +
            Number($("input:radio[name=optionNameN]:checked").val()) +
            Number($("input:radio[name=optionNameG]:checked").val())) *
            Number(quantity.innerHTML) +
          "원";
        if ($("#recomCh").is(":checked") == true) {
          totalPrice.innerHTML =
            (Number(priceValue) +
              Number($("input:radio[name=optionNameN]:checked").val()) +
              Number($("input:radio[name=optionNameG]:checked").val())) *
              Number(quantity.innerHTML) +
            Number($("#recomCh:checked").val()) +
            "원";
        } else {
          totalPrice.innerHTML =
            (Number(priceValue) +
              Number($("input:radio[name=optionNameN]:checked").val()) +
              Number($("input:radio[name=optionNameG]:checked").val())) *
              Number(quantity.innerHTML) +
            "원";
        }
      } else {
        priceElement.innerHTML =
          Number(priceValue) * Number(quantity.innerHTML) + "원";
        if ($("#recomCh").is(":checked") == true) {
          totalPrice.innerHTML =
            Number(priceValue) * Number(quantity.innerHTML) +
            Number($("#recomCh:checked").val()) +
            "원";
        } else {
          totalPrice.innerHTML =
            Number(priceValue) * Number(quantity.innerHTML) + "원";
        }
      }
    }
  });
});
//추천상품 디브박스클릭시 이벤트발생
$(document).ready(function () {
  $("#recomInfo").click(function () {
    let priceElement = document.getElementById("price");
    let priceValue = document.getElementById("priceValue").innerHTML;
    let quantity = document.getElementById("quantity");
    let totalPrice = document.getElementById("totalItemPrice");
    let recomValue = document.getElementById("recomCh").value;
    let realPrice = priceElement.innerHTML.replace("원", "");
    if ($("#recomCh").is(":checked") == true) {
      $("#recomCh").prop("checked", false);
      totalPrice.innerHTML = Number(realPrice) + "원";
    } else {
      $("#recomCh").prop("checked", true);
      totalPrice.innerHTML =
        Number(realPrice) + Number($("#recomCh:checked").val()) + "원";
    }
  });
});
//추천상품 체크박스 클릭시 이벤트
$(document).ready(function () {
  $("#recomCh").click(function () {
    let priceElement = document.getElementById("price");
    let priceValue = document.getElementById("priceValue").innerHTML;
    let quantity = document.getElementById("quantity");
    let totalPrice = document.getElementById("totalItemPrice");
    let realPrice = priceElement.innerHTML.replace("원", "");
    if ($("#recomCh").is(":checked") == true) {
      totalPrice.innerHTML =
        Number(realPrice) + Number($("#recomCh:checked").val()) + "원";
    } else {
      totalPrice.innerHTML = Number(realPrice) + "원";
    }
  });
});
//아이디 생성
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
//시간 만들기
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

//카트패치함수
$(document).ready(function () {
  $("#cartSet").click(function () {
    let cartCode1 = uuidv4();
    let itemCode = document.getElementById("itemCode").innerHTML;
    let itemName = document.getElementById("itemTitle").innerHTML;
    let optionName1 = $("input:radio[name=optionNameN]:checked").attr("id");
    let optionName2 = $("input:radio[name=optionNameG]:checked").attr("id");
    let optionName3 = $("input:radio[name=optionNameT]:checked").attr("id");
    let itemAmount = document.getElementById("quantity").innerHTML;
    let itemImg = document.getElementById("item_img").src;
    let cartPrice = document
      .getElementById("price")
      .innerHTML.replace("원", "");
    let cartDate = getKST();

    if ($("#recomCh").is(":checked") == true && itemName == "초코스모어쿠키") {
      itemAmount = Number(itemAmount) + 1;
      cartPrice = Number(cartPrice) + 2500;
    }

    let cart = {
      cartNo: 0,
      cartCode: cartCode1,
      itemCode: itemCode,
      itemName: itemName,
      optionName1: optionName1,
      optionName2: optionName2,
      optionName3: optionName3,
      cartItemAmount: itemAmount,
      itemImageUrl: itemImg,
      cartPrice: cartPrice,
      cartDate: cartDate,
    };

    fetch("/setCart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cart),
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

    setTimeout(function () {
      let recomItem = 0;
      if ($("#recomCh").is(":checked") == true) {
        recomItem = 1;
      }

      let param = {
        itemNo: 0,
        itemCode: 0,
        itemName: "ds",
        itemContent: "adqw",
        itemCate: "adad",
        itemRecommend: recomItem,
        itemPrice: 0,
        itemImageUrl: "asdd",
        itemUpdateDatetime: cartDate,
      };

      fetch("/setCartRecom", {
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
        }) //실제 데이타
        .catch((error) => {
          console.log(error);
        });
    }, 1);
  });
});

function goToCart() {
  window.location.href = "/cartInfo";
}
