import React, { useState, useEffect} from 'react'
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from "@mui/material/Paper";
import { useNavigate } from 'react-router-dom'
import EditIcon from "@mui/icons-material/Edit"
import Fab from "@mui/material/Fab"
import DeleteIcon from "@mui/icons-material/Delete"

export default function ExpenseList() {
  
  const [expenses, setExpenses] = useState([])
  const [category, setCategory] = useState(0)
  const [categories, setCategories] = useState([])
  const [first, setFirst] = useState(true)
  const navigate = useNavigate()

  const loadExpenses = async ()=> {
    const response = await fetch('http://localhost:4000/expenses');
    const data = await response.json()
    setExpenses(data)
    //if(first){
    const response2 = await fetch('http://localhost:4000/categories');
    const data2 = await response2.json()
    setCategories(data2)
    setFirst(false)
    //}
  }
  
  const loadExpensesbyCategory = async (id)=> { 
    const response = await fetch(`http://localhost:4000/expenses/expensesbycategory/${id}`);
    const data = await response.json()
    setExpenses(data)
  }  

  const handleDelete = async (id) =>{
    try {
      await fetch(`http://localhost:4000/expenses/${id}`, {
        method: 'DELETE'
      })
      setExpenses(expenses.filter((expense)=> expense.id !== id));
    } catch (error) {
      console.log(error)
    }
  }

  const handlechange = (e) => {
    if(e.target.value !== 0){
      loadExpensesbyCategory(e.target.value);
    }else{
      loadExpenses();
    }
    setCategory(e.target.value);    
  }

  useEffect(() => {
    loadExpenses();
  }, [])
  

  return (
    <>
      <h1>
        Expense List
        <FormControl sx={{ display: "block", margin: ".5rem 0" }}>
          <InputLabel
            id="demo-simple-select-label"
            sx={{ display: "block", margin: ".5rem 0" }}
          >
            Category
          </InputLabel>

          <Select
            id="demo-simple-select"
            name="id"
            value={category}
            label="Category"
            inputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
            autoWidth
            onChange={handlechange}
          >
            {
              <MenuItem key={0} value={0}>
                All
              </MenuItem>
            }
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead
            style={{ marginBottom: ".7rem", backgroundColor: "#1e272e" }}
          >
            <TableRow>
              <TableCell>Concept</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="left">Amount</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Edit</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow
                key={expense.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="left">
                  {expense.concept}
                </TableCell>
                {categories.map(
                  (category) => (
                    expense.category_id === category.id && 
                      <TableCell align="left"> {category.name} </TableCell>
                  )
                )}
                <TableCell align="left">{expense.amount}</TableCell>
                <TableCell align="left">
                  {expense.expensetype === "1" ? "Income" : "Expense"}
                </TableCell>
                <TableCell>
                  <Fab size="medium" aria-label="edit">
                    <EditIcon
                      onClick={() => navigate(`/expenses/${expense.id}/edit`)}
                    />
                  </Fab>
                </TableCell>
                <TableCell>
                  <Fab size="medium" aria-label="delete">
                    <DeleteIcon onClick={() => handleDelete(expense.id)} />
                  </Fab>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
