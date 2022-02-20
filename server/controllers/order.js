const User = require('../models/user');
const Order = require('../models/order');

async function createOrder (req, res) {
    const user = await User.findById(req.user._id).exec();
    let order = new Order();
    // console.log("req", req.body.hotel._id);
    order.hotelId = req.body.hotel._id;
    order.title = req.body.hotel.title;
    order.content = req.body.hotel.content;
    order.location = req.body.hotel.location;
    order.price = req.body.hotel.price;
    order.bed = req.body.hotel.bed;
    order.from = req.body.hotel.from;
    order.to = req.body.hotel.to;
    order.orderedBy = user._id;

    order.save((error, result) => {
        if (error) {
            console.log("saving order error", error);
            res.status(404).send("Saving is error");
        }
        res.json(result);
    });
    try {
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: error.message });
    }
};

async function userOrders (req, res) {
    let all = await Order.find({ orderedBy: req.user._id })
        .select("-image.data")
        .populate("postedBy", "_id name")
        .exec();
    console.log(all);
    res.send(all);
};

async function isAlreadyBooked (req, res) {
    const { hotelId } = req.params;
    // find orders of the currently logged in user

    const userOrders = await Order.find({ orderedBy: req.user._id })
        .populate()
        .exec();
    // check if hotel id is found in userOrders array

    // console.log("userOrders", userOrders);
    // console.log("userOrdersHotelId",userOrders[0].hotelId);
    // console.log(hotelId);
    let ids = [];
    for (let i = 0; i < userOrders.length; i++) {
        ids.push(userOrders[i].hotelId);
        // console.log(userOrders[i].hotelId);
        // console.log("IDS:", ids)
    }
    res.json({
        ok: ids.includes(hotelId),
    });
};
module.exports = { createOrder, isAlreadyBooked, userOrders };
