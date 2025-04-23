import express from 'express';
import { addUser, deleteUser, getAllUsers } from '../controllers/uersController.js';

const router = express.Router();

// Route to add a user (with default admin role)
router.post('/add', addUser);

router.get('/', getAllUsers); // GET all resumes
// router.get('/', updateUserRole); // GET all resumes
// Route to delete a user by userId
router.delete('/delete/:userId', deleteUser);

export default router;
