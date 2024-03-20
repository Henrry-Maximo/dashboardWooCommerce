const db = require("../database/db.js");

async function login(user, password) {
    const connection = db.promise();
    const sql = "SELECT id, name, password FROM dashboard_users WHERE name = ? AND password = ?;";
    const dataLogin = [user, password];

    const [rows] = await connection.query(sql, dataLogin);
    return rows;
}


module.exports = login;