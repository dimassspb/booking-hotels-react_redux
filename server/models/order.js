const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
    {   hotelId: {
        type: String,
            required: "Title is required",
    },
        title: {
            type: String,
            required: "Title is required",
        },
        content: {
            type: String,
            required: "Content is required",
            maxlength: 10000,
        },
        location: {
            type: String,
        },
        price: {
            type: Number,
            required: "Price is required",
            trim: true,
        },
        orderedBy: {
            type: ObjectId,
            ref: "User",
        },
        from: {
            type: Date,
        },
        to: {
            type: Date,
        },
        bed: {
            type: Number,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
