// middleware/checkRole.js
import User from '../models/User.js';

export const checkRole = (roles) => {
    return async (req, res, next) => {
        const user = await User.findById(req.user.id).populate('role');

        if (roles.includes(user.role.name)) {
            next();
        } else {
            res.status(403).json({ message: 'Permission denied' });
        }
    };
};
