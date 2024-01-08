const { getOrders } = require("../models/orderModelAPI.js");
const db = require("../database/db.js");
const connection = db.promise();

// get all information of orders
async function getOrderById(orderId) {
  const getByIdQuery = "SELECT * FROM dashboard_orders WHERE id_order = ?;";
  try {
    const [orderResult] = await connection.query(getByIdQuery, [orderId]);
    return orderResult;
  } catch (err) {
    console.error(`Erro de consulta ao pedido: ${err}`);
    throw err;
  }
}

// identify order of status sla
async function getSLAIdPorStatus(statusSLA) {
  const getSlaByStatus = "SELECT * FROM dashboard_slas WHERE status = ?;";
  try {
    const [slaOrderResult] = await connection.query(getSlaByStatus, [statusSLA]);
    if (slaOrderResult && slaOrderResult.length > 0) {
      return {
        id: slaOrderResult[0].id,
        status: slaOrderResult[0].status,
        time: slaOrderResult[0].number_time,
      }
    }
  } catch (error) {
    console.error('Erro ao consultar SLA', error);
    throw error;
  }
}

// add sla for order 
async function getOrderIdSla(orderId, orderDate, slaId, sla_start) {
  const queryOrderSla = "INSERT INTO dashboard_order_sla(order_id, date_order, sla_id, sla_start) VALUES (?, ?, ?, ?);"
  const queryInsertOrderSlaValues = [orderId, orderDate, slaId, sla_start];
  try {
    await connection.query(queryOrderSla, queryInsertOrderSlaValues);
  } catch (error) {
    console.error("Erro ao inserir no banco de dados: ", error);
    throw error;
  }
}

// update sla for all orders
async function updateOrderSla(date, id, time, order) {
  try {
    const queryUpdateSla = `UPDATE dashboard_order_sla SET date_order = ?, sla_id = ?, sla_start = ? WHERE order_id = ?`;
    const queryUpdateSlaValues = [date, id, time, [order]];
    console.log(queryUpdateSlaValues);
    const [resultQuerySla] = await connection.query(queryUpdateSla, queryUpdateSlaValues);
    return resultQuerySla;
  } catch (err) {
    (err) => console.log(`Erro: ${err}`);
  }
}

const getOrderData = async (req, res) => {
  try {
    const orders = await getOrders();
    const orderActiveOn = "1";
    const orderActiveOff = "0";

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      const resultOrder = await getOrderById(order.id);
      const existingStatus = resultOrder[0] && resultOrder[0].status;

      try {
        if (resultOrder.length === 0) {
          const queryInsertOrder = `INSERT INTO dashboard_orders(id_order, status, date_created, active) VALUES(?, ?, ?, ?)`;
          const queryInsertOrderValues = [order.id, order.status, order.date, orderActiveOn];
          const [resultOrder] = await connection.query(queryInsertOrder, queryInsertOrderValues);

          // verify status SLA
          const allInfoSla = await getSLAIdPorStatus(order.status);
          getOrderIdSla(resultOrder.insertId, order.date, allInfoSla.id, allInfoSla.time);
        }
        else if (existingStatus !== order.status) {
          const queryUpdateOrder = `UPDATE dashboard_orders SET status = ?, date_created = ? WHERE id_order = ? `;
          const queryUpdateOrderValues = [order.status, order.date, order.id];
          await connection.query(queryUpdateOrder, queryUpdateOrderValues);

          // verify status SLA and update
          const allInfoSla = await getSLAIdPorStatus(order.status);
          updateOrderSla(order.date, allInfoSla.id, allInfoSla.time, resultOrder[0].id_order);
        }
      } catch (error) {
        throw error;
      }
    }

    missingOrders = [];
    if (orders.length > 0) {
      try {
        const querySelectMissingOrders = `SELECT * FROM dashboard_orders WHERE id_order NOT IN (?)`;
        const [missingOrdersRows] = await connection.query(querySelectMissingOrders, [orders.map(apiOrder => apiOrder.id)]);

        if (missingOrdersRows) {
          missingOrders = missingOrdersRows;
        }

      } catch (err) {
        console.error("Erro ao executar a consulta:", err);
        throw err;
      }
    }

    for (let i = 0; i < missingOrders.length; i++) {
      const missingOrder = missingOrders[i];
      const queryUpdateActive = `UPDATE dashboard_orders SET active = ? WHERE id_order = ? AND active <> 0`;
      const queryUpdateActiveValues = [orderActiveOff, missingOrder.id_order];
      try {
        await connection.query(queryUpdateActive, queryUpdateActiveValues);
      } catch (error) {
        console.error("Erro ao desativar a ordem: ", error);
      }
    }

    const queryConsultOrders = "SELECT * FROM dashboard_orders WHERE active = 1 ORDER BY date_created ASC LIMIT 12;"
    const [resultOrders] = await connection.query(queryConsultOrders);

    res.setHeader('Content-Type', 'application/json');
    res.json(resultOrders);
  } catch (error) {
    res.status(500).json({ error: "Falha ao obter ordens." });
    console.error(error.message)
    throw error;
  }
};

const getOrderDataSla = async (req, res) => {
  try {
    const queryConsultOrders = "SELECT * FROM dashboard_order_sla;"
    const [resultOrders] = await connection.query(queryConsultOrders);

    res.setHeader('Content-Type', 'application/json');
    res.json(resultOrders);
  } catch (error) {
    res.status(500).json({ error: "Falha ao obter SLA das ordens." });
    console.error(error.message)
    throw error;
  }
};

module.exports = {
  getOrderData, getOrderDataSla
};
