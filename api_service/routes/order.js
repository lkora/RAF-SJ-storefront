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
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const { sequelize, Order, ItemOrder, Item, OrderStatus } = require("../models");
exports.orderRouter = express_1.default.Router();
exports.orderRouter.use(express_1.default.json());
exports.orderRouter.use(express_1.default.urlencoded({ extended: true }));
// Read all orders
exports.orderRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order.findAll({
            include: [
                {
                    model: Item,
                    as: 'items',
                    through: { attributes: ['quantity'] }
                },
                {
                    model: OrderStatus,
                    as: 'status'
                }
            ]
        });
        return res.json(orders);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
}));
// Read order by ID
exports.orderRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield Order.findByPk(req.params.id, {
            include: [
                {
                    model: Item,
                    as: 'items',
                    through: { attributes: ['quantity'] }
                },
                {
                    model: OrderStatus,
                    as: 'status'
                }
            ]
        });
        return res.json(order);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
}));
// Create new order
exports.orderRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { items, address } = req.body; // items is an array of { id, quantity }
        const orderItems = yield Promise.all(items.map(({ id, quantity }) => __awaiter(void 0, void 0, void 0, function* () {
            const item = yield Item.findByPk(id);
            return {
                item,
                quantity,
                price: item.price * quantity
            };
        })));
        const totalPrice = orderItems.reduce((sum, { price }) => sum + price, 0);
        const newOrder = yield Order.create({
            status: 1,
            address,
            totalPrice,
            orderedAt: new Date()
        });
        yield Promise.all(orderItems.map(({ item, quantity }) => {
            return ItemOrder.create({
                orderId: newOrder.id,
                itemId: item.id,
                quantity
            });
        }));
        return res.json(newOrder);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
}));
// Update order
exports.orderRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        yield Order.update({ status }, { where: { id: req.params.id } });
        const updatedOrder = yield Order.findByPk(req.params.id);
        return res.json(updatedOrder);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
}));
// Delete order
exports.orderRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Order.destroy({ where: { id: req.params.id } });
        return res.json({ message: `Order with id ${req.params.id} deleted.` });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
}));
//# sourceMappingURL=order.js.map