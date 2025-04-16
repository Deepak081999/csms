import express from 'express';
import {
    uploadResume,
    getAllResumes,
    getResume,
    deleteResume,
    toggleStatus,
    uploaded,
    getResumeMeta
} from '../controllers/resumeController.js';

const router = express.Router();

router.post('/upload', uploaded, uploadResume);
router.get('/resumes', getAllResumes); // GET all resumes
router.get('/resumes/meta/:id', getResumeMeta); // GET metadata of specific resume
router.get('/resumes/:id', getResume);
router.delete('/resumes/:id', deleteResume);
router.patch('/resumes/toggle-status/:id', toggleStatus);

export default router;
