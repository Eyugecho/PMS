import React, { useState, useEffect } from 'react';
import {
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Box,
  Grid
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Backend from 'services/backend';
import GetToken from 'utils/auth-token';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const PerspectiveTable = () => {
  const [perspectives, setPerspectives] = useState([]);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [newPerspective, setNewPerspective] = useState('');
  const [newDescPerspective, setNewDescPerspective] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedDescription, setEditedDescription] = useState('');
  const [editedName, setEditedName] = useState('');
  const [loading, setLoading] = useState(false);

const fetchPerspectives = async () => {
  setLoading(true);
  try {
    const token = await GetToken();
    const api = Backend.api + Backend.perspectiveTypes; 
    const response = await fetch(api, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
   
    if (data?.success) {
      setPerspectives(data?.data?.data); // Correctly set perspectives data
    } else {
      toast.error(response?.message || 'Failed to fetch perspectives');
    }
  } catch (error) {
    toast.error(error?.message || 'Error fetching perspectives');
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchPerspectives();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewPerspective('');
    setNewDescPerspective('');
    setEditedName('');
    setEditedDescription('');
    setEditingIndex(null);
  };

  const handleMenuOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
  };

  const handleChange = (event) => setNewPerspective(event.target.value);
  const handleDescriptionChange = (event) => setNewDescPerspective(event.target.value);
  const handleEditChange = (event) => setEditedName (event.target.value);
  const handleEditDesChange = (event) => setEditedDescription(event.target.value);
  


const handleSave = async () => {
  // Validate the input before proceeding
  if (newPerspective.trim()) {
    setLoading(true); // Show loading indicator

    try {
      const token = await GetToken(); // Retrieve the token
      if (!token) {
        toast.error('Authorization token is missing.');
        setLoading(false); // Stop loading if no token is found
        return;
      }

      const api = Backend.api + Backend.perspectiveTypes;

      // Perform the API request
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Set authorization header
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newPerspective, // Send perspective name
          description: newDescPerspective // Send perspective description
        })
      });

      const data = await response.json(); // Parse the response

      if (response.ok && data.success) {
        // Check if the request was successful
        handleClose(); // Close the modal or reset form
        toast.success('Perspective added successfully'); // Show success message
        await fetchPerspectives(); // Fetch updated perspectives list
      } else {
        // Handle failure case by showing backend's message or a default one
        toast.error(data?.message || 'Unknown error occurred while adding perspective');
      }
    } catch (error) {
      // Handle any errors that occur during the fetch process
      toast.error(error?.message || 'Error occurred while adding perspective');
    } finally {
      setLoading(false); // Stop loading
    }
  } else {
    // Handle the case where the perspective name is empty
    toast.error('Perspective name cannot be empty.');
  }
};


const handleEditSave = () => {
  
  if (editedName.trim() && editedDescription.trim() && editingIndex !== null) {
    setLoading(true); 

    const token = localStorage.getItem('token'); 
    if (!token) {
      toast.error('Authorization token is missing.');
      setLoading(false);
      return;
    }

    
    const perspectiveId = perspectives[editingIndex]?.id;
    if (!perspectiveId) {
      toast.error('Perspective ID is missing.');
      setLoading(false);
      return;
    }

    
    const api = Backend.api+Backend.perspectiveTypes+`/${perspectiveId}`;

    
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      accept: 'application/json'
    };

    
    const data = {
      name: newPerspective,
      description: editedDescription
    };

   
    fetch(api, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(data)
    })
      .then((response) => {
       
        if (response.ok) {
          return response.json();
        }
        return response.json().then((errorResponse) => {
          throw new Error(errorResponse?.message || 'Failed to update perspective.');
        });
      })
      .then((response) => {
        if (response.success) {
         
          toast.success(response?.message || 'Perspective updated successfully');
          handleClose();
          fetchPerspectives();
        } else {
          
          toast.error( response?.message || 'Failed to update perspective');
        }
      })
      .catch((error) => {
       
        toast.error(error?.message || 'Error updating perspective');
      })
      .finally(() => {
        setLoading(false); 
      });
  } else {
   
    toast.error('Both name and description are required.');
  }
};


