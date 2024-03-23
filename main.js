document.addEventListener("DOMContentLoaded", function () {
  const teamContainer = document.querySelector(".teams");
  const addTeamForm = document.getElementById("addTeamForm");
  const addTeamButton = document.getElementById("addTeamButton");
  const input = document.querySelector(".addteam");

  function addTeam() {
    const teamName = input.value.trim();

    if (teamName !== "") {
      const newTeam = document.createElement("div");
      newTeam.classList.add("team");
      newTeam.innerHTML = `
                <div class="team-inner">
                    <i class="fa-brands fa-creative-commons-sampling-plus"></i>
                    <span>${teamName}</span>
                </div>
                <p class="lite">x+${
                  document.querySelectorAll(".team").length + 1
                }</p>
            `;
      teamContainer.insertBefore(newTeam, addTeamForm);
      input.value = "";
    }
  }

  addTeamForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTeam();
  });
  addTeamButton.addEventListener("click", function (event) {
    event.preventDefault();
    addTeam();
  });
  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTeam();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
    const addFolderIcons = document.querySelectorAll(".fa-solid.fa-plus");
    const caretDownIcons = document.querySelectorAll(".fa-solid.fa-caret-down");
  
    addFolderIcons.forEach(function (icon) {
      icon.addEventListener("click", function () {
        const folderName = prompt("Enter the name of the new folder:");
        if (folderName) {
          const newFolder = document.createElement("ul");
          newFolder.classList.add("folders-list");
          newFolder.innerHTML = `
            <div class="products">
              <div>
                <i class="fa-regular fa-folder"></i>
                <span>${folderName}</span>
              </div>
              <div class="actions">
                <i class="fa-solid fa-caret-down"></i>
              </div>
            </div>
            <ul class="productsList"> <!-- Subfolders -->
              <li>Team</li>
              <li>
                <i class="fa-regular fa-square-plus"></i>
                <span>Add new sub</span>
              </li>
            </ul>
          `;
          icon.parentElement.parentElement.appendChild(newFolder);
        }
      });
    });
    caretDownIcons.forEach(function (icon) {
        icon.addEventListener("click", function () {
          const productList = icon.closest(".folders-list").querySelector(".productsList");
          icon.classList.toggle("fa-caret-down");
          icon.classList.toggle("fa-caret-up");
          productList.classList.toggle("show");
        });
      });
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    
    const searchInput = document.querySelector('.search input[type="text"]');
    searchInput.addEventListener('input', function () {
        const searchText = this.value.toLowerCase();
        const tableRows = document.querySelectorAll('.table-body');
        tableRows.forEach(row => {
            const company = row.querySelector('.company span').textContent.toLowerCase();
            if (company.includes(searchText)) {
                row.style.display = 'table-row';
            } else {
                row.style.display = 'none';
            }
        });
    });

    const allBrands = document.getElementById('allBrands');
    allBrands.addEventListener('click', function() {
      const tableRows = document.querySelectorAll('.table-body');
  tableRows.forEach(row => {
    const columns = row.querySelectorAll('td');
    columns.forEach((column, index) => {
      if (index !== 0) { 
        column.style.display = 'none';
      }
    });
  });
});

let ascendingOrder = true;

const sortTable = () => {
    const table = document.querySelector(".table tbody");
    const rows = Array.from(table.querySelectorAll("tr.table-body"));

    rows.sort((a, b) => {
        const textA = a.querySelector(".company").textContent.toLowerCase();
        const textB = b.querySelector(".company").textContent.toLowerCase();
        
        if (ascendingOrder) {
            return textA.localeCompare(textB);
        } else {
            return textB.localeCompare(textA);
        }
    });

    table.innerHTML = "";
    rows.forEach(row => table.appendChild(row));
};

const sortIcon = document.getElementById("sort");
sortIcon.addEventListener("click", function () {
    ascendingOrder = !ascendingOrder;
    sortTable();
});

