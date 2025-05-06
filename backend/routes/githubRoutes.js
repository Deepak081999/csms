import express from 'express';
import {
    storeUsername,
    fetchGithubOverview,
    fetchGithubRepositories, getLatestUsername
} from '../controllers/githubController.js';

const router = express.Router();

// Store username
router.post('/store', storeUsername);

// Get overview
router.get('/overview/:username', fetchGithubOverview);

// Get repositories
router.get('/repos/:username', fetchGithubRepositories);


router.get('/latest', getLatestUsername);

export default router;
