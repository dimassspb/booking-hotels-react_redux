import express from "express";

const router = express.Router();

// middleware
import { requireSignin } from "../middlewares";
// controllers
import { CreateOrder, userOrders, isAlreadyBooked } from "../controllers/order";

// order
router.post("/order-create", requireSignin, CreateOrder);
router.get("/user-orders", requireSignin, userOrders);
router.get("/is-already-booked/:hotelId", requireSignin, isAlreadyBooked);

module.exports = router;
