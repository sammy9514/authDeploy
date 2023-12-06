"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewModel = new mongoose_1.Schema({
    message: { type: String },
    userID: { type: String },
    product: { type: mongoose_1.Types.ObjectId, ref: "products" },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("reviews", reviewModel);
