const { formatOrderData } = require("../models/orderModel.js");
const { Database } = require("../models/databaseModel.js");

const db = new Database();

const getOrderData = async (req, res) => {
  try {
    const fetchApiData = await formatOrderData();
    const ordersFromDatabase = [];

    for (const line of fetchApiData) {
      // pegar os pedidos retornados da api e inserir no bd
      const orderFromDatabase = await db.getOrder(line.id);
      const order = orderFromDatabase[0];
      if (!order) {
        await db.insertOrder(
          line.id,
          line.order_number,
          line.status,
          line.printed,
          line.date_created,
          line.date_modified
        );
      }
    }

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
          error: "Recurso não encontrado",
          message: `${error.message}`,
        });
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
