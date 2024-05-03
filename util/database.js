// Import the MySQL module
const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
    user: 'root',
    host: 'localhost',
    password: 'khalaf_2002',
    database: 'node-complete'
});

// Promisify the query method of the pool
const query = (sql, data) => {
    return new Promise((resolve, reject) => {
        // Execute the SQL command with data (if provided)
        pool.query(sql, data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = query;
