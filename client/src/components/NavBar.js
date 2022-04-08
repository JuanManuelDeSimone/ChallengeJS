import {AppBar,Box,Button,Container,Toolbar,Typography} from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import React from 'react'

export default function NavBar() {
  const navigate = useNavigate()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <Link
                to="/"
                style={{ textDecoration: "none", color: "#eee" }}
              >
                Home
              </Link>
            </Typography>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <Link
                to="/expenses"
                style={{ textDecoration: "none", color: "#eee" }}
              >
                Expenses
              </Link>
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/expenses/new")}
            >
              New Expense
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
