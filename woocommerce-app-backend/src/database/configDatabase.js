const mysql = require('mysql2');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'order_analytics_db'
// });


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'order_analytics_db',
    waitForConnections: true,
    connectionLimit: 100, // ou o número máximo de conexões que você deseja
    queueLimit: 0
});



// pool.connect(function (err) {
//     if (err) {
//         throw err;
//     }
// });

module.exports = pool;
