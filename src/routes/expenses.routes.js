const { Router } = require('express');
const router = Router();
//const pool = require('../db');
const { getAllExpenses, getExpense, createExpense, editExpense, deleteExpense } = require('../controllers/expenses.controller');

router.get('/expenses', getAllExpenses);
router.get('/expenses/:id', getExpense);
router.put('/expenses/:id', editExpense);
router.delete('/expenses/:id', deleteExpense);
router.post('/expenses', createExpense);


module.exports = router;