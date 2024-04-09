const { response } = require("../models/orderModel.js");
const db = require("../database/db.js");
const connection = db.promise();

// Arguments for on and off orders in bd
const orderActiveOn = "1";

// get all information of orders #01
async function getOrderById(orderId) {
  try {
    const getByIdQuery = "SELECT * FROM dashboard_orders WHERE id_order = ?;";
    const [orderResult] = await connection.query(getByIdQuery, [orderId]);
    return orderResult;
  } catch (err) {
    console.error(`Erro de consulta ao pedido: ${err.message}`);
    throw err;
  }
}

// identify order of status sla #03
async function getSlaByStatus(statusSLA) {
  try {
    const getSlaByStatus = "SELECT * FROM dashboard_slas WHERE status = ?;";
    const [slaOrderResult] = await connection.query(getSlaByStatus, [
      statusSLA,
    ]);
    if (slaOrderResult && slaOrderResult.length > 0) {
      return {
        id: slaOrderResult[0].id,
        status: slaOrderResult[0].status,
        time: slaOrderResult[0].number_time,
      };
    }
  } catch (err) {
    console.error(`Erro na consulta do SLA: ${err.message}`);
    throw err;
  }
}

// add sla for order #04
async function addOrderSla(orderId, orderDate, slaId, sla_start) {
  try {
    const queryOrderSla =
      "INSERT INTO dashboard_order_sla(order_id, date_order, sla_id, sla_start) VALUES (?, ?, ?, ?);";
    const queryOrderSlaValues = [orderId, orderDate, slaId, sla_start];
    await connection.query(queryOrderSla, queryOrderSlaValues);
  } catch (err) {
    console.error(`Erro ao inserir informações do SLA: ${err.message}`);
    throw err;
  }
}

// update sla for all orders #04
async function updateOrderSla(date, id, time, order) {
  try {
    const queryUpdateSla = `UPDATE dashboard_order_sla SET date_order = ?, sla_id = ?, sla_start = ? WHERE order_id = ?`;
    const queryUpdateSlaValues = [date, id, time, [order]];
    const [resultQuerySla] = await connection.query(
      queryUpdateSla,
      queryUpdateSlaValues
    );
    return resultQuerySla;
  } catch (err) {
    console.error(`Erro ao atualizar registro de SLA: ${err.message}`);
    throw err;
  }
}

/* se o perdido retornado pela API não existir, então inserir     - NOVO
não existe, então cadastra SLA também                          - NOVO
se existir, mas os status diferem (BD && API):
então atualiza o status e data do BD com a resposta da API     - ATUALIZA
também atualiza o cadastro de status do pedido refente ao SLA  - ATUALIZA */
// registration of new orders #02
async function insertNewOrder(order) {
  try {
    const queryInsertOrder = `INSERT INTO dashboard_orders(id_order, status, date_created, active) VALUES(?, ?, ?, ?)`;
    const queryInsertOrderValues = [
      order.id,
      order.status,
      order.date,
      orderActiveOn,
    ];
    const [resultOrder] = await connection.query(
      queryInsertOrder,
      queryInsertOrderValues
    );

    const slaForOrderStatus = await getSlaByStatus(order.status);
    addOrderSla(
      resultOrder.insertId,
      order.date,
      slaForOrderStatus.id,
      slaForOrderStatus.time
    );
  } catch (err) {
    console.error(`Erro ao tentar cadastrar pedido: ${err.message}`);
  }
}

// update of new orders and sla
async function updateExistingOrder(order, resultOrder) {
  try {
    const queryUpdateOrder = `UPDATE dashboard_orders SET status = ?, date_created = ? WHERE id_order = ? `;
    const queryUpdateOrderValues = [order.status, order.date, order.id];
    await connection.query(queryUpdateOrder, queryUpdateOrderValues);

    const slaForOrderStatus = await getSlaByStatus(order.status);
    updateOrderSla(
      order.date,
      slaForOrderStatus.id,
      slaForOrderStatus.time,
      resultOrder[0].id_order
    );
  } catch (err) {
    console.error(`Erro ao tentar atualizar pedido: ${err.message}`);
  }
}

// select orders that not were delivered for API
async function getOrdersOut(orders) {
  if (orders.length > 0) {
    const querySelectMissingOrders = `SELECT * FROM dashboard_orders WHERE id_order NOT IN (?)`;
    const [missingOrdersRows] = await connection.query(
      querySelectMissingOrders,
      [orders.map((apiOrder) => apiOrder.id)]
    );
    return missingOrdersRows || [];
  }
  return [];
}

// dasactivated orders were delivered
async function appendOrdersOut(missingOrders) {
  if (missingOrders) {
    const orderActiveOff = "0"; // argumento pra desativar pedido no BD
    for (let i = 0; i < missingOrders.length; i++) {
      const missingOrder = missingOrders[i];
      const queryUpdateActive = `UPDATE dashboard_orders SET active = ? WHERE id_order = ? AND active <> 0`;
      const queryUpdateActiveValues = [orderActiveOff, missingOrder.id_order];
      await connection.query(queryUpdateActive, queryUpdateActiveValues);
    }
  }
}

async function processOrder(order) {
  const resultOrders = await getOrderById(order.id);

  if (resultOrders.length === 0) {
    await insertNewOrder(order);
  } else if (resultOrders[0].status !== order.status) {
    await updateExistingOrder(order, resultOrders[0].status);
  }
}

const getOrderData = async (req, res) => {
  try {
    // obter os dados dos pedidos da API
    const orders = await response();

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i]; // retorno da API
      await processOrder(order);

      /* função: desativar no banco de dados - pedidos entregues pela API
      verificar se pedidos coincidem com os do bd, retornando aqueles que não foram retornados pela API
      aplicando desativamento nos não-retornados */
      const ordersListOut = await getOrdersOut(orders);
      appendOrdersOut(ordersListOut);
    }

    const queryConsultOrders =
      "SELECT * FROM dashboard_orders WHERE active = 1 ORDER BY date_created ASC LIMIT 12;";
    const [resultOrders] = await connection.query(queryConsultOrders);

    res.setHeader("Content-Type", "application/json");
    res.json(resultOrders);
  } catch (error) {
    res.status(500).json({ error: "Falha ao obter pedidos." });
    console.error(error.message);
  }
};

const getOrderDataSla = async (req, res) => {
  try {
    const queryConsultOrders = "SELECT * FROM dashboard_order_sla;";
    const [resultOrders] = await connection.query(queryConsultOrders);

    res.setHeader("Content-Type", "application/json");

    res.json(resultOrders);
  } catch (error) {
    res.status(500).json({ error: "Falha ao obter SLA das ordens." });
    console.error(error.message);
    throw error;
  }
};

module.exports = {
  getOrderData,
  getOrderDataSla,
};

