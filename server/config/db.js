const mysql = require('mysql2');

// Creating a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Wrapped the pool in a promise-based API
const promisePool = pool.promise();

module.exports = promisePool;
