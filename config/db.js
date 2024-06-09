const mysql = require('mysql');
require('dotenv').config();

let connection;

function createConnection() {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    });

    connection.connect(err => {
        if (err) {
            console.error('error when connecting to db:', err);
            reconnect();
        } else {
            console.log("Connected to the database");
        }
    });

    connection.on('error', err => {
        console.error('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET' || err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
            connection.destroy(); // Ferme la connexion avant de tenter une reconnexion
            reconnect(); // Tente une reconnexion
        } else {
            throw err;
        }
    });
}

function reconnect() {
    setTimeout(createConnection, 10000);
}

createConnection();

// Export the active connection directly
module.exports = connection;
