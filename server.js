const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const { run } = require("node:test");

const PORT = process.env.PORT || 3001;

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`)
);

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
      db.query("SELECT * FROM departments", (err, results) => {
        console.table(results);
        runOptions();
      });
      break;
    case "View all roles":
      db.query(
        "SELECT roles.id, title, salary, departments.name FROM roles JOIN departments ON departments.id = roles.department_id",
        (err, results) => {
          console.table(results);
          runOptions();
        }
      );
      break;
    case "View all employees":
      db.query(
        "SELECT employees.id, first_name, last_name, roles.title, manager_id FROM employees JOIN roles ON roles.id = employees.role_id",
        (err, results) => {
          console.table(results);
          runOptions();
        }
      );
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
  inquirer
    .prompt({
      type: "input",
      message: "Enter the department name",
      name: "name",
    })
    .then((response) => {
      db.query("INSERT INTO departments(name) VALUES (?)", response.name);
      runOptions();
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the title of the role",
        name: "title",
      },
      {
        type: "input",
        message: "Enter the salary of the role",
        name: "salary",
      },
      {
        type: "input",
        message: "Enter the department id of the role",
        name: "department",
      },
    ])
    .then((response) => {
      db.query(
        `INSERT INTO roles(title, salary, department_id) VALUES ('${response.title}', ${response.salary}, ${response.department})`
      );
      runOptions();
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employee's first name",
        name: "first_name",
      },
      {
        type: "input",
        message: "Enter the employee's last name",
        name: "last_name",
      },
      {
        type: "input",
        message: "Enter the employee's role id",
        name: "role",
      },
      {
        type: "input",
        message: "Enter the employee's manager's id",
        name: "manager",
      },
    ])
    .then((response) => {
      db.query(
        `INSERT INTO employees(first_name, last_name, manager_id, role_id) VALUES ('${response.first_name}', '${response.last_name}', ${response.manager}, ${response.role})`
      );
      runOptions();
    });
}

function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employee's id",
        name: "id",
      },
      {
        type: "input",
        message: "Enter the employee's first name",
        name: "first_name",
      },
      {
        type: "input",
        message: "Enter the employee's last name",
        name: "last_name",
      },
      {
        type: "input",
        message: "Enter the employee's role id",
        name: "role",
      },
      {
        type: "input",
        message: "Enter the employee's manager's id",
        name: "manager",
      },
    ])
    .then((response) => {
      db.query(
        `UPDATE employees SET first_name = '${response.first_name}', last_name = '${response.last_name}', manager_id = ${response.manager}, role_id = ${response.role} WHERE id = ${response.id}`
      );
      runOptions();
    });
}

runOptions();
