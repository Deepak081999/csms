import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Role from '../models/Role.js'; // Assuming you have a 'Role' model
import Permission from '../models/Permission.js'; // Assuming you have a 'Role' model

// Add user with default 'admin' role
export const addUser = async (req, res) => {

    const { name, email, password } = req.body;

    // Find the 'admin' role by its name or any identifier
    const role = await Role.findOne({ name: 'admin' });
    if (!role) return res.status(400).json({ message: 'Role not found' });
    const permissions = role.permissions;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user and include the role and permissions
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: role._id,      // Storing the role reference
        permissions          // Assigning the role's permissions directly to the user
    });
    try {
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { file: 0 })
            .populate('role', 'name');
        const permissions = await Permission.find({}, { file: 0 });

        const data = {
            users: users,
            permissions: permissions
        };

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            message: 'Error fetching users',
            error: err.message
        });
    }
};



// Delete user by ID
export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};
