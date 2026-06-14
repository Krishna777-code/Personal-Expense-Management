const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const expenseController = require('../controllers/expenseController');
const router = express.Router();

// All expense routes require valid authentication
router.post('/', protect, expenseController.addExpense);
router.get('/', protect, expenseController.getExpenses);
router.put('/:id', protect, expenseController.updateExpense);
router.delete('/:id', protect, expenseController.deleteExpense);

module.exports = router;