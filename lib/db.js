const mysql = require('mysql');

// Local DB
// const connection = mysql.createConnection({
//     host: 'localhost',
//     database: 'messages',
//     user: 'root',
//     password: 'root'
// })

// Deployed DB
const connection = mysql.createPool({
    host: 'eu-cdbr-west-02.cleardb.net',
    database: 'heroku_b4ada6b5d31e6fa',
    user: 'b58d57ec56b842',
    password: '6a4ef2bf'
})

module.exports = connection;
