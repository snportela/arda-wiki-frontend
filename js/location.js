let url = "https://arda-wiki-api.onrender.com/api";
let path = location.pathname;
let page = path.substring(1, path.length - 5);

const urlParams = new URLSearchParams(location.search);
const location_id = urlParams.get("location_id");
let mainContainer = document.querySelector(".page");

async function getLocation() {
  try {
    const response = await fetch(`${url}/locations/${location_id}`);
    const results = await response.json();
    appendData(results);
  } catch (error) {
    console.log(error);
  }
}

getLocation();

function appendData(data) {
  let title = mainContainer.querySelector("h1");
  let description = mainContainer.querySelector("p");
  let img = mainContainer.querySelector("img");
  let caption = mainContainer.querySelector("figcaption");
  let race = mainContainer.querySelector("td");

  const raceData = data.race;

  title.textContent = data.name;
  description.textContent = data.description;
  img.src = data.image;
  caption.textContent = data.name;
  race.textContent = raceData.substring(1, raceData.length - 1);
}
