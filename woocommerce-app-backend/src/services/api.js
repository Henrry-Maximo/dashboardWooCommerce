const axios = require("axios");
const oauth = require("../config/index.js");
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

// declaração de função padrão
async function connect() {
      const WooCommerceRestApi = {
        url: process.env.URL_SITE,
        method: 'GET',
      };

      const authHeader = oauth.toHeader(oauth.authorize(WooCommerceRestApi));
      const response = await axios.get(WooCommerceRestApi.url, { headers: authHeader });

      // console.log(`api: ${response.data}`)
      return response.data;
};

// Instanciando WoocommerceRestApi
const api = new WooCommerceRestApi({
  url: process.env.URL_SITE,
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
})

// Função para buscar os dados da API
async function fetchData() {
  try {
    // Requisição para obter os dados
    const response = await api.get('logistica/dashboard?limit=12');
    
    // Retorna os dados obtidos
    return response.data;
  } catch (error) {
    console.error('WooCommerceRestApi:', error.message);
    throw error; // Lança o erro para tratamento externo, se necessário
  }
}

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

module.exports = {
  api: fetchData,
};
