// config database
const db = require("../database/configDatabase.js");

class Database {
  constructor() {
    // Conexão com o banco de dados
    this.connection = db.promise(); // Versão compatível com promessas da conexão
    this.fetchActiveOrder = true;
  }

  async getOrder(orderId) {
    try {
      // Consulta para obter o pedido no banco de dados
      const selectOrderQuery =
        "SELECT * FROM dashboard_orders WHERE id_order = ?;";
      const [rows] = await this.connection.query(selectOrderQuery, [orderId]);
      
      // Se não houver resultado, retornar null
      if (rows.length === 0) {
        return null;
      }

      return rows;
    } catch (error) {
      console.error("Erro ao obter pedido do banco de dados:", error);
      throw error; // Lança o erro para tratamento externo, se necessário
    }
  }

  async insertOrder(
    orderId,
    number,
    status,
    printed,
    date_created,
    date_modified
  ) {
    try {
      // Inserir pedido no banco de dados
      const insertOrderQuery =
        "INSERT INTO dashboard_orders(id_order, order_number, status, printed, date_created, date_modified) VALUES(?, ?, ?, ?, ?, ?)";
      const [rows] = await this.connection.query(insertOrderQuery, [
        orderId,
        number,
        status,
        printed,
        date_created,
        date_modified,
      ]);

      if (!!rows && rows.length > 0) {
        console.log("Inserção feita com sucesso");
      }

      // return res.status(200).send({ message: "Pedido inserido com sucesso" });
    } catch (error) {
      console.error("Erro ao inserir pedido no banco de dados:", error);
      throw error;
    }
  }

  async updateOrder(orderId, status, printed, date_modified, active) {
    try {
      // Consulta para obter o pedido no banco de dados
      const updateOrderQuery =
        "INSERT INTO dashboard_orders(id_order, status, printed, date_modified, active) VALUES(?, ?, ?, ?) WHERE id_order = ?";
      const [rows] = await this.connection.query(updateOrderQuery, [
        status,
        printed,
        date_modified,
        active,
        [orderId],
      ]);

      if (!!rows && rows.length > 0) {
        console.log("Atualização do pedido feita com sucesso");
      }
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error);
      throw error;
    }
  }

  // async deleteOrder(
  //   orderId,
  //   number,
  //   status,
  //   printed,
  //   date_created,
  //   date_modified
  // ) {
  //   try {
  //     // Consulta para obter o pedido no banco de dados
  //     const queryDatabase =
  //       "INSERT INTO dashboard_orders(id_order, order_number, status, printed, date_created, date_modified) VALUES(?, ?, ?, ?, ?, ?)";
  //     const queryApi = [
  //       orderId,
  //       number,
  //       status,
  //       printed,
  //       date_created,
  //       date_modified,
  //     ];

  //     const [rows] = await this.connection.query(queryDatabase, queryApi);

  //     if (!!rows && rows.length > 0) {
  //       console.log("Inserção feita com sucesso");
  //     }
  //   } catch (error) {
  //     console.error("Erro ao inserir pedido no banco de dados:", error);
  //     throw error; // Lança o erro para tratamento externo, se necessário
  //   }
  // }
}

module.exports = {
  Database,
};
