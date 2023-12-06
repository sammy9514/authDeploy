"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controller/productController");
const router = (0, express_1.Router)();
router.route("/create-product").post(productController_1.createProduct);
router.route("/get-product").get(productController_1.getProduct);
router.route("/get-one-product/:productID").get(productController_1.getOneProduct);
router
    .route("/like-one-product/:userID/:productID")
    .patch(productController_1.getOneProductAndLike);
router
    .route("/unlike-one-product/:userID/:productID")
    .patch(productController_1.getOneProductAndUnLike);
exports.default = router;
