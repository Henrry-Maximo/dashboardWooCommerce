const WooCommerceAPI = require("../services/api.js");

async function getOrders() {
    try {
        const response = await WooCommerceAPI.getOrders();
        const orders = await response.data.map((order) => ({
            id: order.id,
            status: order.status,
            date: order.date,
        }));

        return orders;
    } catch (error) {
        console.error("Erro ao Obter os Pedidos da API.\n")
        throw error;
    }
}

module.exports = {
    getOrders,
};
