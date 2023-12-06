"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ratingController_1 = require("../controller/ratingController");
const router = (0, express_1.Router)();
router.route("/create-ratings/:productID").post(ratingController_1.createRating);
router.route("/create-review/:userID/:productID").post(ratingController_1.createReview);
router.route("/get-review/:productID").get(ratingController_1.getReview);
exports.default = router;
