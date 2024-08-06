import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import config from '../../configration/config'; // Ensure this path is correct
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Measuring() {
  const [measuringUnits, setMeasuringUnits] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchMeasuringUnits();
  }, []);

  const fetchMeasuringUnits = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.API_URL_Units}/measuring-units`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.success) {
        setMeasuringUnits(data.data.data); // Extract the array from nested data
      } else {
        console.error('Failed to fetch measuring units:', data.message);
        toast.error(`Failed to fetch measuring units: ${data.message}`);
      }
    } catch (error) {
      console.error('Error fetching measuring units:', error);
      toast.error(`Error fetching measuring units: ${error.message}`);
    }
  };

  const handleSave = async (values) => {
    const method = editIndex !== null ? 'PATCH' : 'POST';
    const url = editIndex !== null
      ? `${config.API_URL_Units}/measuring-units/${measuringUnits[editIndex].id}`
      : `${config.API_URL_Units}/measuring-units`;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.measuringUnit,
          description: values.measuringType,
        }),
      });

      const data = await response.json();
      if (data.success) {
        fetchMeasuringUnits(); // Refresh the list
        handleClose();
        toast.success('Measuring unit saved successfully!');
      } else {
        console.error('Failed to save measuring unit:', data.message);
        toast.error(`Error saving measuring unit: ${data.message}`);
      }
    } catch (error) {
      console.error('Error saving measuring unit:', error);
      toast.error(`Error saving measuring unit: ${error.message}`);
    }
  };

  const handleEdit = (index) => {
    formik.setFieldValue('measuringUnit', measuringUnits[index].name);
    formik.setFieldValue('measuringType', measuringUnits[index].description);
    setEditIndex(index);
    handleOpen();
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.API_URL_Units}/measuring-units/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 204) { // No Content
        setMeasuringUnits((prevUnits) => 
          prevUnits.filter((unit) => unit.id !== id)
        );
        toast.success('Measuring unit deleted successfully!');
      } else {
        const data = await response.json();
        if (data.success) {
          setMeasuringUnits((prevUnits) => 
            prevUnits.filter((unit) => unit.id !== id)
          );
          toast.success('Measuring unit deleted successfully!');
        } else {
          toast.error(`Failed to delete measuring unit: ${data.message}`);
          console.error('Failed to delete measuring unit:', data.message);
        }
      }
    } catch (error) {
      toast.error(`Error deleting measuring unit: ${error.message}`);
      console.error('Error deleting measuring unit:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      measuringUnit: '',
      measuringType: '',
    },
    onSubmit: (values, { resetForm }) => {
      handleSave(values);
      resetForm();
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
    setEditIndex(null);
  };

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Create New Measuring Unit
              </Typography>
              <Box component="form" onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  id="measuringUnit"
                  name="measuringUnit"
                  label="Measuring Unit"
                  value={formik.values.measuringUnit}
                  onChange={formik.handleChange}
                  error={formik.touched.measuringUnit && Boolean(formik.errors.measuringUnit)}
                  helperText={formik.touched.measuringUnit && formik.errors.measuringUnit}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  id="measuringType"
                  name="measuringType"
                  label="Type (e.g., Numerical, Percentage)"
                  value={formik.values.measuringType}
                  onChange={formik.handleChange}
                  error={formik.touched.measuringType && Boolean(formik.errors.measuringType)}
                  helperText={formik.touched.measuringType && formik.errors.measuringType}
                  margin="normal"
                />
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={<AddCircleOutlineIcon />}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={formik.handleReset}
                  >
                    Clear
                  </Button>
                </CardActions>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              {measuringUnits.length === 0 ? (
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                  <SentimentDissatisfiedIcon color="disabled" style={{ fontSize: 60 }} />
                  <Typography variant="subtitle1" color="textSecondary" align="center" marginLeft={2}>
                    No measuring units entered yet.
                  </Typography>
                </Box>
              ) : (
                <TableContainer component={Paper} variant="outlined" style={{ border: '1px solid #ddd' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Measuring Unit</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {measuringUnits.map((unit, index) => (
                        <TableRow key={unit.id}>
                          <TableCell component="th" scope="row">
                            {unit.name}
                          </TableCell>
                          <TableCell>{unit.description}</TableCell>
                          <TableCell align="right">
                            <IconButton color="primary" onClick={() => handleEdit(index)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton color="secondary" onClick={() => handleDelete(unit.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIndex !== null ? 'Edit Measuring Unit' : 'Add New Measuring Unit'}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="measuringUnit"
              name="measuringUnit"
              label="Measuring Unit"
              value={formik.values.measuringUnit}
              onChange={formik.handleChange}
              error={formik.touched.measuringUnit && Boolean(formik.errors.measuringUnit)}
              helperText={formik.touched.measuringUnit && formik.errors.measuringUnit}
              margin="normal"
            />
            <TextField
              fullWidth
              id="measuringType"
              name="measuringType"
              label="Type (e.g., Numerical, Percentage)"
              value={formik.values.measuringType}
              onChange={formik.handleChange}
              error={formik.touched.measuringType && Boolean(formik.errors.measuringType)}
              helperText={formik.touched.measuringType && formik.errors.measuringType}
              margin="normal"
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </Box>
  );
}

export default Measuring;
