const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");

const Expense = sequelize.define(
  "expenses",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    concept: {
      type: DataTypes.STRING,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL(18, 2),
    },
    expensedate: {
      type: DataTypes.DATE,
    },
    expensetype: {
      type: DataTypes.INTEGER,
    },
    usermail: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = {Expense};