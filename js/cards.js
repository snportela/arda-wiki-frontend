let url = "http://localhost:5000/api/";
let path = location.pathname;
let page = path.substring(1, path.length - 5);
let single = page.substring(0, page.length - 1);
let myUrl = "http://localhost:5500/";

async function getCards() {
  try {
    const response = await fetch(`${url}${page}`);
    const results = await response.json();
    appendData(results);
  } catch (error) {
    console.log(error);
  }
}

getCards();

function appendData(data) {
  let mainContainer = document.querySelector(".list");
  data.forEach((data) => {
    let a = document.createElement("a");
    let img = document.createElement("img");
    let card = document.createElement("div");

    img.src = data.image;
    a.innerHTML = data.name;
    a.classList.add("item");

    card.classList.add("card-wrapper;");
    card.appendChild(a);
    a.appendChild(img);
    mainContainer.appendChild(card);
    a.setAttribute("target", "_self");

    if (single === "character") {
      a.setAttribute(
        "href",
        `${myUrl}${single}.html?${single}_id=${data.character_id}`
      );
    }

    if (single === "location") {
      a.setAttribute(
        "href",
        `${myUrl}${single}.html?${single}_id=${data.location_id}`
      );
    }
  });
}
