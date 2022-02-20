const express = require("express");
const formidable = require("express-formidable");

// controllers
const {
    create,
    hotels,
    image,
    sellerHotels,
    remove,
    show,
    refresh,
    searchResults,
} = require("../controllers/hotel"); ;

// middleware
const { requireSignin, hotelOwner } = require("../middlewares");

const router = express.Router({ mergeParams: true });

router.post("/create-hotel", requireSignin, formidable(), create);
router.get("/hotels", hotels);
router.get("/hotel/image/:hotelId", image);
router.get("/seller-hotels", requireSignin, sellerHotels);
router.delete("/delete-hotel/:hotelId", requireSignin, hotelOwner, remove);
router.get("/hotel/:hotelId", show);
router.put("/refresh-hotel/:hotelId", requireSignin, formidable(), refresh);
router.post("/search-res", searchResults);
module.exports = router;
