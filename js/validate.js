const token = localStorage.getItem("accessToken");
const p = document.querySelector(".welcome-text");

async function validateUser() {
  try {
    const response = await fetch("http://localhost:5000/api/users", {
      headers: new Headers({ Authorization: `Bearer ${token}` }),
    });
    const results = await response.json();
    p.innerHTML += results.users[0].name;
    if (response.status !== 200) {
      window.location.assign("login.html");
    }
  } catch (error) {
    console.log(error);
  }
}

validateUser();

const logoutBtn = document.querySelector(".logout-btn");

logoutBtn.onclick = () => {
  localStorage.removeItem("accessToken");
};

if(!localStorage.getItem("accessToken")) window.location.assign("login.html");