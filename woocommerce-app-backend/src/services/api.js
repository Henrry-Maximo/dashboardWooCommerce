const https = require("node:https");
const fs = require("node:fs");

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const dotenv = require("dotenv");
dotenv.config();

const caCert = fs.readFileSync(process.env.PATH_CRT, "utf-8");

const agent = new https.Agent({
  ca: caCert,
  rejectUnauthorized: true, // Forçar uso do certificado
});

// instanciando WoocommerceRestApi
const api = new WooCommerceRestApi({
  url: process.env.URL_SITE,
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  axiosConfig: {
    httpsAgent: agent,
  },
});

// função para buscar os pedidos da API
async function fetchDataOrders(_, res) {
  try {
    // requisição para obter os dados / retornar 12 pedidos de cada status
    const response = await api.get("logistica/dashboard?limit=12");

    // retorna os dados obtidos
    return response.data;
  } catch (error) {
    // console.error('Erro ao buscar pedidos:', error);
    res.status(500).json({ error: 'Erro ao buscar pedidos' });
  }
}

module.exports = {
  getOrdersData: fetchDataOrders,
};
