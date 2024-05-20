const db = require("../database/configDatabase.js"); // importando config db

class Database {
  constructor() {
    this.connection = db.promise();
  }

  async insertUser({name, password}) {
    try {
      const sql = "INSERT INTO dashboard_users(name, password) VALUES(?, ?);";
      const dataUser = [name, password];
      await this.connection.query(sql, dataUser);

      return;
    } catch (error) {
      throw error;
    }
  }
  
  async findUser() {
    const conn = await this.connection;
    const sql = "SELECT * FROM dashboard_users";
    const [rows] = await conn.query(sql);
  
    return rows;
  }

  async userExists(username) {
    const query = "SELECT name FROM dashboard_users WHERE name = ?";
    const [rows] = await this.connection.query(query, [username]);
    return rows.length > 0;
  }
  
  async updateUser(name, password, idUser) {
    const conn = await this.connection;
    const sql =
      "UPDATE dashboard_users SET name = ?, passowrd = ? WHERE id = ?";
    const dataUser = [name, password [idUser]];
    await conn.query(sql, dataUser);
  
    return;
  }
  
  async deleteUser(idUser) {
    const conn = await this.connection;
    const sql = "DELETE FROM dashboard_users WHERE id = ?";
    //const dataUser = [idUser];
    await conn.query(sql, [idUser]);
    
    return;
  }
}

module.exports = { Database };
