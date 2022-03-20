const pool = require('../db');

const getAllExpenses = async (req, res) => {
  try {
    const allExpenses = await pool.query('select * from expense');
    res.json(allExpenses.rows);
  } catch (error) {
    console.log(error);
  }
}

const getExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('select * from expense where id=$1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
}

const createExpense = async (req, res) => {
  const { concept, category_id, amount, expensetype } = req.body;
  try {
    const expensedate = new Date();
    const result = await pool.query('insert into expense (concept,category_id, amount, expensedate, expensetype) values($1,$2,$3,$4,$5) returning *', [concept, category_id, amount, expensedate, expensetype]);
    res.json(result.rows[0])
  } catch (error) {
    console.log(error);
  }
}

const editExpense = async (req, res) => {
  const { id } = req.params;
  const { concept, category_id, amount } = req.body;
  try {
    const result = await pool.query('update expense set concept=$1, category_id=$2, amount=$3 where id=$4 returning *', [concept, category_id, amount, id]);
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }
    res.json(result.rows);
  } catch (error) {
    console.log(error);
  }
}

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('delete from expense where id=$1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllExpenses,
  getExpense,
  createExpense,
  editExpense,
  deleteExpense
}