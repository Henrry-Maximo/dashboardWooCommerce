const express = require("express");
// variável para obter os dados da API
const { getOrderData, getUserData, insertOrderData, updateOrderData } = require("../controllers/orderController");

// elaboração das rotas através do express
const router = express.Router();

router.get("/orders", getOrderData);
router.get("/users", getUserData);
router.get("/insertData", insertOrderData);
router.get("/updateData", updateOrderData);


module.exports = router;
