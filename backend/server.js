// server.js or index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
// import axios from 'axios';

import ticketRoutes from './routes/ticketRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 👉 Route for your ticket management system
app.use('/api/tickets', ticketRoutes);



// MongoDB Connection and Server Start
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}).catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
});
