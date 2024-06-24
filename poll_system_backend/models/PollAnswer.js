import db from '../db/index.js';

const PollAnswer = {
    create: (data, userId, callback) => {
        const sql = 'INSERT INTO poll_answers (poll_id, user_id, answer) VALUES (?, ?, ?)';
        db.query(sql, [data.pollId, userId, data.answer], callback);
    },
    findByPollId: (pollId, callback) => {
        const sql = 'SELECT * FROM poll_answers WHERE poll_id = ?';
        db.query(sql, [pollId], callback);
    },

    findByPollAndUser: (poll_id, user_id, callback) => {
        const sql = 'SELECT * FROM poll_answers WHERE poll_id = ? AND user_id = ?';
        db.query(sql, [poll_id, user_id], callback);
    }
};

export default PollAnswer;
