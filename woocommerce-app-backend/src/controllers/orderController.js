const express = require("express");
const router = express.Router();

const { formatOrderData } = require("../models/orderModel.js");
const { Database } = require("../models/databaseModel.js");

const db = new Database();

// função para acessar os dados da api
async function getOrderDataFromApi() {
  return await formatOrderData();
}

// Função para acessar os pedidos do banco de dados
async function getOrderDataFromDatabase() {
  const orderFromDatabaseArray = await db.getOrderbyDateAsc();

  // Se não houver resultado, retornar array vazio
  if (orderFromDatabaseArray.length === 0) {
    return;
  }

  return orderFromDatabaseArray;
}

// rota para obter pedidos do banco de dados
router.get("/get-orders", async (req, res) => {
  try {
    // Obter os pedidos do banco de dados
    const ordersFromDatabase = await getOrderDataFromDatabase();

    // se estiver vazio ou comprimento for igual a zero? : responder com 204 - sem conteúdo
    // se estiver com conteúdo? : responder com 200 - aprovado

    if (!ordersFromDatabase || ordersFromDatabase.length === 0) {
      res.status(204).end();
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(ordersFromDatabase);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Problema de conexão.", erro: `${error.message}` });
  }
});

// pegar os pedidos retornados da api e inserir no bd (se não existir)
async function insertOrdersIntoDatabase() {
  const fetchNewOrders = await getOrderDataFromApi();

  // Verificar se a API não retornou resultados
  if (!fetchNewOrders || fetchNewOrders.length === 0) {
    return;
  }

  for (const row of fetchNewOrders) {
    const fetchDatabaseOrder = await db.getOrder(row.id);

    if (fetchDatabaseOrder.length === 0) {
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

// rota para inserir pedidos no banco de dados
router.post("/insert-orders", async (req, res) => {
  try {
    // Inserir novos pedidos no banco de dados
    const rows = await insertOrdersIntoDatabase();

    if (!rows || rows.length === 0) {
      res.status(204).end();
    } else {
      res
        .status(200)
        .json({ message: "Pedidos inseridos no banco de dados com sucesso." });
    }
  } catch (err) {
    res.status(500).json({
      message: "Erro ao inserir pedidos no banco de dados.",
      erro: `${err.message}`,
    });
  }
});

// função para atualizar pedidos se forem diferentes ou desativar os não retornados
async function updateOrdersInDatabase() {
  const fetchNewOrders = await getOrderDataFromApi();

  for (const row of fetchNewOrders) {

    const fetchDatabaseOrder = await db.getOrder(row.id);
    
    if (!!fetchDatabaseOrder && fetchDatabaseOrder.length === 0) {
      return [];
    }

    // atualizar se dados não convergirem
    if (
      fetchDatabaseOrder.length > 0 &&
      (fetchDatabaseOrder[0].status !== row.status ||
        fetchDatabaseOrder[0].printed !== row.printed ||
        fetchDatabaseOrder[0].date_modified !== row.date_modified)
    ) {
      db.updateOrder(
        fetchDatabaseOrder[0].id_order,
        row.status,
        row.printed,
        row.date_modified
      );
    }
  }
}

// Atualizar pedidos no banco de dados
router.put("/update-orders", async (req, res) => {
  try {
    let list = await updateOrdersInDatabase();

    // console.log(list);

    if (!!list && list.length == 0) {
      res.status(200).json({ message: "Nenhum pedido precisa de atualização." })
    } else {
      res.status(200).json({
        message: "Pedidos atualizados com sucesso!",
      });
    }
  } catch (error) {
    // Em caso de erro, responder com status 500 e uma mensagem de erro
    res.status(500).json({
      message: "Houve um erro no servidor.",
      erro: `${error.message}`,
    });
  }
});

// desativar no banco pedidos não retornados da api
async function updateOrderNotReturnApi() {
  const fetchNewOrders = await getOrderDataFromApi();
  const desactiveOrderInDatabase = false; // parâmetro utilizado para desativar visualização

  if (fetchNewOrders.length === 0) {
    return;
  }

  // cria uma nova lista de ids
  const orderIds = fetchNewOrders.map((order) => order.id);
  const fetchMissingOrders = await db.selectMissingOrders(orderIds);

  for (const line of fetchMissingOrders) {
    await db.updateOrderForDesactive(
      desactiveOrderInDatabase ? 1 : 0,
      line.id_order
    );
  }
}

router.put("/update-orders-desactive", async (req, res) => {
  try {
    await updateOrderNotReturnApi()
    
    res.status(204).end();
  } catch (err) {
    res.status(500).json({
      message: "Houve um erro no servidor.",
      erro: `${error.message}`,
    });
  }
});

// router.put("/orders-", async () => {
//   // desativar pedidos não retornados pela api
//   await activeOrderReturnApi();
// });

// async function activeOrderReturnApi() {
//   const fetchNewOrders = getOrderDataFromApi();

//   for (const row of fetchNewOrders) {
//     const activeOrder = row[0].id;

//     const returnOrderExists = db.getOrder(activeOrder);
//     console.log(returnOrderExists);

//     // se api retornar array vazio, desativar todos os pedidos no database
//     if (activeOrder.length === 0) {
//       try {
//         // Desativar todos os pedidos no banco de dados
//         const query = `UPDATE dashboard_orders SET active = ?`;
//         const rows = [0]; // 0 para desativar os pedidos
//         await db.connection.query(query, rows);
//         console.log("Todos os pedidos foram desativados.");
//       } catch (error) {
//         console.error("Erro ao desativar os pedidos:", error);
//         throw error; // Lançar o erro para tratamento externo, se necessário
//       }
//     }
//   }
// }

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

module.exports = router;
