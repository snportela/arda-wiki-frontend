const url = "http://localhost:5000/api/";
const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("race_id");

const nameInput = document.querySelector(".name-input");
const descriptionInput = document.querySelector(".description-input");
const form = document.getElementById("edit-form");
const editBtn = document.querySelector(".edit-confirm");
const title = document.querySelector("h2");

if (!id) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addRace();
  });
}

if (id) {
  getRace();
  title.innerText = "Update";
  editBtn.innerText = "Update";
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    updateRace();
  });
}

async function addRace() {
  try {
    const response = await fetch(`${url}races`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: nameInput.value,
        description: descriptionInput.value,
      }),
    });
    const results = await response.json();
    if (response.status === 201)
      window.location.assign("http://127.0.0.1:5500/admin/races-table.html");
  } catch (error) {
    console.log(error);
  }
}

async function updateRace() {
  try {
    const response = await fetch(`${url}races/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: nameInput.value,
        description: descriptionInput.value,
      }),
    });
    const results = await response.json();
    if (response.status === 200)
      window.location.assign("http://127.0.0.1:5500/admin/races-table.html");
  } catch (error) {
    console.log(error);
  }
}

async function getRace() {
  try {
    const response = await fetch(`${url}races/${id}`);
    const results = await response.json();
    appendData(results);
  } catch (error) {
    console.log(error);
  }
}

function appendData(data) {
  nameInput.value = data.name;
  descriptionInput.innerHTML = data.description;
}
