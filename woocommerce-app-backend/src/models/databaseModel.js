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
        "SELECT * FROM dashboard_orders WHERE id_order = ? ORDER BY date_created ASC;";
      const [rows] = await this.connection.query(selectOrderQuery, [orderId]);

      return rows;
    } catch (error) {
      throw error;
    }
  }

  async getOrderbyDateAsc() {
    try {
      // Consulta para obter os pedidos (ativo + decrescente)
      const selectOrderQuery =
        "SELECT * FROM dashboard_orders WHERE active = 1 ORDER BY date_created ASC;";
      const [rows] = await this.connection.query(selectOrderQuery);

      return rows;
    } catch (error) {
      throw error;
    }
  }

  async getOrderbyDateAscDeactivate(idOrder) {
    try {
      // Consulta para obter os pedidos (ativo + decrescente)
      const selectOrderQuery =
        "SELECT * FROM dashboard_orders WHERE active = 0 AND id_order = ? ORDER BY date_created ASC;";
      const [rows] = await this.connection.query(selectOrderQuery,[idOrder]);

      return rows;
    } catch (error) {
      throw error;
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
        "INSERT INTO dashboard_orders(id_order, order_number, status, printed, date_created, date_modified, active) VALUES(?, ?, ?, ?, ?, ?, ?)";
      const [rows] = await this.connection.query(insertOrderQuery, [
        orderId,
        number,
        status,
        printed,
        date_created,
        date_modified,
        this.fetchActiveOrder ? 1 : 0,
      ]);

      if (!!rows && rows.length > 0) {
        // console.log("Inserção feita com sucesso");
      }
    } catch (error) {
      throw error;
    }
  }

  async updateOrder(orderId, status, printed, date_modified) {
    try {
      // Consulta para obter o pedido no banco de dados
      const updateOrderQuery =
        "UPDATE dashboard_orders SET status = ?, printed = ?, date_modified = ? WHERE id_order = ?";
      await this.connection.query(updateOrderQuery, [
        status,
        printed,
        date_modified,
        [orderId],
      ]);
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error);
      throw error;
    }
  }

  async selectMissingOrders(orders) {
    if (orders.length > 0) {
      const selectMissingOrders = `SELECT * FROM dashboard_orders WHERE active = 1 AND id_order NOT IN (?)`;
      const [rows] = await this.connection.query(selectMissingOrders, [orders]);
      return rows;
    }
    return;
  }

  async updateOrderForDeactivate(isActive, orderId) {
    try {
      // Consulta para obter o pedido no banco de dados
      const updateOrderQuery =
        "UPDATE dashboard_orders SET active = ? WHERE id_order = ?";
      await this.connection.query(updateOrderQuery, [isActive, orderId]);
      return;
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error);
      throw error;
    }
  }
}

module.exports = {
  Database,
};
