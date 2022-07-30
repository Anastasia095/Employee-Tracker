const connection = require("./connection");

class DBclass {
    constructor(connection1) {
        this.connection = connection1;
    };
    findAllEmployees() {
        return this.connection.promise().query("SELECT employee.id AS 'Employee ID', CONCAT(employee.first_name, ' ', employee.last_name) AS 'Employee Name', employee.role_id AS 'Role ID', employee.manager_id AS 'Manager ID' FROM employee");
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
    //create a new department
    addDepartment(department) {
        return this.connection.promise().query(`INSERT INTO department_name (dep_name) VALUES (${department})`);
    }
    
    addRole(role) {
        return this.connection.promise().query(`INSERT INTO roles (title, salary) VALUES ("${role.roleTitle}", ${role.salary})`);
    }
    addEmployee(employee){
        return this.connection.promise().query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ("${employee.firstName}", "${employee.lastName}", ${employee.roleId})`);
    }



    //remove department
    removeDept(department_id) {
        return this.RTCPeerConnection.promise().query("DELETE FROM department WHERE id = , department?");
    }
}

module.exports = new DBclass(connection);