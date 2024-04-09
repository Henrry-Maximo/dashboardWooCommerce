const connect = require("../services/api.js");

async function returnAllOrders() {
    try {
        const response = await connect.api();
        const arrayOrders = [];

        // Itera sobre as chaves do objeto response
        for (const status in response) {
            if (response.hasOwnProperty(status)) {
                // Itera sobre cada pedido dentro da lista correspondente
                response[status].forEach(order => {
                    const dateTimeParts = order.created_at.split(' ');

                    // Divide a parte da data em dia, mês e ano
                    const dateParts = dateTimeParts[0].split('/');
                    const day = dateParts[0];
                    const month = dateParts[1];
                    const year = dateParts[2];

                    // Obtém o formato "AAAA-MM-DD HH:MM:SS"
                    const formattedDate = `${year}-${month}-${day} ${dateTimeParts[1]}`;

                    arrayOrders.push({
                        id: order.order_id,
                        date: formattedDate,
                        status: status,
                        tag:order.printed,
                    });
                });
            }
        }

        return arrayOrders;
    } catch (err) {
        console.error(`Erro ao obter os pedidos: ${err.message}`);
    }
}

module.exports = {
    response: returnAllOrders,
};
