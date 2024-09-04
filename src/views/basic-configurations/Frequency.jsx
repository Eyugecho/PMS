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
  Menu,
  MenuItem,
  useTheme
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import config from '../../configration/config';
import getRolesAndPermissionsFromToken from 'utils/auth/getRolesAndPermissionsFromToken';

function Frequency() {
  const [frequencies, setFrequencies] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    fetchFrequencies();
  }, []);

  const fetchFrequencies = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.API_URL_Units}/frequencies`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
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
      value: ''
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const method = editIndex !== null ? 'PATCH' : 'POST';
        const url =
          editIndex !== null ? `${config.API_URL_Units}/frequencies/${frequencies[editIndex].id}` : `${config.API_URL_Units}/frequencies`;
        const token = localStorage.getItem('token');
        const response = await fetch(url, {
          method: method,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: values.name,
            value: values.value
          })
        });

        const result = await response.json();
        if (result.success) {
          toast.success(editIndex !== null ? 'Frequency updated' : 'Frequency created');
          fetchFrequencies();
          handleClose();
        } else {
          toast.error(result.message || 'Failed to save frequency');
        }
      } catch (error) {
        toast.error('Error occurred while saving frequency');
      }
      resetForm();
    }
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
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
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
  const auth = getRolesAndPermissionsFromToken();
  const hasPermission = auth.some((role) => role.permissions.some((per) => per.name === 'create:endofdayactivity'));

  return (
    <Box p={0}>
      <Grid item xs={12}>
        <Card>
          <Grid item xs={12} style={{ padding: '2px 2px 15px 3px' }}>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Add Frequency
            </Button>
          </Grid>

          {frequencies.length === 0 ? (
            <Box display="flex" alignItems="center" justifyContent="center" height="100%">
              <SentimentDissatisfiedIcon color="disabled" style={{ fontSize: 60 }} />
              <Typography variant="subtitle1" color="textSecondary" align="center" marginLeft={2}>
                No frequencies registered yet.
              </Typography>
            </Box>
          ) : (
            <TableContainer
              variant="outlined"
              sx={{
                border: '1px solid #ddd'
              }}
            >
              <Table
                sx={{
                  minWidth: 650,
                  borderCollapse: 'collapse'
                }}
              >
                <TableHead>
                  <TableRow>
                    {['Frequency Name', 'Value', 'Actions'].map((header) => (
                      <TableCell
                        key={header}
                        sx={{
                          background: theme.palette.grey[100],
                          color: '#000',
                          fontWeight: 'bold',
                          fontSize: '0.9rem',
                          borderBottom: `2px solid ${theme.palette.divider}`,
                          position: 'relative',
                          padding: '12px 16px',
                          '&:not(:last-of-type)': {
                            borderRight: `1px solid ${theme.palette.divider}`
                          }
                        }}
                      >
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {frequencies.map((frequency, index) => (
                    <TableRow
                      key={frequency.id}
                      sx={{
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: 2,
                        '&:nth-of-type(odd)': {
                          backgroundColor: theme.palette.grey[50]
                        },
                        '&:hover': {
                          backgroundColor: theme.palette.grey[100]
                        }
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          border: 0,
                          padding: '12px 16px'
                        }}
                      >
                        {frequency.name}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: 0,
                          padding: '12px 16px'
                        }}
                      >
                        {frequency.value}
                      </TableCell>
                      <TableCell
                        sx={{
                          border: 0,
                          padding: '12px 16px'
                        }}
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
                            <EditIcon fontSize="small" disabled={!hasPermission} /> Edit
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleDelete(index);
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
        </Card>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIndex !== null ? 'Edit Frequency' : 'Create Frequency'}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={formik.handleSubmit}>
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
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={formik.handleSubmit} color="primary">
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

export default Frequency;
