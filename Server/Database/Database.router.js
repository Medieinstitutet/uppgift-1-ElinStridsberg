const express = require("express");
const router = express.Router();
const {makeOrder} = require("./Database.controller")

// router.post("/products", createCheckoutSession);

router.post("/orders", makeOrder)


module.exports = router;