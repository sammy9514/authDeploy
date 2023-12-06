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
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainConnection = void 0;
const mongoose_1 = require("mongoose");
const url = "mongodb+srv://sammy2422:<sammy2422>@cluster0.2imvkra.mongodb.net/?retryWrites/stateMan=true&w=majority";
const mainConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mongoose_1.connect)(url).then(() => {
            console.log("db is connected");
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.mainConnection = mainConnection;
