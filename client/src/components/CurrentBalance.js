import { Card, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'

export default function CurrentBalance() {
  const [expenses, setExpenses] = useState([])
  const [curBalance, setCurBalance] = useState(0)

  const loadExpenses = async () => {
    const response = await fetch('http://localhost:4000/expenses')
    const data = await response.json()
    setExpenses(data)
    console.log(data)
    
    const price = data.map((balances) => parseInt(balances.amount) * parseInt(balances.expensetype))
    console.log(price)
    const sum = price.reduce((a, b) =>  parseInt(a) + parseInt(b), 0);
    setCurBalance(sum);
    
  }
  useEffect(() => {
    loadExpenses()
  }, [])

  return (
    <>
      <Card style={{ marginBottom: ".7rem", backgroundColor: "#1e272e" }}>
        <div style={{ color: "white" }}>Current Balance: {curBalance}</div>
      </Card>
      {expenses.map((expense) => (
        <Card
          style={{ marginBottom: ".7rem", backgroundColor: "#1e272e" }}
          key={expense.id}
        >
          <div style={{ color: "white" }}>
            <Typography>Concept: {expense.concept}</Typography>
            <Typography>Input Date: {new Date(expense.expensedate).toLocaleDateString()}</Typography>
            <Typography>Amount: {expense.amount}</Typography>
          </div>
        </Card>
      ))}
    </>
  );
}
