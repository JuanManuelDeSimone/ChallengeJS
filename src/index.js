const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const expensesRoutes = require('./routes/expenses.routes');
const categoriesRoutes = require('./routes/categories.routes');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(expensesRoutes);
app.use(categoriesRoutes);

app.use((req, res) => {
    return res.json('Hola mundo!!!')
})

app.listen(4000);
console.log('conectado al puerto 4000');