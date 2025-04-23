import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Role from '../models/Role.js';
import Permission from '../models/Permission.js';

// Function to add a user with the default 'admin' role
export const addUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Find the 'admin' role by name
    const role = await Role.findOne({ name: 'admin' });
    if (!role) return res.status(400).json({ message: 'Role not found' });

    const permissions = role.permissions;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: role._id,  // Store role reference
        permissions      // Store permissions directly from the role
    });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// Function to get all users, roles, and permissions
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { file: 0 });
        const permissions = await Permission.find({}, { file: 0 });
        const roles = await Role.find({}, { file: 0 }); // Fetch roles

        const data = {
            users,
            permissions,
            roles
        };

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            message: 'Error fetching users',
            error: err.message
        });
    }
};

// Function to update a user's role and permissions
export const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        const userId = req.params.id;

        // Get the role and populate its permissions
        // const selectedRole = await Role.findById(role).populate('permissions');
        const selectedRole = await Role.findById(role).populate({
            path: 'permissions',
            model: 'Permission'
        });
        console.log('First Permission:', selectedRole.permissions[0]);



        if (!selectedRole) {
            return res.status(404).json({ message: 'Role not found' });
        }
        let permissions = selectedRole.permissions.map(p => p._id);

        // Ensure permissions exist and are in the correct format

        console.log('Permissions:', permissions);


        // Update the user with role and permissions
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { role, permissions },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User role updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user role', error: error.message });
    }
};
// Function to delete a user by ID
// Delete user
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err.message });
    }
};
