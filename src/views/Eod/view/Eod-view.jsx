import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Snackbar,
  Alert,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Tabs,
  Tab,
  Typography,
  Grid,
  Menu,
  MenuItem
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import config from '../../../configration/config';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Import MoreVertIcon
import Iconify from '../../../ui-component/iconify/iconify';

function EodActivity() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [formErrors, setFormErrors] = useState({});

  const [formValues, setFormValues] = useState({
    date: new Date().toISOString().split('T')[0], // Current date by default
    revenue: '',
    expenses: '',
    profit: '',
    customer_satisfaction: '',
    plan: '',
    completed: '',
    challenge_faced: ''
  });
  const [tabIndex, setTabIndex] = useState(0); // New state for tabs
  const [detailOpen, setDetailOpen] = useState(false); // State for detail modal
  const [selectedRecord, setSelectedRecord] = useState(null); // State for selected record details
  const [anchorEl, setAnchorEl] = useState(null); // State for the menu anchor
  const [currentRecord, setCurrentRecord] = useState(null); // State for the current record
  const employeeName = localStorage.getItem('employee_name') || '';

  // Fetch data on page or rowsPerPage change
  useEffect(() => {
    fetchData(page + 1);
  }, [page, rowsPerPage]);

  // Fetch EOD activities
  const fetchData = async (pageNumber) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${config.API_URL_Units}/end-of-day-activities?page=${pageNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);

      if (response.data.success) {
        setData(
          response.data.data.data.map((item) => ({
            ...item,
            employee_name: employeeName // Add employee name to each item
          }))
        );
        setTotal(response.data.data.total);
      } else {
        console.error('Failed to fetch data:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  
const handleSave = async () => {
  try {
    const token = localStorage.getItem('token');
    const method = editIndex !== null ? 'PATCH' : 'POST';
    const url =
      editIndex !== null
        ? `${config.API_URL_Units}/end-of-day-activities/${data[editIndex].id}`
        : `${config.API_URL_Units}/end-of-day-activities`;

    const response = await axios({
      method,
      url,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: formValues
    });

    if (response.data.success) {
      setData((prevData) => {
        if (editIndex !== null) {
          return prevData.map((item, index) => (index === editIndex ? response.data.data : item));
        } else {
          return [...prevData, response.data.data];
        }
      });
      handleClose();
      setSnackbarMessage('Record saved successfully!');
      setSnackbarSeverity('success');
    } else {
      setSnackbarMessage(response.data.message || 'Error occurred');
      setSnackbarSeverity('error');
    }
    setSnackbarOpen(true);
  } catch (error) {
    if (error.response) {
      if (error.response.status === 422) {
        // Handle validation error (422 Unprocessable Content)
        const { message, errors } = error.response.data.data;

        // Handle specific error messages
        if (message) {
          setSnackbarMessage(message);
        } else {
          // Handle other validation errors if any
          const errorMessages = Object.values(errors).flat().join(', '); // Combine all error messages
          setSnackbarMessage(errorMessages || 'Validation error occurred.');
        }
      } else if (error.response.data && error.response.data.message) {
        // Handle other specific cases where the message field is present
        setSnackbarMessage(error.response.data.message);
      } else {
        // Handle other errors
        setSnackbarMessage('Error saving record: ' + error.message);
      }
    } else {
      // Handle cases where error.response is undefined
      setSnackbarMessage('Error saving record: ' + error.message);
    }
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
  } finally {
    // Optionally, reset loading state if you have one
    setIsLoading(false);
  }
};



  // Delete record
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${config.API_URL_Units}/end-of-day-activities/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 204 || response.data.success) {
        fetchData(page + 1);
        setSnackbarMessage('Record deleted successfully!');
        setSnackbarSeverity('success');
      } else {
        setSnackbarMessage('Failed to delete record: ' + response.data.message);
        setSnackbarSeverity('error');
      }
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Error deleting record: ' + error.message);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  // Set form values for editing
  const handleEdit = (record) => {
    setFormValues(record);
    setEditIndex(data.indexOf(record));
    setOpen(true);
    handleCloseMenu(); // Close the menu when editing
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Close dialog
  const handleClose = () => {
    setOpen(false);
    setFormValues({
      date: new Date().toISOString().split('T')[0], // Reset date to current date
      revenue: '',
      expenses: '',
      profit: '',
      customer_satisfaction: '',
      plan: '',
      completed: '',
      challenge_faced: ''
    });
    setEditIndex(null);
    setTabIndex(0); // Reset to first tab
  };

  // Handle form field change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // Show details modal
  const handleShowDetails = (record) => {
    setSelectedRecord(record);
    setDetailOpen(true);
    handleCloseMenu(); // Close the menu when viewing details
  };

  // Close details modal
  const handleCloseDetails = () => {
    setDetailOpen(false);
    setSelectedRecord(null);
  };

  // Show menu
  const handleClickMenu = (event, record) => {
    setAnchorEl(event.currentTarget);
    setCurrentRecord(record);
  };

  // Close menu
  const handleCloseMenu = () => {
    setAnchorEl(null);
    setCurrentRecord(null);
  };

  // Handle menu action
  const handleMenuAction = (action) => {
    if (action === 'edit') {
      handleEdit(currentRecord);
    } else if (action === 'delete') {
      handleDelete(currentRecord.id);
    } else if (action === 'details') {
      handleShowDetails(currentRecord);
    }
    handleCloseMenu();
  };

  // Define table columns
  const columns = [
    // { field: 'employee_name', headerName: 'Employee Name', flex: 1 },
    { field: 'plan', headerName: 'Plan', flex: 1 },
    { field: 'completed', headerName: 'Completed', flex: 1 },
    { field: 'challenge_faced', headerName: 'Challenge Faced', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <IconButton onClick={(event) => handleClickMenu(event, params.row)}>
          <MoreVertIcon />
        </IconButton>
      )
    }
  ];

  // Define the detail modal columns
  const detailColumns = [
    { field: 'field', headerName: 'Field', flex: 1 },
    { field: 'value', headerName: 'Value', flex: 1 }
  ];

  // Prepare data for detail modal table
  const detailRows = selectedRecord
    ? [
        { id: 1, field: 'Revenue', value: `${selectedRecord.revenue} Birr` },
        { id: 2, field: 'Expenses', value: `${selectedRecord.expenses} Birr` },
        { id: 3, field: 'Profit', value: `${selectedRecord.profit} Birr` },
        { id: 4, field: 'Customer Satisfaction', value: selectedRecord.customer_satisfaction }
      ]
    : [];

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
            Add
          </Button>
        </Box>
        <Box mt={2}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={rowsPerPage}
            page={page}
            rowCount={total}
            paginationMode="server"
            onPageChange={handleChangePage}
            getRowId={(row) => row.id || row.employee_id || row.k_p_i_id}
            onPageSizeChange={handleChangeRowsPerPage}
            autoHeight
          />
        </Box>
      </CardContent>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          backdropFilter: 'blur(10px)', // Frosted glass effect
          backgroundColor: 'rgba(255, 255, 255, 0.1)' // Optional: Lightens the backdrop
        }}
      >
        <DialogTitle>{editIndex !== null ? 'Edit EOD Activity' : 'Add EOD Activity'}</DialogTitle>
        <DialogContent>
          <Tabs value={tabIndex} onChange={handleTabChange}>
            <Tab label="EOD Activity" />
            {editIndex !== null && <Tab label="EOD Revenue" />}
          </Tabs>
          <Box mt={2}>
            {tabIndex === 0 && (
              <Grid container spacing={2}>
                {editIndex === null && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Date"
                      name="date"
                      type="date"
                      value={formValues.date}
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Plan"
                    name="plan"
                    value={formValues.plan}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: editIndex !== null // Read-only when editing
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  {editIndex !== null && (
                    <TextField fullWidth label="Completed" name="completed" value={formValues.completed} onChange={handleChange} />
                  )}
                </Grid>
                <Grid item xs={12}>
                  {editIndex !== null && (
                    <TextField
                      fullWidth
                      label="Challenge Faced"
                      name="challenge_faced"
                      value={formValues.challenge_faced}
                      onChange={handleChange}
                    />
                  )}
                </Grid>
              </Grid>
            )}
            {tabIndex === 1 && editIndex !== null && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Revenue" name="revenue" value={formValues.revenue} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Expenses" name="expenses" value={formValues.expenses} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Customer Satisfaction"
                    name="customer_satisfaction"
                    value={formValues.customer_satisfaction}
                    onChange={handleChange}
                    error={!!formErrors.customer_satisfaction} // Show error state if there's an error
                    helperText={formErrors.customer_satisfaction ? formErrors.customer_satisfaction[0] : ''}
                  />
                </Grid>
              </Grid>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Dialog open={detailOpen} onClose={handleCloseDetails}>
        <DialogTitle>Record Details</DialogTitle>
        <DialogContent>
          {selectedRecord && (
            <DataGrid
              getRowId={(row) => row.id || row.employee_id || row.k_p_i_id}
              rows={detailRows}
              columns={detailColumns}
              pageSize={5}
              autoHeight
              disableSelectionOnClick
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={() => handleMenuAction('edit')}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Update
        </MenuItem>
        {/* <MenuItem onClick={() => handleMenuAction('delete')}>Delete</MenuItem> */}
        <MenuItem onClick={() => handleMenuAction('details')}>
          <Iconify icon="eva:eye-fill" sx={{ mr: 2 }} />
          View Revenue
        </MenuItem>
      </Menu>
    </Card>
  );
}

export default EodActivity;
