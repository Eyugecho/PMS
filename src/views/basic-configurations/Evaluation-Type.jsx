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
  Divider,
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

function EvalType() {
  const [evalTypes, setEvalTypes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchEvalTypes();
  }, []);

  const fetchEvalTypes = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${config.API_URL_Units}/evaluation-types`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (result.success) {
        setEvalTypes(result.data.data);
      } else {
        toast.error('Failed to fetch evaluation types');
      }
    } catch (error) {
      toast.error('Error occurred while fetching evaluation types');
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const method = editIndex !== null ? 'PATCH' : 'POST';
        const url = editIndex !== null
          ? `${config.API_URL_Units}/evaluation-types/${evalTypes[editIndex].id}`
          : `${config.API_URL_Units}/evaluation-types`;
        const token = localStorage.getItem('token');
        const response = await fetch(url, {
          method: method,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        const result = await response.json();
        if (result.success) {
          toast.success(editIndex !== null ? 'Evaluation type updated' : 'Evaluation type created');
          fetchEvalTypes(); // Refresh the list
          handleClose();
        } else {
          toast.error(result.message || 'Failed to save evaluation type');
        }
      } catch (error) {
        toast.error('Error occurred while saving evaluation type');
      }
      resetForm();
    },
  });

  const handleEdit = (index) => {
    formik.setFieldValue('name', evalTypes[index].name);
    formik.setFieldValue('description', evalTypes[index].description || '');
    setEditIndex(index);
    handleOpen();
  };

  const handleDelete = async (index) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.API_URL_Units}/evaluation-types/${evalTypes[index].id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },

      });

      const result = await response.json();
      if (result.success) {
        toast.success('Evaluation type deleted');
        fetchEvalTypes(); // Refresh the list
      } else {
        toast.error(result.message || 'Failed to delete evaluation type');
      }
    } catch (error) {
      toast.error('Error occurred while deleting evaluation type');
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
                Create New Evaluation Type
              </Typography>
              <Box component="form" onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Evaluation Type"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
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
              {evalTypes.length === 0 ? (
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                  <SentimentDissatisfiedIcon color="disabled" style={{ fontSize: 60 }} />
                  <Typography variant="subtitle1" color="textSecondary" align="center" marginLeft={2}>
                    No evaluation types entered yet.
                  </Typography>
                </Box>
              ) : (
                <TableContainer component={Paper} variant="outlined" style={{ border: '1px solid #ddd' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Evaluation Type</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {evalTypes.map((type, index) => (
                        <TableRow key={type.id}>
                          <TableCell component="th" scope="row">
                            {type.name}
                          </TableCell>
                          <TableCell>{type.description || '-'}</TableCell>
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
        <DialogTitle>{editIndex !== null ? 'Edit Evaluation Type' : 'Create Evaluation Type'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Evaluation Type Name"
            type="text"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={formik.values.description}
            onChange={formik.handleChange}
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

export default EvalType;
