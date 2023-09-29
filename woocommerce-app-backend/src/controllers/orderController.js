const { getOrders } = require("../models/orderModelAPI.js");
const db = require("../database/db.js");
const cron = require("node-cron")

const getOrderData = async (req, res) => {
  try {
    const orders = await getOrders();

    // Filtro de remoção:
    const ordersRemoveInfo = orders.map((order) => {
      const { order_key, ...restOfOrder } = order;
      return { ...restOfOrder };
    });

    const ordersApproved = ordersRemoveInfo;

    // INSERÇÃO E ATUALIZAÇÃO DOS PEDIDOS
    for (const order of ordersApproved) {
      // somente a data do pedido
      const orderDate = new Date(order.date);
      const formattedDate = orderDate.toISOString().split('T')[0];

      // Verificar se a ordem já existe no banco de dados na tabela: dashboard_orders
      const queryConsultOrder = "SELECT * FROM dashboard_orders WHERE id_order = ?;"
      const [resultOrder] = await db.promise().query(queryConsultOrder, [order.id]);

      if (resultOrder.length === 0) {
        const queryInsertOrder = `INSERT INTO dashboard_orders(id_order, status, date_created) VALUES (?, ?, ?)`;
        const queryInsertOrderValues = [order.id, order.status, formattedDate];
        await db.promise().query(queryInsertOrder, queryInsertOrderValues);
        // console.log(`Ordem inserida com sucesso com as seguintes informações: ${queryInsertOrderValues}`)
      } else {
        const queryUpdateOrder = `UPDATE dashboard_orders SET status = ? WHERE id_order = ?`;
        const queryUpdateOrderValues = [order.status, order.id];
        await db.promise().query(queryUpdateOrder, queryUpdateOrderValues);
        // console.log(`Ordem atualizada com sucesso com as seguintes informaões: ${queryUpdateOrderValues}`)
      }
    }

    // INSERÇÃO E ATUALIZAÇÃO DOS PRODUTOS ASSOCIADOS AOS PEDIDOS
    for (const order of orders) {
      const firstLineItem = order.line[0];
      // Verificar se o produto já existe no banco de dados na tabela: dashboard_orders_line
      const queryConsultOrderProducts = "SELECT * FROM dashboard_orders_line WHERE id = ?;"
      const [resultOrderProducts] = await db.promise().query(queryConsultOrderProducts, [firstLineItem.id]);

      if (resultOrderProducts.length === 0) {
        const queryInsertLine = `INSERT INTO dashboard_orders_line(id, id_order, name, quantity, sku) VALUES (?, ?, ?, ?, ?)`;
        const queryInsertOrderLineValues = [firstLineItem.id, order.id, firstLineItem.name, firstLineItem.quantity, firstLineItem.sku];
        // console.log(`teste01: ${queryInsertOrderLineValues}`);
        try {
          await db.promise().query(queryInsertLine, queryInsertOrderLineValues);
          // console.log(`Produto inserido com sucesso com as seguintes informações: ${queryInsertOrderLineValues}`)
        } catch (error) {
          console.error(`Ocorreu um erro: ${error}`);
        }
      } else {
        const queryUpdateProduct = `UPDATE dashboard_orders_line SET name = ?, quantity = ?, sku = ? WHERE id = ?`;
        const queryUpdateProductValues = [firstLineItem.name, firstLineItem.quantity, firstLineItem.sku, firstLineItem.id];
        try {
          await db.promise().query(queryUpdateProduct, queryUpdateProductValues);
          // console.log(`Produtos existentes atualizados com sucesso com as seguintes informações: ${queryUpdateProductValues}`)
        } catch (error) {
          console.error(`Não foi possível atualizar o produto: ${error}`);
        }
      }
    }

    // INSERÇÃO E ATUALIZAÇÃO DAS PROPRIEDADES DE ENTREGA
    for (const order of orders) {
      const firstShippingItem = order.shipping;
      // Verificar se o produto já existe no banco de dados na tabela: dashboard_orders_line
      const queryConsultOrderShipping = "SELECT * FROM dashboard_orders_shipping WHERE id_order = ?;"
      const [resultOrderShipping] = await db.promise().query(queryConsultOrderShipping, [order.id]);

      if (resultOrderShipping.length === 0) {
        const queryInsertShipping = `INSERT INTO dashboard_orders_shipping(id_order, first_name, last_name, company, address, city, state, postcode, country, phone, number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const queryInsertOrderShippingValues = [order.id, firstShippingItem.first_name, firstShippingItem.last_name, firstShippingItem.company, firstShippingItem.address, firstShippingItem.city, firstShippingItem.state, firstShippingItem.postcode, firstShippingItem.country, firstShippingItem.phone, firstShippingItem.number];
        // console.log(`teste02: ${queryInsertOrderShippingValues}`);
        try {
          await db.promise().query(queryInsertShipping, queryInsertOrderShippingValues);
          // console.log(`Localização inserida com sucesso com as seguintes informações: ${queryInsertOrderShippingValues}`)
        } catch (error) {
          console.error(`Ocorreu um erro: ${error}`);
        }
      } else {
        const queryUpdateShipping = `UPDATE dashboard_orders_shipping SET first_name = ? WHERE id_order = ?`;
        const queryUpdateShippingValues = [firstShippingItem.first_name, order.id];
        try {
          await db.promise().query(queryUpdateShipping, queryUpdateShippingValues);
          // console.log(`Shipping existentes atualizados com sucesso com as seguintes informações: ${queryUpdateShippingValues}`)
        } catch (error) {
          console.error(`Não foi possível atualizar o shipping: ${error}`);
        }
      }
    }

    // Selecionar todas as orders existentes
    const queryConsultOrders = "SELECT * FROM dashboard_orders;"
    const [resultOrders] = await db.promise().query(queryConsultOrders);

    // Define o cabeçalho da resposta como JSON
    res.setHeader('Content-Type', 'application/json');
    // Envia as orders como resposta JSON
    res.json(resultOrders);
  } catch (error) {
    res.status(500).json({ error: "Falha ao obter ordens." });
    console.error(error.message)
    throw error;
  }
  return;
};

// Agendando a execução da função getOrderData a cada 10 segundos.
// cron.schedule('*/60 * * * * *', async () => {
//   await getOrderData();
// });

// const getUserData = async (req, res) => {
//   try {
//     const users = await getUser();
//     console.log("\nconsulta:\n", users);
//     res.json(users);
//   } catch (error) {
//     console.error("Erro ao obter usuários:", error);
//     res.status(500).json({ error: "Falha ao obter usuários." });
//   }
//   return;
// };

// const insertOrderData = async (req, res) => {
//   try {
//     const ordersData = await insertOrder();
//     res.json({ message: "Dados inseridos com sucesso", data: ordersData });
//   } catch (error) {
//     console.error("Erro ao obter as informações para inserir no banco: ", error);
//     res.status(500).json({ error: "Falha ao inserir informações." })
//     throw error;
//   }
// }

// const updateOrderData = async (req, res) => {
//   try {
//     const ordersData = await updateOrder();
//     res.json({ message: "Dados atualizados com sucesso!", data: ordersData });
//   } catch (error) {
//     console.error("Erro ao obter as informações atualizadas para inserir no banco: ", error);
//     res.status(500).json({ error: "Falha ao inserir atualizações." })
//     throw error;
//   }
// }

// const getSlas = async (req, res) => {
//   try {
//     const ordersSlas = await ordersSlasData();
//     console.log("\nconsulta referente aos SLAs\n")
//     res.json(ordersSlas)
//   } catch (error) {
//     console.log(`Erro ao consultar SLAs cadastrados!`, error)
//     res.status(500).json({ error: "Falha ao obter usuários." });
//   }
// }

module.exports = {
  getOrderData
};