let url = "https://arda-wiki-api.onrender.com/api";
const id = localStorage.getItem("user_id");
const authToken = localStorage.getItem("accessToken");
const p = document.querySelector(".welcome-text");

async function getUserData() {
  try {
    const response = await fetch(`${url}/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const results = await response.json();

    if (response.ok) {
      appendData(results);
      p.innerHTML += ` ${results.name}`;
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

function logout() {
  window.location.assign("login.html");
  localStorage.clear();
}
