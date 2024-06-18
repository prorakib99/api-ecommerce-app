import { Schema, model, Document } from 'mongoose';

interface OrderDocument extends Document {
    email: string;
    productId: string;
    price: number;
    quantity: number;
}

const orderSchema = new Schema<OrderDocument>({
    email: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

const Order = model<OrderDocument>('Order', orderSchema);

export default Order;
