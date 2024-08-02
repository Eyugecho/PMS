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
  Snackbar,
  Alert,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import config from '../../configration/config';

function Perceptive() {
  const [perceptives, setPerceptives] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    fetchPerceptives();
  }, []);

  const fetchPerceptives = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.API_URL_Units}/perspective-types`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.success) {
        setPerceptives(data.data.data);
      } else {
        console.error('Failed to fetch perceptives:', data.message);
      }
    } catch (error) {
      console.error('Error fetching perceptives:', error);
    }
  };

  const handleSave = async (values) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const method = editIndex !== null ? 'PATCH' : 'POST';
      const url = editIndex !== null 
        ? `${config.API_URL_Units}/perspective-types/${perceptives[editIndex].id}` 
        : `${config.API_URL_Units}/perspective-types`;

      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
        },
        body: JSON.stringify({ name: values.perspectiveName }),
      });

      const result = await response.json();

      if (!response.ok) {
        
          setSnackbarMessage('Perspective already exists');
          setSnackbarSeverity('warning');
   
      } else {
        if (result.success) {
          // Update the state with new or updated perspective
          setPerceptives((prevPerceptives) => {
            if (editIndex !== null) {
              // If updating, replace the old perspective with the new one
              return prevPerceptives.map((p, i) =>
                i === editIndex ? result.data : p
              );
            } else {
              // If creating, add the new perspective
              return [...prevPerceptives, result.data];
            }
          });
          handleClose();
          setSnackbarMessage('Perspective saved successfully!');
          setSnackbarSeverity('success');
        } else {
          console.error('Error creating/updating perspective:', result.message);
          setSnackbarMessage('Error creating/updating perspective: ' + result.message);
          setSnackbarSeverity('error');
        }
      }
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error creating/updating perspective:', error);
      setSnackbarMessage('Error creating/updating perspective: ' + error.message);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleUpdate = async (values) => {
    await handleSave(values);
  };

  const handleEdit = (index) => {
    formik.setFieldValue('perspectiveName', perceptives[index].name);
    setEditIndex(index);
    handleOpen();
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.API_URL_Units}/perspective-types/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      // Check if the response is empty
      if (response.status === 204) { // No Content
        // Successfully deleted, no response body
        setPerceptives((prevPerceptives) => 
          prevPerceptives.filter((p) => p.id !== id)
        );
        setSnackbarMessage('Perspective deleted successfully!');
        setSnackbarSeverity('success');
      } else {
        // Try to parse response as JSON if not empty
        const data = await response.json();
        if (data.success) {
          setPerceptives((prevPerceptives) => 
            prevPerceptives.filter((p) => p.id !== id)
          );
          setSnackbarMessage('Perspective deleted successfully!');
          setSnackbarSeverity('success');
        } else {
          setSnackbarMessage('Failed to delete perspective: ' + data.message);
          setSnackbarSeverity('error');
          console.error('Failed to delete perspective:', data.message);
        }
      }
    } catch (error) {
      // Handle JSON parse error or other errors
      setSnackbarMessage('Error deleting perspective: ' + error.message);
      setSnackbarSeverity('error');
      console.error('Error deleting perspective:', error);
    }
    setSnackbarOpen(true);
  };
  

  const formik = useFormik({
    initialValues: {
      perspectiveName: '',
    },
    onSubmit: (values, { resetForm }) => {
      if (editIndex !== null) {
        handleUpdate(values);
      } else {
        handleSave(values);
      }
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

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Create New Perspective
              </Typography>
              <Box component="form" onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  id="perspectiveName"
                  name="perspectiveName"
                  label="Perspective"
                  value={formik.values.perspectiveName}
                  onChange={formik.handleChange}
                  error={formik.touched.perspectiveName && Boolean(formik.errors.perspectiveName)}
                  helperText={formik.touched.perspectiveName && formik.errors.perspectiveName}
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
              {perceptives.length === 0 ? (
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                  <SentimentDissatisfiedIcon color="disabled" style={{ fontSize: 60 }} />
                  <Typography variant="subtitle1" color="textSecondary" align="center" marginLeft={2}>
                    No perspectives entered yet.
                  </Typography>
                </Box>
              ) : (
                <TableContainer component={Paper} variant="outlined" style={{ border: '1px solid #ddd' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Perspective</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {perceptives.map((perceptive, index) => (
                        <TableRow key={perceptive.id}>
                          <TableCell component="th" scope="row">
                            {perceptive.name}
                          </TableCell>
                          <TableCell align="right">
                            <IconButton color="primary" onClick={() => handleEdit(index)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton color="secondary" onClick={() => handleDelete(perceptive.id)}>
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
        <DialogTitle>Edit Perspective</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="perspectiveName"
            name="perspectiveName"
            label="Perspective Name"
            type="text"
            fullWidth
            value={formik.values.perspectiveName}
            onChange={formik.handleChange}
            error={formik.touched.perspectiveName && Boolean(formik.errors.perspectiveName)}
            helperText={formik.touched.perspectiveName && formik.errors.perspectiveName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={formik.handleSubmit} color="primary">Update</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Perceptive;
