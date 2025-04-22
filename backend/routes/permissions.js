import express from 'express';
import Permission from '../models/Permission.js';
import { verifyRoot } from '../middleware/auth.js';

const router = express.Router();

// Create permission
router.post('/', verifyRoot, async (req, res) => {
    try {
        const permission = await Permission.create(req.body);
        res.json(permission);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update permission
router.put('/:id', verifyRoot, async (req, res) => {
    try {
        const permission = await Permission.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(permission);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete permission
router.delete('/:id', verifyRoot, async (req, res) => {
    try {
        await Permission.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
