import db from '../db/index.js';

const Poll = {
    create: (data, createdBy, callback) => {
        const sql = 'INSERT INTO polls (question, created_by, role) VALUES (?, ?, ?)';
        db.query(sql, [data.question, createdBy, data.role], callback);
    },
    findByRole: (role, callback) => {
        const sql = 'SELECT * FROM polls WHERE role = ?';
        db.query(sql, [role], callback);
    },
};

export default Poll;
