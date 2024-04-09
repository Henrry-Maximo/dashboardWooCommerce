const { getOrderData, getOrderDataSla } = require("../controllers/orderController");
const login = require("../controllers/loginController");
const express = require("express");
const verifyJWT = require("../../middlewares/jwt.js");

const router = express.Router();

// router.use("/user", user);
router.use("/login", login);
router.get("/orders",  getOrderData);
router.get("/order-data-sla",  getOrderDataSla);

module.exports = router;
