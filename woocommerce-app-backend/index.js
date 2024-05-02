// Importando as rotas de pedidos do arquivo de rotas
const routes = require("./src/routes/ordersRoutes");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

// Configurando o CORS para permitir solicitações de diferentes origens
app.use(cors());

// Utilizando o middleware para analisar solicitações JSON
app.use(express.json());

app.use("/mov-painel", routes);

try {
  app.listen(PORT, () => {
    console.log(`Server Is Running on http://localhost:${PORT}`);
  });
} catch (error) {
  console.error(`Server Is Not Running: ${error.message}`);
}

