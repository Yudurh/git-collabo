let cartPrice = document.getElementsByClassName("cartPrice");
let cartTotalPrice = document.getElementById("cartTotalPrice");
let totalPrice = 0;

for (let i = 0; i < cartPrice.length; i++) {
  totalPrice += Number(cartPrice[i].innerHTML);
}

console.log("상품 총 가격: " + totalPrice);
cartTotalPrice.innerHTML = Number(totalPrice) + "원";

function plus() {
  let cartQuantity = document.getElementsByClassName("cartQuantity");

  for (let i = 0; i < cartQuantity.length; i++) {
    IntCartQuantity = parseInt(cartQuantity.innerHTML);

    if (IntCartQuantity >= 1) {
      IntCartQuantity += 1;
      cartQuantity.innerHTML = IntCartQuantity;
    }
  }
}
