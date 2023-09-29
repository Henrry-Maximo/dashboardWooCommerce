// Conexão API
const WooCommerceAPI = require("../services/api.js");
const WooCommerce = WooCommerceAPI();

// função para obter orders cadastradas no woocommerce com seus respectivos detalhes
async function getOrders() {
    try {
        const response = await WooCommerce;
        const orders = await response.data.map((order) => ({
            id: order.id,
            status: order.status,
            line: order.line_items,
            shipping: order.shipping,
            date: order.date_created,
        }));

        return orders;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getOrders
};