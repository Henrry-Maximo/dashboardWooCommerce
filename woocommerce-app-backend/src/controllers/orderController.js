const { formatOrderData } = require("../models/orderModel.js");
const { Database } = require("../models/databaseModel.js");

const db = new Database();

// class OrderController {
//   constructor(db) {
//     this.db = db;
//   }
// }

const getOrderData = async (req, res) => {
  try {
    const fetchApiData = await formatOrderData();
    const ordersFromDatabase = [];

    // função para selecionar pedido no database
    async function getOrderDatabase(row) {
      const orderFromDatabase = await db.getOrder(row);
      const order = orderFromDatabase[0];
      return order;
    }

    // função para selecionar pedido na api
    async function getOrderApi() {
      const orderFromApi = await formatOrderData();
      const orders = [];
      for (const row of orderFromApi) {
        const order = row;
        orders.push(order);
      }
      return orders;
    }

    // pegar os pedidos retornados da api e inserir no bd (se não existir)
    async function postOrderDatabase() {
      const fetchNewOrder = await getOrderApi();
      fetchNewOrder.forEach(async (row) => {
        const fetchDatabaseOrder = await getOrderDatabase(row.id);

        if (!fetchDatabaseOrder) {
          await db.insertOrder(
            row.id,
            row.order_number,
            row.status,
            row.printed,
            row.date_created,
            row.date_modified
          );
          console.log("Pedido inserido com sucesso");
        }
      });
    }
    postOrderDatabase();

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
