const axios = require("axios");
const oauth = require("../config/index.js");

async function connect() {
  const maxTentativas = 3;
  let tentativaAtual = 1;

  while (tentativaAtual <= maxTentativas) {
    try {
      const identifyURL = {
        url: process.env.URL_SITE,
        method: 'GET',
      };

      const authHeader = oauth.toHeader(oauth.authorize(identifyURL));
      const response = await axios.get(identifyURL.url, { headers: authHeader })

      return response.data;
    } catch (err) {
      console.error(`Erro de autenticação: ${err.message}`);

      // Se for a última tentativa, rejeita a promessa com o erro
      if (tentativaAtual === maxTentativas) {
        throw err;
      }

      // Aguarda por um período antes de tentar novamente (pode ser ajustado)
      await aguardar(5000);

      // Incrementa o número da tentativa
      tentativaAtual++;
    }
  }
};

// Função auxiliar para aguardar por um determinado período de tempo
function aguardar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  api: connect,
};
