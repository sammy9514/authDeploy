"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReview = exports.createReview = exports.createRating = void 0;
const productModel_1 = __importDefault(require("../model/productModel"));
const ratingModel_1 = __importDefault(require("../model/ratingModel"));
const mongoose_1 = require("mongoose");
const reviewModel_1 = __importDefault(require("../model/reviewModel"));
const createRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { productID } = req.params;
        const { rating } = req.body;
        const product = yield productModel_1.default.findById(productID);
        const rate = yield ratingModel_1.default.create({
            rating: parseInt(rating),
        });
        product === null || product === void 0 ? void 0 : product.ratings.push(new mongoose_1.Types.ObjectId(rate === null || rate === void 0 ? void 0 : rate._id));
        product.save();
        const getProductRatings = yield productModel_1.default.findById(productID).populate({
            path: "ratings",
        });
        console.log(rating);
        const rateData = ((_a = getProductRatings === null || getProductRatings === void 0 ? void 0 : getProductRatings.ratings.map((el) => el.rating)) === null || _a === void 0 ? void 0 : _a.reduce((a, b) => a + b)) /
            getProductRatings.ratings.length;
        const prod = yield productModel_1.default.findByIdAndUpdate(productID, {
            rate: parseFloat(rateData.toFixed(2)),
        }, { new: true });
        // const data = [
        //   { name: "p", rate: 2 },
        //   { name: "c", rate: 5 },
        //   { name: "t", rate: 2 },
        // ];
        // console
        //   .log
        //   data
        //     .map((el) => {
        //       return el.rate;
        //     })
        //     .reduce((a: any, b: any) => {
        //       return a + b;
        //     }) / data.length
        //   ();
        return res.status(201).json({
            message: "product created",
            data: prod,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
            data: error.message,
        });
    }
});
exports.createRating = createRating;
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productID, userID } = req.params;
        const { message } = req.body;
        const product = yield productModel_1.default.findById(productID);
        const review = yield reviewModel_1.default.create({
            message,
            userID,
        });
        product === null || product === void 0 ? void 0 : product.review.push(new mongoose_1.Types.ObjectId(review === null || review === void 0 ? void 0 : review._id));
        product.save();
        return res.status(201).json({
            message: "product review created",
            data: review,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
            data: error.message,
        });
    }
});
exports.createReview = createReview;
const getReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productID } = req.params;
        const product = yield productModel_1.default
            .findById(productID)
            .populate({ path: "review" });
        return res.status(200).json({
            message: "product review created",
            data: product === null || product === void 0 ? void 0 : product.review,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
            data: error.message,
        });
    }
});
exports.getReview = getReview;
