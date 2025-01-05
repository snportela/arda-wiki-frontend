const url = "http://localhost:5000/api/";
const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("event_id");

const nameInput = document.querySelector(".name-input");
const descriptionInput = document.querySelector(".description-input");
const periodInput = document.querySelector(".period-input");
const form = document.getElementById("edit-form");
const editBtn = document.querySelector(".edit-confirm");
const title = document.querySelector("h2");

if (!id) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addEvent();
  });
}

if (id) {
  getEvent();
  title.innerText = "Update";
  editBtn.innerText = "Update";
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    updateEvent();
  });
}

async function addEvent() {
  try {
    const response = await fetch(`${url}events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: nameInput.value,
        description: descriptionInput.value,
        period_id: [periodInput.value],
      }),
    });
    await response.json();

    if (response.ok) {
      window.location.assign("http://127.0.0.1:5500/admin/events-table.html");
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

async function updateEvent() {
  try {
    const response = await fetch(`${url}events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: nameInput.value,
        description: descriptionInput.value,
        period_id: [periodInput.value],
      }),
    });
    await response.json();

    if (response.ok) {
      window.location.assign("http://127.0.0.1:5500/admin/events-table.html");
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

async function getEvent() {
  try {
    const response = await fetch(`${url}events/${id}`);
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

function appendData(data) {
  nameInput.value = data.name;
  descriptionInput.innerHTML = data.description;
  periodInput.value = data.period_id;
}

function logout() {
  window.location.assign("login.html");
  localStorage.clear();
}
