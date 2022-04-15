import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  createSvgIcon
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom"
import React from 'react'
import LogoutButton from "./LogoutButton";
import Login from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";


export default function NavBar() {
  const navigate = useNavigate()
  const HomeIcon = createSvgIcon(
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  );
  const { logout, isAuthenticated, user} = useAuth0();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <HomeIcon
              variant="h6"
              fontSize="large"
              variant="contained"
              sx={{ flexGrow: 1 }}
              onClick={() => navigate("/")}
            />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <Link
                to="/expenses"
                style={{ textDecoration: "none", color: "#eee" }}
              >
                Expenses
              </Link>
            </Typography>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <Link
                to="/categories"
                style={{ textDecoration: "none", color: "#eee" }}
              >
                Categories
              </Link>
            </Typography>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Hola, {user.name}
            </Typography>
            <button onClick={() => logout()}>Logout</button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
