import express from 'express';
import loginRouter from './login.js';
import registerRouter from './register.js';

const router = express.Router();

// Use the individual routes
router.use('/auth', loginRouter);
router.use('/auth', registerRouter);

export default router;
