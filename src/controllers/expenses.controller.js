const pool = require('../db');

const getAllExpenses = async (req, res) => {
  try {
    const {usermail} = req.params;
    const allExpenses = await pool.query('select * from expense where usermail = $1 order by id desc', [usermail]);
    res.json(allExpenses.rows);
  } catch (error) {
    console.log(error);
  }
}
const getExpenseByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await pool.query('select * from expense where category_id = $1', [id]);
    if (expense.rowCount === 0) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }
    res.json(expense.rows);
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
  const { concept, category_id, amount, expensetype, usermail } = req.body;
  try {
    const expensedate = new Date();
    const result = await pool.query('insert into expense (concept,category_id, amount, expensedate, expensetype, usermail) values($1,$2,$3,$4,$5,$6) returning *', [concept, category_id, amount, expensedate, expensetype,usermail]);
    res.json(result.rows[0])
  } catch (error) {
    console.log(error);
  }
}

const editExpense = async (req, res) => {
  const { id } = req.params;
  const { concept, category_id, amount, expensetype } = req.body;
  try {
    const result = await pool.query('update expense set concept=$1, category_id=$2, amount=$3, expensetype=$4 where id=$5 returning *', [concept, category_id, amount, expensetype, id]);
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
  deleteExpense,
  getExpenseByCategory
};