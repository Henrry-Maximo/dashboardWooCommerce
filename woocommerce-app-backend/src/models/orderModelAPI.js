const WooCommerceAPI = require("../services/api.js");

async function getOrders() {
    try {
        const response = await WooCommerceAPI.getOrders();

        const allStatuses = Object.keys(response);
        const formattedOrders = [];

        allStatuses.forEach((status) => {
            if (Array.isArray(response[status])) {
                const orders = response[status].map((order) => ({
                    id: order.order_id,
                    createdAt: order.created_at,
                }));

                formattedOrders.push(...orders);
            }
        });

        return formattedOrders;
    } catch (err) {
        console.error(`Erro ao obter os dados: ${err}`);
        throw err;
    }
}

module.exports = {
    getOrders,
};
