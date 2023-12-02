"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemRouter = void 0;
const express_1 = require("express");
exports.itemRouter = (0, express_1.Router)();
exports.itemRouter.get('/', (req, res) => {
    res.send('Get all items');
});
exports.itemRouter.get('/:id', (req, res) => {
    res.send(`Get item with id ${req.params.id}`);
});
// Add more routes as needed
//# sourceMappingURL=item.js.map