const url = "http://localhost:5000/api/";
const searchParams = new URLSearchParams(window.location.search);
const category = searchParams.get("table");

async function displayTable() {
  try {
    const response = await fetch(`${url}${category}`);
    const results = await response.json();
    createRows(results);
  } catch (error) {
    console.log(error);
  }
}

displayTable();

const table = document.querySelector(".crud-table");
const tbody = document.querySelector("tbody");
const tableTitle = document.querySelector("th");
let id = "";

function createRows(data) {
  data.forEach((data) => {
    if (category == "Characters") id = data.character_id;
    if (category == "Locations") id = data.location_id;
    if (category == "Races") id = data.race_id;
    if (category == "Events") id = data.event_id;
    if (category == "Periods") id = data.period_id;
    if (category == "Weapons") id = data.weapon_id;

    tableTitle.innerHTML = category;

    tbody.innerHTML += `
            <tr>
                <td>${id}</td>
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
      row.remove();
      deleteModal.style.display = "none";
      const response = await fetch(`${url}${category}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.log(error);
    }
  };
}

table.addEventListener("click", onDeleteRow);

addBtn.onclick = () => {
  window.location.assign(`${category}-edit.html`);
};

function onUpdateRow(e) {
  // if (!e.target.classList.contains("update-btn")) {
  //   return;
  // }
  const btn = e.target;
  let row = btn.closest("tr");
  let id = row.cells.item(0).innerHTML;

  btn.onclick = () => {
    window.location.assign(`${category}-edit.html?${category}_id=${id}`);
  };
}

table.addEventListener("click", onUpdateRow);
