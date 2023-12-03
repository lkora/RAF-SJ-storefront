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
exports.manufacturerRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.manufacturerRouter = express_1.default.Router();
const { sequelize, Manufacturer } = require("../models");
exports.manufacturerRouter.use(express_1.default.json());
exports.manufacturerRouter.use(express_1.default.urlencoded({ extended: true }));
exports.manufacturerRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield Manufacturer.findAll();
        return res.json(items);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
}));
// Get item by ID
exports.manufacturerRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield Manufacturer.findOne({
            where: { id: req.params.id }
        });
        return res.json(item);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
}));
//# sourceMappingURL=manufacturer.js.map