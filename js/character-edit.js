const url = "http://localhost:5000/api/";
const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("character_id");

const nameInput = document.querySelector(".name-input");
const descriptionInput = document.querySelector(".description-input");
const imageInput = document.querySelector(".image-input");
const characterImg = document.querySelector(".character-img");
const form = document.getElementById("edit-form");
const editBtn = document.querySelector(".edit-confirm");
const successMessage = document.querySelector(".success-message");
const successText = document.querySelector(".success-message p");
const deleteImgBtn = document.querySelector(".delete-img");
const title = document.querySelector("h2");

const selectedRaceValue = document.querySelector(".selected-value");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isValid = formValidator();

  if (isValid) {
    if (!id) {
      addCharacter();
    } else {
      updateCharacter();
    }
  }
});

if (id) {
  getCharacter();
  title.innerText = "Update";
  editBtn.innerText = "Update";
  deleteImgBtn.style.display = "block";
  successText.innerText = "Character updated successfully!";
}

async function addCharacter() {
  try {
    if (editBtn.textContent !== "Add") {
      return;
    }

    let myFormData = new FormData();
    myFormData.append("name", nameInput.value);
    myFormData.append("description", descriptionInput.value);
    myFormData.append("location_id", `[${selectedLocations}]`);
    myFormData.append("weapon_id", `[${selectedWeapons}]`);
    myFormData.append("race_id", `${selectedRace}`);
    if (imageInput.files[0]) myFormData.append("image", imageInput.files[0]);

    const response = await fetch(`${url}characters`, {
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
        selectedRaceValue.remove();
        characterImg.style.display = "none";
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
  characterImg.removeAttribute("src");
};

async function updateCharacter() {
  try {
    if (editBtn.textContent !== "Update") {
      return;
    }

    let myFormData = new FormData();
    myFormData.append("name", nameInput.value);
    myFormData.append("description", descriptionInput.value);
    myFormData.append("location_id", `[${selectedLocations}]`);
    myFormData.append("weapon_id", `[${selectedWeapons}]`);
    myFormData.append("race_id", `${selectedRace}`);
    if (imageInput.files[0]) myFormData.append("image", imageInput.files[0]);
    else myFormData.append("image", characterImg.src);

    const response = await fetch(`${url}characters/${id}`, {
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

const locationValue = document.querySelector(".location-value");
const weaponValue = document.querySelector(".weapon-value");
const raceValue = document.querySelector(".race-value");

function appendData(data) {
  const locations = data.location;
  const weapons = data.weapon;

  nameInput.value = data.name;
  descriptionInput.innerHTML = data.description;
  raceValue.innerHTML += ` ${data.race}`;

  if (locations === `{NULL}`) locationValue.remove();
  locationValue.innerHTML += ` ${locations.substring(1, locations.length - 1)}`;

  if (weapons === `{NULL}`) weaponValue.remove();
  weaponValue.innerHTML += ` ${weapons.substring(1, weapons.length - 1)}`;

  characterImg.src = data.image;
}

if (!id) {
  characterImg.style.display = "none";
  locationValue.remove();
  weaponValue.remove();
  raceValue.remove();
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

  if (selectedRace === "") {
    setErrorFor(raceInput, "Please select a race.");
    error++;
  } else {
    setSuccessFor(raceInput);
  }

  if (!id) {
    if (imageInput.value === "") {
      setErrorFor(imageInput, "Please select a image.");
      error++;
    } else {
      setSuccessFor(imageInput);
    }
  }

  if (id) {
    if (!characterImg.src) {
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
    characterImg.src = URL.createObjectURL(file);
    characterImg.style.display = "block";
  }
};

const raceInput = document.querySelector(".race-input");

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
    logout();
  }
}

function appendRaces(data) {
  data.forEach((data) => {
    raceInput.innerHTML += `
    <option class="race-select" value="${data.race_id}">${data.name}</option>
        `;
  });
}

getRaces();

const raceSelector = document.querySelector(".race-selector");

let raceExpanded = false;
raceSelector.onclick = () => {
  if (!raceExpanded) {
    raceSelector.style.borderRadius = "20px 20px 0 0";
    raceInput.style.display = "grid";
    raceExpanded = true;
  } else {
    raceSelector.style.borderRadius = "20px";
    raceInput.style.display = "none";
    raceExpanded = false;
  }
};

let selectedRace = "";
function onSelectRace(e) {
  if (!e.target.classList.contains("race-select")) {
    return;
  }

  const option = e.target;
  selectedRace = option.value;
  raceInput.style.display = "none";
  raceSelector.style.borderRadius = "20px";
  selectedRaceValue.innerHTML = `Selected race: ${option.innerHTML}`;
}

raceInput.addEventListener("click", onSelectRace);

async function getLocations() {
  try {
    const response = await fetch(`${url}locations`);
    const results = await response.json();

    if (response.ok) {
      appendLocations(results);
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

const locationCheckboxes = document.querySelector(".location-checkboxes");

function appendLocations(data) {
  data.forEach((data) => {
    locationCheckboxes.innerHTML += `
    <label><input type="checkbox" class="location-input" value=${data.location_id}>${data.name}</label>
        `;
  });
}

getLocations();

let locationSet = new Set();
let selectedLocations = [];
function onSelectLocation(e) {
  if (!e.target.classList.contains("location-input")) {
    return;
  }

  const option = e.target;
  let id = option.value;

  if (locationSet.has(id)) {
    locationSet.delete(id);
  } else {
    locationSet.add(id);
  }

  selectedLocations = Array.from(locationSet);
}

locationCheckboxes.addEventListener("click", onSelectLocation);

const locationSelector = document.querySelector(".location-selector");

let locationExpanded = false;
locationSelector.onclick = () => {
  if (!locationExpanded) {
    locationSelector.style.borderRadius = "20px 20px 0 0";
    locationCheckboxes.style.display = "grid";
    locationExpanded = true;
  } else {
    locationSelector.style.borderRadius = "20px";
    locationCheckboxes.style.display = "none";
    locationExpanded = false;
  }
};

async function getWeapons() {
  try {
    const response = await fetch(`${url}weapons`);
    const results = await response.json();

    if (response.ok) {
      appendWeapons(results);
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

const weaponCheckboxes = document.querySelector(".weapon-checkboxes");

function appendWeapons(data) {
  data.forEach((data) => {
    weaponCheckboxes.innerHTML += `
    <label><input type="checkbox" class="weapon-input" value=${data.weapon_id}>${data.name}</label>
        `;
  });
}

getWeapons();

let weaponSet = new Set();
let selectedWeapons = [];
function onSelectWeapon(e) {
  if (!e.target.classList.contains("weapon-input")) {
    return;
  }

  const option = e.target;
  let id = option.value;

  if (weaponSet.has(id)) {
    weaponSet.delete(id);
  } else {
    weaponSet.add(id);
  }

  selectedWeapons = Array.from(weaponSet);
}

weaponCheckboxes.addEventListener("click", onSelectWeapon);

const weaponSelector = document.querySelector(".weapon-selector");

let weaponExpanded = false;
weaponSelector.onclick = () => {
  if (!weaponExpanded) {
    weaponSelector.style.borderRadius = "20px 20px 0 0";
    weaponCheckboxes.style.display = "grid";
    weaponExpanded = true;
  } else {
    weaponSelector.style.borderRadius = "20px";
    weaponCheckboxes.style.display = "none";
    weaponExpanded = false;
  }
};
