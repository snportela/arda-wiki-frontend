const url = "http://localhost:5000/api/";

async function displayTable() {
  try {
    const response = await fetch(`${url}locations?order=location_id`);
    const results = await response.json();
    createRows(results);
  } catch (error) {
    console.log(error);
  }
}

displayTable();

const table = document.querySelector(".crud-table");
const tbody = document.querySelector("tbody");
let id = "";

function createRows(data) {
  data.forEach((data) => {
    tbody.innerHTML += `
            <tr>
                <td>${data.location_id}</td>
                <td>${data.name}</td>
                <td><button class="update-btn">Update</button><button class="delete-btn">Delete</button></td>
            </tr>
        `;
  });
}

const deleteModal = document.querySelector(".delete-modal");
const confirmDelete = document.querySelector(".delete-confirm");

const addBtn = document.querySelector(".add-btn");

const cancelBtn = document.querySelector(".cancel-btn");
const closeBtn = document.querySelector(".close-btn");

closeBtn.onclick = () => {
  deleteModal.style.display = "none";
};

cancelBtn.onclick = () => {
  deleteModal.style.display = "none";
};

window.onclick = function (location) {
  if (location.target == deleteModal) {
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
      deleteModal.style.display = "none";
      const response = await fetch(`${url}locations/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) row.remove();
    } catch (error) {
      console.log(error);
    }
  };
}

table.addEventListener("click", onDeleteRow);

addBtn.onclick = () => {
  window.location.assign(`locations-edit.html`);
};

function onUpdateRow(e) {
  if (!e.target.classList.contains("update-btn")) {
    return;
  }
  const btn = e.target;
  let row = btn.closest("tr");
  let id = row.cells.item(0).innerHTML;

  btn.onclick = () => {
    window.location.assign(`locations-edit.html?location_id=${id}`);
  };
}

table.addEventListener("click", onUpdateRow);
