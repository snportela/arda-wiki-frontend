const token = localStorage.getItem("accessToken");

async function validateUser() {
  try {
    const response = await fetch("http://localhost:5000/api/users", {
      headers: new Headers({ Authorization: `Bearer ${token}` }),
    });
    const results = await response.json();
    if (response.status !== 200) {
      window.location.assign("login.html");
    }
  } catch (error) {
    console.log(error);
  }
}

validateUser();

