let cartPrice = document.getElementsByClassName("cartPrice");
let cartTotalPrice = document.getElementById("cartTotalPrice");
let totalPrice = 0;

for (let i = 0; i < cartPrice.length; i++) {
  totalPrice += Number(cartPrice[i].innerHTML);
}

console.log("상품 총 가격: " + totalPrice);
cartTotalPrice.innerHTML = Number(totalPrice) + "원";

function plus(event) {
  let prices = document.getElementsByClassName("cartPrice");
  let quantities = document.getElementsByClassName("cartQuantity");
  let plusButtons = document.getElementsByClassName("plus");

  for (let i = 0; i < plusButtons.length; i++) {
    if (plusButtons[i] === event.target) {
      let cartQuantity = Number(quantities[i].innerHTML) + 1;
      let cartPrice =
        (Number(prices[i].innerHTML) / Number(quantities[i].innerHTML)) *
        cartQuantity;
      quantities[i].innerHTML = cartQuantity;
      prices[i].innerHTML = cartPrice;
      console.log("변경된 수량: " + cartQuantity);
      console.log("변경된 가격: " + cartPrice);
      console.log("기존 총 가격: " + totalPrice);
      // 최종수량 표시
      totalPrice +=
        Number(prices[i].innerHTML) / Number(quantities[i].innerHTML);
      cartTotalPrice.innerHTML = totalPrice + "원";
    }
  }
}

function minus(event) {
  let price = document.getElementsByClassName("cartPrice");
  let quantity = document.getElementsByClassName("cartQuantity");
  let minusButtons = document.getElementsByClassName("minus");

  for (let i = 0; i < minusButtons.length; i++) {
    if (minusButtons[i] === event.target) {
      let quantityValue = Number(quantity[i].innerHTML);
      if (quantityValue > 1) {
        let cartQuantity = quantityValue - 1;
        let cartPrice =
          (Number(price[i].innerHTML) / quantityValue) * cartQuantity;
        quantity[i].innerHTML = cartQuantity;
        price[i].innerHTML = cartPrice;
        // 최종수량 표시
        totalPrice -=
          Number(price[i].innerHTML) / Number(quantity[i].innerHTML);
        cartTotalPrice.innerHTML = totalPrice + "원";
        // 1 or 1보다 작을 때
        if (quantityValue <= 1) {
          cartQuantity = 1;
          cartPrice = Number(price[i].innerHTML) * cartQuantity;
          quantity[i].innerHTML = cartQuantity;
          price[i].innerHTML = cartPrice;

          cartTotalPrice.innerHTML = totalPrice + "원";
        }
      }
    }
  }
}
