"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
exports.categoryRouter = (0, express_1.Router)();
exports.categoryRouter.get('/', (req, res) => {
    res.send('Get all categories');
});
exports.categoryRouter.get('/:id', (req, res) => {
    res.send(`Get category with id ${req.params.id}`);
});
// Add more routes as needed
//# sourceMappingURL=category.js.map