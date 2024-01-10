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
const express_1 = __importDefault(require("express"));
exports.loginRouter = express_1.default.Router();
const { sequelize, User } = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
exports.loginRouter.use(express_1.default.json());
exports.loginRouter.use(express_1.default.urlencoded({ extended: true }));
exports.loginRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    User.findOne({ where: { username: req.body.username } })
        .then((usr) => {
        if (bcrypt_1.default.compareSync(req.body.password, usr.password)) {
            const obj = {
                userId: usr.id,
                user: usr.username
            };
            const secret = process.env.ACCESS_TOKEN_SECRET;
            if (!secret) {
                throw new Error('ACCESS_TOKEN_SECRET is not set');
            }
            const token = jsonwebtoken_1.default.sign(obj, secret);
            res.json({ token: token });
        }
        else {
            res.status(400).json({ msg: "Invalid credentials" });
        }
    })
        .catch((err) => res.status(500).json(err));
}));
//# sourceMappingURL=login.js.map