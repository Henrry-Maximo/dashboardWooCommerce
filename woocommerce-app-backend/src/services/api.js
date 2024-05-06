const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const dotenv = require("dotenv");

dotenv.config();

// instanciando WoocommerceRestApi
const api = new WooCommerceRestApi({
  url: process.env.URL_SITE,
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
});

// função para buscar os pedidos da API
async function fetchDataOrders(req, res) {
  try {
    // requisição para obter os dados / retornar 12 pedidos de cada status
    const response = await api.get("logistica/dashboard?limit=12");

    // retorna os dados obtidos
    return response.data;
  } catch (error) {
    res.status(404).end();
    throw error; 
  }
}

module.exports = {
  getOrdersData: fetchDataOrders,
};
