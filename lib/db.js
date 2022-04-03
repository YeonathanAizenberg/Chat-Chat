const mysql = require('mysql');

const connection = mysql.createPool({
    host: 'localhost',
    database: 'messages',
    user: 'root',
    password: 'root'
})

module.exports = connection;