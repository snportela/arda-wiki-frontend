const url = "http://localhost:5000/api/";
const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("event_id");
const nameInput = document.querySelector(".name-input");
const dateInput = document.querySelector(".date-input");
const descriptionInput = document.querySelector(".description-input");
const form = document.getElementById("edit-form");
const editBtn = document.querySelector(".edit-confirm");
const successMessage = document.querySelector(".success-message");
const successText = document.querySelector(".success-message p");
const title = document.querySelector("h2");
const currentPeriod = document.querySelector(".period-value");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isValid = formValidator();
  if (isValid) {
    if (!id) {
      addEvent();
    } else {
      updateEvent();
    }
  }
});

if (id) {
  getEvent();
  title.innerText = "Update";
  editBtn.innerText = "Update";
  successText.innerText = "Event updated successfully!";
} else {
  currentPeriod.remove();
}

getPeriods();

async function addEvent() {
  try {
    if (editBtn.textContent !== "Add") {
      return;
    }
    const response = await fetch(`${url}events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: nameInput.value,
        date: dateInput.value,
        description: descriptionInput.value,
        period_id: selectedPeriod,
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
        dateInput.value = "";
        
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

async function updateEvent() {
  try {
    if (editBtn.textContent !== "Update") {
      return;
    }

    const response = await fetch(`${url}events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: nameInput.value,
        description: descriptionInput.value,
        date: dateInput.value,
        period_id: selectedPeriod,
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

async function getEvent() {
  try {
    const response = await fetch(`${url}events/${id}`);
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
  const period = data.period;

  nameInput.value = data.name;
  dateInput.value = data.date;
  descriptionInput.innerHTML = data.description;
  currentPeriod.innerHTML += ` ${period.substring(1, period.length - 1)}`;
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

  if (selectedPeriod.length === 0) {
    setErrorFor(periodCheckboxes, "Please select a period.");
    error++;
  } else {
    setSuccessFor(periodCheckboxes);
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

const periodInput = document.querySelector(".period-input");

async function getPeriods() {
  try {
    const response = await fetch(`${url}periods`);
    const results = await response.json();

    if (response.ok) {
      appendPeriods(results);
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

const periodCheckboxes = document.querySelector(".period-checkboxes");

function appendPeriods(data) {
  data.forEach((data) => {
    periodCheckboxes.innerHTML += `
    <label><input type="checkbox" class="period-select" value=${data.period_id}>${data.name}</label>
        `;
  });
}

getPeriods();

const periodSelector = document.querySelector(".period-selector");

let periodExpanded = false;
periodSelector.onclick = () => {
  if (!periodExpanded) {
    periodSelector.style.borderRadius = "20px 20px 0 0";
    periodCheckboxes.style.display = "grid";
    periodExpanded = true;
  } else {
    periodSelector.style.borderRadius = "20px";
    periodCheckboxes.style.display = "none";
    periodExpanded = false;
  }
};

const selectedPeriodValue = document.querySelector(".selected-value");

let selectedPeriod = [];
let tempSet = new Set();
function onSelectPeriod(e) {
  if (!e.target.classList.contains("period-select")) {
    return;
  }

  const option = e.target;
  let id = option.value;

  if (tempSet.has(id)) {
    tempSet.delete(id);
  } else {
    tempSet.add(id);
  }

  selectedPeriod = Array.from(tempSet);
}

periodCheckboxes.addEventListener("click", onSelectPeriod);
