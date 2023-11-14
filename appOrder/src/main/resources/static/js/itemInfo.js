function plus() {
  let quantityElement = document.getElementById("quantity");
  let quantity = parseInt(quantityElement.innerHTML);
  let priceElement = document.getElementById("price");
  let price = parseInt(priceElement.innerHTML);

  console.log("Original quantity: " + quantity);
  console.log("Original price: " + price);

  if (quantity >= 1) {
    newQuantity = quantity + 1;
    newPrice = newQuantity * price;
    // 수량 표시
    document.getElementById("quantity").innerHTML = newQuantity;
    // 가격 표시
    document.getElementById("price").innerHTML = newPrice;
    console.log("Updated quantity: " + newQuantity);
    console.log("Updated price: " + newPrice);
  }
}

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
