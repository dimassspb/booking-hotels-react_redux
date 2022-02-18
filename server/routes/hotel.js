import express from "express";
import formidable from "express-formidable";

// controllers
import {
    create,
    hotels,
    image,
    sellerHotels,
    remove,
    show,
    refresh,
    // userHotelBookings,
} from "../controllers/hotel";

// middleware
import { requireSignin, hotelOwner } from "../middlewares";

const router = express.Router({ mergeParams: true });

router.post("/create-hotel", requireSignin, formidable(), create);
router.get("/hotels", hotels);
router.get("/hotel/image/:hotelId", image);
router.get("/seller-hotels", requireSignin, sellerHotels);
router.delete("/delete-hotel/:hotelId", requireSignin, hotelOwner, remove);
router.get("/hotel/:hotelId", show);
router.put("/refresh-hotel/:hotelId", requireSignin, formidable(), refresh);

module.exports = router;
