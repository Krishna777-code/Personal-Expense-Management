const Expense = require('../models/expenseModel');

exports.addExpense = async (req, res) => {
    const { title, amount, category, date } = req.body;
    const userId = req.user.id;

    if (!title || !amount || !category || !date) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const expenseId = await Expense.create(userId, title, amount, category, date);
        return res.status(201).json({ success: true, message: 'Expense added successfully', expenseId });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.getAllByUserId(req.user.id);
        return res.status(200).json({ success: true, data: expenses });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    const { title, amount, category, date } = req.body;
    const userId = req.user.id;

    try {
        const updated = await Expense.update(id, userId, title, amount, category, date);
        if (!updated) {
            return res.status(404).json({ success: false, message: 'Expense not found or unauthorized' });
        }
        return res.status(200).json({ success: true, message: 'Expense updated successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const deleted = await Expense.delete(id, userId);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Expense not found or unauthorized' });
        }
        return res.status(200).json({ success: true, message: 'Expense deleted successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};