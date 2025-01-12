let url = "http://localhost:5000/api/";
let path = location.pathname;
let page = path.substring(1, path.length - 5);

const urlParams = new URLSearchParams(location.search);
const event_id = urlParams.get("event_id");
let mainContainer = document.querySelector(".page");

async function getEvent() {
  try {
    const response = await fetch(`${url}events/${event_id}`);
    const results = await response.json();
    appendData(results);
  } catch (error) {
    console.log(error);
  }
}

getEvent();

function appendData(data) {
  let title = mainContainer.querySelector("h1");
  let description = mainContainer.querySelector("p");
  let period = mainContainer.querySelectorAll("p")[1];

  title.textContent = data.name;
  description.textContent = data.description;
  period.textContent = data.period;
}
