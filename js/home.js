async function getLastArticles() {
  try {
    const character_response = await fetch(
      `https://arda-wiki-api.onrender.com/api/characters?order=character_id&limit=1&sort=desc`
    );
    const character_results = await character_response.json();
    character_results.forEach((result) => {
      result.link = `https://arda-wiki.pages.dev/character?character_id=${result.character_id}`;
    });

    const location_response = await fetch(
      `https://arda-wiki-api.onrender.com/api/locations?order=location_id&limit=1&sort=desc`
    );
    const location_results = await location_response.json();
    location_results.forEach((result) => {
      result.link = `https://arda-wiki.pages.dev/location?location_id=${result.location_id}`;
    });

    results = [...character_results, ...location_results];
    appendData(results);
  } catch (error) {
    console.log(error);
  }
}

getLastArticles();

function appendData(data) {
  let articles = document.querySelector(".home-articles");

  data.forEach((data) => {
    let card = document.createElement("a");
    let name = document.createElement("p");
    let img = document.createElement("img");
    card.classList.add("home-card");
    name.innerHTML = data.name;
    card.href = data.link;
    img.src = data.image;

    card.appendChild(name);
    card.appendChild(img);
    articles.appendChild(card);
  });
}
