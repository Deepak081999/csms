import express from 'express';
import { addUser, getAllUsers, updateUserRole, deleteUser } from '../controllers/uersController.js';

const router = express.Router();

// Route to add a new user
router.post('/add', addUser);

// Route to get all users, roles, and permissions
router.get('/users', getAllUsers);

// PUT route to update user's role and permissions
router.put('/users/:id', updateUserRole);

// Route to delete a user by ID
router.delete('/users/:id', deleteUser);

export default router;
