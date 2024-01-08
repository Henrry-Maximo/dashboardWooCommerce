const axios = require("axios");
const oauth = require("../config/index.js");

async function WooCommerceAPI() {
  try {
    const identifyURL = {
      url: process.env.URL_SITE,
      method: 'GET',
    };

    const authHeader = oauth.toHeader(oauth.authorize(identifyURL));
    const authLogin = await axios.get(identifyURL.url, { headers: authHeader })

    return authLogin;
  } catch (err) {
    console.error(`Erro de autenticação ao serviço: ${err}`)
    throw err;
  }
};

module.exports = {
  getOrders: WooCommerceAPI,
};
