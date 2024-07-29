import React, { useState,useEffect } from 'react';
import { useFormik } from 'formik';
import { Box, Typography, TextField, Button, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

function EvalType() {
  const [evaltype, setEvalType] = useState([]);
  useEffect(() => {
    // Load evaltype from localStorage when the component mounts
    const storedEvalType = localStorage.getItem('evaltype');
    if (storedEvalType) {
      setEvalType(JSON.parse(storedEvalType));
    }
  }, []);

  useEffect(() => {
    // Save evaltype to localStorage whenever they change
    localStorage.setItem('evaltype', JSON.stringify(evaltype));
  }, [evaltype]);
  const formik = useFormik({
    initialValues: {
      newEvalType: '',
    },
    onSubmit: (values, { resetForm }) => {
      if (values.newEvalType) {
        setEvalType([...evaltype, values.newEvalType]);
        resetForm();
      }
    },
  });

  return (
    <Box p={3}>
      <Typography variant="h5" align="center" gutterBottom>
      Evaluation Type
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              id="newEvalType"
              name="newEvalType"
              label="New Evaluation Type"
              value={formik.values.newEvalType}
              onChange={formik.handleChange}
              error={formik.touched.newEvalType && Boolean(formik.errors.newEvalType)}
              helperText={formik.touched.newEvalType && formik.errors.newEvalType}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box mt={6} >
        <FormControl fullWidth>
          <InputLabel id="evaltype-label">Evaluation Type</InputLabel>
          <Select labelId="evaltype-label" id="evaltype" value="" label="Evaluation Type" >
            <MenuItem value="" disabled>Evaluation Type</MenuItem>
            {evaltype.map((evaltype, index) => (
              <MenuItem key={index} value={evaltype}>
                {evaltype}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default EvalType;
