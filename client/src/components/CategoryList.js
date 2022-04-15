import React, { useState, useEffect } from "react";
import { InputLabel, MenuItem, FormControl, Select, Icon } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const loadCategories = async () => {
    const response = await fetch("http://localhost:4000/categories");
    const data = await response.json();
    setCategories(data);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/categories/${id}`, {
        method: "DELETE",
      });
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <>
      <h1>
        Category List
        <FormControl sx={{ display: "block", margin: ".5rem 0" }}>
          <Icon
            sx={{ fontSize: 50, flexGrow: 1 }}
            onClick={() => navigate("/categories/new")}
          >
            add_circle
          </Icon>
        </FormControl>
      </h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead
            style={{ marginBottom: ".7rem", backgroundColor: "#1e272e" }}
          >
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Edit</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow
                key={category.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="left">
                  {category.name}
                </TableCell>
                <TableCell>
                  <Fab size="medium" aria-label="edit">
                    <EditIcon
                      onClick={() =>
                        navigate(`/categories/${category.id}/edit`)
                      }
                    />
                  </Fab>
                </TableCell>
                <TableCell>
                  <Fab size="medium" aria-label="delete">
                    <DeleteIcon onClick={() => handleDelete(category.id)} />
                  </Fab>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
