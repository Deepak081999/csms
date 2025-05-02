// routes/linkedinProfileRoutes.js
import express from 'express';
import { addProfile, getAllProfiles, getActiveProfiles, updateStatus } from '../controllers/linkedinProfileController.js';

const router = express.Router();

router.post('/add', addProfile);
router.get('/all', getAllProfiles);  // Make sure this endpoint exists
router.get('/active', getActiveProfiles);

router.post('/update-status', updateStatus); // New

export default router;
