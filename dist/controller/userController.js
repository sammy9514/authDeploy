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
exports.getOneUser = exports.getUser = exports.verifyUser = exports.signInUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const userModel_1 = __importDefault(require("../model/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password } = req.body;
        const generateSalt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, generateSalt);
        const token = crypto_1.default.randomBytes(3).toString("hex");
        const user = yield userModel_1.default.create({
            userName,
            email,
            password: hashed,
            verificationToken: token,
            avatar: userName.charAt(0),
        });
        res.status(200).json({
            message: "created",
            data: user,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "failed",
        });
    }
});
exports.createUser = createUser;
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (user) {
            const passCheck = yield bcrypt_1.default.compare(password, user.password);
            if (passCheck) {
                if (user.verified && user.verificationToken === "") {
                    const webToken = jsonwebtoken_1.default.sign({ id: user._id }, "justAcode", {
                        expiresIn: "2d",
                    });
                    res.status(200).json({
                        message: "verified ",
                        data: webToken,
                    });
                }
                else {
                    res.status(404).json({
                        message: "go and verify your account",
                    });
                }
            }
        }
        else {
            res.status(404).json({
                message: "check password and try again",
            });
        }
    }
    catch (error) {
        res.status(404).json({
            message: "failed to signin",
        });
    }
});
exports.signInUser = signInUser;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, token } = req.body;
        const getEmail = yield userModel_1.default.findOne({ email });
        const getToken = yield userModel_1.default.findOne({ verificationToken: token });
        if (getToken && getEmail) {
            yield userModel_1.default.findByIdAndUpdate(getEmail._id, { verificationToken: "", verified: true }, { new: true });
            res.status(200).json({
                message: "verified",
            });
        }
        else {
            res.status(404).json({
                message: "token/ email isn't correct",
            });
        }
    }
    catch (error) {
        res.status(404).json({
            message: "verification failed",
        });
    }
});
exports.verifyUser = verifyUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.find();
        res.status(200).json({
            message: "done",
            data: user,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "failed to get users",
        });
    }
});
exports.getUser = getUser;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield userModel_1.default.findById(userId);
        res.status(200).json({
            message: "user found ",
            data: user,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "failed to get user",
        });
    }
});
exports.getOneUser = getOneUser;
