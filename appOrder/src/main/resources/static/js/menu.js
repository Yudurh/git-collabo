window.addEventListener("load", function () {
  fetch_itemlist();
});

let recommendItems = [];
let coffeeItems = [];
let dessertItems = [];
let drinksItems = [];
let arrayCart = [];

function fetch_itemlist() {
  fetch("/itemlistAll", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    //body: JSON.stringify({
    //  calType: "add",
    //}),
  })
    .then((response) => {
      //console.log("response:"+response);
      return response.json();
    }) //HTTP 응답
    .then((json) => {
      //{ status: "ok", result: 5 }
      //console.log("json:" + json);

      recommendItems = json.itemlistRecommand;
      coffeeItems = json.itemlistCoffee;
      dessertItems = json.itemlistDesert;
      drinksItems = json.itemlistDrink;

      console.log(recommendItems);
      onload_func();
    }) //실제 데이타
    .catch((error) => {
      console.log(error);
    });
}
function resetButtonStyles() {
  const buttons = document.querySelectorAll(".nav button");
  buttons.forEach((button) => {
    button.classList.remove("selected");
  });
}

function onload_func() {
  const recommendMenuButton = document.getElementById("recommendMenu");
  resetButtonStyles();
  recommendMenuButton.classList.add("selected");

  // 첫 화면 - 추천 메뉴
  const sectionContent = document.querySelector(".section");
  recommendMenuButton.click();

  // 추가 메뉴에서 사용하도록 저장
  localStorage.setItem("recommendItems", JSON.stringify(recommendItems));

  // 로컬 저장소 아이템 불러오기
  const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  arrayCart = savedCartItems;
}
let currentPage = 1;
const itemsPerPage = 9;

function getSelectedItems() {
  const selectedButton = document.querySelector(".nav button.selected");

  if (selectedButton.id === "coffee") {
    return coffeeItems;
  } else if (selectedButton.id === "recommendMenu") {
    return recommendItems;
  } else if (selectedButton.id === "dessert") {
    return dessertItems;
  } else if (selectedButton.id === "drinks") {
    return drinksItems;
  }
}

function updateContent(items) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);
  const sectionContent = document.querySelector(".section");
  sectionContent.innerHTML = "";

  const rmBoxContainer = document.createElement("div");
  rmBoxContainer.classList.add("rmBox_Container");

  paginatedItems.forEach((item) => {
    const itemHTML = `
        <button class="rmBox_inner" onclick="add('${item.itemCode}')">
          <img src="${item.itemImageUrl}" alt="${item.itemName}" />
          <span class="rmBox_title">${item.itemName}</span>
          <span class="rmBox_money">${item.itemPrice}원</span>
        </button>
      `;
    //    const itemHTML = `
    //      <button class="rmBox_inner" onclick="add('${item.id}')">
    //        <img src="${item.imageUrl}" alt="${item.title}" />
    //        <span class="rmBox_title">${item.title}</span>
    //        <span class="rmBox_money">${item.price}원</span>
    //      </button>
    //    `;
    rmBoxContainer.innerHTML += itemHTML;
  });

  sectionContent.appendChild(rmBoxContainer);
}
function updateCartItem(productIndex, newCount) {
  // 로컬 저장소 데이터 불러오기
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  for (const cart of cartItems) {
    //if (cart.id === productIndex) {
    if (cart.itemCode === productIndex) {
      //cart.count = newCount;
      cart.cartItemAmount = newCount;
      break;
    }
  }

  // 데이터 업데이트
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  // 화면 업데이트
  dispCart();
  updateCartSummary();
}

//이전, 다음 버튼 ( '<' 과 '>' )
document.getElementById("prevButton").addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage--;
    updateContent(getSelectedItems());
  }
});

document.getElementById("nextButton").addEventListener("click", function () {
  const totalPageCount = Math.ceil(burgerSetItems.length / itemsPerPage);
  if (currentPage < totalPageCount) {
    currentPage++;
    updateContent(getSelectedItems());
  }
});

document.getElementById("recommendMenu").addEventListener("click", function () {
  //  document.querySelector(".headerText").textContent = "추천 메뉴";
  const sectionContent = document.querySelector(".section");

  resetButtonStyles();
  this.classList.add("selected");

  currentPage = 1;
  updateContent(recommendItems);
});

//document.getElementById("burgerSet").addEventListener("click", function () {
//  document.querySelector(".headerText").textContent = "버거 & 세트";
//  const sectionContent = document.querySelector(".section");
//
//  resetButtonStyles();
//
//  this.classList.add("selected");
//
//  currentPage = 1;
//  updateContent(burgerSetItems);
//});

//document.getElementById("happyMeal").addEventListener("click", function () {
//  document.querySelector(".headerText").textContent = "해피밀";
//  const sectionContent = document.querySelector(".section");
//
//  resetButtonStyles();
//
//  this.classList.add("selected");
//
//  currentPage = 1;
//  updateContent(happyMealItems);
//});

document.getElementById("coffee").addEventListener("click", function () {
  //  document.querySelector(".headerText").textContent = "커피";
  const sectionContent = document.querySelector(".section");

  resetButtonStyles();

  this.classList.add("selected");

  currentPage = 1;
  updateContent(coffeeItems);
});

document.getElementById("dessert").addEventListener("click", function () {
  //  document.querySelector(".headerText").textContent = "디저트";
  const sectionContent = document.querySelector(".section");

  resetButtonStyles();

  this.classList.add("selected");

  currentPage = 1;
  updateContent(dessertItems);
});

document.getElementById("drinks").addEventListener("click", function () {
  //  document.querySelector(".headerText").textContent = "음료";
  const sectionContent = document.querySelector(".section");

  resetButtonStyles();

  this.classList.add("selected");

  currentPage = 1;
  updateContent(drinksItems);
});

// 버튼 스타일 초기화
function resetButtonStyles() {
  const buttons = document.querySelectorAll(".nav button");
  buttons.forEach((button) => {
    button.classList.remove("selected");
  });
}
