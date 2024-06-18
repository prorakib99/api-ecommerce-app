// app.ts
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', productRoutes);
app.use('/api', orderRoutes);

app.use((_req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

mongoose
    .connect(process.env.DATABASE_URL || '', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => console.log(err));

export default app;
