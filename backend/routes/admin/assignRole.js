// routes/admin/assignRole.js
import User from '../../models/User.js';
import Role from '../../models/Role.js';

const assignRole = async (req, res) => {
    const { userId, roleName } = req.body;

    const role = await Role.findOne({ name: roleName });
    if (!role) return res.status(404).json({ message: 'Role not found' });

    await User.findByIdAndUpdate(userId, { role: role._id });
    res.json({ message: 'Role assigned successfully' });
};

export default assignRole;
