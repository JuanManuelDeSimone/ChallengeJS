//const pool = require("../db");
const { Category } = require("../models/Category");

const getAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.findAll();
    //const allCategories = await pool.query("select * from categories");
    //res.json(allCategories.rows);
    res.json(allCategories);
  } catch (error) {
    console.log(error);
  }
};

const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    //const result = await pool.query("select * from categories where id=$1", [id]);
    const result = await Category.findAll({
      where: {
        id
      }
    });
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    //res.json(result.rows[0]);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    //const result = await pool.query("insert into categories (name) values($1) returning *",[name]);
    const result = await Category.create({
      name
    });
    res.json(result);
    //res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

const editCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    //const result = await pool.query("update categories set name=$1 where id=$2 returning *",[name, id]);
    const result = await Category.update({
      name
    }, {
      where: {
        id
      }
    });
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    //res.json(result.rows);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    //const result = await pool.query("delete from categories where id=$1", [id]);
    const result = await Category.destroy({
      where: {
        id
      }
    });
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
