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
exports.orderRouter = express_1.default.Router();
exports.orderRouter.use(express_1.default.json());
exports.orderRouter.use(express_1.default.urlencoded({ extended: true }));
// Read
exports.orderRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json("Get all orders");
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
}));
exports.orderRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json(`Get order with id ${req.params.id}`);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
}));
// Create
exports.orderRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json(`New order entry: ${req.body}`);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
}));
// Update
exports.orderRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json(`Data change of order with id=${req.params.id} => to: ${req.body}`);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
}));
// Delete
exports.orderRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json(req.params.id);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
}));
//# sourceMappingURL=order.js.map