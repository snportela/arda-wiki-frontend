let totalCharacters = 0;
let totalLocations = 0;
let totalRaces = 0;
let totalEvents = 0;
let totalPeriods = 0;
let totalWeapons = 0;

async function getData() {
  try {
    const character_response = await fetch(
      `http://localhost:5000/api/characters`
    );
    const character_results = await character_response.json();
    character_results.forEach((result) => {
      totalCharacters++;
    });

    const location_response = await fetch(
      `http://localhost:5000/api/locations`
    );
    const location_results = await location_response.json();
    location_results.forEach((result) => {
      totalLocations++;
    });

    const race_response = await fetch(`http://localhost:5000/api/races`);
    const race_results = await race_response.json();
    race_results.forEach((result) => {
      totalRaces++;
      result.total = totalLocations;
    });

    const event_response = await fetch(`http://localhost:5000/api/events`);
    const event_results = await event_response.json();
    event_results.forEach((result) => {
      totalEvents++;
    });

    const period_response = await fetch(`http://localhost:5000/api/periods`);
    const period_results = await period_response.json();
    period_results.forEach((result) => {
      totalPeriods++;
    });

    const weapon_response = await fetch(`http://localhost:5000/api/weapons`);
    const weapon_results = await weapon_response.json();
    weapon_results.forEach((result) => {
      totalWeapons++;
    });

    results = [
      totalCharacters,
      totalLocations,
      totalRaces,
      totalEvents,
      totalPeriods,
      totalWeapons
    ];
    appendData(results);
  } catch (error) {
    console.log(error);
  }
}

getData();

const table = document.querySelector(".crud-table");
const tbody = document.querySelector("tbody");
const categories = ["Characters", "Locations", "Races", "Events", "Periods", "Weapons"]

function appendData(data) {
  for(let i = 0; i < data.length; i++) {
    tbody.innerHTML += `
                <tr>
                    <td>${categories[i]}</td>
                    <td>${data[i]}</td>
                </tr>
            `;
  };
}





