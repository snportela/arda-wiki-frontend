const form = document.getElementById("edit-form");
const nameInput = document.querySelector(".name-input");
const emailInput = document.querySelector(".email-input");
const submitButton = form.querySelector(".edit-confirm");
const successMessage = document.querySelector(".success-message");

let url = "http://localhost:5000/api/";
const id = localStorage.getItem("user_id");
const authToken = localStorage.getItem("accessToken");

async function getUserData() {
  try {
    const response = await fetch(`${url}users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
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

getUserData();

function appendData(data) {
  nameInput.value = data.name;
  emailInput.value = data.email;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isValid = formValidator();

  if (isValid) updateUserData();
});

async function updateUserData() {
  try {
    if (submitButton.textContent !== "Edit") {
      return;
    }

    const response = await fetch(`${url}users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
      }),
    });

    await response.json();

    submitButton.textContent = "Editing...";
    submitButton.classList.add("disabled");
    successMessage.style.display = "none";

    if (response.ok) {
      setTimeout(() => {
        submitButton.textContent = "Edit";
        submitButton.classList.remove("disabled");
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

function formValidator() {
  let error = 0;

  if (emailInput.value === "") {
    setErrorFor(emailInput, "Please enter an email adress.");
    error++;
  } else if (!validateEmail(emailInput.value)) {
    setErrorFor(emailInput, "Please enter a valid email adress.");
    error++;
  } else {
    setSuccessFor(emailInput);
  }

  if (nameInput.value === "") {
    setErrorFor(nameInput, "Please enter a name.");
    error++;
  } else {
    setSuccessFor(nameInput);
  }

  if (error == 0) return true;
}

function validateEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
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
