const url = "https://arda-wiki-api.onrender.com/api/";

const table = document.querySelector(".crud-table");
const tbody = document.querySelector("tbody");
let id = "";

const deleteModal = document.querySelector(".delete-modal");
const confirmDelete = document.querySelector(".delete-confirm");

const addBtn = document.querySelector(".add-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const closeBtn = document.querySelector(".close-btn");

async function displayTable() {
  try {
    const response = await fetch(`${url}characters?order=character_id`);
    const results = await response.json();

    if (response.ok) {
      createRows(results);
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

displayTable();

function createRows(data) {
  data.forEach((data) => {
    tbody.innerHTML += `
            <tr>
                <td>${data.character_id}</td>
                <td>${data.name}</td>
                <td><button class="update-btn">Update</button><button class="delete-btn">Delete</button></td>
            </tr>
        `;
  });
}

closeBtn.onclick = () => {
  deleteModal.style.display = "none";
};

cancelBtn.onclick = () => {
  deleteModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == deleteModal) {
    deleteModal.style.display = "none";
  }
};

function onDeleteRow(e) {
  if (!e.target.classList.contains("delete-btn")) {
    return;
  }
  deleteModal.style.display = "flex";
  const btn = e.target;
  let row = btn.closest("tr");
  let id = row.cells.item(0).innerHTML;

  confirmDelete.onclick = async function () {
    try {
      const response = await fetch(`${url}characters/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      await response.json();

      if (response.ok) {
        row.remove();
        deleteModal.style.display = "none";
      } else {
        logout();
        if (response.status === 403) {
          alert("Session expired.");
        }
      }
    } catch (error) {
      logout();
    }
  };
}

table.addEventListener("click", onDeleteRow);

addBtn.onclick = () => {
  window.location.assign(`characters-edit.html`);
};

function onUpdateRow(e) {
  if (!e.target.classList.contains("update-btn")) {
    return;
  }
  const btn = e.target;
  let row = btn.closest("tr");
  let id = row.cells.item(0).innerHTML;

  btn.onclick = () => {
    window.location.assign(`characters-edit.html?character_id=${id}`);
  };
}

table.addEventListener("click", onUpdateRow);

function logout() {
  window.location.assign("login.html");
  localStorage.clear();
}
