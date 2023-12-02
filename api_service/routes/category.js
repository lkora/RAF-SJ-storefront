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
exports.categoryRouter.use(express_1.default.json());
exports.categoryRouter.use(express_1.default.urlencoded({ extended: true }));
// Read
exports.categoryRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json("Get all categories");
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
}));
exports.categoryRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json(`Get category with id ${req.params.id}`);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
}));
// Create
exports.categoryRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json(`New category entry: ${req.body}`);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
}));
// Update
exports.categoryRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json(`Data change of category with id=${req.params.id} => to: ${req.body}`);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
}));
// Delete
exports.categoryRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json(req.params.id);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
}));
//# sourceMappingURL=category.js.map