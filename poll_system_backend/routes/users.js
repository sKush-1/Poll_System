import express from 'express'
import User from '../models/users.js'
import Router from 'express'
import authenticate from '../middlewares/auth.js';
const router = Router();

router.get('/', (req, res) => {
    User.findAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const userData = req.body;
    User.update(id, userData, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User updated successfully' });
    });
});


router.delete('/:id', (req, res) => {
    const id = req.params.id;
    User.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User deleted successfully' });
    });
});

export default router
