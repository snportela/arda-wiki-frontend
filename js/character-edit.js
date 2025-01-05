const url = "http://localhost:5000/api/";
const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("character_id");

const nameInput = document.querySelector(".name-input");
const descriptionInput = document.querySelector(".description-input");
const raceInput = document.querySelector(".race-input");
const locationInput = document.querySelector(".location-input");
const weaponInput = document.querySelector(".weapon-input");
const imageInput = document.querySelector(".image-input");
const characterImg = document.querySelector(".character-img");

const form = document.getElementById("edit-form");
const editBtn = document.querySelector(".edit-confirm");
const title = document.querySelector("h2");

if (!id) {
  characterImg.style.display = "none";
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addCharacter();
  });
}

if (id) {
  getCharacter();
  title.innerText = "Update";
  editBtn.innerText = "Update";
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    updateCharacter();
  });
}

async function addCharacter() {
  try {
    let myFormData = new FormData();
    myFormData.append("name", nameInput.value);
    myFormData.append("description", descriptionInput.value);
    myFormData.append("location_id", `[${locationInput.value}]`);
    myFormData.append("weapon_id", `[${weaponInput.value}]`);
    myFormData.append("race_id", `${raceInput.value}`);
    if (imageInput.files[0]) myFormData.append("image", imageInput.files[0]);

    const response = await fetch(`${url}characters`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: myFormData,
    });
    await response.json();

    if (response.ok) {
      window.location.assign(
        "http://127.0.0.1:5500/admin/characters-table.html"
      );
    } else {
      logout();
      if (response.status === 403) {
        alert("Session expired.");
      }
    }
  } catch (error) {
    logout();
  }
}

async function updateCharacter() {
  try {
    let myFormData = new FormData();
    myFormData.append("name", nameInput.value);
    myFormData.append("description", descriptionInput.value);
    myFormData.append("location_id", `[${locationInput.value}]`);
    myFormData.append("weapon_id", `[${weaponInput.value}]`);
    myFormData.append("race_id", `${raceInput.value}`);
    if (imageInput.files[0]) myFormData.append("image", imageInput.files[0]);

    const response = await fetch(`${url}characters/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: myFormData,
    });
    await response.json();

    if (response.ok) {
      window.location.assign(
        "http://127.0.0.1:5500/admin/characters-table.html"
      );
    } else {
      logout();
      if (response.status === 403) {
        alert("Session expired.");
      }
    }
  } catch (error) {
    logout();
  }
}

async function getCharacter() {
  try {
    const response = await fetch(`${url}characters/${id}`);
    const results = await response.json();

    if (response.ok) {
      appendData(results);
    } else {
      logout();
      if (response.status === 403) {
        alert("Session expired.");
      }
    }
  } catch (error) {
    logout();
  }
}

function appendData(data) {
  nameInput.value = data.name;
  descriptionInput.innerHTML = data.description;
  raceInput.value = data.race_id;
  locationInput.value = data.location_id;
  weaponInput.value = data.weapon_id;
  characterImg.src = data.image;
}

function logout() {
  window.location.assign("login.html");
  localStorage.clear();
}
