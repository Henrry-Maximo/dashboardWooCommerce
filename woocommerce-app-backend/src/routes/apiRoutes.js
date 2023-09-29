const { getOrderData } = require("../controllers/orderController");
const express = require("express");
const router = express.Router();

// rotas disponíveis:

// responsável por inserir e atualizar os pedidos/respectivos produtos associados:
router.get("/orders", getOrderData);

// Rota: utilizada para consultar os usuário cadastrados no bd
// router.get("/users", getUserData);

// Rota: utilizada para inserir os pedidos estabelecidos no woocommerce no banco de dados
// router.get("/insertData", insertOrderData);

// Rota: utilizada para atualizar o status do pedido senão for igual o do woocommerce
// router.get("/updateData", updateOrderData);

// Rota: consultar SLAs cadastrados
// router.get("/orderSlas", getSlas);


module.exports = router;
