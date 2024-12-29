const form = document.getElementById("edit-form");
const nameInput = document.querySelector(".name-input");
const emailInput = document.querySelector(".email-input");
const token = localStorage.getItem("accessToken");

const url = "http://localhost:5000/api/";

async function getUserData() {
  try {
    const response = await fetch(`${url}users/user_data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const results = await response.json();

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      updateUserData(results);
    });
    appendData(results);
  } catch (error) {
    console.log(error);
  }
}

function appendData(data) {
  nameInput.value = data.name;
  emailInput.value = data.email;
}

async function updateUserData(data) {
  try {
    const response = await fetch(`${url}users/${data.user_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
      }),
    });
    const results = await response.json();
    appendData(results);
    if (response.status === 200)
      window.location.assign("http://127.0.0.1:5500/admin-main.html");
  } catch (error) {
    console.log(error);
  }
}

getUserData();
