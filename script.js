// Creating class Employee
class Employee {
  constructor(employeeId, name, address, designation) {
    this.employeeId = employeeId.toUpperCase();
    this.name = name.toUpperCase();
    this.address = address.toUpperCase();
    this.designation = designation.toUpperCase();
  }
}

// Map which will store the data (map=array+object)
const employees = new Map();

function addEmployee(event) {
  event.preventDefault();
  // Get the value from the input tag
  const employeeId = document.getElementById("employeeId").value.trim();
  const name = document
    .getElementById("employee-Name")
    .value.trim()
    .toUpperCase();
  const address = document
    .getElementById("employee-address")
    .value.trim()
    .toUpperCase();
  const designation = document
    .getElementById("employee-designation")
    .value.trim()
    .toUpperCase();

  // if any data is  missing then it will popup this message and return
  if (!employeeId || !name || !address || !designation) {
    alert("Please fill out all the required input");
    return;
  }

  // duplicate ID is not allowed
  if (employees.has(employeeId.toUpperCase())) {
    alert("Duplicate employee ID is not allowed");
    return;
  }

  // creating the object and adding into the employees map
  const newEmployee = new Employee(employeeId, name, address, designation);
  employees.set(employeeId, newEmployee);

  // Get the dynamic table row and data and display this in screen
  const tableRow = createTableRow(newEmployee);
  document.getElementById("employeeList-table").appendChild(tableRow);

  // once submitted then reset all the data from the input tags
  document.getElementById("employeeForm").reset();
}

// function to create the dynamic table row and table data
function createTableRow(employee) {
  const tableRow = document.createElement("tr");
  tableRow.setAttribute("id", employee.employeeId);

  tableRow.innerHTML = `<td>${employee.employeeId}</td>
                       <td>${employee.name}</td>
                       <td>${employee.address}</td>
                       <td>${employee.designation}</td>
                       <td><button class="edit-btn" onClick="updateField('${employee.employeeId}')">Edit</button></td>`;

  return tableRow;
}

// populate the data into the input field
function updateField(employeeId) {
  const employee = employees.get(employeeId);
  document.getElementById("employeeId").readOnly = true; //employee id cannot be edit
  document.getElementById("employeeId").value = employee.employeeId;
  document.getElementById("employee-Name").value = employee.name;
  document.getElementById("employee-address").value = employee.address;
  document.getElementById("employee-designation").value = employee.designation;
  document.getElementById("add-btn").classList.add("disable-add-btn");
  document.getElementById("updateButton").classList.add("enable-update-btn"); //adding class enable-update-btn for styling purpose
  document.getElementById("add-btn").disabled = true; //making the add button non-clickable
  document.getElementById("updateButton").disabled = false; //making the updatebutton clickable
}

// Update the data of user.
function updateEmployee(event) {
  event.preventDefault();

  // Getting the data from the input field
  const employeeId = document.getElementById("employeeId").value.trim();
  const name = document
    .getElementById("employee-Name")
    .value.trim()
    .toUpperCase();
  const address = document
    .getElementById("employee-address")
    .value.trim()
    .toUpperCase();
  const designation = document
    .getElementById("employee-designation")
    .value.trim()
    .toUpperCase();

  // All data are require
  if (!name || !address || !designation) {
    alert("Please fill out all the required input");
    return;
  }

  // fetching the data from the map and updating it
  const employee = employees.get(employeeId);
  employee.name = name;
  employee.address = address;
  employee.designation = designation;

  // Also showing the updated data in the screen
  const tableRow = document.getElementById(employeeId);
  tableRow.querySelectorAll("td")[1].innerText = name;
  tableRow.querySelectorAll("td")[2].innerText = address;
  tableRow.querySelectorAll("td")[3].innerText = designation;

  // After updating clear the  data from input field
  document.getElementById("employeeForm").reset();

  // making the add button clickable
  document.getElementById("add-btn").disabled = false;

  // making the update button non-clickable
  document.getElementById("updateButton").disabled = true;

  // making the emoloyee id field editable
  document.getElementById("employeeId").readOnly = false;

  // removing the classname dynamically
  document.getElementById("updateButton").classList.remove("enable-update-btn");
  document.getElementById("add-btn").classList.remove("disable-add-btn");
}

// click events for add button , update button and reset button
document.getElementById("add-btn").addEventListener("click", addEmployee);
document
  .getElementById("updateButton")
  .addEventListener("click", updateEmployee);
document.getElementById("resetData").addEventListener("click", () => {
  document.getElementById("add-btn").classList.remove("disable-add-btn");
  document.getElementById("updateButton").classList.remove("enable-update-btn");
  document.getElementById("employeeId").readOnly = false;
  document.getElementById("add-btn").disabled = false;
  document.getElementById("updateButton").disabled = true;
});
