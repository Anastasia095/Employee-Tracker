const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const dbIndex = require("./db/index");
const connection = require("./db/connection");
require("console.table");

const options = [

    {
        type: 'list',
        name: 'choice',
        choices: ['View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
        message: 'What would you like to do?',
    },

];

const addDepartment = [
    {
        type: 'input',
        name: 'depName',
        message: 'Enter department name',

    },
];

const addRole = [
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

const addEmployee = [
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
]
function init() {
    const displayLogo = logo({ name: "employee Manager " }).render();

    prompts();
}

function department() {
    inquirer.prompt(addDepartment)
        .then((answers) => {
            const addDept = new dbIndex(connection);
            dept.addDepartment(answers.name)
        })
};


function role() {
    inquirer.prompt(addRole)
        .then((answers) => {
            dbIndex.addDepartment(answers.name)
        })
};

function employee() {
    inquirer.prompt(addEmployee)
        .then((answers) => {
            dbIndex.addEm
        })
}

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
                    department();
                    break;
                case 'Add a role':
                    role();
                    break;
                default:
                    console.log()
            }

        })
}
//function to display all employees
function displayEmployees() {
    dbIndex.test()
        .then((data) => {
            console.table(data);
        })
}
//function to display all roles
function displayRoles() {
    const role1 = new dbIndex(connection);
    role1.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log("\n")
            console.table(roles);
        })
}

init();