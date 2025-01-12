const button = document.querySelector(".expand-button");
const menu = document.querySelector(".menu");
const body = document.body;

button.addEventListener("click", () => {
  menu.classList.toggle("expanded");
  body.classList.toggle("hide-overflow")
});


