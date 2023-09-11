// solicitações HTTP + Autenticação Woocommerce
const axios = require("axios");
const oauth = require("../config/index.js");
// --------------------------------------------

// operações para serem efetuadas no banco de dados
const { insertOrders } = require("../database/db_operations/databaseOperations.js");
const { checkAndUpdateOrderStatus } = require("../database/db_operations/orderStatusUpdater.js");
// --------------------------------------------

// destinatário das requisições/respostas
const apiUrl = "http://mov.tecnologia.ws/wp-json/wc/v3/orders?per_page=12&page=1&orderby=date&order=asc&status=nfe-emitida,pedido_separacao,retirada,transporte";
// destinário de envio/consulta - bd (identificação)
const db = require("../database/db.js");
// --------------------------------------------

// função para obter orders cadastradas no woocommerce com seus respectivos detalhes
async function getOrders() {
  try {
    const requestData = {
      url: `${apiUrl}`,
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

// função para consultar usuário cadastrados no banco de dados
async function getUser() {
  try {
    const query = "SELECT * FROM dashboard_users";
    const users = await db.promise().query(query);
    return users[0]; // Retorna os resultados da consulta (array de usuários)
  } catch (error) {
    throw error;
  }
}

// função para inserir os pedidos no bd
async function insertOrder() {
  try {
    const requestData = {
      url: `${apiUrl}`,
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

// função para atualizar o status do pedido senão for igual o do woocommerce
async function updateOrder() {
  try {
    await checkAndUpdateOrderStatus();
    return;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getOrders,
  getUser,
  insertOrder,
  updateOrder,
};
