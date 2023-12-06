// 첫번째 slider
let slider = document.querySelector(".slider");
let innerSlider = document.querySelector(".slider-inner");
let pressed1 = false;
let startx1;
let x1;

slider.addEventListener("mousedown", (e) => {
  pressed1 = true;
  startx1 = e.offsetX - innerSlider.offsetLeft;
});

window.addEventListener("mouseup", () => {
  pressed1 = false;
});

slider.addEventListener("mousemove", (e) => {
  if (!pressed1) return;
  e.preventDefault();
  x1 = e.offsetX;
  innerSlider.style.left = `${x1 - startx1}px`;
  checkBoundary1();
});

function checkBoundary1() {
  let outer = slider.getBoundingClientRect();
  let inner = innerSlider.getBoundingClientRect();

  if (parseInt(innerSlider.style.left) > 0) {
    innerSlider.style.left = "0px";
  } else if (inner.right < outer.right) {
    innerSlider.style.left = `-${inner.width - outer.width}px`;
  }
}

// 두번째 slider
let slider2 = document.querySelector(".slider2");
let innerSlider2 = document.querySelector(".slider-inner2");
let pressed2 = false; // 수정된 변수명
let startx2;
let x2;

slider2.addEventListener("mousedown", (e) => {
  pressed2 = true;
  startx2 = e.offsetX - innerSlider2.offsetLeft;
  slider2.style.cursor = "grabbing";
});

slider2.addEventListener("mouseenter", () => {
  slider2.style.cursor = "grab";
});

slider2.addEventListener("mouseup", () => {
  slider2.style.cursor = "grab";
});

window.addEventListener("mouseup", () => {
  pressed2 = false;
});

slider2.addEventListener("mousemove", (e) => {
  if (!pressed2) return;
  e.preventDefault();
  x2 = e.offsetX;
  innerSlider2.style.left = `${x2 - startx2}px`;
  checkBoundary2();
});

function checkBoundary2() {
  let outer = slider2.getBoundingClientRect();
  let inner = innerSlider2.getBoundingClientRect();

  if (parseInt(innerSlider2.style.left) > 0) {
    innerSlider2.style.left = "0px";
  } else if (inner.right < outer.right) {
    innerSlider2.style.left = `-${inner.width - outer.width}px`;
  }
}
