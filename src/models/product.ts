import { Schema, model, Document } from 'mongoose';

interface Variant {
    type: string;
    value: string;
}

interface Inventory {
    quantity: number;
    inStock: boolean;
}

interface ProductDocument extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    tags: string[];
    variants: Variant[];
    inventory: Inventory;
}

const variantSchema = new Schema<Variant>({
    type: { type: String, required: true },
    value: { type: String, required: true }
});

const inventorySchema = new Schema<Inventory>({
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true }
});

const productSchema = new Schema<ProductDocument>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
    variants: { type: [variantSchema], required: true },
    inventory: { type: inventorySchema, required: true }
});

const Product = model<ProductDocument>('Product', productSchema);

export default Product;
