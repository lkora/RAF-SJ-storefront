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
exports.categoryRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.categoryRouter = express_1.default.Router();
const { sequelize, Category } = require("../models");
exports.categoryRouter.use(express_1.default.json());
exports.categoryRouter.use(express_1.default.urlencoded({ extended: true }));
exports.categoryRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category.findAll();
        return res.json(categories);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
}));
// Get item by ID
exports.categoryRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category.findOne({
            where: { id: req.params.id }
        });
        return res.json(category);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
}));
// Create new category
exports.categoryRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCategory = yield Category.create(req.body);
        return res.json(newCategory);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
}));
// Update category
exports.categoryRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Category.update(req.body, { where: { id: req.params.id } });
        const updatedCategory = yield Category.findOne({
            where: { id: req.params.id },
        });
        return res.json(updatedCategory);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
}));
// Delete category
exports.categoryRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category.findByPk(req.params.id);
        if (category) {
            yield Category.destroy({ where: { id: req.params.id } });
        }
        return res.json({ message: `Category with id ${req.params.id} deleted.` });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
}));
//# sourceMappingURL=category.js.map