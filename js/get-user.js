let url = "http://localhost:5000/api/";
const id = localStorage.getItem("user_id");
const authToken = localStorage.getItem("accessToken");
const p = document.querySelector(".welcome-text");

async function getUserData() {
  try {
    const response = await fetch(`${url}users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const results = await response.json();
    appendData(results);
    p.innerHTML += results.name;
  } catch (error) {
    console.log(error);
  }
}

getUserData();
