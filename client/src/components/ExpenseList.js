import React, { useState, useEffect} from 'react'
import { Button, Card, CardContent, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function ExpenseList() {
  
  const [expenses, setExpenses] = useState([])
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  const loadExpenses = async ()=> {
    const response = await fetch('http://localhost:4000/expenses');
    const data = await response.json()
    setExpenses(data)
    const response2 = await fetch('http://localhost:4000/categories');
    const data2 = await response2.json()
    setCategories(data2)
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
      <h1> Expense List</h1>
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
              {categories.map((category) => (
                expense.category_id === category.id &&
                <Typography> Category: {category.name} </Typography>
              ))}
              <Typography> Amount: {expense.amount} </Typography>
              <Typography> Type: {expense.expensetype === "1" ? "Income" : "Expense"} </Typography>
            </div>
            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(`/expenses/${expense.id}/edit`)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => handleDelete(expense.id)}
                style={{ marginLeft: ".5rem" }}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
