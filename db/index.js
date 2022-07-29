const connection = require("./connection");

class DBclass {
    constructor(connection1) {
        this.connection = connection1;
    };
    findAllEmployees() {
        return this.connection.promise().query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name");
    }
    findAllRoles() {
        return this.connection.promise().query("SELECT roles.title AS 'Role Title' , roles.id AS 'Role ID' FROM roles");
    }

    addDepartment(department) {
        return this.connection.promise().query(`INSERT INTO department_name (dep_name) VALUES ("${department}")`);
    }
    
    addRole(role) {
        return this.connection.promise().query(`INSERT INTO department_name (dep_name) VALUES ${role}`);
    }
    addEmployee(employee){
        return this.connection.promise().query('INSERT INTO ');
    }

    //create a new department
    createDept(department) {
        return this.RTCPeerConnection.promise().query("INSERT INTO department SET ?", department);
    }
    //remove department
    removeDept(department_id) {
        return this.RTCPeerConnection.promise().query("DELETE FROM department WHERE id = , department?");
    }
}

module.exports = DBclass;