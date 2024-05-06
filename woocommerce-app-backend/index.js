const express = require("express");
const cors = require("cors");
const app = express();

const dotenv = require("dotenv");
dotenv.config(); // variáveis de ambiente
const PORT = process.env.PORT || 8080;

// Importando as rotas de pedidos do arquivo de rotas
const routes = require("./src/routes/ordersRoutes");

app.use(cors()); // permitir solicitações de diferentes origens
app.use(express.json()); // middleware para analisar solicitações JSON

app.use("/mov", routes);

try {
  app.listen(PORT, () => {
    console.log(`Server Is Running on ${PORT}`);
  });
} catch (error) {
  console.error(`Server Is Not Running: ${error.message}`);
}

