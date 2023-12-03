"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const item_1 = require("./item");
const order_1 = require("./order");
const category_1 = require("./category");
const manufacturer_1 = require("./manufacturer");
exports.router = (0, express_1.Router)();
exports.router.use('/item', item_1.itemRouter);
exports.router.use('/order', order_1.orderRouter);
exports.router.use('/category', category_1.categoryRouter);
exports.router.use('/manufacturer', manufacturer_1.manufacturerRouter);
//# sourceMappingURL=routes.js.map