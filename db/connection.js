const mysql = require("mysql2");

const connection = mysql.connectToDb({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "employees"
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;