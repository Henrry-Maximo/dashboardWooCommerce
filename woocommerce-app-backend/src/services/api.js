// solicitações HTTP + Autenticação Woocommerce
const axios = require("axios");
const oauth = require("../config/index.js");

async function WooCommerceAPI() {
  try {
    const requestDataGet = {
      url: 'http://mov.tecnologia.ws/wp-json/wc/v3/orders?per_page=12&page=1&orderby=date&order=asc&status=nfe-emitida,pedido_separacao,retirada,transporte',
      method: 'GET',
    };

    const authHeader = oauth.toHeader(oauth.authorize(requestDataGet));
    const responseGet = await axios.get(requestDataGet.url, { headers: authHeader })

    return responseGet;
  } catch (error) {
    console.log(`Não foi possível obter uma resposta:\n`)
    throw error;
  }
};

module.exports = WooCommerceAPI;



