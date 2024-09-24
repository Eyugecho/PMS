import React, { useState, useEffect } from 'react';
import {
  Button,
  Table,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Grid,
  CardContent,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  useTheme,
  CircularProgress
} from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import Backend from 'services/backend';
import GetToken from 'utils/auth-token';
import { toast, ToastContainer } from 'react-toastify';

const JobPositionTable = () => {
  const [jobPositions, setJobPositions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleFetchJobPositions = async () => {
    setLoading(true);
    try {
      const token = await GetToken();
      const api = Backend.api + Backend.jobposition;
      const response = await fetch(api, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data?.success) {
        setJobPositions(data.data.data || []);
      } else {
        toast.error(data?.message || 'Failed to fetch job positions');
      }
    } catch (error) {
      toast.error(error?.message || 'Error fetching job positions');
    } finally {
      setLoading(false);
    }
  };

  const handleEditJobPosition = async (values) => {
    if (values.name.trim() && values.job_code.trim() && editIndex !== null) {
      setLoading(true);

      const token = await GetToken();
      if (!token) {
        toast.error('Authorization token is missing.');
        setLoading(false);
        return;
      }

      const api = Backend.api + Backend.jobposition + `/${values.id}`;
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        accept: 'application/json'
      };

      const data = {
        name: values.name,
        code: values.job_code
      };

      try {
        const response = await fetch(api, {
          method: 'PATCH',
          headers: headers,
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          toast.error(errorResponse?.message || 'Failed to update job position.');
          throw new Error(errorResponse?.message || 'Failed to update job position.');
        }

        const result = await response.json();
        if (result.success) {
          const updatedJobs = jobPositions.map((job, index) => (index === editIndex ? result.data.job_position : job));
          setJobPositions(updatedJobs);
          toast.success(result?.message || 'Job Position updated successfully!');
          handleCloseModal();
          await handleFetchJobPositions();
        } else {
          toast.error(result?.message || 'Failed to update job position');
        }
      } catch (error) {
        toast.error(error?.message || 'Error updating job position');
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Both job position name and code are required.');
    }
  };

  const handleSubmitJobPosition = async (values) => {
    if (values.name.trim() && values.job_code.trim()) {
      setLoading(true);

      try {
        const token = await GetToken();
        if (!token) {
          toast.error('Authorization token is missing.');
          setLoading(false);
          return;
        }

        let api;
        let method;

        if (editIndex !== null) {
          api = Backend.api + Backend.jobposition + `/${values.id}`;
          method = 'PATCH';
        } else {
          api = Backend.api + Backend.jobposition;
          method = 'POST';
        }

        const response = await fetch(api, {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });

        const result = await response.json();

        if (response.ok && result.success) {
          if (editIndex !== null) {
            setJobPositions((prevPositions) => prevPositions.map((job, index) => (index === editIndex ? result.data.job_position : job)));
            toast.success(response.data.message || 'Job Position updated successfully');
          } else {
            setJobPositions((prevPositions) => [...prevPositions, result.data.job_position]);
            toast.success(response.data.message || 'Job Position added successfully');
          }

          handleCloseModal();
          await handleFetchJobPositions();
        } else {
          toast.error(result.message || 'Failed to submit job position');
        }
      } catch (error) {
        toast.error('Error submitting job position: ' + (error.message || 'Unknown error'));
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Job Position name and code cannot be empty.');
    }
  };

  const handleDeleteJobPosition = async (id) => {
    const token = await GetToken();
    try {
      const Api = Backend.api + Backend.jobposition + `/${id}`;
      const response = await fetch(Api, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (result.success) {
        setJobPositions(jobPositions.filter((job) => job.id !== id));
        toast.success(result.message || 'Job Position deleted successfully');
      } else {
        toast.error(result.message || 'Failed to delete job position');
      }
    } catch (error) {
      toast.error('Error deleting job position: ' + (error.message || 'Unknown error'));
    }
  };

  useEffect(() => {
    handleFetchJobPositions();
  }, []);

  const handleOpenModal = (job = null, index = null) => {
    setEditIndex(index);
    formik.setValues(job || { name: '', job_code: '' });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditIndex(null);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      job_code: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Job Position name is required'),
      job_code: Yup.string().required('Code is required')
    }),
    onSubmit: (values) => {
      if (editIndex !== null) {
        handleEditJobPosition(values);
      } else {
        handleSubmitJobPosition(values);
      }
    }
  });

  const handleMenuOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setEditIndex(index);
  };

  const handleActionMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
            Add
          </Button>
          <CardContent>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
              </Box>
            ) : jobPositions.length === 0 ? (
              <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                <SentimentDissatisfiedIcon color="disabled" style={{ fontSize: 60 }} />
                <Typography variant="subtitle1" color="textSecondary" align="center" marginLeft={2}>
                  No job positions entered yet.
                </Typography>
              </Box>
            ) : (
              <TableContainer style={{ border: '1px solid #ddd' }}>
                <Table sx={{ minWidth: 650, borderCollapse: 'collapse' }}>
                  <TableHead>
                    <TableRow>
                      {['Job Position', 'Code', 'Actions'].map((header) => (
                        <TableCell key={header}>{header}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {jobPositions.map((job, index) => (
                      <TableRow key={job.id}>
                        <TableCell>{job.name}</TableCell>
                        <TableCell>{job.job_code}</TableCell>
                        <TableCell>
                          <IconButton color="primary" onClick={(event) => handleMenuOpen(event, index)}>
                            <MoreVertIcon />
                          </IconButton>
                          <Menu anchorEl={anchorEl} open={Boolean(anchorEl) && editIndex === index} onClose={handleActionMenuClose}>
                            <MenuItem
                              onClick={() => {
                                handleOpenModal(job, index);
                                handleActionMenuClose();
                              }}
                            >
                              <EditIcon /> Edit
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                handleDeleteJobPosition(job.id);
                                handleActionMenuClose();
                              }}
                            >
                              <DeleteIcon /> Delete
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

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{editIndex !== null ? 'Edit Job Position' : 'Add Job Position'}</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              label="Job Position"
              type="text"
              fullWidth
              variant="outlined"
              {...formik.getFieldProps('name')}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              margin="dense"
              label="Job Code"
              type="text"
              fullWidth
              variant="outlined"
              {...formik.getFieldProps('job_code')}
              error={formik.touched.job_code && Boolean(formik.errors.job_code)}
              helperText={formik.touched.job_code && formik.errors.job_code}
            />
            <DialogActions>
              <Button onClick={handleCloseModal} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                {editIndex !== null ? 'Update' : 'Add'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </Box>
  );
};

export default JobPositionTable;
