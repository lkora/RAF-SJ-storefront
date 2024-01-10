"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = require("./login");
const register_1 = require("./register");
exports.router = express_1.Router();
exports.router.use('/login', login_1.loginRouter);
exports.router.use('/register', register_1.registerRouter);
//# sourceMappingURL=routes.js.map