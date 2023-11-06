"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newItem = void 0;
const joi_1 = __importDefault(require("joi"));
// New item
exports.newItem = joi_1.default.object().keys({
    name: joi_1.default.string().trim().min(5).max(25).required(),
    description: joi_1.default.string().trim().min(1).required(),
    manufacturer: joi_1.default.string().trim().min(1),
    available: joi_1.default.number().min(0).required(),
    category: joi_1.default.string().trim().required(),
    price: joi_1.default.number().min(0).required()
});
//# sourceMappingURL=schemas.js.map