import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ExpenseForm() {
  const [expense, setExpense] = useState({
    concept: "",
    category_id: 0,
    amount: 0,
    expensetype: 0,
  });
  const [categories, setCategories] = useState([]);  
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [types, settypes] = useState([1,-1]);

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (editing) {
      await fetch(`http://localhost:4000/expenses/${params.id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(expense)
      });
    } else {
      await fetch("http://localhost:4000/expenses", {
        method: "POST",
        body: JSON.stringify(expense),
        headers: { "content-type": "application/json" }
      });
    }
    setLoading(false);
    navigate("/expenses");
  };

  const loadExpense = async (id) => {
    const res = await fetch(`http://localhost:4000/expenses/${id}`);
    const data = await res.json();
    setExpense({
      concept: data.concept,
      category_id: data.category_id,
      amount: data.amount,
      expensetype: data.expensetype
    });
    loadCategories();
    setEditing(true);
  };
  const loadCategories = async () => {
    const res = await fetch("http://localhost:4000/categories");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    if (params.id) {
      loadExpense(params.id);
    }else{
      loadCategories();
    }
  }, [params.id]);  //este segundo parámetro es para que no se ejecute la función cada vez que se renderice el componente, sino que se ejecute solo cuando el parámetro cambie

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid xs={3}>
        <Card
          sx={{ mt: 5 }}
          style={{ backgroundColor: "#1e272e", padding: "1 rem" }}
        >
          <Typography variant="5" textAlign="center" color="white">
            {editing ? "Edit expense" : "Create Expense"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Concept"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="concept"
                value={expense.concept}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ display: "block", margin: ".5rem 0" }}
                >
                  Category
                </InputLabel>

                <Select
                  id="demo-simple-select"
                  name="category_id"
                  value={expense.category_id}
                  label="Category"
                  inputProps={{ style: { color: "white" } }}
                  InputLabelProps={{ style: { color: "white" } }}
                  onChange={handleChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>  
                  ))}
                </Select>
              </FormControl>
              <TextField
                variant="filled"
                label="Amount"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="amount"
                value={expense.amount}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ display: "block", margin: ".5rem 0" }}
                >
                  Type
                </InputLabel>

                <Select
                  id="demo-simple-select"
                  name="expensetype"
                  value={expense.expensetype}
                  label="Type"
                  inputProps={{ style: { color: "white" } }}
                  InputLabelProps={{ style: { color: "white" } }}
                  onChange={handleChange}
                >
                  {types.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type === 1 ? "Income" : "Expense"}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/*
              <TextField
                variant="filled"
                label="Type"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="expensetype"
                value={expense.expensetype}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                disabled={editing}
              />
              */}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={
                  !expense.concept ||
                  !expense.category_id ||
                  !expense.amount ||
                  !expense.expensetype
                }
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "SAVE"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
