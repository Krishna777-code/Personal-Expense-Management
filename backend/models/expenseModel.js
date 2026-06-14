const db = require('../config/db');

const Expense = {
    create: async (userId, title, amount, category, date) => {
        const [result] = await db.execute(
            'INSERT INTO expenses (user_id, title, amount, category, date) VALUES (?, ?, ?, ?, ?)',
            [userId, title, amount, category, date]
        );
        return result.insertId;
    },

    getAllByUserId: async (userId) => {
        const [rows] = await db.execute('SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC', [userId]);
        return rows;
    },

    getById: async (id, userId) => {
        const [rows] = await db.execute('SELECT * FROM expenses WHERE id = ? AND user_id = ?', [id, userId]);
        return rows[0];
    },

    update: async (id, userId, title, amount, category, date) => {
        const [result] = await db.execute(
            'UPDATE expenses SET title = ?, amount = ?, category = ?, date = ? WHERE id = ? AND user_id = ?',
            [title, amount, category, date, id, userId]
        );
        return result.affectedRows > 0;
    },

    delete: async (id, userId) => {
        const [result] = await db.execute('DELETE FROM expenses WHERE id = ? AND user_id = ?', [id, userId]);
        return result.affectedRows > 0;
    }
};

module.exports = Expense;