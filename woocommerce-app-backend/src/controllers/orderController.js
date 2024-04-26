const { formatOrderData } = require("../models/orderModel.js");
const { Database } = require("../models/databaseModel.js");

const db = new Database();

// class OrderController {
//   constructor() {
//     this.db = db;
//   }
// }

// função para acessar os dados da api
async function getOrderDataFromApi() {
  return await formatOrderData();
}

// Função para acessar os pedidos do banco de dados
async function getOrderDataFromDatabase() {
  const fetchApiData = await getOrderDataFromApi();
  const ordersFromDatabase = [];

  for (const line of fetchApiData) {
    const orderFromDatabaseArray = await db.getOrder(line.id);
    const orderFromDatabase = orderFromDatabaseArray[0]; // Acessar o primeiro elemento do array

    if (!orderFromDatabase) {
      console.log("Pedido não encontrado");
    }

    ordersFromDatabase.push(orderFromDatabase);
  }

  return ordersFromDatabase;
}

// pegar os pedidos retornados da api e inserir no bd (se não existir)
async function insertOrdersIntoDatabase() {
  const fetchNewOrders = await getOrderDataFromApi();

  for (const row of fetchNewOrders) {
    const fetchDatabaseOrder = await db.getOrder(row.id);

    if (fetchDatabaseOrder === null) {
      await db.insertOrder(
        row.id,
        row.order_number,
        row.status,
        row.printed,
        row.date_created,
        row.date_modified
      );
    }
  }
}

async function updateOrdersInDatabase() {
  const fetchNewOrders = await getOrderDataFromApi();

  for (const row of fetchNewOrders) {
    const fetchDatabaseOrder = await db.getOrder(row.id);

    if (!fetchDatabaseOrder) {
      // await db.updateOrder(

      // );
      // console.log("Pedido desativado no banco de dados")
      return null;
    }

    if (fetchDatabaseOrder) {
      await db.updateOrder(
        row.id,
        row.status,
        row.printed ? 1 : 0,
        row.date_modified
      );
      console.log("Pedido atualizado com sucesso!");
    }
  }
}

// Controller main
const getOrderData = async (req, res) => {
  try {
    // Inserir novos pedidos no banco de dados
    await insertOrdersIntoDatabase();

    // Atualizar pedidos no banco de dados
    await updateOrdersInDatabase();

    // Obter os pedidos do banco de dados
    const ordersFromDatabase = await getOrderDataFromDatabase();

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
        res.status(404).json({
          error: "Recurso não encontrado. Problema de Conexão a API",
          message: `${error.message}`,
        });
        break;
      default:
        console.log(error.status);
        res
          .status(500)
          .json({ error: "Erro inesperado", message: `${error.message}` });
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
