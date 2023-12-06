"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ratingModel = new mongoose_1.Schema({
    rating: { type: Number },
    product: { type: mongoose_1.Types.ObjectId, ref: "products" },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("ratings", ratingModel);
