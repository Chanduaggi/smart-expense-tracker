const Expense = require("../models/Expense");
const mongoose = require("mongoose");

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, user: req.user.id });
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createExpense = async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;
    const expense = await Expense.create({
      user: req.user.id,
      title,
      amount,
      category,
      description,
      date
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAllExpenses = async (req, res) => {
  try {
    await Expense.deleteMany({ user: req.user.id });
    res.json({ message: "All expenses cleared" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchExpenses = async (req, res) => {
  try {
    const { keyword } = req.query;
    const regex = new RegExp(keyword, "i");
    const expenses = await Expense.find({
      user: req.user.id,
      $or: [{ title: regex }, { description: regex }]
    });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.filterExpenses = async (req, res) => {
  try {
    const { category, month } = req.query;
    const query = { user: req.user.id };
    if (category) query.category = category;
    if (month) {
      const [year, m] = month.split("-").map(Number);
      const start = new Date(year, m - 1, 1);
      const end = new Date(year, m, 0, 23, 59, 59);
      query.date = { $gte: start, $lte: end };
    }
    const expenses = await Expense.find(query).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sortExpenses = async (req, res) => {
  try {
    const { by } = req.query;
    const sort = {};
    if (by === "amount") sort.amount = -1;
    if (by === "date") sort.date = -1;
    const expenses = await Expense.find({ user: req.user.id }).sort(sort);
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const summary = await Expense.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      }
    ]);
    res.json(summary[0] || { totalAmount: 0, count: 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStatistics = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const stats = await Expense.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      },
      { $sort: { totalAmount: -1 } }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserExpenses = async (req, res) => {
  try {
    const { id } = req.params;
    if (id !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const expenses = await Expense.find({ user: id }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
