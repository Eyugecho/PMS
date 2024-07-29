import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Box, Typography, TextField, Button, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

function Period() {
  const [periods, setPeriods] = useState([]);
  const [frequencies, setFrequencies] = useState([]);
  const [evalTypes, setEvalTypes] = useState([]);

  useEffect(() => {
    const storedPeriods = localStorage.getItem('periods');
    if (storedPeriods) {
      setPeriods(JSON.parse(storedPeriods));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('periods', JSON.stringify(periods));
  }, [periods]);

  useEffect(() => {
    const storedFrequencies = localStorage.getItem('frequencies');
    if (storedFrequencies) {
      setFrequencies(JSON.parse(storedFrequencies));
    }
  }, []);

  useEffect(() => {
    const storedEvalTypes = localStorage.getItem('evaltype');
    if (storedEvalTypes) {
      setEvalTypes(JSON.parse(storedEvalTypes));
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      fiscalYear: '',
      frequency: '',
      evalType: '',
      dates: [],
    },
    onSubmit: (values, { resetForm }) => {
      const frequency = frequencies.find((freq) => freq.name === values.frequency);
      if (values.fiscalYear && frequency && values.evalType) {
        const newPeriod = {
          fiscalYear: values.fiscalYear,
          frequency: values.frequency,
          evalType: values.evalType,
          dates: values.dates,
        };
        setPeriods([...periods, newPeriod]);
        resetForm();
      }
    },
  });

  const renderDateFields = () => {
    const frequency = frequencies.find((freq) => freq.name === formik.values.frequency);
    if (!frequency) return null;

    const numOfFields = frequency.value;

    return Array.from({ length: numOfFields }, (_, i) => (
      <Grid container spacing={2} key={i}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id={`startDate-${i}`}
            name={`dates[${i}].startDate`}
            label={`Start Date ${i + 1}`}
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.dates[i]?.startDate || ''}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id={`endDate-${i}`}
            name={`dates[${i}].endDate`}
            label={`End Date ${i + 1}`}
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.dates[i]?.endDate || ''}
            onChange={formik.handleChange}
          />
        </Grid>
      </Grid>
    ));
  };

  return (
    <Box p={3}>
      <Typography variant="h5" align="center" gutterBottom>
        Period Registration
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="fiscalYear"
              name="fiscalYear"
              label="Fiscal Year"
              value={formik.values.fiscalYear}
              onChange={formik.handleChange}
              error={formik.touched.fiscalYear && Boolean(formik.errors.fiscalYear)}
              helperText={formik.touched.fiscalYear && formik.errors.fiscalYear}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="frequency-label">Frequency</InputLabel>
              <Select
                labelId="frequency-label"
                id="frequency"
                name="frequency"
                value={formik.values.frequency}
                onChange={formik.handleChange}
                error={formik.touched.frequency && Boolean(formik.errors.frequency)}
              >
                <MenuItem value="">None</MenuItem>
                {frequencies.map((frequency, index) => (
                  <MenuItem key={index} value={frequency.name}>
                    {frequency.name} ({frequency.value})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="evaltype-label">Evaluation Type</InputLabel>
              <Select
                labelId="evaltype-label"
                id="evalType"
                name="evalType"
                value={formik.values.evalType}
                onChange={formik.handleChange}
                error={formik.touched.evalType && Boolean(formik.errors.evalType)}
              >
                <MenuItem value="">None</MenuItem>
                {evalTypes.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box mt={4}>{renderDateFields()}</Box>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box mt={4}>
        <FormControl fullWidth>
          <InputLabel id="period-label">Registered Periods</InputLabel>
          <Select label="Registered Periods" id="periods" value="">
            <MenuItem value="" disabled></MenuItem>
            {periods.map((period, index) => (
              <MenuItem key={index} value={period.fiscalYear}>
                {period.fiscalYear} ({period.frequency}) - {period.evalType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default Period;
