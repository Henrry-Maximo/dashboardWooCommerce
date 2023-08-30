const axios = require('axios');
const oauth = require("../../config/index.js");
const db = require('../db.js');

const apiUrl = "http://mov.tecnologia.ws/wp-json/wc/v3";

// Função para buscar os pedidos da API
async function fetchOrdersFromAPI(orders) {
    try {
        const requestData = {
          url: `${apiUrl}/orders?per_page=12&page=1&orderby=date&order=asc&status=nfe-emitida,pedido_separacao,retirada,transporte`,
          method: "GET",
        };
    
        const authHeader = oauth.toHeader(oauth.authorize(requestData));
        const response = await axios.get(requestData.url, { headers: authHeader });
    
        const orders = response.data.map((order) => ({
          id: order.id,
          status: order.status,
          date: order.date_created,
        }));
    
        return orders;
    } catch ( error ) {
        throw error;
    }
}

// Função para comparar os status antigos e novos e atualizar o banco de dados
async function updateOrderStatusInDB(orders) {
    try {
        for (const order of orders) {
            const query = 'UPDATE dashboard_orders SET status = ? WHERE id_order = ?';
            const values = [order.status, order.id];
            await db.promise().query(query, values);
        }
    } catch (error) {
        throw error;
    }
}

// Função de verificação periódica
async function checkAndUpdateOrderStatus() {
    try {
        const orders = await fetchOrdersFromAPI();
        await updateOrderStatusInDB(orders);
        console.log('Verificação de status concluída.');
    } catch (error) {
        console.error('Erro na verificação de status:', error);
    }
}

// Defina o intervalo desejado em milissegundos (por exemplo, a cada 1 hora)
const intervalInMilliseconds = 3600000; // 1 hora

// Inicie a verificação periódica usando setInterval
const intervalId = setInterval(checkAndUpdateOrderStatus, intervalInMilliseconds);

module.exports = {
    checkAndUpdateOrderStatus
};