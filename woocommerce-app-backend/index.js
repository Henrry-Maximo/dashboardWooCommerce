// importando rotas
const apiRoutes = require("./src/routes/apiRoutes");

// importando o express/cors
const express = require("express");
const cors = require("cors");

// utilizando o express
const app = express();

// atribuindo a função: cors() para acessar recursos
app.use(cors());

// rota raiz
app.use("/", apiRoutes);

// inicialização do servidor
const port = 5000;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
