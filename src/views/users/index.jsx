import React, { useEffect, useState } from 'react';
import {
  Box,
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { DotMenu } from 'ui-component/menu/DotMenu';
import { formatDate } from 'utils/function';
import PageContainer from 'ui-component/MainPage';
import Backend from 'services/backend';
import Search from 'ui-component/search';
import ActivityIndicator from 'ui-component/indicators/ActivityIndicator';
import GetToken from 'utils/auth-token';
import ErrorPrompt from 'utils/components/ErrorPrompt';
import Fallbacks from 'utils/components/Fallbacks';

const Users = () => {
  const theme = useTheme();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    per_page: 10,
    last_page: 0,
    total: 0
  });

  const [search, setSearch] = useState('');

  const handleChangePage = (event, newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination({ ...pagination, per_page: event.target.value, page: 0 });
  };

  const handleSearchFieldChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    setPagination({ ...pagination, page: 0 });
  };

  const handleFetchingUsers = async () => {
    setLoading(true);
    const token = await GetToken();
    const Api = Backend.auth + Backend.users + `?page=${pagination.page}&per_page=${pagination.per_page}&search=${search}`;
    const header = {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    fetch(Api, {
      method: 'GET',
      headers: header
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setData(response.data.data);
          setPagination({ ...pagination, last_page: response.data.last_page, total: response.data.total });
          setError(false);
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        toast.warning(error.message);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      handleFetchingUsers();
    }, 800);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [search]);

  useEffect(() => {
    if (mounted) {
      handleFetchingUsers();
    } else {
      setMounted(true);
    }
  }, [pagination.page, pagination.per_page]);
  return (
    <PageContainer title="Users">
      <Grid container>
        <Grid item xs={12} padding={3}>
          <Grid container>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingY: 3 }}>
              <Search title="Search Employees" value={search} onChange={(event) => handleSearchFieldChange(event)} filter={false}></Search>
            </Grid>
            
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              {loading ? (
                <Grid container>
                  <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
                    <ActivityIndicator size={20} />
                  </Grid>
                </Grid>
              ) : error ? (
                <ErrorPrompt title="Server Error" message={`Unable to retrive users `} />
              ) : data.length === 0 ? (
                <Fallbacks
                  severity="evaluation"
                  title={`User is not found`}
                  description={`The list of user will be listed here`}
                  sx={{ paddingTop: 6 }}
                />
              ) : (
                <TableContainer sx={{ minHeight: '66dvh', border: 0.4, borderColor: theme.palette.divider, borderRadius: 2 }}>
                  <Table aria-label="users table" sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Roles</TableCell>
                        <TableCell>Created at</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.map((user) => (
                        <TableRow
                          key={user.id}
                          sx={{
                            ':hover': {
                              backgroundColor: theme.palette.grey[100],
                              color: theme.palette.background.default,
                              cursor: 'pointer',
                              borderRadius: 2
                            }
                          }}
                        >
                          <TableCell sx={{ display: 'flex', alignItems: 'center', border: 0 }}>
                            <Typography variant="subtitle1" color={theme.palette.text.primary}>
                              {user?.name}
                            </Typography>
                          </TableCell>

                          <TableCell sx={{ border: 0 }}>{user?.email}</TableCell>
                          <TableCell sx={{ border: 0 }}>{user?.phone ? user?.phone : 'N/A'}</TableCell>
                          <TableCell sx={{ border: 0 }}>{user?.username ? user?.username : 'N/A'}</TableCell>
                          <TableCell sx={{ border: 0 }}>
                            {user?.roles?.map((role, index) => (
                              <Box key={index}>
                                <Chip label={role.name} sx={{ margin: 0.4 }} />
                              </Box>
                            ))}
                          </TableCell>
                          <TableCell sx={{ border: 0 }}>{formatDate(user?.created_at).formattedDate}</TableCell>
                          <TableCell sx={{ border: 0 }}>
                            <DotMenu />
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
        </Grid>
      </Grid>

      <ToastContainer />
    </PageContainer>
  );
};

export default Users;
