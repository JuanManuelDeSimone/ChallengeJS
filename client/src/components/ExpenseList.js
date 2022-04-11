import React, { useState, useEffect} from 'react'
import {
  Button,
  Card,
  CardContent,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from "@mui/material";
import { useNavigate } from 'react-router-dom'
import EditIcon from "@mui/icons-material/Edit"
import Fab from "@mui/material/Fab"
import DeleteIcon from "@mui/icons-material/Delete"

export default function ExpenseList() {
  
  const [expenses, setExpenses] = useState([])
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState(0)
  const [first, setFirst] = useState(true)
  const navigate = useNavigate()

  const loadExpenses = async ()=> {
    const response = await fetch('http://localhost:4000/expenses');
    const data = await response.json()
    setExpenses(data)
    if(first){
    const response2 = await fetch('http://localhost:4000/categories');
    const data2 = await response2.json()
    setCategories(data2)
    setFirst(false)
    }
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
            //name="id"
            //value={id}
            label="Category"
            inputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
            autoWidth
            //onChange={setCategory(value)}
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
      {expenses.map((expense) => (
        <Card
          style={{ marginBottom: ".7rem", backgroundColor: "#1e272e" }}
          key={expense.id}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ color: "white" }}>
              <Typography> Concept: {expense.concept} </Typography>
              {categories.map(
                (category) =>
                  expense.category_id === category.id && (
                    <Typography> Category: {category.name} </Typography>
                  )
              )}
              <Typography> Amount: {expense.amount} </Typography>
              <Typography>
                {" "}
                Type: {expense.expensetype === "1" ? "Income" : "Expense"}{" "}
              </Typography>
            </div>
            <div>
              <Fab size="medium" aria-label="edit">
                <EditIcon
                  onClick={() => navigate(`/expenses/${expense.id}/edit`)}
                />
              </Fab>
              <Fab size="medium" aria-label="delete">
                <DeleteIcon onClick={() => handleDelete(expense.id)} />
              </Fab>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
