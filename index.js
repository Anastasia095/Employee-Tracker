const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const dbIndex = require("./db");
require("console.table");

const options = [

    {
        type: 'list',
        name: 'choice',
        choices: ['View all roles', 'View all employees', 'View all departments', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
        message: 'What would you like to do?',
    },

];
const backToMenu = [{
    type: 'list',
    name: 'choice',
    choices: ['Yes', 'No'],
    message: 'Select Yes to perform another action or No to Quit',
}

]
const addRoleQ = [
    {
        type: 'input',
        name: 'roleTitle',
        message: 'Enter role title',

    },
    {
        type: 'input',
        name: 'salary',
        message: 'Enter role salary',

    },
];

const addEmployeeQ = [
    {
        type: 'input',
        name: 'firstName',
        message: 'Enter First Name',
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'Enter Last Name',
    },
    {
        type: 'input',
        name: 'roleId',
        message: 'Enter Role Id',
    },
];
const addDepartmentQ = [
    {
        type: 'input',
        name: 'depName',
        message: 'Enter Department Name',
    },

];
function init() {
    const displayLogo = logo({ name: "employee Manager " }).render();

    prompts();
}

function restart() {
    inquirer.prompt(backToMenu)
        .then((answer) => {
            switch (answer.choice) {
                case 'Yes':
                    prompts();
                    break;
                default:
                    return;
            }

        })
};
//function to render menu
function prompts() {
    inquirer.prompt(options)
        .then((answers) => {
            switch (answers.choice) {
                case 'View all roles':
                    displayRoles();
                    break;
                case 'View all employees':
                    displayEmployees();
                    break;
                case 'Add a department':
                    AddDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'View all departments':
                    displayDepartments();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                default:
                    console.log("switch is broken")
            }

        })
};
//function to display all roles
function displayRoles() {
    dbIndex.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log("\n");
            console.table(roles);
            restart();
        });
    
};
//function to display all employees
function displayEmployees() {
    dbIndex.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log("\n");
            console.table(employees);
            restart();
        })
};

//function to display all departments
function displayDepartments() {
    dbIndex.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.log("\n");
            console.table(departments);
            restart();
        })
};
function AddDepartment() {
    inquirer.prompt(addDepartmentQ)
        .then((answers) => {
            console.log(answers)
            dbIndex.addDepartment(answers.depName)
                .then(console.log("New Department '" + answers.depName + "' has been added!"));
                restart();
        })

};

function addRole() {
    inquirer.prompt(addRoleQ)
        .then((answers) => {
            dbIndex.addRole(answers);
            restart();
        })
};

function addEmployee() {
    inquirer.prompt(addEmployeeQ)
        .then((answers) => {
            dbIndex.addEmployee(answers)
                .then(console.log("New Employee '" + answers.firstName + " " + answers.lastName + " has been added!"));
                restart();
        })
};





init();