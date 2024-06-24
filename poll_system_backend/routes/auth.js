import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/users.js'
import Router from 'express'
const router = Router();

router.post('/register', (req, res) => {
    const userData = req.body;
    User.create(userData, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'User registered successfully' });
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });
        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!isMatch) return res.status(401).json({ message: 'Invalid password' });
            const token = jwt.sign({ id: user.id, name: user.name, role: user.role, email:user.email, phone: user.phone}, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        });
    });
});



export default router;