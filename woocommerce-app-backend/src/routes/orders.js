const { getOrderData, getOrderDataSla } = require("../controllers/orderController");
const express = require("express");
const router = express.Router();

router.get("/orders", getOrderData);
router.get("/order-data-sla", getOrderDataSla);

module.exports = router;
