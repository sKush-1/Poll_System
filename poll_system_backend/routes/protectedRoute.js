import express from 'express'
import Router from 'express'
import authenticate from '../middlewares/auth.js';
const router = Router();



router.get('/protected-route', authenticate, (req, res) => {
    res.json({ message: 'This is a protected route!' });
});

export default router;