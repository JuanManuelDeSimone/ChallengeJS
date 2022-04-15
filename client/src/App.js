import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import NavBar from './components/NavBar'
import { Container } from '@mui/material'
import React from 'react'
import CurrentBalance from './components/CurrentBalance'
import LoginButton  from './components/LoginButton'
import Profile from './components/Profile'
import LogoutButton from './components/LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'
import { CircularProgress } from "@mui/material";

export default function App() {

  const { isAuthenticated, isLoading } = useAuth0()
  if (isLoading) {
    return <CircularProgress color="inherit" size={30} />;
  }
  
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
