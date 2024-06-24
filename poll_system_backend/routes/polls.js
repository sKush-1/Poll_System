import express from 'express'
import Poll from '../models/Poll.js'
import PollAnswer from '../models/PollAnswer.js';
import authenticate from '../middlewares/auth.js';
import Router from 'express'
const router = Router();

router.post('/',authenticate, (req, res) => {
    const pollData = req.body;
    const createdBy = req.user.id;
    const userRole = req.user.role;


    if (userRole !== 'Institute') {
        return res.status(403).json({ message: 'Only users with the role "Institute" can create polls' });
    }

    Poll.create(pollData, createdBy, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Poll created successfully' });
    });
});

router.get('/:role', (req, res) => {
    const role = req.params.role;
    Poll.findByRole(role, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.post('/:pollId/answer', authenticate, (req, res) => {
    const { pollId } = req.params;
    const { answer } = req.body;
    const userId = req.user.id;

    PollAnswer.findByPollAndUser(pollId, userId, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to check poll answer' });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: 'You have already answered this poll' });
        }

        PollAnswer.create({ pollId, answer }, userId, (err, pollAnswer) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to submit answer' });
            }
            res.json(pollAnswer);
        });
    });
});

export default router;
