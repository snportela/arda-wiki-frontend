const url = "http://localhost:5000/api/";
const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("location_id");

const nameInput = document.querySelector(".name-input");
const descriptionInput = document.querySelector(".description-input");
const imageInput = document.querySelector(".image-input");
const locationImg = document.querySelector(".location-img");
const form = document.getElementById("edit-form");
const editBtn = document.querySelector(".edit-confirm");
const successMessage = document.querySelector(".success-message");
const successText = document.querySelector(".success-message p");
const deleteImgBtn = document.querySelector(".delete-img");
const title = document.querySelector("h2");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isValid = formValidator();

  if (isValid) {
    if (!id) {
      addLocation();
    } else {
      updateLocation();
    }
  }
});

if (id) {
  getLocation();
  title.innerText = "Update";
  editBtn.innerText = "Update";
  deleteImgBtn.style.display = "block";
  successText.innerText = "Location updated successfully!";
}

async function addLocation() {
  try {
    if (editBtn.textContent !== "Add") {
      return;
    }

    let myFormData = new FormData();
    myFormData.append("name", nameInput.value);
    myFormData.append("description", descriptionInput.value);
    myFormData.append("race_id", `[${selectedRaces}]`);
    if (imageInput.files[0]) myFormData.append("image", imageInput.files[0]);

    const response = await fetch(`${url}locations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: myFormData,
    });
    await response.json();

    editBtn.textContent = "Adding...";
    editBtn.classList.add("disabled");
    successMessage.style.display = "none";

    if (response.ok) {
      setTimeout(() => {
        editBtn.textContent = "Add";
        editBtn.classList.remove("disabled");
        successMessage.style.display = "flex";
        nameInput.value = "";
        descriptionInput.value = "";
        locationImg.style.display = "none";
        locationImg.src = "";
        imageInput.value = "";
      }, 1000);
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

deleteImgBtn.onclick = () => {
  locationImg.removeAttribute("src");
};

async function updateLocation() {
  try {
    if (editBtn.textContent !== "Update") {
      return;
    }

    let myFormData = new FormData();
    myFormData.append("name", nameInput.value);
    myFormData.append("description", descriptionInput.value);
    myFormData.append("race_id", `[${selectedRaces}]`);
    if (imageInput.files[0]) myFormData.append("image", imageInput.files[0]);
    else myFormData.append("image", locationImg.src);

    const response = await fetch(`${url}locations/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: myFormData,
    });
    await response.json();

    editBtn.textContent = "Updating...";
    editBtn.classList.add("disabled");
    successMessage.style.display = "none";

    if (response.ok) {
      setTimeout(() => {
        editBtn.textContent = "Update";
        editBtn.classList.remove("disabled");
        successMessage.style.display = "flex";
      }, 1000);
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

const currentRace = document.querySelector(".current-value");

function appendData(data) {
  const races = data.race;
  nameInput.value = data.name;
  descriptionInput.innerHTML = data.description;
  currentRace.innerHTML += ` ${races.substring(1, races.length - 1)}`;
  locationImg.src = data.image;
}

if (!id) {
  locationImg.style.display = "none";
  currentRace.remove();
}

function logout() {
  window.location.assign("login.html");
  localStorage.clear();
}

function formValidator() {
  let error = 0;

  if (nameInput.value === "") {
    setErrorFor(nameInput, "Please enter an name.");
    error++;
  } else {
    setSuccessFor(nameInput);
  }

  if (descriptionInput.value < 1) {
    setErrorFor(descriptionInput, "Please enter an description.");
    error++;
  } else {
    setSuccessFor(descriptionInput);
  }

  if (selectedRaces.length === 0) {
    setErrorFor(raceCheckboxes, "Please select at least one race.");
    error++;
  } else {
    setSuccessFor(raceCheckboxes);
  }

  if (!id) {
    if (imageInput.value === "" || !locationImg.src) {
      setErrorFor(imageInput, "Please select a image.");
      error++;
    } else {
      setSuccessFor(imageInput);
    }
  }

  if (id) {
    if (!locationImg.src) {
      setErrorFor(imageInput, "Please select a image.");
      error++;
    } else {
      imageInput.addEventListener("change", () => {
        setSuccessFor(imageInput);
      });
    }
  }

  if (error == 0) return true;
}

function setErrorFor(input, message) {
  const inputBox = input.parentElement;
  const error = inputBox.querySelector(".error");
  error.style.display = "block";
  error.innerText = message;
}

function setSuccessFor(input) {
  const inputBox = input.parentElement;
  const error = inputBox.querySelector(".error");
  error.style.display = "none";
}

imageInput.onchange = (evt) => {
  const [file] = imageInput.files;
  if (file) {
    locationImg.src = URL.createObjectURL(file);
    locationImg.style.display = "block";
  }
};

async function getRaces() {
  try {
    const response = await fetch(`${url}races`);
    const results = await response.json();

    if (response.ok) {
      appendRaces(results);
    } else {
      logout();
      if (response.status === 403) {
        alert("Session expired.");
      }
    }
  } catch (error) {
    console.log(error);
  }
}

const raceCheckboxes = document.querySelector(".race-checkboxes");

function appendRaces(data) {
  data.forEach((data) => {
    raceCheckboxes.innerHTML += `
    <label><input type="checkbox" class="race-select" value=${data.race_id}>${data.name}</label>
        `;
  });
}

getRaces();

let tempSet = new Set();
let selectedRaces = [];
function onSelectRace(e) {
  if (!e.target.classList.contains("race-select")) {
    return;
  }

  const option = e.target;
  let id = option.value;

  if (tempSet.has(id)) {
    tempSet.delete(id);
  } else {
    tempSet.add(id);
  }

  selectedRaces = Array.from(tempSet);
}

raceCheckboxes.addEventListener("click", onSelectRace);

const raceSelector = document.querySelector(".race-selector");

let raceExpanded = false;
raceSelector.onclick = () => {
  if (!raceExpanded) {
    raceSelector.style.borderRadius = "20px 20px 0 0";
    raceCheckboxes.style.display = "grid";
    raceExpanded = true;
  } else {
    raceSelector.style.borderRadius = "20px";
    raceCheckboxes.style.display = "none";
    raceExpanded = false;
  }
};
