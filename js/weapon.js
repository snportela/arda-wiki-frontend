let url = "http://localhost:5000/api/";
let path = location.pathname;
let page = path.substring(1, path.length - 5);

const urlParams = new URLSearchParams(location.search);
const weapon_id = urlParams.get("weapon_id");
let mainContainer = document.querySelector(".page");

async function getWeapon() {
  try {
    const response = await fetch(`${url}weapons/${weapon_id}`);
    const results = await response.json();
    appendData(results);
  } catch (error) {
    console.log(error);
  }
}

getWeapon();

function appendData(data) {
  let title = mainContainer.querySelector("h1");
  let description = mainContainer.querySelector("p");

  title.textContent = data.name;
  description.textContent = data.description;
}
