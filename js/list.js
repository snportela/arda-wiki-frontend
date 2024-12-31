let url = "http://localhost:5000/api/";
let path = location.pathname;
let page = path.substring(1, path.length - 5);
let single = page.substring(0, page.length - 1);
let myUrl = "http://localhost:5500/";

async function getItems() {
  try {
    const response = await fetch(`${url}${page}`);
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
      a.setAttribute(
        "href",
        `${myUrl}${single}.html?${single}_id=${data.race_id}`
      );
    }
    if (single === "weapon") {
      a.setAttribute(
        "href",
        `${myUrl}${single}.html?${single}_id=${data.weapon_id}`
      );
    }
    if (single === "period") {
      a.setAttribute(
        "href",
        `${myUrl}${single}.html?${single}_id=${data.period_id}`
      );
    }
    if (single === "event") {
      a.setAttribute(
        "href",
        `${myUrl}${single}.html?${single}_id=${data.event_id}`
      );
    }
  });
}
