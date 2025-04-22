import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Role from '../models/Role.js';

// Authentication middleware
export const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token.' });
    }
};

// Authorization middleware for Root user
export const verifyRoot = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate('role');

        if (!user || user.role.name !== 'root') {
            return res.status(403).json({ message: 'Access denied. Only root can perform this action.' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: 'Server error while verifying root user.', error });
    }
};
