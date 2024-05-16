const db = require("../database/configDatabase.js"); // importando config db

// validar existência de usuário
async function login(user) {
    const connection = db.promise();
    const sql = "SELECT id, name, password FROM dashboard_users WHERE name = ?;";
    const dataLogin = [user];

    const [rows] = await connection.query(sql, dataLogin);
    return rows;
}

module.exports = login;
