import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Icon,
  createSvgIcon
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom"
import React from 'react'


export default function NavBar() {
  const navigate = useNavigate()
  const HomeIcon = createSvgIcon(
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  );

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
            <Icon
              sx={{ fontSize: 50 }}
              onClick={() => navigate("/expenses/new")}
            >
              add_circle
            </Icon>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
