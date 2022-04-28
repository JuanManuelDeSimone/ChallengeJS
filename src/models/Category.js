const {DataTypes} = require('sequelize');
const {sequelize} = require('../database/database');
const { Expense } = require('./Expense');

const Category = sequelize.define('categories', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
    }
  },   
  {
  timestamps: false 
  }
);

Category.hasMany(Expense, {foreignKey: 'category_id', sourceKey: 'id', onDelete: 'CASCADE'});
Expense.belongsTo(Category, {foreignKey: 'category_id', targetKey: 'id'});

module.exports = {Category};