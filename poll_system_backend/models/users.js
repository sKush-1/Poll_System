import db from '../db/index.js'
import bcrypt from 'bcryptjs'

const User = {
    create: (data, callback) => {
        bcrypt.hash(data.password, 10, (err, hash) => {
            if (err) throw err;
            const sql = 'INSERT INTO users (name, email, phone, role, password) VALUES (?, ?, ?, ?, ?)';
            db.query(sql, [data.name, data.email, data.phone, data.role, hash], callback);
        });
    },
    findByEmail: (email, callback) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.query(sql, [email], callback);
    },
    findById: (id, callback) => {
        const sql = 'SELECT * FROM users WHERE id = ?';
        db.query(sql, [id], callback);
    },
    
    findAll: (callback) => {
        const sql = 'SELECT * FROM users';
        db.query(sql, callback);
    },

    update: (id, data, callback) => {
        const sql = 'UPDATE users SET name = ?, email = ?, phone = ?, role = ? WHERE id = ?';
        db.query(sql, [data.name, data.email, data.phone, data.role, id], callback);
    },
    delete: (id, callback) => {
        const sql = 'DELETE FROM users WHERE id = ?';
        db.query(sql, [id], callback);
    },
};

export default User;
