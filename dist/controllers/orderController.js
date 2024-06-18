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
exports.getOrdersByEmail = exports.getOrders = exports.createOrder = void 0;
const order_1 = __importDefault(require("../models/order"));
const product_1 = __importDefault(require("../models/product"));
const orderValidation_1 = require("../validations/orderValidation");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, orderValidation_1.validateOrder)(req.body);
        if (error)
            return res.status(400).json({ success: false, message: error.details[0].message });
        const product = yield product_1.default.findById(req.body.productId);
        if (!product)
            return res.status(404).json({ success: false, message: 'Product not found' });
        if (product.inventory.quantity < req.body.quantity) {
            return res
                .status(400)
                .json({ success: false, message: 'Insufficient quantity available in inventory' });
        }
        const order = new order_1.default(req.body);
        yield order.save();
        product.inventory.quantity -= req.body.quantity;
        product.inventory.inStock = product.inventory.quantity > 0;
        yield product.save();
        res.status(201).json({
            success: true,
            message: 'Order created successfully!',
            data: order
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
});
exports.createOrder = createOrder;
const getOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_1.default.find();
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully!',
            data: orders
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
});
exports.getOrders = getOrders;
const getOrdersByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }
        const orders = yield order_1.default.find({ email });
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully for user email!',
            data: orders
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
});
exports.getOrdersByEmail = getOrdersByEmail;
