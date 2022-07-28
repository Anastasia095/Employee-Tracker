const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const dataBase = require("./db");
require("console.table");

const options = [

    {
        type: 'list',
        name: 'choice',
        choices: ['View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
        message: 'What would you like to do?',
    },
];

function init() {
    const displayLogo = logo({ name: "employee Manager "}).render();
    console.log(displayLogo);
}

function prompts() {
    inquirer.prompt(options)
        .then((answers) => {
            //call function to handle conditional
        })
}

function displayEmployees() {
    DBclass.findAllEmployees()
    .then
}
init();