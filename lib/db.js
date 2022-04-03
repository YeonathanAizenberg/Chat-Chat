const mysql = require('mysql');

// Local DB
// const connection = mysql.createConnection({
//     host: 'localhost',
//     database: 'messages',
//     user: 'root',
//     password: 'root'
// })

// Deployed DB
const connection = mysql.createConnection({
    host: 'eu-cdbr-west-02.cleardb.net',
    database: 'heroku_f700cfc64a081e0',
    user: 'bc8debc2e9124d',
    password: 'f54b88d6'
})

module.exports = connection;