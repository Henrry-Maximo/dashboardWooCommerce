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
    return [];
  }

  return orderFromDatabaseArray;
}

// pegar os pedidos retornados da api e inserir no bd (se não existir)
async function insertOrdersIntoDatabase() {
  const fetchNewOrders = await getOrderDataFromApi();
  let listOrdersInsert = [];

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
      listOrdersInsert.push({ id: row.id });
    }
  }
  return listOrdersInsert;
}

// função para atualizar pedidos se forem diferentes ou desativar os não retornados
async function updateOrdersInDatabase() {
  const fetchNewOrders = await getOrderDataFromApi();
  const listOrdersUpdate = [];

  for (const row of fetchNewOrders) {
    const fetchDatabaseOrder = await db.getOrder(row.id);

    // converter o valor para um booleano / se estiver vazio, ele será convertido para false
    if (!fetchDatabaseOrder || fetchDatabaseOrder.length === 0) {
      continue;
    }

    const orderToUpdate = fetchDatabaseOrder[0];

    // Convertendo as datas para o mesmo formato
    const modifiedDateDatabase = new Date(
      orderToUpdate.date_modified
    ).toISOString();
    const modifiedDateRow = new Date(row.date_modified).toISOString();

    // atualizar se dados não convergirem
    if (
      orderToUpdate.status !== row.status ||
      orderToUpdate.printed !== row.printed ||
      modifiedDateDatabase !== modifiedDateRow
    ) {
      db.updateOrder(
        orderToUpdate.id_order,
        row.status,
        row.printed,
        row.date_modified
      );
      listOrdersUpdate.push({ id_order: orderToUpdate.id_order });
    }
  }
  return listOrdersUpdate;
}

// desativar no banco pedidos não retornados da api
async function updateOrderNotReturnApi() {
  const fetchNewOrders = await getOrderDataFromApi();
  const desactiveOrderInDatabase = false; // parâmetro utilizado para desativar visualização
  let listOrdersOffline = [];

  // Se a API não retornar nenhuma ordem, desativar todas as ordens no banco de dados
  if (!fetchNewOrders || fetchNewOrders.length === 0) {
    const ordersAllActive = await db.getOrderbyDateAsc();

    if (ordersAllActive.length > 0) {
      for (const row of ordersAllActive) {
        await db.updateOrderForDeactivate(
          desactiveOrderInDatabase ? 1 : 0,
          row.id_order
        );
      }
    }

    return;
  }

  // Se a API retornar dados, verificar cada linha e atualizar para true no banco de dados
  if (fetchNewOrders) {
    const onOrderForOn = true;

    for (const row of fetchNewOrders) {
      const orderUpdateActive = await db.getOrderbyDateAscDeactivate(row.id);
      console.log(orderUpdateActive)
      // if (orderUpdateActive) {
      //   await db.updateOrderForDeactivate(onOrderForOn ? 1 : 0, orderUpdateActive[0].id_order);
      // }
    }
    
    return;
  }

  // Criar uma lista de IDs das ordens retornadas pela API
  const orderIds = fetchNewOrders.map((order) => order.id);

  // Obter ordens no banco de dados que não estão na lista de IDs da API
  const fetchMissingOrders = await db.selectMissingOrders(orderIds);

  for (const line of fetchMissingOrders) {
    await db.updateOrderForDeactivate(
      desactiveOrderInDatabase ? 1 : 0,
      line.id_order
    );
    listOrdersOffline.push({ order: line.id_order });
  }
  return listOrdersOffline;
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

// rota para inserir pedidos no banco de dados
router.post("/insert-orders", async (req, res) => {
  try {
    // Inserir novos pedidos no banco de dados
    const rows = await insertOrdersIntoDatabase();
    if (!rows || rows.length === 0) {
      res.status(204).end();
    } else {
      res.status(200).json({
        id_order: rows,
        message: "Pedidos inseridos no banco de dados com sucesso.",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Erro ao inserir pedidos no banco de dados.",
      erro: `${err.message}`,
    });
  }
});

// Atualizar pedidos no banco de dados
router.put("/update-orders", async (req, res) => {
  try {
    let list = await updateOrdersInDatabase();

    if (!!list && list.length == 0) {
      res.status(204).end();
    } else {
      res
        .status(200)
        .json({ list, message: "Pedidos atualizados com sucesso!" });
    }
  } catch (error) {
    // Em caso de erro, responder com status 500 e uma mensagem de erro
    res.status(500).json({
      message: "Houve um erro no servidor.",
      erro: `${error.message}`,
    });
  }
});

// pedidos
router.put("/update-orders-desactive", async (req, res) => {
  try {
    const rows = await updateOrderNotReturnApi();

    if (!rows || rows.length === 0) {
      res.status(204).end();
    } else {
      res
        .status(200)
        .json({ rows, message: "Pedido(s) desativado no database." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Houve um erro no servidor.",
      erro: `${error.message}`,
    });
  }
});

module.exports = router;
