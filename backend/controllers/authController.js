import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Role from '../models/Role.js';
import Permission from '../models/Permission.js';

// Register user
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    // Fetch the role (e.g., 'user')
    const role = await Role.findOne({ name: 'user' });  // Default role 'user'
    if (!role) return res.status(400).json({ message: 'Role not found' });

    // Fetch the permissions for the role
    const permissions = role.permissions; // Assuming the 'permissions' field in your Role model is an array

    // Hash the password
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
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
};

// Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Step 1: Find user and populate role with permissions
        const user = await User.findOne({ email }).populate({
            path: 'role',
            populate: {
                path: 'permissions',
                model: 'Permission'
            }
        });

        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Step 2: Extract permission names
        const permissions = user.role?.permissions?.map(perm => perm.name) || [];

        // Step 3: Generate token
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        // Step 4: Send back token, user, and permission names
        res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role, // Only role name
            },
            permissions // ['view_resume', 'edit_resume', ...]
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