const tagFilter = document.getElementById('tagFilter');


const tableRows = document.querySelectorAll('.table-body');


tagFilter.addEventListener('change', function() {
    const selectedTag = this.value.toLowerCase(); 

   
    tableRows.forEach(row => {
        const categories = row.querySelector('.category').innerText.toLowerCase(); 
        if (selectedTag === '' || categories.includes(selectedTag)) { 
            row.style.display = ''; 
        } else {
            row.style.display = 'none';
        }
    });
});
  
  const addBrandIcon = document.querySelector(".table-head .fa-plus");
  addBrandIcon.addEventListener("click", function () {
    const brandName = prompt("Enter the brand name:");
    if (brandName) {
      const table = document.querySelector("tbody");
      const newRow = document.createElement("tr");
      newRow.classList.add("table-body");
      newRow.innerHTML = `
        <td class="company">
          <div>
            <input type="checkbox" />
            <img src="./assets/brand_logo_placeholder.png" alt="" />
            <span>${brandName}</span>
          </div>
        </td>
        <td class="description">New brand description</td>
        <td>
          <div>
            <img src="./assets/user_placeholder.png" alt="" />
          </div>
        </td>
        <td>New category</td>
        <td>New tags</td>
        <td>New meeting date</td>
      `;
      table.appendChild(newRow);
    }
  });

    const addColumnIcon = document.querySelector(".table-head th:last-child .fa-plus");
    addColumnIcon.addEventListener("click", function () {
      const columnName = prompt("Enter the column name:");
      if (columnName) {
        const tableHeadRow = document.querySelector(".table-head");
        const newColumn = document.createElement("th");
        newColumn.textContent = columnName;
        tableHeadRow.insertBefore(newColumn, tableHeadRow.lastElementChild);
        
        const tableBodyRows = document.querySelectorAll(".table-body");
        tableBodyRows.forEach(function (row) {
          const newCell = document.createElement("td");
          newCell.textContent = "New data";
          row.appendChild(newCell);
        });
      }
    });
  });
    document.addEventListener("DOMContentLoaded", function() {
      const checkboxesDiv = document.querySelector('.checkboxs');
      const checkboxes = document.querySelectorAll('.checkboxInput');
      const selectedCountSpan = checkboxesDiv.querySelector('.selected-count');
      const crossIcon = checkboxesDiv.querySelector('.fa-xmark');
      const archiveBtn = checkboxesDiv.querySelector('.archive-btn');
      const deleteBtn = checkboxesDiv.querySelector('.delete-btn');
  
      checkboxes.forEach(checkbox => {
          checkbox.addEventListener('change', updateSelectedCount);
      });
  
      function updateSelectedCount() {
          const selectedRows = document.querySelectorAll('.checkboxInput:checked');
          const selectedCount = selectedRows.length;
  
          selectedCountSpan.textContent = selectedCount;
          if (selectedCount > 0) {
              checkboxesDiv.style.display = 'flex'; 
          } else {
              checkboxesDiv.style.display = 'none';
          }
      }
  
      crossIcon.addEventListener('click', function() {
          checkboxes.forEach(checkbox => {
              checkbox.checked = false;
          });
          updateSelectedCount();
      });
  
      archiveBtn.addEventListener('click', function() {
          const selectedRows = document.querySelectorAll('.table-body input[type="checkbox"]:checked');
          selectedRows.forEach(row => {
              row.closest('.table-body').remove();
          });
          updateSelectedCount();
      });
  
      deleteBtn.addEventListener('click', function() {
          const selectedRows = document.querySelectorAll('.table-body input[type="checkbox"]:checked');
          selectedRows.forEach(row => {
              row.closest('.table-body').remove();
          });
          updateSelectedCount();
      });
  });
  
  const menuIcon = document.querySelector('.menuIcon')
  menuIcon.addEventListener("click", function () {
    let sideNav = document.querySelector('.navbar')
    sideNav.classList.toggle("navbar")
  })