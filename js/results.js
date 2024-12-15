async function getResults() {
  let url = "http://localhost:5000/api/";

  const urlParams = new URLSearchParams(location.search);
  const param = urlParams.get("search");

  try {
    const characters_response = await fetch(`${url}characters?search=${param}`);
    let characters_results = await characters_response.json();
    characters_results.forEach((result) => {
      result.link = `http://localhost:5500/character.html?character_id=${result.character_id}`;
    });

    const locations_response = await fetch(`${url}locations?search=${param}`);
    let locations_results = await locations_response.json();
    locations_results.forEach((result) => {
      result.link = `http://localhost:5500/location.html?location_id=${result.location_id}`;
    });

    const races_response = await fetch(`${url}races?search=${param}`);
    let races_results = await races_response.json();
    races_results.forEach((result) => {
      result.link = `http://localhost:5500/race.html?race_id=${result.race_id}`;
    });

    const weapons_response = await fetch(`${url}weapons?search=${param}`);
    let weapons_results = await weapons_response.json();
    weapons_results.forEach((result) => {
      result.link = `http://localhost:5500/weapon.html?weapon_id=${result.weapon_id}`;
    });

    const events_response = await fetch(`${url}events?search=${param}`);
    let events_results = await events_response.json();
    events_results.forEach((result) => {
      result.link = `http://localhost:5500/event.html?event_id=${result.event_id}`;
    });

    const periods_response = await fetch(`${url}periods?search=${param}`);
    let periods_results = await periods_response.json();
    periods_results.forEach((result) => {
      result.link = `http://localhost:5500/period.html?period_id=${result.period_id}`;
    });

    const results = [
      ...characters_results,
      ...locations_results,
      ...races_results,
      ...weapons_results,
      ...events_results,
      ...periods_results,
    ];
    appendData(results);
  } catch (error) {
    console.log(error);
  }
}

getResults();

function appendData(data) {
  let page = document.querySelector(".results");

  data.forEach((data) => {
    let name = document.createElement("a");
    name.innerHTML = data.name;
    name.href = data.link;

    page.appendChild(name);
  });
}
