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
  CircularProgress,
  TablePagination
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
import PageContainer from 'ui-component/MainPage';
import UploadFile from 'ui-component/modal/UploadFile';
import hasPermission from 'utils/auth/hasPermission';
import SplitButton from 'ui-component/buttons/SplitButton';
import Search from 'ui-component/search';
import axios from 'axios';

const AddJobPositionOptions = ['Add Job Positions', 'Import From Excel'];

const JobPositionTable = () => {
  const [jobPositions, setJobPositions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [importExcel, setImportExcel] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({
    page: 0,
    per_page: 10,
    last_page: 0,
    total: 0
  });
  const theme = useTheme();

  const handleFetchJobPositions = async () => {
    setLoading(true);
    try {
      const token = await GetToken();
      const api = Backend.api + Backend.jobposition + `?page=${pagination.page}&per_page=${pagination.per_page}&search=${search}`;
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
        setPagination({ ...pagination, last_page: data.data.last_page, total: data.data.total });
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
    if (values.name.trim()&& editIndex !== null) {
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
       
      };

      try {
        const response = await fetch(api, {
          method: 'PATCH',
          headers: headers,
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          toast.error(errorResponse?.data.message || 'Failed to update job position.');
          throw new Error(errorResponse?.message || 'Failed to update job position.');
        }

        const result = await response.json();
        if (result.success) {
          const updatedJobs = jobPositions.map((job, index) => (index === editIndex ? result.data.job_position : job));
          setJobPositions(updatedJobs);
          toast.success(result?.data?.message || 'Job position updated successfully!');
          handleCloseModal();
          await handleFetchJobPositions();
        } else {
          toast.error(result?.data?.message || 'Failed to update job position');
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
  const handleSearchFieldChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    setPagination({ ...pagination, page: 0 });
  };
  const handleSubmitJobPosition = async (values) => {
    try {
      setLoading(true);
      const token = await GetToken();
      if (!token) {
        throw new Error('No token found');
      }

      const Api = Backend.api + Backend.jobposition;
      const response = await fetch(Api, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: values.name })
      });

      const result = await response.json();

      if (result.success) {
        setJobPositions();
        toast.success(result.data.message);
        handleCloseModal();
        handleFetchJobPositions();
      }
    } catch (error) {
      toast.error(error?.data?.message);
    } finally {
      setLoading(false);
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
        toast.success(result?.data?.message || 'Job Position deleted successfully');
      } else {
        toast.error(result?.data?.message || 'Failed to delete job position');
      }
    } catch (error) {
      toast.error('Error deleting job position: ' + (error.message || 'Unknown error'));
    }
  };
  const handleUpload = async (file) => {
    const token = localStorage.getItem('token');
    const Api = Backend.api + Backend.JobExcell;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    };

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(Api, formData, {
        headers: headers,
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        }
      });

      if (response.success) {
        toast.success(response.data.data.message);
      } else {
        toast.success(response.data.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleOpenModal = (job = null, index = null) => {
    setEditIndex(index);
    formik.setValues(job || { name: '' });
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
    
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Job Position name is required')
    }),
    onSubmit: (values) => {
      if (editIndex !== null) {
        handleEditJobPosition(values);
      } else {
        handleSubmitJobPosition(values);
      }
    }
  });

  const handleJobPositionAdd = (index) => {
    if (index === 0) {
      handleOpenModal();
    } else if (index === 1) {
      handleOpenDialog();
    } else {
      alert('We will be implement importing from odoo');
    }
  };

  const handleOpenDialog = () => {
    setImportExcel(true);
  };

  const handleCloseDialog = () => {
    setImportExcel(false);
  };

  const handleChangePage = (event, newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination({ ...pagination, per_page: event.target.value, page: 0 });
  };
  const handleMenuOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setEditIndex(index);
  };

  const handleActionMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    handleFetchJobPositions();
  }, [search, pagination.page, pagination.per_page]);

  return (
    <PageContainer title="Job Positions">
      <Grid container padding={2}>
        <Grid container>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingY: 3, paddingX: 3 }}>
            <Search title="Filter Job Position" value={search} onChange={(event) => handleSearchFieldChange(event)} filter={false}></Search>
            {hasPermission('create:jobposition') && (
              <SplitButton options={AddJobPositionOptions} handleSelection={(value) => handleJobPositionAdd(value)} />
            )}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <CardContent>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
              </Box>
            ) : jobPositions?.length === 0 ? (
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
                      {['Job Position', 'Actions'].map((header) => (
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
                    {jobPositions?.map((job, index) => (
                      <TableRow
                        key={job.id}
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
                          sx={{
                            border: 0,
                            padding: '12px 16px'
                          }}
                        >
                          {job.name}
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
      <TablePagination
        component="div"
        rowsPerPageOptions={[10, 25, 50, 100]}
        count={pagination.total}
        rowsPerPage={pagination.per_page}
        page={pagination.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <UploadFile
        open={importExcel}
        onClose={handleCloseDialog}
        onUpload={handleUpload}
        uploadProgress={uploadProgress}
        onRemove={() => setUploadProgress(0)}
        templateUrl="http://localhost:3000/Employee_Job_Position.csv"
      />
      <ToastContainer />
    </PageContainer>
  );
};

export default JobPositionTable;
