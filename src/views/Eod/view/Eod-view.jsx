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
  Menu,
  MenuItem
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import config from '../../../configration/config';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { decodeToken, hasRole } from '../../../store/permissionUtils'; // Import the helper functions

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
  const [formValues, setFormValues] = useState({
    date: new Date().toISOString().split('T')[0], // Current date by default
    revenue: '',
    expenses: '',
    profit: '',
    customer_satisfaction: '',
    plan: '',
    completed: '',
    challenge_faced: '',
  });
  const [tabIndex, setTabIndex] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRecord, setCurrentRecord] = useState(null);

  const token = localStorage.getItem('token');
  const user = decodeToken(token); // Decode the token
  const isCeo = hasRole(user.roles, 'CEO'); // Check if the user is a CEO
  const isAdmin = hasRole(user.roles, 'Admin'); // Check if the user is an Admin

  // Fetch data on page or rowsPerPage change
  useEffect(() => {
    fetchData(page + 1);
  }, [page, rowsPerPage]);

  // Fetch EOD activities
  const fetchData = async (pageNumber) => {
    try {
      const response = await axios.get(`${config.API_URL_Units}/end-of-day-activities?page=${pageNumber}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        setData(response.data.data.data);
        setTotal(response.data.data.total);
      } else {
        console.error('Failed to fetch data:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Save or update record
  const handleSave = async () => {
    try {
      const method = editIndex !== null ? 'PATCH' : 'POST';
      const url = editIndex !== null 
        ? `${config.API_URL_Units}/end-of-day-activities/${data[editIndex].id}` 
        : `${config.API_URL_Units}/end-of-day-activities`;

      const response = await axios({
        method,
        url,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: formValues,
      });

      if (response.data.success) {
        setData((prevData) => {
          if (editIndex !== null) {
            return prevData.map((item, index) =>
              index === editIndex ? response.data.data : item
            );
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
      setSnackbarMessage('Error saving record: ' + error.message);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  // Delete record
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${config.API_URL_Units}/end-of-day-activities/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
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
    handleCloseMenu();
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
      challenge_faced: '',
    });
    setEditIndex(null);
    setTabIndex(0);
  };

  // Handle form field change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
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
    handleCloseMenu();
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
    { field: 'plan', headerName: 'Plan', flex: 1 },
    { field: 'completed', headerName: 'Completed', flex: 1 },
    { field: 'challenge_faced', headerName: 'Challenge Faced', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <IconButton onClick={(event) => handleClickMenu(event, params.row)} disabled={isCeo}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">EOD Activities</Typography>
          {!isCeo && (
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
              Add
            </Button>
          )}
        </Box>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onPageSizeChange={handleChangeRowsPerPage}
            rowCount={total}
            paginationMode="server"
          />
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{editIndex !== null ? 'Edit' : 'Add'} EOD Activity</DialogTitle>
          <DialogContent>
            <Tabs value={tabIndex} onChange={handleTabChange}>
              <Tab label="Details" />
              <Tab label="Financial" />
            </Tabs>
            {tabIndex === 0 && (
              <Box mt={2}>
                <TextField
                  margin="normal"
                  name="date"
                  label="Date"
                  type="date"
                  fullWidth
                  value={formValues.date}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  margin="normal"
                  name="plan"
                  label="Plan"
                  fullWidth
                  value={formValues.plan}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  name="completed"
                  label="Completed"
                  fullWidth
                  value={formValues.completed}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  name="challenge_faced"
                  label="Challenge Faced"
                  fullWidth
                  value={formValues.challenge_faced}
                  onChange={handleChange}
                />
              </Box>
            )}
            {tabIndex === 1 && (
              <Box mt={2}>
                <TextField
                  margin="normal"
                  name="revenue"
                  label="Revenue"
                  fullWidth
                  value={formValues.revenue}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  name="expenses"
                  label="Expenses"
                  fullWidth
                  value={formValues.expenses}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  name="profit"
                  label="Profit"
                  fullWidth
                  value={formValues.profit}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  name="customer_satisfaction"
                  label="Customer Satisfaction"
                  fullWidth
                  value={formValues.customer_satisfaction}
                  onChange={handleChange}
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary" disabled={isCeo}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
          <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </CardContent>
      <Dialog open={detailOpen} onClose={handleCloseDetails}>
        <DialogTitle>Activity Details</DialogTitle>
        <DialogContent>
          {selectedRecord && (
            <Box>
              <Typography variant="body1"><strong>Plan:</strong> {selectedRecord.plan}</Typography>
              <Typography variant="body1"><strong>Completed:</strong> {selectedRecord.completed}</Typography>
              <Typography variant="body1"><strong>Challenge Faced:</strong> {selectedRecord.challenge_faced}</Typography>
              <Typography variant="body1"><strong>Date:</strong> {selectedRecord.date}</Typography>
              <Typography variant="body1"><strong>Revenue:</strong> {selectedRecord.revenue}</Typography>
              <Typography variant="body1"><strong>Expenses:</strong> {selectedRecord.expenses}</Typography>
              <Typography variant="body1"><strong>Profit:</strong> {selectedRecord.profit}</Typography>
              <Typography variant="body1"><strong>Customer Satisfaction:</strong> {selectedRecord.customer_satisfaction}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {!isCeo && (
          <>
            <MenuItem onClick={() => handleMenuAction('edit')}>Edit</MenuItem>
            <MenuItem onClick={() => handleMenuAction('delete')}>Delete</MenuItem>
          </>
        )}
        <MenuItem onClick={() => handleMenuAction('details')}>Details</MenuItem>
      </Menu>
    </Card>
  );
}

export default EodActivity;
