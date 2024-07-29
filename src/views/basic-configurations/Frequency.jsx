import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Box, Typography, TextField, Button, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const frequencyValues = {
  Monthly: 12,
  Quarterly: 4,
  Annual: 1,
  SemiAnual: 2,
};

function Frequency() {
  const [frequencies, setFrequencies] = useState([]);

  useEffect(() => {
    // Load frequencies from localStorage when the component mounts
    const storedFrequencies = localStorage.getItem('frequencies');
    if (storedFrequencies) {
      setFrequencies(JSON.parse(storedFrequencies));
    }
  }, []);

  useEffect(() => {
    // Save frequencies to localStorage whenever they change
    localStorage.setItem('frequencies', JSON.stringify(frequencies));
  }, [frequencies]);

  const formik = useFormik({
    initialValues: {
      newFrequency: '',
    },
    onSubmit: (values, { resetForm }) => {
      if (values.newFrequency) {
        const frequencyValue = frequencyValues[values.newFrequency];
        setFrequencies([...frequencies, { name: values.newFrequency, value: frequencyValue }]);
        resetForm();
      }
    },
  });

  return (
    <Box p={3}>
      <Typography variant="h5" align="center" gutterBottom>
        Frequency Registration
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={8}>
            <FormControl fullWidth>
              <InputLabel id="newFrequency-label">New Frequency</InputLabel>
              <Select
                labelId="newFrequency-label"
                id="newFrequency"
                name="newFrequency"
                value={formik.values.newFrequency}
                onChange={formik.handleChange}
                error={formik.touched.newFrequency && Boolean(formik.errors.newFrequency)}
              >
                <MenuItem value="">None</MenuItem>
                {Object.keys(frequencyValues).map((frequency, index) => (
                  <MenuItem key={index} value={frequency}>
                    {frequency}
                  </MenuItem>
                ))}
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
          <InputLabel id="frequency-label">Frequency</InputLabel>
          <Select label="Frequency" id="frequency" value="">
            <MenuItem value="" disabled></MenuItem>
            {frequencies.map((frequency, index) => (
              <MenuItem key={index} value={frequency.name}>
                {frequency.name} ({frequency.value})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default Frequency;
