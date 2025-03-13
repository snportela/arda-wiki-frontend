const url = "https://arda-wiki-api.onrender.com/api/";
const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("race_id");

const nameInput = document.querySelector(".name-input");
const descriptionInput = document.querySelector(".description-input");
const form = document.getElementById("edit-form");
const editBtn = document.querySelector(".edit-confirm");
const successMessage = document.querySelector(".success-message");
const successText = document.querySelector(".success-message p");
const title = document.querySelector("h2");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isValid = formValidator();

  if (isValid) {
    if (!id) {
      addRace();
    } else {
      updateRace();
    }
  }
});

if (id) {
  getRace();
  title.innerText = "Update";
  editBtn.innerText = "Update";
  successText.innerText = "Race updated successfully!";
}

async function addRace() {
  try {
    if (editBtn.textContent !== "Add") {
      return;
    }

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

async function updateRace() {
  try {
    if (editBtn.textContent !== "Update") {
      return;
    }
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

async function getRace() {
  try {
    const response = await fetch(`${url}races/${id}`);
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
