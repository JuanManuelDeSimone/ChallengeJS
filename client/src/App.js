import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import NavBar from './components/NavBar'
import { Container } from '@mui/material'
import React from 'react'
import CurrentBalance from './components/CurrentBalance'

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<CurrentBalance />} />
          <Route path="/expenses" element={<ExpenseList />} />
          <Route path="/expenses/new" element={<ExpenseForm />} />
          <Route path="/expenses/:id/edit" element={<ExpenseForm />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
