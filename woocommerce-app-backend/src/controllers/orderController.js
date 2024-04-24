const { formatOrderData } = require("../models/orderModel.js");
const { Database } = require("../models/databaseModel.js");

const db = new Database();

// Arguments for on and off orders in bd
const orderActiveOn = "1";

// get all information of orders
async function getOrderById(orderId) {}

// identify order of status sla
async function getSlaByStatus(statusSLA) {}

// add sla for order
async function addOrderSla(orderId, orderDate, slaId, sla_start) {}

// update sla for all orders
async function updateOrderSla(date, id, time, order) {}

/* se o perdido retornado pela API não existir, então inserir     - NOVO
não existe, então cadastra SLA também                          - NOVO
se existir, mas os status diferem (BD && API):
então atualiza o status e data do BD com a resposta da API     - ATUALIZA
também atualiza o cadastro de status do pedido refente ao SLA  - ATUALIZA */
// registration of new orders #02
async function insertNewOrder(order) {}

// update of new orders and sla
async function updateExistingOrder(order, resultOrder) {}

// select orders that not were delivered for API
async function getOrdersOut(orders) {}

// dasactivated orders were delivered
async function appendOrdersOut(missingOrders) {}

async function processOrder(order) {}

const getOrderData = async (req, res) => {
  try {
    const fetchApiData = await formatOrderData();
    const ordersFromDatabase = [];

    // pegar os pedidos retornados da api e consultar no bd
    for (const line of fetchApiData) {
      const orderFromDatabaseArray = await db.getOrder(line.id);
      const orderFromDatabase = orderFromDatabaseArray[0]; // Acessar o primeiro elemento do array

      if (!orderFromDatabase) {
        console.log("Pedido não encontrado");
      }

      ordersFromDatabase.push(orderFromDatabase);
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(ordersFromDatabase);
  } catch (error) {
    switch (error.status) {
      case 500:
        res
          .status(500)
          .json({ error: "Problema de conexão", message: `${error.message}` });
        break;
      case 404:
        res
          .status(404)
          .json({ error: "Recurso não encontrado", message: `${error.message}` });
        break;
      default:
        res.json({ error: "Erro inesperado", message: `${error.message}` });
    }
  }
};

// const getOrderDataSla = async (req, res) => {
//   try {
//     const queryConsultOrders = "SELECT * FROM dashboard_order_sla;";
//     const [resultOrders] = await db.query(queryConsultOrders);

//     res.setHeader("Content-Type", "application/json");

//     res.json(resultOrders);
//   } catch (error) {
//     res.status(500).json({ error: "Falha ao obter SLA das ordens." });
//     console.error(error.messaxge);
//     throw error;
//   }
// };

// separar a execução da chamada da api para me retornar os dados: isolar
// criar uma função para tratar da consulta ao banco com os pedidos

// script para tratar dos dados retornados da api: executar todas as
// lógicas necessarias, alimentando o banco de dados com as atualizações.
// Serão chamados por uma função que estará dentro de uma função anônima
// sendo requisitada por uma determinada rota.

// função principal: vai manter toda a lógica - CRUD.
// separar as operações do bd, manter em um arquivo databaseModel.js

module.exports = {
  getOrderData,
  // getOrderDataSla,
};
