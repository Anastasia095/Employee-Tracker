const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const dbIndex = require("./db");
require("console.table");

const options = [

    {
        type: 'list',
        name: 'choice',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
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

    function updateRole() {
        dbIndex.employeeInfo().then(([rows]) => {
            let employees1 = rows;
            const list = employees1.map(i => Object.values(i));
            const mergedList = [].concat.apply([], list);
            const employees = [];
            const eID = [];
             //checking for odd or even number to use in loop below, because there is the same numbers of employees and IDs i'm doing it to separate data.
             function isEven(value) {
                if (value%2 == 0)
                    return true;
                else
                    return false;
            };
            //this loop will split the returned data into 2 arrays 1 witn employees names and 2 with IDs to use with inquirer. 
            for (var i = 0; i < mergedList.length; i++) {
                if(isEven(i)) {
                    employees.push(mergedList[i]);
                } else {
                    eID.push(mergedList[i]);
                }
            };
            dbIndex.roleInfo().then(([rows]) => {
                let roles1 = rows;
                const rList = roles1.map(i => Object.values(i));
                const mergedRList = [].concat.apply([], rList);
                const rTitles = [];
                const rID = [];
            //this loop will split the returned data into 2 arrays 1 witn employees names and 2 with IDs to use with inquirer. 
            for (var i = 0; i < mergedRList.length; i++) {
                if(isEven(i)) {
                    rTitles.push(mergedRList[i]);
                } else {
                    rID.push(mergedRList[i]);
                }
            };

            const changeRole = [
                {
                    type: 'list',
                    name: 'employee',
                    choices: employees,
                    message: 'Which employee would you like to update?',
                },
                {
                    type: 'list',
                    name: 'role',
                    choices: rTitles,
                    message: 'Select new Role',
                },


            ];
            inquirer.prompt(changeRole).then((answer) => {
                //getting indexes for employee elements and roles, to get ID index
                let index = employees.indexOf(answer.employee);
                let roleIndex = rTitles.indexOf(answer.role);
                dbIndex.updateRoles(rID[roleIndex], eID[index]).then(console.log(`Role of the following employee ${answer.employee} has been updated. New role: ${answer.role}`)); 
            });
        });
        });
    
    }
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
                case 'Update an employee role':
                    updateRole();
                    break;
                default:
                    console.log("Error please restart program")
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