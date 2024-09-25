import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  TablePagination
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { DotMenu } from 'ui-component/menu/DotMenu';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import GetToken from 'utils/auth-token';
import Backend from 'services/backend';
import PageContainer from 'ui-component/MainPage';
import AddButton from 'ui-component/buttons/AddButton';
import AddPerpectives from './components/AddPerpectives';
import EditPerspectives from './components/EditPerspectives';
import Search from 'ui-component/search';
import ActivityIndicator from 'ui-component/indicators/ActivityIndicator';

function Perspectives() {
  const theme = useTheme();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [perceptives, setPerceptives] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPerspective, setSelectedPerspective] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const [search, setSearch] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    per_page: 10,
    last_page: 0,
    total: 0
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpeningEditDialog = () => {
    setOpenEdit(true);
  };

  const handleClosingEditDialog = () => {
    setOpenEdit(false);
  };

  const handleSave = async (values) => {
    try {
      setSubmitting(true);
      const token = await GetToken();
      if (!token) {
        throw new Error('No token found');
      }

      const Api = Backend.api + Backend.perspectiveTypes;
      const response = await fetch(Api, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: values.perspectiveName })
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.data.message);
        handleClose();
        fetchPerceptives();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSavingUpdate = async (values) => {
    try {
      setSubmitting(true);
      const token = await GetToken();
      if (!token) {
        throw new Error('No token found');
      }

      const Api = Backend.api + Backend.perspectiveTypes + `/${selectedPerspective?.id}`;

      const response = await fetch(Api, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*'
        },
        body: JSON.stringify({ name: values.perspectiveName })
      });

      const result = await response.json();

      if (result.success) {
        handleClosingEditDialog();
        toast.success(result.data.message);
        fetchPerceptives();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (perspective) => {
    setSelectedPerspective(perspective);
    handleOpeningEditDialog();
  };

  const handleDelete = async (id) => {
    try {
      const token = await GetToken();
      const Api = Backend.api + Backend.perspectiveTypes + `/${id}`;

      fetch(Api, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            toast.success(response.data.message);
            fetchPerceptives();
          } else {
            toast.success('There is error deleting');
          }
        })
        .catch((error) => {
          toast.success(error.message);
        });
    } catch (error) {
      toast.success(error.message);
    }
  };

  const handleSearchFieldChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    setPagination({ ...pagination, page: 0 });
  };

  const handleChangePage = (event, newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination({ ...pagination, per_page: event.target.value, page: 0 });
  };

  const fetchPerceptives = async () => {
    try {
      perceptives.length === 0 && setLoading(true);
      const token = await GetToken();
      const Api = Backend.api + Backend.perspectiveTypes + `?page=${pagination.page}&per_page=${pagination.per_page}&search=${search}`;
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
        setPagination({ ...pagination, last_page: data.data.last_page, total: data.data.total });
      } else {
        toast.error(data.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mounted) {
      fetchPerceptives();
    } else {
      setMounted(true);
    }
  }, [pagination.page, pagination.per_page]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      fetchPerceptives();
    }, 600);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [search]);

  return (
    <PageContainer
      title="Perspectives"
      rightOption={<AddButton title="Create Perspective" variant="contained" onPress={() => handleOpen()} />}
    >
      <Grid container>
        <Grid item xs={12} md={4} lg={3} sx={{ margin: 2, mt: 4 }}>
          <Search title="Filter perspectives" value={search} onChange={(event) => handleSearchFieldChange(event)} filter={false}></Search>
        </Grid>
        <Grid item xs={12} sx={{ margin: 2 }}>
          {loading ? (
            <Grid container>
              <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size={22} />
              </Grid>
            </Grid>
          ) : perceptives.length === 0 ? (
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
                        <DotMenu onEdit={() => handleEdit(perceptive)} onDelete={() => handleDelete(perceptive.id)} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                rowsPerPageOptions={[10, 25, 50, 100]}
                count={pagination.total}
                rowsPerPage={pagination.per_page}
                page={pagination.page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          )}
        </Grid>
      </Grid>

      <AddPerpectives open={open} handleClose={handleClose} handleSubmission={(values) => handleSave(values)} submitting={submitting} />
      {selectedPerspective && (
        <EditPerspectives
          open={openEdit}
          selected={selectedPerspective}
          handleClose={handleClosingEditDialog}
          handleSubmission={(values) => handleSavingUpdate(values)}
          submitting={submitting}
        />
      )}

      <ToastContainer />
    </PageContainer>
  );
}

export default Perspectives;
