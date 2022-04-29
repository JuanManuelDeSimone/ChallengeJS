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

export default function CategoryForm() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [types, settypes] = useState([1, -1]);

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (editing) {
      await fetch(`http://localhost:4000/categories/${params.id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(category),
      });
    } else {
      await fetch("http://localhost:4000/categories", {
        method: "POST",
        body: JSON.stringify(category),
        headers: { "content-type": "application/json" },
      });
    }
    setLoading(false);
    navigate("/categories");
  };

  const loadCategory = async (id) => {
    const res = await fetch(`http://localhost:4000/categories/${id}`);
    const data = await res.json();
    setCategory(data);
    setEditing(true);
  };

  useEffect(() => {
    if (params.id) {
      loadCategory(params.id);
    }
  }, [params.id]); //este segundo parámetro es para que no se ejecute la función cada vez que se renderice el componente, sino que se ejecute solo cuando el parámetro cambie

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item={true} xs={3}>
        <Card
          sx={{ mt: 5 }}
          style={{ backgroundColor: "#1e272e", padding: "1 rem" }}
        >
          <Typography variant="5" textAlign="center" color="white">
            {editing ? "Edit category" : "Create Category"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Name"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="name"
                value={category.name}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!category.name}
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
