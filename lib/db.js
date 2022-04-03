const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'messages',
    user: 'root',
    password: 'root'
})

module.exports = connection;