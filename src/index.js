const express = require('express');
const app = express();
const {sequelize} = require('./database/database');
const morgan = require('morgan');
const cors = require('cors');
const expensesRoutes = require('./routes/expenses.routes');
const categoriesRoutes = require('./routes/categories.routes');
const { Expense } = require('./models/Expense');
const { Category } = require('./models/Category');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(expensesRoutes);
app.use(categoriesRoutes);


async function main() {
    try {
      //await sequelize.sync({force: false});
      console.log("Connection has been established successfully.");
      app.listen(4000);
      console.log("Listening on port 4000");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }

}

main();

// const express = require('express');
// const morgan = require('morgan');
// const cors = require('cors');
// const app = express();
// const expensesRoutes = require('./routes/expenses.routes');
// const categoriesRoutes = require('./routes/categories.routes');

// app.use(morgan('dev'));
// app.use(cors());
// app.use(express.json());
// app.use(expensesRoutes);
// app.use(categoriesRoutes);

// app.use((req, res) => {
//     return res.json('Hola mundo!!!')
// })

// app.listen(4000);
// console.log('conectado al puerto 4000');