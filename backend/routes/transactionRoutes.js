const express = require('express');
const { addIncome, getIncomes, updateIncome, deleteIncome } = require('../controllers/incomeController');
const { addExpense, getExpenses, updateExpense, deleteExpense } = require('../controllers/expenseController');
const {authenticateToken} = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/income', authenticateToken, addIncome);
router.get('/incomes', authenticateToken, getIncomes);
router.put('/income/:id', authenticateToken, updateIncome);
router.delete('/income/:id', authenticateToken, deleteIncome);

router.post('/expense', authenticateToken, addExpense);
router.get('/expenses', authenticateToken, getExpenses);
router.put('/expense/:id', authenticateToken, updateExpense);
router.delete('/expense/:id', authenticateToken, deleteExpense);

module.exports = router;
