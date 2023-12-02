"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
exports.orderRouter = (0, express_1.Router)();
exports.orderRouter.get('/', (req, res) => {
    res.send('Get all orders');
});
exports.orderRouter.get('/:id', (req, res) => {
    res.send(`Get order with id ${req.params.id}`);
});
// Add more routes as needed
//# sourceMappingURL=order.js.map