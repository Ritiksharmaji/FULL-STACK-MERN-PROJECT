const Expense = require('../models/ExpenseModel');

exports.addExpense = async (req, res) => {
    try {
        const { title, amount, category, description, date } = req.body;
        if (!title || !amount || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        const expense = new Expense({ ...req.body, user: req.user.id });
        await expense.save();
        res.status(201).json({ message: 'Expense added successfully', expense });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

exports.updateExpense = async (req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
