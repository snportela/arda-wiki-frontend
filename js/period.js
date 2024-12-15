let url = "http://localhost:5000/api/";
let path = location.pathname;
let page = path.substring(1, path.length - 5);

const urlParams = new URLSearchParams(location.search);
const period_id = urlParams.get("period_id");
let mainContainer = document.querySelector(".simple-page");

async function getPeriod() {
  try {
    const response = await fetch(`${url}periods/${period_id}`);
    const results = await response.json();
    appendData(results);
  } catch (error) {
    console.log(error);
  }
}

getPeriod();

function appendData(data) {
  let title = mainContainer.querySelector("h1");
  let description = mainContainer.querySelector("p");

  title.textContent = data.name;
  description.textContent = data.description;
}
