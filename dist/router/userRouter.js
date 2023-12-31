"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const router = (0, express_1.Router)();
router.route("/create-user").post(userController_1.createUser);
router.route("/signin-user").post(userController_1.signInUser);
router.route("/verify-user").patch(userController_1.verifyUser);
router.route("/get-user").get(userController_1.getUser);
router.route("/get-one-user/:userId").get(userController_1.getOneUser);
exports.default = router;
