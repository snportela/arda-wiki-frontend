const url = "http://localhost:5000/api/";
const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("location_id");

const nameInput = document.querySelector(".name-input");
const descriptionInput = document.querySelector(".description-input");
const raceInput = document.querySelector(".race-input");
const imageInput = document.querySelector(".image-input");
const locationImg = document.querySelector(".location-img");
const form = document.getElementById("edit-form");
const editBtn = document.querySelector(".edit-confirm");
const title = document.querySelector("h2");

if (!id) {
  locationImg.style.display = "none";
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addLocation();
  });
}

if (id) {
  getLocation();
  title.innerText = "Update";
  editBtn.innerText = "Update";
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    updateLocation();
  });
}

async function addLocation() {
  try {
    let myFormData = new FormData();
    myFormData.append("name", nameInput.value);
    myFormData.append("description", descriptionInput.value);
    myFormData.append("race_id", `[${raceInput.value}]`);
    if (imageInput.files[0]) myFormData.append("image", imageInput.files[0]);
    const response = await fetch(`${url}locations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: myFormData,
    });
    await response.json();
    
    if (response.ok) {
      window.location.assign(
        "http://127.0.0.1:5500/admin/locations-table.html"
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

async function updateLocation() {
  try {
    let myFormData = new FormData();
    myFormData.append("name", nameInput.value);
    myFormData.append("description", descriptionInput.value);
    myFormData.append("race_id", `[${raceInput.value}]`);
    if (imageInput.files[0]) myFormData.append("image", imageInput.files[0]);

    const response = await fetch(`${url}locations/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: myFormData,
    });
    await response.json();

    if (response.ok) {
      window.location.assign(
        "http://127.0.0.1:5500/admin/locations-table.html"
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

async function getLocation() {
  try {
    const response = await fetch(`${url}locations/${id}`);
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
  locationImg.src = data.image;
}

function logout() {
  window.location.assign("login.html");
  localStorage.clear();
}
