// config database
const db = require("../database/configDatabase.js");

class Database {
  constructor() {
    // Conexão com o banco de dados
    this.connection = db.promise(); // Versão compatível com promessas da conexão
  }

  async getOrder(orderId) {
    try {
      // Consulta para obter o pedido no banco de dados
      const query = "SELECT * FROM dashboard_orders WHERE id_order = ?;";
      const [rows] = await this.connection.query(query, [orderId]);
      return rows;
    } catch (error) {
      console.error("Erro ao obter pedido do banco de dados:", error);
      throw error; // Lança o erro para tratamento externo, se necessário
    }
  }

  // async insertUser(userData) {
  //   try {
  //     // Insira um novo usuário no banco de dados
  //     const result = await this.connection.query(
  //       "INSERT INTO users SET ?",
  //       userData
  //     );
  //     return result;
  //   } catch (error) {
  //     console.error("Erro ao inserir usuário no banco de dados:", error);
  //     throw error;
  //   }
  // }

  // Outros métodos para atualizar, excluir, etc.
}
// getOrder(10177);

module.exports = {
  Database
}