const connection = require("./connection");

class DBclass {
    constructor(connection) {
        this.connection = connection;
    }


    findAllEmployees() {
        return this.connection.promise().query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name")
    }
    //create a new department
    createDept(department) {
        return this.RTCPeerConnection.promise().query("INSERT INTO department SET ?", department);
    }
    //remove department
    removeDept(department_id) {
        return this.RTCPeerConnection.promise().query("DELETE FROM department WHERE id = , department?")
    }
}