const pool = require("../db");

const getAllCategories = async (req, res) => {
  try {
    const allCategories = await pool.query("select * from category");
    res.json(allCategories.rows);
  } catch (error) {
    console.log(error);
  }
};

const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("select * from category where id=$1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pool.query(
      "insert into category (name) values($1) returning *",[name]);
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

const editCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const result = await pool.query(
      "update category set name=$1 where id=$2 returning *",[name, id]);
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    res.json(result.rows);
  } catch (error) {
    console.log(error);
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("delete from category where id=$1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  editCategory,
  deleteCategory
};
