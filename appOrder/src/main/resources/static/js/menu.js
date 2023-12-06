window.addEventListener("load", function () {
  fetch_itemlist();
});

let recommendItems = [];
let coffeeItemsH = [];
let coffeeItemsI = [];
let SFItems = [];
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
      coffeeItemsH = json.itemlistCoffeeH;
      coffeeItemsI = json.itemlistCoffeeI;
      SFItems = json.itemlistSF;
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

  acountBox();
  // 추가 메뉴에서 사용하도록 저장
  // localStorage.setItem("recommendItems", JSON.stringify(recommendItems));

  // // 로컬 저장소 아이템 불러오기
  // const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  // arrayCart = savedCartItems;
}
let currentPage = 1;
const itemsPerPage = 9;

function getSelectedItems() {
  const selectedButton = document.querySelector(".nav button.selected");

  if (selectedButton.id === "coffeeH") {
    return coffeeItemsH;
  } else if (selectedButton.id === "recommendMenu") {
    return recommendItems;
  } else if (selectedButton.id === "dessert") {
    return dessertItems;
  } else if (selectedButton.id === "drinks") {
    return drinksItems;
  } else if (selectedButton.id === "SF") {
    return SFItems;
  } else if (selectedButton.id === "coffeeI") {
    return coffeeItemsI;
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
        <button class="rmBox_inner" onclick="func_item_update('${item.itemName}')">
          <img src="${item.itemImageUrl}" alt="${item.itemName}" />
          <div class="rmBox_text"><span class="rmBox_title">${item.itemName}</span>
         <span class="rmBox_money">${item.itemPrice}원</span></div>
        </button>
      `;
    rmBoxContainer.innerHTML += itemHTML;
  });

  sectionContent.appendChild(rmBoxContainer);
}
function updateCartItem(productIndex, newCount) {
  // 로컬 저장소 데이터 불러오기
  // const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  for (const cart of cartItems) {
    //if (cart.id === productIndex) {
    if (cart.itemCode === productIndex) {
      //cart.count = newCount;
      cart.cartItemAmount = newCount;
      break;
    }
  }

  // 데이터 업데이트
  // localStorage.setItem("cartItems", JSON.stringify(cartItems));

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
  acountBox();
});

document.getElementById("coffeeH").addEventListener("click", function () {
  //  document.querySelector(".headerText").textContent = "커피";
  const sectionContent = document.querySelector(".section");

  resetButtonStyles();

  this.classList.add("selected");

  currentPage = 1;
  updateContent(coffeeItemsH);
  acountBox();
});

document.getElementById("coffeeI").addEventListener("click", function () {
  //  document.querySelector(".headerText").textContent = "커피";
  const sectionContent = document.querySelector(".section");

  resetButtonStyles();

  this.classList.add("selected");

  currentPage = 1;
  updateContent(coffeeItemsI);
  acountBox();
});

document.getElementById("dessert").addEventListener("click", function () {
  //  document.querySelector(".headerText").textContent = "디저트";
  const sectionContent = document.querySelector(".section");

  resetButtonStyles();

  this.classList.add("selected");

  currentPage = 1;
  updateContent(dessertItems);
  acountBox();
});

document.getElementById("drinks").addEventListener("click", function () {
  //  document.querySelector(".headerText").textContent = "음료";
  const sectionContent = document.querySelector(".section");

  resetButtonStyles();

  this.classList.add("selected");

  currentPage = 1;
  updateContent(drinksItems);
  acountBox();
});

document.getElementById("SF").addEventListener("click", function () {
  //  document.querySelector(".headerText").textContent = "음료";
  const sectionContent = document.querySelector(".section");

  resetButtonStyles();

  this.classList.add("selected");

  currentPage = 1;
  updateContent(SFItems);
  acountBox();
});

// 버튼 스타일 초기화
function resetButtonStyles() {
  const buttons = document.querySelectorAll(".nav button");
  buttons.forEach((button) => {
    button.classList.remove("selected");
  });
}
// 요소, 사이즈
const nav = document.querySelector(".nav");
const navScrollWidth = nav.scrollWidth;
const navClientWidth = nav.clientWidth;
// 이벤트마다 갱신될 값
let startX = 0;
let nowX = 0;
let endX = 0;
let navX = 0;
//이벤트 핸들러 선언

//스크롤 시작 이벤트
const onScrollStart = (e) => {
  startX = getClientX(e);
  window.addEventListener("mousemove", onScrollMove);
  window.addEventListener("touchmove", onScrollMove);
  window.addEventListener("mouseup", onScrollEnd);
  window.addEventListener("touchend", onScrollEnd);
};
//스크롤 진행 이벤트
const onScrollMove = (e) => {
  nowX = getClientX(e);
  setTranslateX(navX + nowX - startX);
};
const onScrollEnd = (e) => {
  endX = getClientX(e);
  navX = getTranslateX();
  if (navX > 0) {
    setTranslateX(0);
    nav.style.transition = `all 0.3s ease`;
    navX = 0;
  } else if (navX < navClientWidth - navScrollWidth) {
    setTranslateX(navClientWidth - navScrollWidth);
    nav.style.transition = `all 0.3s ease`;
    navX = navClientWidth - navScrollWidth;
  }

  window.removeEventListener("mousedown", onScrollStart);
  window.removeEventListener("touchstart", onScrollStart);
  window.removeEventListener("mousemove", onScrollMove);
  window.removeEventListener("touchmove", onScrollMove);
  window.removeEventListener("mouseup", onScrollEnd);
  window.removeEventListener("touchend", onScrollEnd);
  window.removeEventListener("click", onClick);

  setTimeout(() => {
    bindEvents();
    nav.style.transition = "";
  }, 300);
};
const onClick = (e) => {};
//유틸함수 정의

const getClientX = (e) => {
  const isTouches = e.touches ? true : false;
  return isTouches ? e.touches[0].clientX : e.clientX;
};

const getTranslateX = () => {
  return parseInt(getComputedStyle(nav).transform.split(/[^\-0-9]+/g)[5]);
};

const setTranslateX = (x) => {
  nav.style.transform = `translateX(${x}px)`;
};

//이벤트 연결

const bindEvents = () => {
  nav.addEventListener("mousedown", onScrollStart);
  nav.addEventListener("touchstart", onScrollStart);
  nav.addEventListener("click", onClick);
};
bindEvents();

function sort1() {
  let rmBox_Container = document.querySelector(".rmBox_Container");
  let rmBox_inner = document.getElementsByClassName("rmBox_inner");
  let rmBox_text = document.getElementsByClassName("rmBox_text");
  let sort = document.getElementById("sort");
  let cssSort = document.getElementById("cssSort");

  if (sort.innerHTML == "1열보기") {
    cssSort.href = "./css/menu2.css";
    sort.innerHTML = "3열보기";
  } else {
    cssSort.href = "./css/menu.css";
    sort.innerHTML = "1열보기";
  }

  // for (let i = 0; i < rmBox_inner.length; i++) {
  //   rmBox_inner[i].style.flexDirection = "row";
  //   rmBox_inner[i].style.justifyContent = "left";
  //   rmBox_inner[i].style.width = "100%";
  //   rmBox_text[i].style.flexDirection = "row";
  // }
  // rmBox_Container.style.flexDirection = "column";
  // sort.innerHTML = "3열 보기";
}
function acountBox() {
  let rmBox_inner = document.getElementsByClassName("rmBox_inner");
  let menuAcount = document.getElementById("menuAcount");
  menuAcount.innerHTML = rmBox_inner.length + " 개";
}

function func_item_update(itemName) {
  window.location.href = "/itemInfo?itemName=" + itemName;
}

function goToPay() {
  window.location.href = "/cartInfo";
}
function goToBack() {
  window.history.back;
}
function goToSearch() {
  window.location.href = "/search";
}
