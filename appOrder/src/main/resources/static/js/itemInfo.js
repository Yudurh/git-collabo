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
  $("input:radio[name=optionName]").click(function () {
    let priceElement = document.getElementById("price");
    let priceValue = document.getElementById("priceValue").innerHTML;
    let quantity = document.getElementById("quantity");
    let totalPrice = document.getElementById("totalItemPrice");

    priceElement.innerHTML =
      (Number(priceValue) +
        Number($("input:radio[name=optionName]:checked").val())) *
        Number(quantity.innerHTML) +
      "원";

    totalPrice.innerHTML =
      (Number(priceValue) +
        Number($("input:radio[name=optionName]:checked").val())) *
        Number(quantity.innerHTML) +
      "원";
  });
});

//플러스 버튼 클릭시 가격변경
$(document).ready(function () {
  $(".plus").click(function () {
    let priceElement = document.getElementById("price");
    let priceValue = document.getElementById("priceValue").innerHTML;
    let quantity = document.getElementById("quantity");
    let totalPrice = document.getElementById("totalItemPrice");
    quantity.innerHTML = Number(quantity.innerHTML) + 1;

    if ($("input:radio[name=optionName]").is(":checked") == true) {
      priceElement.innerHTML =
        (Number(priceValue) +
          Number($("input:radio[name=optionName]:checked").val())) *
          Number(quantity.innerHTML) +
        "원";
      totalPrice.innerHTML =
        (Number(priceValue) +
          Number($("input:radio[name=optionName]:checked").val())) *
          Number(quantity.innerHTML) +
        "원";
    } else {
      priceElement.innerHTML =
        Number(priceValue) * Number(quantity.innerHTML) + "원";
      totalPrice.innerHTML =
        Number(priceValue) * Number(quantity.innerHTML) + "원";
    }
  });
});

// 마이너스 버튼 클릭시 가격변경

$(document).ready(function () {
  $(".minus").click(function () {
    let priceElement = document.getElementById("price");
    let priceValue = document.getElementById("priceValue").innerHTML;
    let quantity = document.getElementById("quantity");
    let totalPrice = document.getElementById("totalItemPrice");
    if (quantity.innerHTML > 1) {
      quantity.innerHTML = Number(quantity.innerHTML) - 1;
      if ($("input:radio[name=optionName]").is(":checked") == true) {
        priceElement.innerHTML =
          (Number(priceValue) +
            Number($("input:radio[name=optionName]:checked").val())) *
            Number(quantity.innerHTML) +
          "원";
        totalPrice.innerHTML =
          (Number(priceValue) +
            Number($("input:radio[name=optionName]:checked").val())) *
            Number(quantity.innerHTML) +
          "원";
      } else {
        priceElement.innerHTML =
          Number(priceValue) * Number(quantity.innerHTML) + "원";
        totalPrice.innerHTML =
          Number(priceValue) * Number(quantity.innerHTML) + "원";
      }
    }
  });
});

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
      totalPrice.innerHTML = Number(realPrice) + Number(recomValue) + "원";
    }
  });
});
