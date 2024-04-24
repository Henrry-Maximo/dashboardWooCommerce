const connect = require("../services/api.js");
const { parse, format } = require("date-fns");

async function formattedOrdersData() {
  const ordersData = await connect.getOrdersData();
  const formattedOrders = [];

  try {
    // Função para formatar a data (MySQL - yyyy-MM-dd HH:mm:ss)
    function formatDate(dateString) {
      const parsedDate = parse(dateString, "dd/MM/yyyy HH:mm:ss", new Date());
      return format(parsedDate, "yyyy-MM-dd HH:mm:ss");
    }

    for (const status in ordersData) {
      if (ordersData.hasOwnProperty(status)) {
        ordersData[status].forEach((order) => {
          formattedOrders.push({
            id: order.order_id,
            order_number: order.order_number,
            status: status,
            printed: order.printed,
            date_created: formatDate(order.created_at),
            date_modified: formatDate(order.modified_at),
          });
        });
      }
    }

    return formattedOrders;
  } catch (err) {
    console.error(`Erro na tratativa dos pedidos: ${err.message}`);
  }
}

module.exports = {
    formatOrderData: formattedOrdersData,
};
