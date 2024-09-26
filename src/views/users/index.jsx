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
  useTheme,
  Card,
  CardContent
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { DotMenu } from 'ui-component/menu/DotMenu';
import { format } from 'date-fns';
import PageContainer from 'ui-component/MainPage';
import Backend from 'services/backend';
import Search from 'ui-component/search';
import ActivityIndicator from 'ui-component/indicators/ActivityIndicator';
import GetToken from 'utils/auth-token';
import ErrorPrompt from 'utils/components/ErrorPrompt';
import Fallbacks from 'utils/components/Fallbacks';
import AddButton from 'ui-component/buttons/AddButton';
import AddUser from './componenets/Addusers';
import getRolesAndPermissionsFromToken from 'utils/auth/getRolesAndPermissionsFromToken';
import EditUser from './componenets/EditUsers';

const Users = () => {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

  const [add, setAdd] = useState(false);
  const [roles, setRoles] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    per_page: 10,
    last_page: 0,
    total: 0
  });
  const [search, setSearch] = useState('');
  const [update, setUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const auth = getRolesAndPermissionsFromToken();

  const hasPermission = auth.some((role) => role.permissions.some((per) => per.name === 'create:users'));
  const hasEditPermission = auth.some((role) => role.permissions.some((per) => per.name === 'update:users'));
  const hasDelatePermission = auth.some((role) => role.permissions.some((per) => per.name === 'delete:users'));

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
    const Api = Backend.auth + Backend.users + `?page=${pagination.page + 1}&per_page=${pagination.per_page}&search=${search}`;
    const header = {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    fetch(Api, { method: 'GET', headers: header })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setData(response.data.data);
          setPagination({
            ...pagination,
            last_page: response.data.last_page,
            total: response.data.total
          });
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

  const handleUserAddition = async (value) => {
    setIsAdding(true);
    const token = await GetToken();
    const Api = Backend.auth + Backend.users;
    const header = {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    const data = {
      email: value.email,
      name: value.name,
      phone: value.phone,
      roles: value.roles
    };

    if (!value.email || !value.name) {
      toast.error('Please fill all required fields.');
      setIsAdding(false);
      return;
    }

    try {
      const response = await fetch(Api, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.data.message || 'Error adding user');
      }

      const responseData = await response.json();
      if (responseData.success) {
        toast.success(responseData.data.message);
        handleFetchingUsers();
        handleUserModalClose();
      } else {
        toast.error(responseData.data.message || 'Failed to add user.');
      }
    } catch (error) {
      toast.error(error.message || 'An unexpected error occurred.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleUserEdit = async (value) => {
    setIsAdding(true);
    const token = await GetToken();
    const Api = Backend.auth + Backend.users;
    const header = {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    const data = {
      email: value.email,
      name: value.name,
      phone: value.phone,
      roles: value.roles
    };

    if (!value.email || !value.name) {
      toast.error('Please fill the required fields.');
      setIsAdding(false);
      return;
    }

    try {
      const response = await fetch(Api, {
        method: 'PATCH',
        headers: header,
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.data.message || 'Error adding user');
      }

      const responseData = await response.json();
      if (responseData.success) {
        toast.success(responseData.data.message);
        handleFetchingUsers();
        handleUserModalClose();
      } else {
        toast.error(responseData.data.message || 'Failed to add user.');
      }
    } catch (error) {
      toast.error(error.message || 'An unexpected error occurred.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleFetchingRoles = async () => {
    const token = await GetToken();
    const Api = `${Backend.auth}${Backend.roles}`;
    const header = {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    fetch(Api, { method: 'GET', headers: header })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setRoles(response.data);
        }
      })
      .catch((error) => {
        toast(error.message);
      });
  };
  const handleUpdatingUser = async (updatedData) => {
    setIsUpdating(true);
    const token = await GetToken();

    const Api = `${Backend.auth}${Backend.users}/${selectedRow?.id}`; // Update the selected user by ID
    const header = {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    const data = {
      name: updatedData.name,
      email: updatedData.email,
      phone: updatedData.phone,
      roles: updatedData.roles
    };

    try {
      const response = await fetch(Api, {
        method: 'PATCH',
        headers: header,
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Error updating user');
      }

      const responseData = await response.json();
      if (responseData.success) {
        toast.success('User updated successfully');
        setIsUpdating(false);
        handleFetchingUsers(); // Refresh the users list after successful update
        handleUpdateUserClose(); // Close the modal
      } else {
        setIsUpdating(false);
        toast.error('Failed to update user.');
      }
    } catch (error) {
      toast.error(error.message || 'An unexpected error occurred.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddUserClick = () => {
    setAdd(true);
    handleFetchingRoles();
  };

  const handleUserModalClose = () => {
    setAdd(false);
  };

  const handleUserUpdate = (updatedData) => {
    setSelectedRow(updatedData);
    setUpdate(true);
  };

  const handleUpdateUserClose = () => {
    setUpdate(false);
    setSelectedRow(null);
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      handleFetchingUsers();
    }, 800);
    return () => clearTimeout(debounceTimeout);
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
          <Grid item xs={10} md={12} marginBottom={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Search title="Search Employees" value={search} onChange={handleSearchFieldChange} filter={false} />
              <AddButton title="Add User" onPress={handleAddUserClick} />
            </Box>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              {loading ? (
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 4
                    }}
                  >
                    <ActivityIndicator size={20} />
                  </Grid>
                </Grid>
              ) : error ? (
                <ErrorPrompt title="Server Error" message="Unable to retrieve users." />
              ) : data.length === 0 ? (
                <Fallbacks
                  severity="evaluation"
                  title="User Not Found"
                  description="The list of users will be listed here."
                  sx={{ paddingTop: 6 }}
                />
              ) : (
                <TableContainer
                  sx={{
                    minHeight: '66dvh',
                    border: 0.4,
                    borderColor: theme.palette.divider,
                    borderRadius: 2
                  }}
                >
                  <Table aria-label="users table" sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>User Id</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Roles</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map(({ id, name, email, phone, username, roles, created_at }) => (
                        <TableRow
                          key={id}
                          sx={{
                            ':hover': {
                              backgroundColor: theme.palette.grey[50]
                            }
                          }}
                        >
                          <TableCell>{name}</TableCell>
                          <TableCell>{username}</TableCell>
                          <TableCell>{email}</TableCell>
                          <TableCell>{phone}</TableCell>
                          <TableCell>
                            {roles.map((role) => (
                              <Chip key={role.id} label={role.name} color="primary" variant="outlined" size="small" sx={{ margin: 0.5 }} />
                            ))}
                          </TableCell>
                          <TableCell>{format(new Date(created_at), 'yyyy-MM-dd')}</TableCell>
                          <TableCell
                            sx={{
                              ':hover': {
                                backgroundColor: theme.palette.grey[50]
                              }
                            }}
                          >
                            <DotMenu
                              onEdit={
                                hasEditPermission ? () => handleUserUpdate({ id, name, email, phone, username, roles, created_at }) : null
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                    component="div"
                    count={pagination.total}
                    page={pagination.page}
                    onPageChange={handleChangePage}
                    rowsPerPage={pagination.per_page}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableContainer>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ToastContainer />
      <AddUser add={add} roles={roles} onClose={handleUserModalClose} onSubmit={handleUserAddition} loading={isAdding} />
      {selectedRow && (
        <EditUser
          edit={update}
          isUpdating={isUpdating}
          userData={selectedRow}
          onClose={handleUpdateUserClose}
          onSubmit={handleUpdatingUser}
          roles={roles}
        />
      )}
    </PageContainer>
  );
};

export default Users;
