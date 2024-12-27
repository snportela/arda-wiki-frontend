const url = "http://localhost:5000/api/";
const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("Races_id");

console.log(id);

const nameInput = document.querySelector(".name-input");
const descriptionInput = document.querySelector(".description-input");
const form = document.getElementById("race-form");
const editBtn = document.querySelector(".edit-confirm");
const cancelBtn = document.querySelector(".edit-cancel");

if (!id) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addRace();
  });
}

if (id) {
  getRace();
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    updateRace();
  });
}

cancelBtn.onclick = () => {
  window.location.assign("http://127.0.0.1:5500/admin-table.html?table=Races");
};

async function addRace() {
  try {
    window.location.assign(
      "http://127.0.0.1:5500/admin-table.html?table=Races"
    );
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
  } catch (error) {
    console.log(error);
  }
}

async function updateRace() {
  try {
    window.location.assign(
      "http://127.0.0.1:5500/admin-table.html?table=Races"
    );
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
