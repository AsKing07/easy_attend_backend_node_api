// // db.js
// const mysql = require('mysql');
// require('dotenv').config();
// let connection;

// function handleDisconnect() {
//     connection = mysql.createConnection({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_NAME,
//         port: process.env.DB_PORT
//     });

//     connection.connect(err => {
//         if (err) {
//             console.error('error when connecting to db:', err);
//             setTimeout(handleDisconnect, 2000);
//         }
//         else
//         {
//             console.log("Connected to the database");
//         }
//     });

//     connection.on('error', err => {
//         console.error('db error', err);
//         if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET' || err.code==='PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
//             handleDisconnect();
//         } else {
//             throw err;
//         }
//     });
// }

// handleDisconnect();

// module.exports = connection;






const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({
    connectionLimit: 10, // Limite le nombre de connexions actives à 10
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

module.exports = pool;

