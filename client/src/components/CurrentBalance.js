import { Card, Table, TableCell, TableBody, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'


export default function CurrentBalance() {
  const [expenses, setExpenses] = useState([])
  const [curBalance, setCurBalance] = useState(0)
  const [categories, setCategories] = useState([])
  const { user } = useAuth0()

  const loadExpenses = async () => {
    //const response = await fetch('http://localhost:4000/expenses')
    const response = await fetch(`http://localhost:4000/expenses/all/${user.email}`);
    const data = await response.json()
    const list = data.filter((expense,index) => index < 10)           
    setExpenses(list)
    const response2 = await fetch("http://localhost:4000/categories");
    const data2 = await response2.json();
    setCategories(data2);    
    const price = data.map((balances) => parseInt(balances.amount) * parseInt(balances.expensetype))
    const sum = price.reduce((a, b) =>  parseInt(a) + parseInt(b), 0);
    setCurBalance(sum);
    
  }
  useEffect(() => {
    loadExpenses()
  }, [])

  return (
    <>
      <Card style={{ marginBottom: ".7rem", backgroundColor: "#1e272e" }}>
        <div style={{ color: "white"}} >Current Balance: {curBalance}</div>
      </Card>
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
              <TableCell align="left">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                key={expense.id}
              >
                <TableCell>{expense.concept}</TableCell>
                <TableCell>
                  {categories.map(
                    (category) =>
                      expense.category_id === category.id && (
                        <TableCell align="left"> {category.name} </TableCell>
                      )
                  )}
                </TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>
                  {expense.expensetype === "1" ? "Income" : "Expense"}
                </TableCell>
                <TableCell>
                  {new Date(expense.expensedate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
