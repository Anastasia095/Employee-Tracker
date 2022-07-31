const connection = require("./connection");

class DBclass {
    constructor(connection1) {
        this.connection = connection1;
    };

    employeeInfo() {
        return this.connection.promise().query("SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS 'list', employee.id AS 'ID' FROM employee");
    }
    roleInfo() {
        return this.connection.promise().query("SELECT roles.title AS 'Title', roles.id AS 'ID' FROM roles");
    }
    findAllEmployees() {
        return this.connection.promise().query("SELECT a.id AS 'Employee ID', CONCAT(a.first_name, ' ', a.last_name) AS 'Employee Name', roles.title AS 'Job Title', department_name.dep_name AS 'Department', roles.salary AS 'Salary', IFNULL(CONCAT(b.first_name, ' ', b.last_name), 'N/A') AS 'Manager' FROM employee a LEFT JOIN employee b ON b.id = a.manager_id LEFT JOIN roles ON roles.id = a.role_id LEFT JOIN department_name ON department_name.id = roles.department_id;");

    }
    findAllDepartments() {
        return this.connection.promise().query("SELECT department_name.id AS 'Department ID' , department_name.dep_name AS 'Department Name' FROM department_name");
    }
    displayAllDeptId() {
        return this.connection.promise().query("SELECT department_name.id FROM department_name")
    }
    findAllRoles() {
        return this.connection.promise().query("SELECT roles.title AS 'Job Title' , roles.id AS 'Role ID', department_name.dep_name AS 'Department', roles.salary AS 'Role Salary' FROM roles LEFT JOIN department_name on roles.department_id = department_name.id;");
    }

    updateRoles(rID, eID) {
        return this.connection.promise().query(`UPDATE employee SET role_id = ${rID} WHERE id = ${eID};`);
    }
    //create a new department
    addDepartment(department) {
        return this.connection.promise().query(`INSERT INTO department_name (dep_name) VALUES (${department})`);
    }

    addRole(role) {
        return this.connection.promise().query(`INSERT INTO roles (title, salary) VALUES ("${role.roleTitle}", ${role.salary})`);
    }
    addEmployee(firstName, lastName, rID, mID) {
        return this.connection.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${rID},  ${mID})`);
    }



    //remove department
    removeDept(department_id) {
        return this.RTCPeerConnection.promise().query("DELETE FROM department WHERE id = , department?");
    }
}

module.exports = new DBclass(connection);