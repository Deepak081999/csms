// middleware/checkPermission.js
import User from '../models/User.js';

export const checkPermission = (permission) => {
    return async (req, res, next) => {
        const user = await User.findById(req.user.id).populate('permissions');

        if (user.permissions.some(p => p.name === permission)) {
            next();
        } else {
            res.status(403).json({ message: 'Access denied' });
        }
    };
};
