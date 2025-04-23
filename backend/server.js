// server.js or index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';

import ticketRoutes from './routes/ticketRoutes.js';
import authRoutes from './routes/auth/index.js';
import resumeRoutes from './routes/resumeRoutes.js';
import UserRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
app.use(cors());


app.use(express.json());

// 👉 Route for your ticket management system
app.use('/api/tickets', ticketRoutes);

// Use the individual routes
// Routes
app.use('/api', authRoutes);

app.use('/api', resumeRoutes);
app.use('/api/users', UserRoutes);



// 👉 New route to fetch GitHub repositories

app.get('/api/repos', async (req, res) => {
    try {
        const response = await axios.get('https://api.github.com/user/repos?per_page=100', {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                Accept: 'application/vnd.github+json'
            }
        });

        res.json(response.data);

    } catch (error) {
        console.error('GitHub fetch failed:', error.message);
        res.status(500).json({ error: 'GitHub fetch failed' });
    }
});


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
