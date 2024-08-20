import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Box, Typography, TextField, Button, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

function Catagory() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);
  const formik = useFormik({
    initialValues: {
      newCategory: ''
    },
    onSubmit: (values, { resetForm }) => {
      if (values.newCategory) {
        setCategories([...categories, values.newCategory]);
        resetForm();
      }
    }
  });

  return (
    <Box p={3}>
      <Typography variant="h5" align="center" gutterBottom>
        Category
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              id="newCategory"
              name="newCategory"
              label="New Category"
              value={formik.values.newCategory}
              onChange={formik.handleChange}
              error={formik.touched.newCategory && Boolean(formik.errors.newCategory)}
              helperText={formik.touched.newCategory && formik.errors.newCategory}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box mt={4}>
        <FormControl fullWidth>
          <InputLabel id="categories-label">Category</InputLabel>
          <Select labelId="categories-label" id="categories" value="" label="Category">
            <MenuItem value="" disabled>
              Category
            </MenuItem>
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default Catagory;
