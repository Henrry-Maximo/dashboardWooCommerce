const WooCommerceAPI = require("../services/api.js");

async function getOrders() {
    try {
        const response = await WooCommerceAPI.getOrders();
        const allStatuses = Object.keys(response.data);
        const formattedOrders = [];

        allStatuses.forEach(status => {
            response.data[status].forEach(order => {
                const dateTimeParts = order.created_at.split(' ');

                // Divide a parte da data em dia, mês e ano
                const dateParts = dateTimeParts[0].split('/');
                const day = dateParts[0];
                const month = dateParts[1];
                const year = dateParts[2];

                // Obtém o formato "AAAA-MM-DD HH:MM:SS"
                const formattedDate = `${year}-${month}-${day} ${dateTimeParts[1]}`;

                formattedOrders.push({
                    id: order.order_id,
                    date: formattedDate,
                    status: status,
                });
            });
        });

        return formattedOrders;
    } catch (err) {
        console.error(`Erro ao obter os pedidos: ${err.message}`);
    }
}

module.exports = {
    getOrders,
};
