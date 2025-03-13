let url = "https://arda-wiki-api.onrender.com/api";
let page = location.pathname;
let single = page.substring(1, page.length - 1);
let myUrl = "https://arda-wiki.pages.dev/";

async function getCards() {
  try {
    const response = await fetch(`${url}${page}?order=name`);
    const results = await response.json();
    appendData(results);
    console.log(page);
    console.log(single);
    
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
        `${myUrl}${single}?${single}_id=${data.character_id}`
      );
    }

    if (single === "location") {
      a.setAttribute(
        "href",
        `${myUrl}${single}?${single}_id=${data.location_id}`
      );
    }
  });
}
