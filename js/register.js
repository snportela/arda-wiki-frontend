const loginForm = document.getElementById("login-form");
const nameInput = document.querySelector(".name");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const incorrect = document.querySelector(".incorrect");

async function postData() {
  try {
    const response = await fetch("http://localhost:5000/api/users", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: nameInput.value,
        email: email.value,
        password: password.value,
      }),
    });
    await response.json();
    if (response.ok) {
      window.location.assign("/admin/login.html");
    } else {
      alert("Something went wrong...");
    }
  } catch (error) {
    console.log(error);
  }
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let error = 0;

  if (nameInput.value === "") {
    setErrorFor(nameInput, "Please enter a name.");
    error++;
  } else {
    setSuccessFor(nameInput);
  }

  if (email.value === "") {
    setErrorFor(email, "Please enter an email adress.");
    error++;
  } else if (!validateEmail(email.value)) {
    setErrorFor(email, "Please enter a valid email adress.");
    error++;
  } else {
    setSuccessFor(email);
  }

  if (password.value === "") {
    setErrorFor(password, "Please enter a password.");
    error++;
  } else {
    setSuccessFor(password);
  }

  if (error == 0) {
    postData();
  }
});

function setErrorFor(input, message) {
  const inputBox = input.parentElement;
  const inputContainer = inputBox.parentElement;
  const error = inputContainer.children[1];
  error.style.display = "block";
  error.innerText = message;
}

function setSuccessFor(input) {
  const inputBox = input.parentElement;
  const inputContainer = inputBox.parentElement;
  const error = inputContainer.children[1];
  error.style.display = "none";
}

function validateEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
