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
exports.itemRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.itemRouter = express_1.default.Router();
const { sequelize, Item, Manufacturer, Category, ItemCategory } = require("../models");
exports.itemRouter.use(express_1.default.json());
exports.itemRouter.use(express_1.default.urlencoded({ extended: true }));
// Read
exports.itemRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield Item.findAll({
            include: [
                { model: Manufacturer, as: 'manufacturer' },
                { model: Category, through: ItemCategory, as: 'categories' }
            ]
        });
        return res.json(items);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
}));
// Get item by ID
exports.itemRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield Item.findOne({
            where: { id: req.params.id },
            include: [
                { model: Manufacturer, as: 'manufacturer' },
                { model: Category, through: ItemCategory, as: 'categories' }
            ]
        });
        return res.json(item);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
}));
// Create new item
exports.itemRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newItem = yield Item.create(req.body);
        if (req.body.categories) {
            for (let categoryId of req.body.categories) {
                const category = yield Category.findByPk(categoryId);
                if (category) {
                    yield newItem.addCategory(category);
                }
            }
        }
        return res.json(newItem);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
}));
// Update item
exports.itemRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Item.update(req.body, { where: { id: req.params.id } });
        const updatedItem = yield Item.findOne({
            where: { id: req.params.id },
            include: [
                { model: Manufacturer, as: 'manufacturer' },
                { model: Category, through: ItemCategory, as: 'categories' }
            ]
        });
        if (req.body.categories) {
            const currentCategories = yield updatedItem.getCategories();
            for (let category of currentCategories) {
                yield updatedItem.removeCategory(category);
            }
            for (let categoryId of req.body.categories) {
                const category = yield Category.findByPk(categoryId);
                if (category) {
                    yield updatedItem.addCategory(category);
                }
            }
        }
        return res.json(updatedItem);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
}));
// Delete item
exports.itemRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield Item.findByPk(req.params.id);
        if (item) {
            const categories = yield item.getCategories();
            for (let category of categories) {
                yield item.removeCategory(category);
            }
            yield Item.destroy({ where: { id: req.params.id } });
        }
        return res.json({ message: `Item with id ${req.params.id} deleted.` });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
}));
//# sourceMappingURL=item.js.map