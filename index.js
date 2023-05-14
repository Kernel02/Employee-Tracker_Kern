const inquirer = require("inquirer");
const { run } = require("node:test");

function runOptions() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Select one of the following:",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
        name: "options",
      },
    ])
    .then((response) => checkOption(response.options));
}

function checkOption(option) {
  switch (option) {
    case "View all departments":
      
      break;
    case "View all roles":
      
      break;
    case "View all employees":
      
      break;
    case "Add a department":
      addDepartment();
      break;
    case "Add a role":
      addRole();
      break;
    case "Add an employee":
      addEmployee();
      break;
    case "Update an employee role":
      updateEmployee();
      break;
  }
}

function addDepartment() {
    console.log('Added a department')
}

function addRole() {
    console.log('Added a role')
}

function addEmployee() {
    console.log('Added an employee')
}

function updateEmployee() {
    console.log('Updated an employee')
}

runOptions();
