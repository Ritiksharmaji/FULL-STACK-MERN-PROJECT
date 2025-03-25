const Income = require('../models/IncomeModel');

exports.addIncome = async (req, res) => {
    try {
        const { title, amount, category, description, date } = req.body;
        if (!title || !amount || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        const income = new Income({ ...req.body, user: req.user.id });
        await income.save();
        res.status(201).json({ message: 'Income added successfully', income });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await Income.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

exports.updateIncome = async (req, res) => {
    try {
        const updatedIncome = await Income.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedIncome);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

exports.deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
