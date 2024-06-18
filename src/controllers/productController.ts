import { Request, Response } from 'express';
import Product from '../models/product';
import { validateProduct } from '../validations/productValidation';

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { error } = validateProduct(req.body);
        if (error)
            return res.status(400).json({ success: false, message: error.details[0].message });

        const product = new Product(req.body);
        await product.save();
        res.status(201).json({
            success: true,
            message: 'Product created successfully!',
            data: product
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

export const getProducts = async (_req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully!',
            data: products
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        res.status(200).json({
            success: true,
            message: 'Product fetched successfully!',
            data: product
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { error } = validateProduct(req.body);
        if (error)
            return res.status(400).json({ success: false, message: error.details[0].message });

        const product = await Product.findByIdAndUpdate(req.params.productId, req.body, {
            new: true
        });
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            data: product
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.productId);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully!',
            data: null
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

export const searchProducts = async (req: Request, res: Response) => {
    try {
        const searchTerm = req.query.searchTerm as string;
        const products = await Product.find({ name: { $regex: searchTerm, $options: 'i' } });
        res.status(200).json({
            success: true,
            message: `Products matching search term '${searchTerm}' fetched successfully!`,
            data: products
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};
