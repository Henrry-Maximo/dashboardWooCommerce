const db = require('../db.js');

async function insertOrders(orders) {
    try {
        for (const order of orders) {
            const orderDate = new Date(order.date);
            const formattedDate = orderDate.toISOString().split('T')[0]; // Pega apenas a parte da data

            // Verificar se a ordem já existe no banco de dados
            const existingOrderQuery = 'SELECT id_order FROM dashboard_orders WHERE id_order = ?';
            const [existingOrderRows] = await db.promise().query(existingOrderQuery, [order.id]);

            if (existingOrderRows.length > 0) {
                // A ordem já existe, então atualize o status
                const updateQuery = 'UPDATE dashboard_orders SET status = ?, date_created = ? WHERE id_order = ?';
                const updateValues = [order.status, formattedDate, order.id];
                await db.promise().query(updateQuery, updateValues);

                console.log(`Status da ordem ${order.id} atualizado para ${order.status}`);
            } else {
                // A ordem não existe, então insira como novo registro
                const insertQuery = 'INSERT INTO dashboard_orders (id_order, status, date_created) VALUES (?, ?, ?)';
                const insertValues = [order.id, order.status, formattedDate];
                await db.promise().query(insertQuery, insertValues);
            }
        }
    } catch (error) {
        throw error;
    }
}

async function insertDuplica() {
    try {
        for (const order of orders) {
            const orderDate = new Date(order.date);
            const formattedDate = orderDate.toISOString().split('T')[0]; // Pega apenas a parte da data

            // Verificar se a ordem já existe no banco de dados
            const existingOrderQuery = 'SELECT id_order FROM dashboard_orders WHERE id_order = ?';
            const [existingOrderRows] = await db.promise().query(existingOrderQuery, [order.id]);

            if (existingOrderRows.length > 0) {
                // A ordem já existe, então atualize o status
                const updateQuery = 'UPDATE dashboard_orders SET status = ?, date_created = ? WHERE id_order = ?';
                const updateValues = [order.status, formattedDate, order.id];
                await db.promise().query(updateQuery, updateValues);

                console.log(`Status da ordem ${order.id} atualizado para ${order.status}`);
            } else {
                // A ordem não existe, então insira como novo registro
                const insertQuery = 'INSERT INTO dashboard_orders (id_order, status, date_created) VALUES (?, ?, ?)';
                const insertValues = [order.id, order.status, formattedDate];
                await db.promise().query(insertQuery, insertValues);
            }
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    insertOrders, insertDuplica, 
};
