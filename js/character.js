let url = "http://localhost:5000/api/";
let path = location.pathname;
let page = path.substring(1, path.length - 5);

const urlParams = new URLSearchParams(location.search);
const character_id = urlParams.get("character_id");
let mainContainer = document.querySelector(".page");

async function getCharacters() {
  try {
    const response = await fetch(`${url}characters/${character_id}`);
    const results = await response.json();
    appendData(results);
  } catch (error) {
    console.log(error);
  }
}

getCharacters();

function appendData(data) {
  let title = mainContainer.querySelector("h1");
  let description = mainContainer.querySelector("p");
  let img = mainContainer.querySelector("img");
  let caption = mainContainer.querySelector("figcaption");
  let location = mainContainer.querySelector("td");
  let race = mainContainer.querySelectorAll("td")[1];
  let weapon = mainContainer.querySelectorAll("td")[2];

  title.textContent = data.name;
  description.textContent = data.description;
  img.src = data.image;
  caption.textContent = data.name;
  location.textContent = data.location;
  race.textContent = data.race;
  weapon.textContent = data.weapon;
}
