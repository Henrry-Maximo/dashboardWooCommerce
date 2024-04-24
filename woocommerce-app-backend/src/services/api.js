// const axios = require("axios");
// const oauth = require("../config/index.js");
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const dotenv = require("dotenv");

// carregar informações do .env
dotenv.config();

// declaração de função padrão
// async function connect() {
//       const WooCommerceRestApi = {
//         url: process.env.URL_SITE,
//         method: 'GET',
//       };

//       const authHeader = oauth.toHeader(oauth.authorize(WooCommerceRestApi));
//       const response = await axios.get(WooCommerceRestApi.url, { headers: authHeader });

//       return response.data;
// };

// expressão de função de seta (ES6: arrow function expression)
// const connectApi = async () => {
//     const WooCommerceRestApi = {
//       url: process.env.URL_SITE,
//       method: 'GET',
//     };

//     const authHeader = oauth.toHeader(oauth.authorize(WooCommerceRestApi));
//     const response = await axios.get(WooCommerceRestApi.url, { headers: authHeader });

//     return response.data;
// };

// Instanciando WoocommerceRestApi
const api = new WooCommerceRestApi({
  url: process.env.URL_SITE,
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
});

// Função para buscar os pedidos da API
async function fetchDataOrders(req, res) {
  try {
    // Requisição para obter os dados / retornar 12 pedidos de cada status
    const response = await api.get("logistica1/dashboard?limit=12");

    // Retorna os dados obtidos
    return response.data;
  } catch (error) {
    throw error; 
  }
}

/*
// formato dos dados retornados:
{
    "nfe-emitida": [
        {
            "order_id": 10691,
            "order_number": "10691",
            "printed": false,
            "created_at": "23/04/2024 14:22:50",
            "modified_at": "23/04/2024 15:46:54"
        },
        {
            "order_id": 10688,
            "order_number": "10688",
            "printed": false,
            "created_at": "22/04/2024 15:15:28",
            "modified_at": "22/04/2024 15:33:25"
        },
        {
            "order_id": 10177,
            "order_number": "10177",
            "printed": false,
            "created_at": "17/04/2024 14:40:38",
            "modified_at": "17/04/2024 18:44:34"
        }
    ],
    "pedido_separacao": [],
    "retirada": [],
    "transporte": []
}
*/

module.exports = {
  getOrdersData: fetchDataOrders,
};
