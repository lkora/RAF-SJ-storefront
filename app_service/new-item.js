"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const newItem = joi_1.default.object().keys({
    name: joi_1.default.string().trim().min(5).max(25).required(),
    description: joi_1.default.string().trim().min(1).required(),
    manufaturer: joi_1.default.string().trim().min(1),
    available: joi_1.default.string().trim().min(1),
    category: joi_1.default.string().trim().min(5).required(),
    price: joi_1.default.number().greater(0).required()
});
//# sourceMappingURL=new-item.js.map