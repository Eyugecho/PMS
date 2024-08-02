import React, { useState, useEffect } from 'react';
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
  Snackbar,
  Alert,
  MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { useFormik } from 'formik';
import axios from 'axios';
import config from '../../../configration/config';

function KpiManagement() {
  const [kpis, setKpis] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [measuringUnits, setMeasuringUnits] = useState([]);
  const [perspectiveTypes, setPerspectiveTypes] = useState([]);

  useEffect(() => {
    fetchKpis();
    fetchMeasuringUnits();
    fetchPerspectiveTypes();
  }, []);

  const fetchKpis = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${config.API_URL_Units}/kpis`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        setKpis(response.data.data.data);
      } else {
        console.error('Failed to fetch KPIs:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching KPIs:', error);
    }
  };

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

  const fetchPerspectiveTypes = async () => {
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
        setPerspectiveTypes(data.data.data);
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
      const method = editIndex !== null ? 'PATCH' : 'POST';
      const url = editIndex !== null 
        ? `${config.API_URL_Units}/kpis/${kpis[editIndex].id}` 
        : `${config.API_URL_Units}/kpis`;

      const response = await axios({
        method,
        url,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
        },
        data: values,
      });

      if (!response.data.success) {
        setSnackbarMessage(response.data.message || 'Error occurred');
        setSnackbarSeverity('error');
      } else {
        setKpis((prevKpis) => {
          if (editIndex !== null) {
            return prevKpis.map((kpi, index) =>
              index === editIndex ? response.data.data : kpi
            );
          } else {
            return [...prevKpis, response.data.data];
          }
        });
        handleClose();
        setSnackbarMessage('KPI saved successfully!');
        setSnackbarSeverity('success');
      }
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error saving KPI:', error);
      setSnackbarMessage('Error saving KPI: ' + error.message);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleUpdate = async (values) => {
    await handleSave(values);
  };

  const handleEdit = (index) => {
    formik.setValues(kpis[index]);
    setEditIndex(index);
    handleOpen();
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${config.API_URL_Units}/kpis/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 204 || response.data.success) {
        setKpis((prevKpis) => 
          prevKpis.filter((kpi) => kpi.id !== id)
        );
        setSnackbarMessage('KPI deleted successfully!');
        setSnackbarSeverity('success');
      } else {
        setSnackbarMessage('Failed to delete KPI: ' + response.data.message);
        setSnackbarSeverity('error');
        console.error('Failed to delete KPI:', response.data.message);
      }
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Error deleting KPI: ' + error.message);
      setSnackbarSeverity('error');
      console.error('Error deleting KPI:', error);
      setSnackbarOpen(true);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      perspective_type_id: '',
      measuring_unit_id: '',
      variation_category: '',
      description: ''
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
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Create New KPI
              </Typography>
              <Box component="form" onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="KPI Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  select
                  id="perspective_type_id"
                  name="perspective_type_id"
                  label="Perspective Type"
                  value={formik.values.perspective_type_id}
                  onChange={formik.handleChange}
                  error={formik.touched.perspective_type_id && Boolean(formik.errors.perspective_type_id)}
                  helperText={formik.touched.perspective_type_id && formik.errors.perspective_type_id}
                  margin="normal"
                >
                  {perspectiveTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  select
                  id="measuring_unit_id"
                  name="measuring_unit_id"
                  label="Measuring Unit"
                  value={formik.values.measuring_unit_id}
                  onChange={formik.handleChange}
                  error={formik.touched.measuring_unit_id && Boolean(formik.errors.measuring_unit_id)}
                  helperText={formik.touched.measuring_unit_id && formik.errors.measuring_unit_id}
                  margin="normal"
                >
                  {measuringUnits.map((unit) => (
                    <MenuItem key={unit.id} value={unit.id}>
                      {unit.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  id="variation_category"
                  name="variation_category"
                  label="Variation Category"
                  value={formik.values.variation_category}
                  onChange={formik.handleChange}
                  error={formik.touched.variation_category && Boolean(formik.errors.variation_category)}
                  helperText={formik.touched.variation_category && formik.errors.variation_category}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                  margin="normal"
                />
                <Box mt={2}>
                  <Button color="primary" variant="contained" type="submit">
                    {editIndex !== null ? 'Update KPI' : 'Save KPI'}
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
   
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>KPI</TableCell>
                      <TableCell>Perspective Type</TableCell>
                      <TableCell>Measuring Unit</TableCell>
                      <TableCell>Variation Category</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {kpis.map((kpi, index) => (
                      <TableRow key={kpi.id}>
                        <TableCell>{kpi?.name ?? 'N/A'}</TableCell>
                        <TableCell>{perspectiveTypes.find(pt => pt.id === kpi.perspective_type_id)?.name ?? 'N/A'}</TableCell>
                        <TableCell>{measuringUnits.find(mu => mu.id === kpi.measuring_unit_id)?.name ?? 'N/A'}</TableCell>
                        <TableCell>{kpi?.variation_category ?? 'N/A'}</TableCell>
                        <TableCell>{kpi?.description ?? 'N/A'}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEdit(index)}><EditIcon /></IconButton>
                          <IconButton onClick={() => handleDelete(kpi.id)}><DeleteIcon /></IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIndex !== null ? 'Edit KPI' : 'Create KPI'}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="KPI Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              margin="normal"
            />
            <TextField
              fullWidth
              select
              id="perspective_type_id"
              name="perspective_type_id"
              label="Perspective Type"
              value={formik.values.perspective_type_id}
              onChange={formik.handleChange}
              error={formik.touched.perspective_type_id && Boolean(formik.errors.perspective_type_id)}
              helperText={formik.touched.perspective_type_id && formik.errors.perspective_type_id}
              margin="normal"
            >
              {perspectiveTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              id="measuring_unit_id"
              name="measuring_unit_id"
              label="Measuring Unit"
              value={formik.values.measuring_unit_id}
              onChange={formik.handleChange}
              error={formik.touched.measuring_unit_id && Boolean(formik.errors.measuring_unit_id)}
              helperText={formik.touched.measuring_unit_id && formik.errors.measuring_unit_id}
              margin="normal"
            >
              {measuringUnits.map((unit) => (
                <MenuItem key={unit.id} value={unit.id}>
                  {unit.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              id="variation_category"
              name="variation_category"
              label="Variation Category"
              value={formik.values.variation_category}
              onChange={formik.handleChange}
              error={formik.touched.variation_category && Boolean(formik.errors.variation_category)}
              helperText={formik.touched.variation_category && formik.errors.variation_category}
              margin="normal"
            />
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              margin="normal"
            />
            <Box mt={2}>
              <Button color="primary" variant="contained" type="submit">
                {editIndex !== null ? 'Update KPI' : 'Save KPI'}
              </Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default KpiManagement;
