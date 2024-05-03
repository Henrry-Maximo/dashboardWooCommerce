const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController.js");
// const slaController = require("../controllers/slaController.js");

const loginController = require("../controllers/loginController.js");
const userController = require("../controllers/userController.js");

// Importando o middleware para verificação de JWT
const verifyJWT = require("../../middlewares/jwt.js");

router.use("/login", loginController);
router.use("/registration",  userController);

router.use("/orders", verifyJWT, orderController);
// router.get("/sla", verifyJWT, slaController);

// router.get("/order-data-sla", verifyJWT, getOrderDataSla);

module.exports = router;
