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
    return [];
  }

  return orderFromDatabaseArray;
}

// pegar os pedidos retornados da api e inserir no bd (se não existir)
async function insertOrdersIntoDatabase() {
  const fetchNewOrders = await getOrderDataFromApi();

  // Verificar se a API não retornou resultados
  if (fetchNewOrders.length === 0) {
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

// função para atualizar pedidos se forem diferentes ou desativar os
// não retornados
async function updateOrdersInDatabase() {
  const fetchNewOrders = await getOrderDataFromApi();
  //const activeOrderInDatabase = true; // parâmetro utilizado para desativar visualização

  for (const row of fetchNewOrders) {
    const fetchDatabaseOrder = await db.getOrder(row.id);

    // atualizar se dados não convergirem
    if (
      (fetchDatabaseOrder.length > 0 &&
        fetchDatabaseOrder[0].status !== row.status) ||
      fetchDatabaseOrder[0].printed !== row.printed ||
      fetchDatabaseOrder[0].date_modified !== row.date_modified
    ) {
      await db.updateOrder(
        fetchDatabaseOrder[0].id_order,
        row.status,
        row.printed,
        row.date_modified
      );
    }
  }
}

// desativar no banco pedidos não retornados da api
async function updateOrderNotReturnApi() {
  const fetchNewOrders = await getOrderDataFromApi();
  const desactiveOrderInDatabase = false; // parâmetro utilizado para desativar visualização

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

// async function activeOrderReturnApi() {
//   const fetchNewOrders = getOrderDataFromApi();

//   for (const row of fetchNewOrders) {
//     const activeOrder = row[0].id;

//     const returnOrderExists = db.getOrder(activeOrder);
//     console.log(returnOrderExists);

//     // se api retornar array vazio, desativar todos os pedidos no database
//   if (activeOrder.length === 0) {
//     try {
//       // Desativar todos os pedidos no banco de dados
//       const query = `UPDATE dashboard_orders SET active = ?`;
//       const rows = [0]; // 0 para desativar os pedidos
//       await db.connection.query(query, rows);
//       console.log("Todos os pedidos foram desativados.");
//     } catch (error) {
//       console.error("Erro ao desativar os pedidos:", error);
//       throw error; // Lançar o erro para tratamento externo, se necessário
//     }
//   }
//   }
// }

// Controller main
const main = async (req, res) => {
  try {
    // Inserir novos pedidos no banco de dados
    await insertOrdersIntoDatabase();

    // Atualizar pedidos no banco de dados
    await updateOrdersInDatabase();

    // desativar pedidos não retornados pela api
    await updateOrderNotReturnApi();

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

module.exports = {
  orderController: main,
  // getOrderDataSla,
};
