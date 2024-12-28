const url = "http://localhost:5000/api/";
const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("period_id");

const nameInput = document.querySelector(".name-input");
const descriptionInput = document.querySelector(".description-input");
const form = document.getElementById("edit-form");
const editBtn = document.querySelector(".edit-confirm");
const title = document.querySelector("h2");

if (!id) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addPeriod();
  });
}

if (id) {
  getPeriod();
  title.innerText = "Update";
  editBtn.innerText = "Update";
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    updatePeriod();
  });
}


async function addPeriod() {
  try {
    window.location.assign("http://127.0.0.1:5500/periods-table.html");
    const response = await fetch(`${url}periods`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: nameInput.value,
        description: descriptionInput.value,
      }),
    });
  } catch (error) {
    console.log(error);
  }
}

async function updatePeriod() {
  try {
    window.location.assign("http://127.0.0.1:5500/periods-table.html");
    const response = await fetch(`${url}periods/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: nameInput.value,
        description: descriptionInput.value,
      }),
    });
  } catch (error) {
    console.log(error);
  }
}

async function getPeriod() {
  try {
    const response = await fetch(`${url}periods/${id}`);
    const results = await response.json();
    appendData(results);
  } catch (error) {
    console.log(error);
  }
}

function appendData(data) {
  nameInput.value = data.name;
  descriptionInput.innerHTML = data.description;
}
