import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import customerRoutes from './routes/customer.js';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Kết nối DB
connectDB();

// Routes
app.use('/api/customers', customerRoutes);

// Xử lý lỗi 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;