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
  Snackbar,
  Alert,
  Menu,
  MenuItem,
  useTheme
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GetToken from 'utils/auth-token';
import Backend from 'services/backend';
import PageContainer from 'ui-component/MainPage';
import AddButton from 'ui-component/buttons/AddButton';

function Perspectives() {
  const [perceptives, setPerceptives] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    fetchPerceptives();
  }, []);

  const fetchPerceptives = async () => {
    try {
      const token = await GetToken();
      const Api = Backend.api + `perspective-types`;
      const response = await fetch(Api, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
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
      const url = editIndex !== null ? `${Backend.api}perspective-types/${perceptives[editIndex].id}` : `${Backend.api}perspective-types`;

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*'
        },
        body: JSON.stringify({ name: values.perspectiveName })
      });

      const result = await response.json();

      if (!response.ok) {
        setSnackbarMessage('Perspective already exists');
        setSnackbarSeverity('warning');
      } else {
        if (result.success) {
          setPerceptives((prevPerceptives) => {
            if (editIndex !== null) {
              return prevPerceptives.map((p, i) => (i === editIndex ? result.data : p));
            } else {
              return [...prevPerceptives, result.data];
            }
          });
          handleClose();
          setSnackbarMessage('Perspective saved successfully!');
          setSnackbarSeverity('success');
        } else {
          setSnackbarMessage('Error creating/updating perspective: ' + result.message);
          setSnackbarSeverity('error');
        }
      }
      setSnackbarOpen(true);
    } catch (error) {
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
    handleCloseMenu();
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${Backend.api}perspective-types/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 204) {
        setPerceptives((prevPerceptives) => prevPerceptives.filter((p) => p.id !== id));
        setSnackbarMessage('Perspective deleted successfully!');
        setSnackbarSeverity('success');
      } else {
        const data = await response.json();
        if (data.success) {
          setPerceptives((prevPerceptives) => prevPerceptives.filter((p) => p.id !== id));
          setSnackbarMessage('Perspective deleted successfully!');
          setSnackbarSeverity('success');
        } else {
          setSnackbarMessage('Failed to delete perspective: ' + data.message);
          setSnackbarSeverity('error');
        }
      }
    } catch (error) {
      setSnackbarMessage('Error deleting perspective: ' + error.message);
      setSnackbarSeverity('error');
    }
    setSnackbarOpen(true);
    handleCloseMenu();
  };

  const formik = useFormik({
    initialValues: {
      perspectiveName: ''
    },
    onSubmit: (values, { resetForm }) => {
      if (editIndex !== null) {
        handleUpdate(values);
      } else {
        handleSave(values);
      }
      resetForm();
    }
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
    setEditIndex(null);
  };

  const handleMenuOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const theme = useTheme();
  return (
    <PageContainer
      title="Perspectives"
      rightOption={
        <AddButton
          title="Create Perspective"
          variant="contained"
          onPress={() => {
            formik.resetForm();
            setEditIndex(false);
            handleOpen();
          }}
        />
      }
    >
      <Grid container>
        <Grid item xs={12} sx={{ margin: 2, mt: 4 }}>
          {perceptives.length === 0 ? (
            <Box display="flex" alignItems="center" justifyContent="center" height="100%">
              <SentimentDissatisfiedIcon color="disabled" style={{ fontSize: 60 }} />
              <Typography variant="subtitle1" color="textSecondary" align="center" marginLeft={2}>
                No perspectives entered yet.
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
                    {['Perspectives', 'Actions'].map((header) => (
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
                  {perceptives.map((perceptive, index) => (
                    <TableRow
                      key={perceptive.id}
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
                        {perceptive.name}
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
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl) && selectedIndex === index} onClose={handleClose}>
                          <MenuItem onClick={() => handleEdit(index)}>
                            <EditIcon fontSize="small" /> Edit
                          </MenuItem>
                          <MenuItem onClick={() => handleDelete(perceptive.id)}>
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
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIndex ? 'Edit Perspective' : 'Create New Perspective'}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={formik.handleSubmit}>
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
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                {editIndex ? 'Update' : 'Save'}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}

export default Perspectives;
