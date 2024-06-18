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
exports.searchProducts = exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const product_1 = __importDefault(require("../models/product"));
const productValidation_1 = require("../validations/productValidation");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, productValidation_1.validateProduct)(req.body);
        if (error)
            return res.status(400).json({ success: false, message: error.details[0].message });
        const product = new product_1.default(req.body);
        yield product.save();
        res.status(201).json({
            success: true,
            message: 'Product created successfully!',
            data: product
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
});
exports.createProduct = createProduct;
const getProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.find();
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully!',
            data: products
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.default.findById(req.params.productId);
        if (!product)
            return res.status(404).json({ success: false, message: 'Product not found' });
        res.status(200).json({
            success: true,
            message: 'Product fetched successfully!',
            data: product
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
});
exports.getProductById = getProductById;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, productValidation_1.validateProduct)(req.body);
        if (error)
            return res.status(400).json({ success: false, message: error.details[0].message });
        const product = yield product_1.default.findByIdAndUpdate(req.params.productId, req.body, {
            new: true
        });
        if (!product)
            return res.status(404).json({ success: false, message: 'Product not found' });
        res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            data: product
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.default.findByIdAndDelete(req.params.productId);
        if (!product)
            return res.status(404).json({ success: false, message: 'Product not found' });
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully!',
            data: null
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
});
exports.deleteProduct = deleteProduct;
const searchProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const products = yield product_1.default.find({ name: { $regex: searchTerm, $options: 'i' } });
        res.status(200).json({
            success: true,
            message: `Products matching search term '${searchTerm}' fetched successfully!`,
            data: products
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
});
exports.searchProducts = searchProducts;
