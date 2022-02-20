const fs = require("fs");
const Hotel = require("../models/hotel");

async function create (req, res) {
    let fields = req.fields;
    let files = req.files;

    let hotel = new Hotel(fields);
    hotel.postedBy = req.user._id;

    if (files.image) {
        hotel.image.data = fs.readFileSync(files.image.path);
        hotel.image.contentType = files.image.type;
    }
    hotel.save((error, result) => {
        if (error) {
            console.log("saving hotel error", error);
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

async function hotels (req, res) {
    // let all = await Hotel.find({ from: { $gte: new Date() } });
    let all = await Hotel.find({})
        .limit(20)
        .select("-image.data")
        .populate("postedBy", "_id name")
        .exec();
    res.json(all);
};

async function image (req, res) {
    let hotel = await Hotel.findById(req.params.hotelId).exec();
    if (hotel && hotel.image && hotel.image.data !== null) {
        res.set("Content-type", hotel.image.contentType);
        return res.send(hotel.image.data);
    }
};

async function sellerHotels (req, res) {
    let all = await Hotel.find({ postedBy: req.user._id })
        .select("-image.data")
        .populate("postedBy", "_id name")
        .exec();
    console.log(all);
    res.send(all);
};

async function remove (req, res) {
    let removed = await Hotel.findByIdAndDelete(req.params.hotelId)
        .select("-image.data")
        .exec();
    res.json(removed);
};

async function show (req, res) {
    let hotel = await Hotel.findById(req.params.hotelId)
        .populate("postedBy", "_id name")
        .select("-image.data")
        .exec();
    console.log("SINGLE HOTEL", hotel);
    res.json(hotel);
};

async function refresh (req, res) {
    try {
        let fields = req.fields;
        let files = req.files;
        let data = { ...fields };
        if (files.image) {
            let image = {};
            image.data = fs.readFileSync(files.image.path);
            image.contentType = files.image.type;
            data.image = image;
        }
        let updated = await Hotel.findByIdAndUpdate(req.params.hotelId, data, {
            new: true,
        }).select("-image-data");
        res.json(updated);
    } catch (error) {
        console.log(error);
        res.status(400).send("Update faild. Try again.");
    }
};

async function searchResults(req, res) {
    const { location, date, bed } = req.body;
    // console.log(location, date, bed);
    // console.log(date);
    const dateArr = date.split(",");

    let result = await Hotel.find({
        from: { $gte: new Date(dateArr[0]) },
        to: { $gte: new Date(dateArr[1]) },
        location,
        bed,
    })
        .select("-image.data")
        .exec();
    res.json(result);
};
module.exports = { create, hotels, sellerHotels, remove, show, refresh, searchResults, image };
