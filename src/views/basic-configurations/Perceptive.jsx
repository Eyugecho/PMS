import React, { useState,useEffect } from 'react';
import { useFormik } from 'formik';
import { Box, Typography, TextField, Button, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

function Perceptive() {
  const [perceptive, setPerceptive] = useState([]);
  useEffect(() => {
    // Load perceptive from localStorage when the component mounts
    const storedPerceptive = localStorage.getItem('perceptive');
    if (storedPerceptive) {
      setPerceptive(JSON.parse(storedPerceptive));
    }
  }, []);

  useEffect(() => {
    // Save perceptive to localStorage whenever they change
    localStorage.setItem('perceptive', JSON.stringify(perceptive));
  }, [perceptive]);
  const formik = useFormik({
    initialValues: {
      newPerceptive: '',
    },
    onSubmit: (values, { resetForm }) => {
      if (values.newPerceptive) {
        setPerceptive([...perceptive, values.newPerceptive]);
        resetForm();
      }
    },
  });

  return (
    <Box p={3}>
      <Typography variant="h5" align="center" gutterBottom>
      Pericpectives
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              id="newPerceptive"
              name="newPerceptive"
              label="New Perspective"
              value={formik.values.newPerceptive}
              onChange={formik.handleChange}
              error={formik.touched.newPerceptive && Boolean(formik.errors.newPerceptive)}
              helperText={formik.touched.newPerceptive && formik.errors.newPerceptive}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box mt={4} >
        <FormControl fullWidth>
          <InputLabel id="perceptive-label">Perspective</InputLabel>
          <Select labelId="perceptive-label" id="perceptive" value="" label="Perspective" >
            <MenuItem value="" disabled>Perspective</MenuItem>
            {perceptive.map((perceptive, index) => (
              <MenuItem key={index} value={perceptive}>
                {perceptive}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default Perceptive;
