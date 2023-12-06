"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productModel = new mongoose_1.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    image: {
        type: String,
    },
    rate: {
        type: Number,
    },
    ratings: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "ratings",
        },
    ],
    review: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "review",
        },
    ],
    like: { type: [] },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("product", productModel);
