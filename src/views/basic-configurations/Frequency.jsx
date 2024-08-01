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
  CardActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Configuration URL (Ensure you have config setup properly)
import config from '../../configration/config';

function Frequency() {
  const [frequencies, setFrequencies] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchFrequencies();
  }, []);

  const fetchFrequencies = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.API_URL_Units}/frequencies`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (result.success) {
        setFrequencies(result.data.data);
      } else {
        toast.error('Failed to fetch frequencies');
      }
    } catch (error) {
      toast.error('Error occurred while fetching frequencies');
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      value: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const method = editIndex !== null ? 'PATCH' : 'POST';
        const url = editIndex !== null
          ? `${config.API_URL_Units}/frequencies/${frequencies[editIndex].id}`
          : `${config.API_URL_Units}/frequencies`;
        const token = localStorage.getItem('token');
        const response = await fetch(url, {
          method: method,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: values.name,
            value: values.value,
          }),
        });

        const result = await response.json();
        if (result.success) {
          toast.success(editIndex !== null ? 'Frequency updated' : 'Frequency created');
          fetchFrequencies(); // Refresh the list
          handleClose();
        } else {
          toast.error(result.message || 'Failed to save frequency');
        }
      } catch (error) {
        toast.error('Error occurred while saving frequency');
      }
      resetForm();
    },
  });

  const handleEdit = (index) => {
    formik.setFieldValue('name', frequencies[index].name);
    formik.setFieldValue('value', frequencies[index].value);
    setEditIndex(index);
    handleOpen();
  };

  const handleDelete = async (index) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.API_URL_Units}/frequencies/${frequencies[index].id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Frequency deleted');
        fetchFrequencies(); // Refresh the list
      } else {
        toast.error(result.message || 'Failed to delete frequency');
      }
    } catch (error) {
      toast.error('Error occurred while deleting frequency');
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Create New Frequency
              </Typography>
              <Box component="form" onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Frequency Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  id="value"
                  name="value"
                  label="Value"
                  type="number"
                  value={formik.values.value}
                  onChange={formik.handleChange}
                  error={formik.touched.value && Boolean(formik.errors.value)}
                  helperText={formik.touched.value && formik.errors.value}
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
              {frequencies.length === 0 ? (
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                  <SentimentDissatisfiedIcon color="disabled" style={{ fontSize: 60 }} />
                  <Typography variant="subtitle1" color="textSecondary" align="center" marginLeft={2}>
                    No frequencies registered yet.
                  </Typography>
                </Box>
              ) : (
                <TableContainer component={Paper} variant="outlined" style={{ border: '1px solid #ddd' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Frequency Name</TableCell>
                        <TableCell>Value</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {frequencies.map((frequency, index) => (
                        <TableRow key={frequency.id}>
                          <TableCell component="th" scope="row">
                            {frequency.name}
                          </TableCell>
                          <TableCell>{frequency.value}</TableCell>
                          <TableCell align="right">
                            <IconButton color="primary" onClick={() => handleEdit(index)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton color="secondary" onClick={() => handleDelete(index)}>
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
        <DialogTitle>{editIndex !== null ? 'Edit Frequency' : 'Create Frequency'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Frequency Name"
            type="text"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            margin="dense"
            id="value"
            name="value"
            label="Value"
            type="number"
            fullWidth
            value={formik.values.value}
            onChange={formik.handleChange}
            error={formik.touched.value && Boolean(formik.errors.value)}
            helperText={formik.touched.value && formik.errors.value}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={formik.handleSubmit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      <ToastContainer /> {/* Add ToastContainer here */}
    </Box>
  );
}

export default Frequency;
