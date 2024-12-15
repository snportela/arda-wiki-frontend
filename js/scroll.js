function smoothScroll(target) {
  const element = document.getElementById(target);
  if (element) {
    window.scrollTo({
      top: element.offsetTop,
      behavior: "smooth",
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach(function (anchor) {
    anchor.addEventListener("click", (event) => {
      event.preventDefault();
      const target = anchor.getAttribute("href").substring(1);
      smoothScroll(target);
    });
  });
});
