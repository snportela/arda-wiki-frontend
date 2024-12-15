let url = "http://localhost:5000/api/";
let path = location.pathname;
let page = path.substring(1, path.length - 5);

const urlParams = new URLSearchParams(location.search);
const race_id = urlParams.get("race_id");
let mainContainer = document.querySelector(".simple-page");

async function getRace() {
  try {
    const response = await fetch(`${url}races/${race_id}`);
    const results = await response.json();
    appendData(results);
  } catch (error) {
    console.log(error);
  }
}

getRace();

function appendData(data) {
  let title = mainContainer.querySelector("h1");
  let description = mainContainer.querySelector("p");

  title.textContent = data.name;
  description.textContent = data.description;
}
