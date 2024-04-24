const express = require("express");
const router = express.Router();

const { getOrderData } = require("../controllers/orderController.js");
const loginController = require("../controllers/loginController.js");

// Importando o middleware para verificação de JWT
const verifyJWT = require("../../middlewares/jwt.js");

router.use("/login", loginController);
router.get("/orders", verifyJWT, getOrderData);
// router.get("/order-data-sla", verifyJWT, getOrderDataSla);

module.exports = router;
