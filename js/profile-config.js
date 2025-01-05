const form = document.getElementById("edit-form");
const nameInput = document.querySelector(".name-input");
const emailInput = document.querySelector(".email-input");
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
  updateUserData();
});

async function updateUserData() {
  try {
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

    if (response.ok) {
      window.location.assign("http://127.0.0.1:5500/admin/main.html");
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
