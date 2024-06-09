const mysql = require('mysql');
require('dotenv').config();

let    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    });

function handleDisconnect() {
 

    connection.connect(err => {
        if (err) {
            console.error('error when connecting to db:', err);
            setTimeout(handleDisconnect, 10000);
        } else {
            console.log("Connected to the database");
        }
    });

    connection.on('error', err => {
        console.error('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET' || err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

// Export the active connection directly
module.exports = connection;
