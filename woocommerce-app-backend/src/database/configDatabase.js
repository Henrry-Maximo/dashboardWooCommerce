const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'order_analytics_db'
});

connection.connect(function (err) {
    if (err) {
        // console.error(`Erro de conexão MySQL: ${err}`);
        // return;
    }
});

module.exports = connection;
