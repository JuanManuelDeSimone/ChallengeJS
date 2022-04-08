import { Card, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'

export default function CurrentBalance() {
  const [expenses, setExpenses] = useState([])
  const [currentBalance, setCurrentBalance] = useState(0)

  const loadExpenses = async () => {
    const response = await fetch('http://localhost:4000/expenses')
    const data = await response.json()
    setExpenses(data)
    for(let i = 0; i < expenses.length; i++){
      console.log(expenses[i].amount)
      let value = currentBalance + data[i].amount
      setCurrentBalance(value)
    }
    console.log(currentBalance)
  }
  useEffect(() => {
    loadExpenses()
  }, [])

  return (
    <>
      {expenses.map((expense) => (
        <Card
          style={{ marginBottom: ".7rem", backgroundColor: "#1e272e" }}
          key={expense.id}
        >
          <div style={{ color: "white" }}>
            <Typography>{expense.concept}</Typography>
            <Typography>{expense.expenseDate}</Typography>
            <Typography>{expense.amount}</Typography>
          </div>
        </Card>
      ))}
      <Card style={{ marginBottom: ".7rem", backgroundColor: "#1e272e" }}>
        <div style={{color:"white"}}>Current Balance:</div>
        <div>{currentBalance}</div>
      </Card>
    </>
  );
}
