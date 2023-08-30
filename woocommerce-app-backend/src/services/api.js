const axios = require("axios");
const oauth = require("../config/index.js");
const { insertOrders } = require("../database/db_operations/databaseOperations.js");
const { checkAndUpdateOrderStatus } = require("../database/db_operations/orderStatusUpdater.js");

const apiUrl = "http://mov.tecnologia.ws/wp-json/wc/v3";

// Importa a conexão do módulo
const db = require('../database/db.js');

async function getUser() {
  try {
    const query = 'SELECT * FROM dashboard_users';
    const users = await db.promise().query(query);
    return users[0]; // Retorna os resultados da consulta (array de usuários)
  } catch (error) {
    throw error;
  }
}

async function getOrders() {
  try {
    const requestData = {
      url: `${apiUrl}/orders?per_page=12&page=1&orderby=date&order=asc&status=nfe-emitida,pedido_separacao,retirada,transporte`,
      method: "GET",
    };

    const authHeader = oauth.toHeader(oauth.authorize(requestData));
    const response = await axios.get(requestData.url, { headers: authHeader });

    const orders = response.data.map((order) => ({
      id: order.id,
      order_key: order.order_key,
      status: order.status,
      line: order.line_items,
      shipping: order.shipping,
      date: order.date_created,
    }));

    return orders;
  } catch (error) {
    throw error;
  }
}

async function insertOrder() {
  try {
    const requestData = {
      url: `${apiUrl}/orders?per_page=12&page=1&orderby=date&order=asc&status=nfe-emitida,pedido_separacao,retirada,transporte`,
      method: "GET",
    };

    const authHeader = oauth.toHeader(oauth.authorize(requestData));
    const response = await axios.get(requestData.url, { headers: authHeader });

    // Verifique a resposta ou trate-a conforme necessário
    console.log("Resposta da solicitação GET:", response.data);

    const orders = response.data.map((order) => ({
      id: order.id,
      status: order.status,
      date: order.date_created,
    }));

    console.log("Pedidos a serem inseridos no banco:", orders);

    await insertOrders(orders);

    return;
  } catch (error) {
    throw error;
  }
}

async function updateOrder() {
  try {
    await checkAndUpdateOrderStatus();
    return;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getOrders, getUser, insertOrder, updateOrder
};
