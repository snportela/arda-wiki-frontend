let url = "https://arda-wiki-api.onrender.com/api";
let page = location.pathname;
let single = page.substring(1, page.length - 1);
let myUrl = "https://arda-wiki.pages.dev/";

async function getItems() {
  try {
    const response = await fetch(`${url}${page}?order=name`);
    const results = await response.json();
    appendData(results);
  } catch (error) {
    console.log(error);
  }
}

getItems();

function appendData(data) {
  let mainContainer = document.querySelector(".list");
  data.forEach((data) => {
    let a = document.createElement("a");
    mainContainer.style.display = "flex";
    mainContainer.classList.add("column");
    a.innerHTML = data.name;
    a.classList.add("item");
    mainContainer.appendChild(a);

    if (single === "race") {
      a.setAttribute("href", `${myUrl}${single}?${single}_id=${data.race_id}`);
    }
    if (single === "weapon") {
      a.setAttribute(
        "href",
        `${myUrl}${single}?${single}_id=${data.weapon_id}`
      );
    }
    if (single === "period") {
      a.setAttribute(
        "href",
        `${myUrl}${single}?${single}_id=${data.period_id}`
      );
    }
    if (single === "event") {
      a.setAttribute("href", `${myUrl}${single}?${single}_id=${data.event_id}`);
    }
  });
}
