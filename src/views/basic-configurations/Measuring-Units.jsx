import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Box, Typography, TextField, Button, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

function Measuring() {
  const [measuring, setMeasuring] = useState([]);

  useEffect(() => {
    // Load measuring from localStorage when the component mounts
    const storedMeasuring = localStorage.getItem('measuring');
    if (storedMeasuring) {
      setMeasuring(JSON.parse(storedMeasuring));
    }
  }, []);

  useEffect(() => {
    // Save measuring to localStorage whenever they change
    localStorage.setItem('measuring', JSON.stringify(measuring));
  }, [measuring]);

  const formik = useFormik({
    initialValues: {
      newMeasuring: '',
      measuringType: '',
    },
    onSubmit: (values, { resetForm }) => {
      if (values.newMeasuring && values.measuringType) {
        setMeasuring([...measuring, { unit: values.newMeasuring, type: values.measuringType }]);
        resetForm();
      }
    },
  });

  return (
    <Box p={3}>
      <Typography variant="h5" align="center" gutterBottom>
        Measuring Units
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="newMeasuring"
              name="newMeasuring"
              label="New Measuring Unit"
              value={formik.values.newMeasuring}
              onChange={formik.handleChange}
              error={formik.touched.newMeasuring && Boolean(formik.errors.newMeasuring)}
              helperText={formik.touched.newMeasuring && formik.errors.newMeasuring}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="measuring-type-label">Type</InputLabel>
              <Select
                labelId="measuring-type-label"
                id="measuringType"
                name="measuringType"
                label="Type"
                value={formik.values.measuringType}
                onChange={formik.handleChange}
                error={formik.touched.measuringType && Boolean(formik.errors.measuringType)}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="Numerical">Numerical</MenuItem>
                <MenuItem value="Percentage">Percentage</MenuItem>
                <MenuItem value="Money">Money</MenuItem>
              </Select>
            </FormControl>
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
          <InputLabel id="measuring-label">Measuring Unit</InputLabel>
          <Select  label="measuring Unit" id="measuring" value="" >
            <MenuItem value="" disabled></MenuItem>
            {measuring.map((measuring, index) => (
              <MenuItem key={index} value={measuring.unit}>
                {measuring.unit} ({measuring.type})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default Measuring;
