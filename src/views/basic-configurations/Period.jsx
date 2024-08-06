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
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Menu,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Configuration URL (Ensure you have config setup properly)
import config from '../../configration/config';

function Period() {
  const [periods, setPeriods] = useState([]);
  const [frequencies, setFrequencies] = useState([]);
  const [activities, setActivities] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');

      // Fetch frequencies
      const responseFrequencies = await fetch(`${config.API_URL_Units}/frequencies`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const dataFrequencies = await responseFrequencies.json();
      if (dataFrequencies.success) {
        setFrequencies(dataFrequencies.data.data);
      } else {
        toast.error('Failed to fetch frequencies');
      }

      // Fetch activities
      const responseActivities = await fetch(`${config.API_URL_Units}/get-period-activities`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const dataActivities = await responseActivities.json();
      if (dataActivities.success) {
        setActivities(dataActivities.data);
      } else {
        toast.error('Failed to fetch activities');
      }

      // Fetch periods
      const responsePeriods = await fetch(`${config.API_URL_Units}/periods`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const dataPeriods = await responsePeriods.json();
      if (dataPeriods.success) {
        setPeriods(dataPeriods.data.periods);
      } else {
        toast.error('Failed to fetch periods');
      }
    } catch (error) {
      toast.error('Error occurred while fetching data');
    }
  };

  const formik = useFormik({
    initialValues: {
      fiscalYear: '',
      frequency: '',
      activity: '',
      dates: [],
    },
    onSubmit: async (values, { resetForm }) => {
      const frequency = frequencies.find((freq) => freq.id === values.frequency);
      if (values.fiscalYear && frequency && values.activity) {
        const newPeriod = {
          fiscal_year: values.fiscalYear,
          frequency_id: frequency.id,
          type: values.activity,
          dates: values.dates,
        };

        try {
          const token = localStorage.getItem('token');
          const method = editIndex !== null ? 'PATCH' : 'POST';
          const url = editIndex !== null
            ? `${config.API_URL_Units}/periods/${periods[editIndex].id}`
            : `${config.API_URL_Units}/periods`;

          const response = await fetch(url, {
            method: method,
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPeriod),
          });

          const result = await response.json();
          if (result.success) {
            toast.success(editIndex !== null ? 'Period updated' : 'Period created');
            fetchData(); // Refresh the list
            handleClose();
          } else {
            toast.error(result.message || 'Failed to save period');
          }
        } catch (error) {
          toast.error('Error occurred while saving period');
        }

        resetForm();
      }
    },
  });

  const handleEdit = (index) => {
    const period = periods[index];
    formik.setFieldValue('fiscalYear', period.fiscal_year_id);
    formik.setFieldValue('frequency', period.frequency_id);
    formik.setFieldValue('activity', period.type);
    formik.setFieldValue('dates', [{ startDate: period.start_date, endDate: period.end_date }]);
    setEditIndex(index);
    handleOpen();
  };

  const handleDelete = async (index) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.API_URL_Units}/periods/${periods[index].id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Period deleted');
        fetchData(); // Refresh the list
      } else {
        toast.error(result.message || 'Failed to delete period');
      }
    } catch (error) {
      toast.error('Error occurred while deleting period');
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
  };

  const renderDateFields = () => {
    const frequency = frequencies.find((freq) => freq.id === formik.values.frequency);
    if (!frequency) return null;

    const numOfFields = frequency.value; // Number of date fields

    return Array.from({ length: numOfFields }, (_, i) => (
      <Grid container spacing={2} key={i}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id={`start_date-${i}`}
            name={`dates[${i}].start_date`}
            label={`Start Date ${i + 1}`}
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.dates[i]?.start_date || ''}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id={`end_date-${i}`}
            name={`dates[${i}].end_date`}
            label={`End Date ${i + 1}`}
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.dates[i]?.end_date || ''}
            onChange={formik.handleChange}
          />
        </Grid>
      </Grid>
    ));
  };

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Create New Period
              </Typography>
              <Box component="form" onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="fiscalYear"
                      name="fiscalYear"
                      label="Fiscal Year"
                      value={formik.values.fiscalYear}
                      onChange={formik.handleChange}
                      error={formik.touched.fiscalYear && Boolean(formik.errors.fiscalYear)}
                      helperText={formik.touched.fiscalYear && formik.errors.fiscalYear}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="frequency-label">Frequency</InputLabel>
                      <Select
                        labelId="frequency-label"
                        id="frequency"
                        name="frequency"
                        value={formik.values.frequency}
                        onChange={formik.handleChange}
                        error={formik.touched.frequency && Boolean(formik.errors.frequency)}
                      >
                        <MenuItem value="">None</MenuItem>
                        {frequencies.map((frequency) => (
                          <MenuItem key={frequency.id} value={frequency.id}>
                            {frequency.name} ({frequency.value})
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="activity-label">Activity</InputLabel>
                      <Select
                        labelId="activity-label"
                        id="activity"
                        name="activity"
                        value={formik.values.activity}
                        onChange={formik.handleChange}
                        error={formik.touched.activity && Boolean(formik.errors.activity)}
                      >
                        <MenuItem value="">None</MenuItem>
                        {activities.map((activity, index) => (
                          <MenuItem key={index} value={activity}>
                            {activity}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Box mt={2}>
                  {renderDateFields()}
                </Box>
                <Box mt={2}>
                  <Button color="primary" variant="contained" type="submit">
                    {editIndex !== null ? 'Update Period' : 'Create Period'}
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
                      <TableCell>Fiscal Year</TableCell>
                      <TableCell>Activity</TableCell>
                      <TableCell>Start Date</TableCell>
                      <TableCell>End Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {periods.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          <SentimentDissatisfiedIcon />
                          No Periods Found
                        </TableCell>
                      </TableRow>
                    ) : (
                      periods.map((period, index) => (
                        <TableRow key={index}>
                          <TableCell>{period.fiscal_year.year}</TableCell>
                          <TableCell>{period.fiscal_year.type}</TableCell>
                          <TableCell>{period.start_date}</TableCell>
                          <TableCell>{period.end_date}</TableCell>
                          <TableCell>
                            <IconButton onClick={(event) => handleMenuOpen(event, index)}>
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              anchorEl={anchorEl}
                              open={selectedIndex === index}
                              onClose={handleMenuClose}
                            >
                              <MenuItem onClick={() => { handleEdit(index); handleMenuClose(); }}>
                                <EditIcon /> Edit
                              </MenuItem>
                              <MenuItem onClick={() => { handleDelete(index); handleMenuClose(); }}>
                                <DeleteIcon /> Delete
                              </MenuItem>
                            </Menu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIndex !== null ? 'Edit Period' : 'Create New Period'}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="fiscalYear"
                  name="fiscalYear"
                  label="Fiscal Year"
                  value={formik.values.fiscalYear}
                  onChange={formik.handleChange}
                  error={formik.touched.fiscalYear && Boolean(formik.errors.fiscalYear)}
                  helperText={formik.touched.fiscalYear && formik.errors.fiscalYear}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="frequency-label">Frequency</InputLabel>
                  <Select
                    labelId="frequency-label"
                    id="frequency"
                    name="frequency"
                    value={formik.values.frequency}
                    onChange={formik.handleChange}
                    error={formik.touched.frequency && Boolean(formik.errors.frequency)}
                  >
                    <MenuItem value="">None</MenuItem>
                    {frequencies.map((frequency) => (
                      <MenuItem key={frequency.id} value={frequency.id}>
                        {frequency.name} ({frequency.value})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="activity-label">Activity</InputLabel>
                  <Select
                    labelId="activity-label"
                    id="activity"
                    name="activity"
                    value={formik.values.activity}
                    onChange={formik.handleChange}
                    error={formik.touched.activity && Boolean(formik.errors.activity)}
                  >
                    <MenuItem value="">None</MenuItem>
                    {activities.map((activity, index) => (
                      <MenuItem key={index} value={activity}>
                        {activity}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Box mt={2}>
              {renderDateFields()}
            </Box>
            <Box mt={2}>
              <Button color="primary" variant="contained" type="submit">
                {editIndex !== null ? 'Update Period' : 'Create Period'}
              </Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Box>
  );
}

export default Period;
