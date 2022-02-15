import Hotel from "../models/hotel";
import fs from "fs";

export const create = async (req, res) => {
    console.log("req fields", req.fields);
    // console.log("req files", req.files);
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

export const hotels = async (req, res) => {
    let all = await Hotel.find({})
        .limit(20)
        .select("-image.data")
        .populate("postedBy", "_id name")
        .exec();
    res.json(all);
    // console.log(all);
};

export const image = async (req, res) => {
    let hotel = await Hotel.findById(req.params.hotelId).exec();
    if (hotel && hotel.image && hotel.image.data !== null) {
        res.set("Content-type", hotel.image.contentType);
        return res.send(hotel.image.data);
    }
};

export const sellerHotels = async (req, res) => {
    let all = await Hotel.find({ postedBy: req.user._id })
        .select("-image.data")
        .populate("postedBy", "_id name")
        .exec();
    console.log(all);
    res.send(all);
};

export const remove = async (req, res) => {
    let removed = await Hotel.findByIdAndDelete(req.params.hotelId)
        .select("-image.data")
        .exec();
    res.json(removed);
};

export const show = async (req, res) => {
    let hotel = await Hotel.findById(req.params.hotelId)
        .select("-image.data")
        .exec();
    console.log("Hotel", hotel);
    res.json(hotel);
};

export const refresh = async (req, res) => {
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
