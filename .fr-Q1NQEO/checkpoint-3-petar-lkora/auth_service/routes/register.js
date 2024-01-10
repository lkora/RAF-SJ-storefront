"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
exports.registerRouter = express_1.default.Router();
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const { sequelize, User } = require("../models");
exports.registerRouter.use(express_1.default.json());
exports.registerRouter.use(express_1.default.urlencoded({ extended: true }));
exports.registerRouter.post('/', (req, res) => {
    const obj = {
        username: req.body.username,
        email: req.body.email,
        admin: false,
        password: bcrypt_1.default.hashSync(req.body.password, 10)
    };
    User.create(obj).then((rows) => {
        const usr = {
            userId: rows.id,
            user: rows.username
        };
        const secret = process.env.ACCESS_TOKEN_SECRET;
        if (!secret) {
            throw new Error('ACCESS_TOKEN_SECRET is not set');
        }
        const token = jsonwebtoken_1.default.sign(usr, secret);
        //console.log(token);
        res.json({ token: token });
    }).catch((err) => res.status(500).json(err));
});
//# sourceMappingURL=register.js.map