const handleDelete = () => {
  if (selectedIndex !== null) {
    setLoading(true);
    const token = localStorage.getItem('token'); 

    if (!token) {
      toast.error('Authentication token missing!');
      setLoading(false);
      return;
    }

    const perspectiveId = perspectives[selectedIndex]?.id;

    if (!perspectiveId) {
      toast.error('Selected perspective ID is missing!');
      setLoading(false);
      return;
    }

    const api = `${Backend.api}${Backend.perspectiveTypes}/${perspectiveId}`; 

    const headers = {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    fetch(api, {
      method: 'DELETE',
      headers: headers
    })
      .then((response) => {
      
        if (response.ok) {
        
          if (response.status === 204) {
            return null;
          }
          return response.json();
        } else {
          return response.json().then((err) => {
            throw new Error(err?.message || 'Failed to delete perspective');
          });
        }
      })
      .then((response) => {
        if (response?.success || response === null) {
          
          const updatedPerspectives = perspectives.filter((_, index) => index !== selectedIndex);
          setPerspectives(updatedPerspectives);

         
          handleMenuClose();
          toast.success(response?.message || 'Perspective deleted successfully');
        } else {
         
          toast.error(response?.message || 'Failed to delete perspective');
        }
      })
      .catch((error) => {
       
        toast.error(error?.message || 'An error occurred during deletion');
      })
      .finally(() => {
        setLoading(false); 
      });
  }
};

  const formik = useFormik({
    initialValues: {
      name: '',
      description: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Perspective Name is required'),
      description: Yup.string().required('Descriptive  is required')
    }),
    onSubmit: (values) => {
      if (editingIndex !== null) {
        handleEditSave(values);
      } else {
        handleSave(values);
      }
    }
  });


  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid item xs={12} style={{ padding: '2px 2px 2px 25px' }}>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Add Perspective
          </Button>
        </Grid>
        <CardContent>
          {loading ? (
            <Typography variant="subtitle1" align="center">
              Loading...
            </Typography>
          ) : perspectives?.length === 0 ? (
            <Box display="flex" alignItems="center" justifyContent="center" height="100%">
              <SentimentDissatisfiedIcon color="disabled" style={{ fontSize: 60 }} />
              <Typography variant="subtitle1" color="textSecondary" align="center" marginLeft={2}>
                No perspectives added yet.
              </Typography>
            </Box>
          ) : (
            <TableContainer style={{ border: '1px solid #ddd' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {['Perspective Name', 'Description', 'Actions']?.map((header) => (
                      <TableCell key={header} style={{ fontWeight: 'bold' }}>
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array?.isArray(perspectives) && perspectives.length > 0 ? (
                    perspectives?.map((perspective, index) => (
                      <TableRow key={perspective.id}>
                        <TableCell>{perspective.name}</TableCell>
                        <TableCell>{perspective.description}</TableCell>
                        <TableCell>
                          <IconButton color="primary" onClick={(event) => handleMenuOpen(event, index)}>
                            <MoreVertIcon />
                          </IconButton>
                          <Menu anchorEl={anchorEl} open={Boolean(anchorEl) && selectedIndex === index} onClose={handleMenuClose}>
                            <MenuItem
                              onClick={() => {
                                setEditingIndex(index);
                                setEditedName(perspective.name);
                                setEditedDescription(perspective.description);
                                handleMenuClose();
                                handleOpen();
                              }}
                            >
                              <EditIcon fontSize="small" /> Edit
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                handleDelete();
                                handleMenuClose();
                              }}
                            >
                              <DeleteIcon fontSize="small" /> Delete
                            </MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        <Typography variant="subtitle1" color="textSecondary">
                          No perspectives available.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingIndex !== null ? 'Edit Perspective' : 'Add Perspective'}</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              label="Perspective Name"
              type="text"
              fullWidth
              variant="outlined"
              value={editingIndex !== null ? editedName : newPerspective}
              onChange={editingIndex !== null ? handleEditChange : handleChange}
 
            />
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              value={editingIndex !== null ? editedDescription : newDescPerspective}
              onChange={editingIndex !== null ? handleEditDesChange : handleDescriptionChange}

            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {editingIndex !== null ? (
            <Button onClick={handleEditSave} color="primary">
              Save
            </Button>
          ) : (
            <Button onClick={handleSave} color="primary">
              Add
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Grid>
  );
};

export default PerspectiveTable;
