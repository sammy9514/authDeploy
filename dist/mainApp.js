"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainApp = void 0;
const userRouter_1 = __importDefault(require("./router/userRouter"));
const productRouter_1 = __importDefault(require("./router/productRouter"));
const ratingRouter_1 = __importDefault(require("./router/ratingRouter"));
const MainApp = (app) => {
    app.use("/api/v1", userRouter_1.default);
    app.use("/api/v1/product", productRouter_1.default);
    app.use("/api/v1/ratings", ratingRouter_1.default);
    app.get("/", (req, res) => {
        try {
            res.status(200).json({
                message: "default",
            });
        }
        catch (error) {
            res.status(404).json({
                message: "failed",
            });
        }
    });
};
exports.MainApp = MainApp;
