const { Router } = require('express');
const router = Router();
const pool = require('../db');
const {
  getAllExpenses,
  getExpense,
  createExpense,
  editExpense,
  deleteExpense,
  getExpenseByCategory
} = require("../controllers/expenses.controller");

//router.get('/expenses', getAllExpenses);
router.get("/expenses/all/:usermail", getAllExpenses);
router.get('/expenses/:id', getExpense);
router.get('/expenses/expensesbycategory/:id/:usermail', getExpenseByCategory);
router.put('/expenses/:id/edit', editExpense);
router.delete('/expenses/:id', deleteExpense);
router.post('/expenses', createExpense);



module.exports = router;