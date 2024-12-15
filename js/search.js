const searchInput = document.querySelector(".search");
const search = document.querySelector(".search-btn");

function submit() {
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const value = searchInput.value;
      search.href = "/results.html?search=" + value;
    });
  }
}
