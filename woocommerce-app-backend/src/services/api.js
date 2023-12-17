const axios = require("axios");
const oauth = require("../config/index.js");

async function WooCommerceAPI() {
  try {
    const requestApiWoocommerce = {
      url: process.env.URL_SITE,
      method: 'GET',
    };

    const authHeader = oauth.toHeader(oauth.authorize(requestApiWoocommerce));
    const responseApiWoocommerce = await axios.get(requestApiWoocommerce.url, { headers: authHeader })

    return responseApiWoocommerce;
  } catch (error) {
    console.log(`Erro de conexão à API.\n`)
    throw error;
  }
};

module.exports = {
  getOrders: WooCommerceAPI,
};
