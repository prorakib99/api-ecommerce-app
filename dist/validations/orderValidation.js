"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrder = void 0;
const joi_1 = __importDefault(require("joi"));
const validateOrder = (order) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        productId: joi_1.default.string().required(),
        price: joi_1.default.number().required(),
        quantity: joi_1.default.number().required()
    });
    return schema.validate(order);
};
exports.validateOrder = validateOrder;
