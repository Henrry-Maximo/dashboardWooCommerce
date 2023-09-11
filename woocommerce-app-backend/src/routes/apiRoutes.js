// variável para criar aplicativos web em Node.js
const express = require("express");
// importação de funções
const { getOrderData, getUserData, insertOrderData, updateOrderData } = require("../controllers/orderController");
// elaboração das rotas através do express
const router = express.Router();

// ----------------------------------------------

// rotas disponíveis por causa do express e a funçaõ Router
router.get("/orders", getOrderData);

// Rota: utilizada para consultar os usuário cadastrados no bd
router.get("/users", getUserData);

// Rota: utilizada para inserir os pedidos estabelecidos no woocommerce no banco de dados
router.get("/insertData", insertOrderData);

// Rota: utilizada para atualizar o status do pedido senão for igual o do woocommerce
router.get("/updateData", updateOrderData);


module.exports = router;
