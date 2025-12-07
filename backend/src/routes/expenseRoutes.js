const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  deleteAllExpenses,
  searchExpenses,
  filterExpenses,
  sortExpenses,
  getSummary,
  getStatistics,
  getUserExpenses
} = require("../controllers/expenseController");

router.use(protect);

router.get("/", getExpenses);
router.get("/summary", getSummary);
router.get("/statistics", getStatistics);
router.get("/search", searchExpenses);
router.get("/filter", filterExpenses);
router.get("/sort", sortExpenses);
router.get("/user/:id", getUserExpenses);
router.get("/:id", getExpenseById);
router.post("/", createExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);
router.delete("/", deleteAllExpenses);

module.exports = router;
