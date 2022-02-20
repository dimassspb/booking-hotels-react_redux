const express = require("express");

const router = express.Router();

// middleware
const { requireSignin } = require("../middlewares");
// controllers
const { createOrder, userOrders, isAlreadyBooked } = require("../controllers/order");

// order
router.post("/order-create", requireSignin, createOrder);
router.get("/user-orders", requireSignin, userOrders);
router.get("/is-already-booked/:hotelId", requireSignin, isAlreadyBooked);

module.exports = router;
