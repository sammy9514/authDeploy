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
exports.getOneProductAndUnLike = exports.getOneProductAndLike = exports.getOneProduct = exports.getProduct = exports.createProduct = void 0;
const productModel_1 = __importDefault(require("../model/productModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, price } = req.body;
        const product = yield productModel_1.default.create({
            title,
            description,
            price,
            image: title.charAt(0),
        });
        return res.status(201).json({
            message: "product created",
            data: product,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
            data: error.message,
        });
    }
});
exports.createProduct = createProduct;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, price } = req.body;
        const product = yield productModel_1.default.find();
        return res.status(200).json({
            message: "product found",
            data: product,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
            data: error.message,
        });
    }
});
exports.getProduct = getProduct;
const getOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productID } = req.params;
        const product = yield productModel_1.default.findById(productID);
        return res.status(200).json({
            message: "product found",
            data: product,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
            data: error.message,
        });
    }
});
exports.getOneProduct = getOneProduct;
const getOneProductAndLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productID, userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        const product = yield productModel_1.default.findById(productID);
        if (user && product) {
            const check = product.like.some((el) => el === userID);
            console.log(userID);
            if (check) {
                return res.status(200).json({
                    message: "you've already like this product",
                });
            }
            else {
                const like = yield productModel_1.default.findByIdAndUpdate(productID, {
                    like: [...product.like, userID],
                }, { new: true });
                return res.status(200).json({
                    message: "product found",
                    data: like,
                });
            }
        }
        else {
            return res.status(404).json({
                message: "product or user not found",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
            data: error.message,
        });
    }
});
exports.getOneProductAndLike = getOneProductAndLike;
const getOneProductAndUnLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productID, userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        const product = yield productModel_1.default.findById(productID);
        const p = [2, 3, 4, 5];
        const filr = p.filter((el) => {
            return el == 2;
        });
        console.log(filr);
        if (user && product) {
            const like = yield productModel_1.default.findByIdAndUpdate(productID, {
                like: product.like.filter((el) => el !== userID),
            }, { new: true });
            return res.status(200).json({
                message: "product found",
                data: like,
            });
        }
        else {
            return res.status(404).json({
                message: "product or user not found",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
            data: error.message,
        });
    }
});
exports.getOneProductAndUnLike = getOneProductAndUnLike;
