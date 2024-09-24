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
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CardContent,
  Menu,
  MenuItem,
  useTheme
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Backend from 'services/backend';
import GetToken from 'utils/auth-token';
import PageContainer from 'ui-component/MainPage';
import AddButton from 'ui-component/buttons/AddButton';

function MeasuringUnits() {
  const [measuringUnits, setMeasuringUnits] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    fetchMeasuringUnits();
  }, []);

  const fetchMeasuringUnits = async () => {
    try {
      const token = await GetToken();
      const Api = Backend.api + `measuring-units`;
      const response = await fetch(Api, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        setMeasuringUnits(data.data.data);
      } else {
        toast.error(`Failed to fetch measuring units: ${data.message}`);
      }
    } catch (error) {
      toast.error(`Error fetching measuring units: ${error.message}`);
    }
  };

  const handleSave = async (values) => {
    const method = editIndex !== null ? 'PATCH' : 'POST';
    const Api = editIndex !== null ? `${Backend.api}measuring-units/${measuringUnits[editIndex].id}` : `${Backend.api}measuring-units`;

    try {
      const token = await GetToken();
      const response = await fetch(Api, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: values.measuringUnit,
          description: values.measuringType
        })
      });

      const data = await response.json();
      if (data.success) {
        fetchMeasuringUnits();
        handleClose();
        toast.success('Measuring unit saved successfully!');
      } else {
        toast.error(`Error saving measuring unit: ${data.message}`);
      }
    } catch (error) {
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
      const token = await GetToken();
      const Api = Backend.api + `measuring-units/${id}`;
      const response = await fetch(Api, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 204) {
        setMeasuringUnits((prevUnits) => prevUnits.filter((unit) => unit.id !== id));
        toast.success('Measuring unit deleted successfully!');
      } else {
        const data = await response.json();
        if (data.success) {
          setMeasuringUnits((prevUnits) => prevUnits.filter((unit) => unit.id !== id));
          toast.success('Measuring unit deleted successfully!');
        } else {
          toast.error(`Failed to delete measuring unit: ${data.message}`);
        }
      }
    } catch (error) {
      toast.error(`Error deleting measuring unit: ${error.message}`);
    }
  };

  const formik = useFormik({
    initialValues: {
      measuringUnit: '',
      measuringType: ''
    },
    onSubmit: (values, { resetForm }) => {
      handleSave(values);
      resetForm();
    }
  });

  const handleMenuOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
    setEditIndex(null);
  };
  const theme = useTheme();

  return (
    <PageContainer title="Measuring Units" rightOption={<AddButton title="Add Measuring Unit" variant="contained" onPress={handleOpen} />}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CardContent>
            {measuringUnits.length === 0 ? (
              <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                <SentimentDissatisfiedIcon color="disabled" style={{ fontSize: 60 }} />
                <Typography variant="subtitle1" color="textSecondary" align="center" marginLeft={2}>
                  No measuring units entered yet.
                </Typography>
              </Box>
            ) : (
              <TableContainer style={{ border: '1px solid #ddd' }}>
                <Table
                  sx={{
                    minWidth: 650,
                    borderCollapse: 'collapse'
                  }}
                >
                  <TableHead>
                    <TableRow>
                      {['Measuring Unit', 'Description', 'Actions'].map((header) => (
                        <TableCell
                          key={header}
                        
                        >
                          {header}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {measuringUnits.map((unit, index) => (
                      <TableRow
                        key={unit.id}
                       
                      >
                        <TableCell
                          component="th"
                          scope="row"
                         
                        >
                          {unit.name}
                        </TableCell>
                        <TableCell
                          
                        >
                          {unit.description}
                        </TableCell>
                        <TableCell
                         
                        >
                          <IconButton color="primary" onClick={(event) => handleMenuOpen(event, index)}>
                            <MoreVertIcon />
                          </IconButton>
                          <Menu anchorEl={anchorEl} open={Boolean(anchorEl) && selectedIndex === index} onClose={handleMenuClose}>
                            <MenuItem
                              onClick={() => {
                                handleEdit(index);
                                handleMenuClose();
                              }}
                            >
                              <EditIcon fontSize="small" /> Edit
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                handleDelete(unit.id);
                                handleMenuClose();
                              }}
                            >
                              <DeleteIcon fontSize="small" /> Delete
                            </MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
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
    </PageContainer>
  );
}

export default MeasuringUnits;
