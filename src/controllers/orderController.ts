import { Request, Response } from 'express';
import Order from '../models/order';
import Product from '../models/product';
import { validateOrder } from '../validations/orderValidation';

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { error } = validateOrder(req.body);
        if (error)
            return res.status(400).json({ success: false, message: error.details[0].message });

        const product = await Product.findById(req.body.productId);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

        if (product.inventory.quantity < req.body.quantity) {
            return res
                .status(400)
                .json({ success: false, message: 'Insufficient quantity available in inventory' });
        }

        const order = new Order(req.body);
        await order.save();

        product.inventory.quantity -= req.body.quantity;
        product.inventory.inStock = product.inventory.quantity > 0;
        await product.save();

        res.status(201).json({
            success: true,
            message: 'Order created successfully!',
            data: order
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

export const getOrders = async (_req: Request, res: Response) => {
    try {
        const orders = await Order.find();
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully!',
            data: orders
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

export const getOrdersByEmail = async (req: Request, res: Response) => {
    try {
        const email = req.query.email as string;
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }

        const orders = await Order.find({ email });
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully for user email!',
            data: orders
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};
