const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const dbIndex = require("./db");
require("console.table");

//******TOOLS */
//checking for odd or even number to use in loops to sort data.
function isEven(value) {
    if (value % 2 == 0)
        return true;
    else
        return false;
};
//this function gets object from query function, these objects have 2 pairs of values and keys, this function splites them up in 2 arrays and returns them as an object.
function getCurrentData(data) {
    const list = data.map(i => Object.values(i));
    const mergedList = [].concat.apply([], list);

    const arrName = [];
    const arrID = [];
    //this loop will split the returned data into 2 arrays 1 witn employees names and 2 with IDs to use with inquirer. 
    for (var i = 0; i < mergedList.length; i++) {
        if (isEven(i)) {
            arrName.push(mergedList[i]);
        } else {
            arrID.push(mergedList[i]);
        }
    };

    return [arrName, arrID];
}
//********** */
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

];

const addDepartmentQ = [
    {
        type: 'input',
        name: 'depName',
        message: 'Enter Department Name',
        validate: function (depName) {
            if (!depName) {
                return "Please enter Department Name"
            }
            return true;
        }
    },

];
function init() {
    const displayLogo = logo({ name: "employee Manager " }).render();
    //rendering logo
    console.log(displayLogo);
    addRole();
    // prompts();
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
            dbIndex.addDepartment(answers.depName)
                .then(console.log("New Department '" + answers.depName + "' has been added!"));
            restart();
        })

};

function addRole() {
    dbIndex.findAllDepartments().then(([rows]) => {
        var depData = getCurrentData(rows);
        const deptID = depData[0];
        const depTitle = depData[1];
        const addRoleQ = [
            {
                type: 'input',
                name: 'roleTitle',
                message: 'Enter role title',
                validate: function (roleTitle) {
                    if (!roleTitle) {
                        return "Please enter Role Title"
                    }
                    return true;
                }
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter role salary',
                validate: function (salary) {
                    if (!salary) {
                        return "Please enter Salary"
                    }
                    else if (isNaN(salary)) {
                        return "Please enter valid Salary"
                    }
                    return true;
                }

            },
            {
                type: 'list',
                name: 'department',
                choices: depTitle,
                message: 'Select Department',

            },
        ];
        inquirer.prompt(addRoleQ)
            .then((answers) => {
                let j = depTitle.indexOf(answers.department);
                dbIndex.addRole(answers.roleTitle, answers.salary, deptID[j]);
                restart();
            });
    });

};

function addEmployee() {
    dbIndex.roleInfo().then(([rows]) => {
        var processedData2 = getCurrentData(rows);
        const roleT = processedData2[0];
        const roleID = processedData2[1];
        dbIndex.employeeInfo().then(([rows]) => {
            var processedData3 = getCurrentData(rows);
            const manager = processedData3[0];
            manager.push('N/A');
            const eID = processedData3[1];

            const addEmployeeQ = [
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Enter First Name',
                    validate: function (firstName) {
                        if (!firstName) {
                            return "Please enter First Name"
                        }
                        return true;
                    }

                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Enter Last Name',
                    validate: function (lastName) {
                        if (!lastName) {
                            return "Please enter Last Name"
                        }
                        return true;
                    }
                },
                {
                    type: 'list',
                    name: 'role',
                    choices: roleT,
                    message: 'Select Role',
                },
                {
                    type: 'list',
                    name: 'manager',
                    choices: manager,
                    message: 'Select Manager if any',
                },
            ];
            inquirer.prompt(addEmployeeQ)
                .then((answers) => {
                    var managerID = 0;
                    let mIndex = 0;
                    if (answers.manager == 'N/A') {
                        managerID = null;
                    } else {
                        mIndex = manager.indexOf(answers.manager);
                        managerID = eID[mIndex];
                    }

                    let rIndex = roleT.indexOf(answers.role);
                    console.log(mIndex, rIndex)
                    dbIndex.addEmployee(answers.firstName, answers.lastName, roleID[rIndex], managerID).then(console.log("New Employee '" + answers.firstName + " " + answers.lastName + " has been added!"));
                    restart();
                });
        });
    });

};

function updateRole() {
    dbIndex.employeeInfo().then(([rows]) => {
        var processedData = getCurrentData(rows);
        const employees = processedData[0];
        const eID = processedData[1];

        dbIndex.roleInfo().then(([rows]) => {
            var processedData1 = getCurrentData(rows);
            const rTitles = processedData1[0];
            const rID = processedData1[1];

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
                restart();
            });
        });
    });

}

init();