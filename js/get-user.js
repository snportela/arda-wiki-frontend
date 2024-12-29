const url = "http://localhost:5000/api/";
const p = document.querySelector(".welcome-text");

async function getUserData() {
  try {
    const response = await fetch(`${url}users/user_data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const results = await response.json();
    if(p) p.innerHTML += results.name;
  } catch (error) {
    console.log(error);
  }
}

getUserData();

