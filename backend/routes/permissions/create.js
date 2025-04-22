// routes/permissions/create.js
import Permission from '../../models/Permission.js';

const createPermission = async (req, res) => {
    const { name } = req.body;

    const existingPermission = await Permission.findOne({ name });
    if (existingPermission) return res.status(400).json({ message: 'Permission already exists' });

    const newPermission = new Permission({ name });
    await newPermission.save();

    res.status(201).json({ message: 'Permission created successfully' });
};

export default createPermission;
