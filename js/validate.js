const token = localStorage.getItem("accessToken");
const userId = localStorage.getItem("user_id");

if (!token || !userId) {
  logout();
} else {
  validateUser();
}

async function validateUser() {
  try {
    const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
      headers: new Headers({ Authorization: `Bearer ${token}` }),
    });
    await response.json();

    if (!response.ok) {
      logout();
      if (response.status === 403) {
        alert("Session expired.");
      }
    }
  } catch (error) {
    logout();
  }
}

const logoutBtn = document.querySelector(".logout-btn");

logoutBtn.onclick = () => {
  localStorage.clear();
};

function logout() {
  window.location.assign("login.html");
  localStorage.clear();
}
