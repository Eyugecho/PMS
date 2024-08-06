import React, { useEffect, useState } from 'react';
import PageContainer from 'ui-component/MainPage';
import Search from 'ui-component/search';
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';
import Backend from 'services/backend';
import { formatDate } from 'utils/function';
import { AddEmployee } from './components/AddEmployee';
import { IconMenu } from 'ui-component/menu/IconMenu';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Employees = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    rowLength: 15
  });

  const [add, setAdd] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddEmployeeModal = () => {
    setAdd(true);
  };

  const handleAddEmployeeClose = () => {
    setAdd(false);
  };

  const handleEmployeeAddition = (value) => {
    setIsAdding(true);
    const token = localStorage.getItem('token');
    const Api = Backend.api + Backend.employees;
    const header = {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    const data = {
      name: value?.name,
      gender: value?.gender,
      email: value?.email,
      phone: value?.phone,
      position: value?.position,
      units: value?.unit,
      start_date: value?.start_date
    };

    fetch(Api, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setIsAdding(false);
          handleAddEmployeeModal();
          toast.success(response.data.message);
        } else {
          setIsAdding(false);
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
        setIsAdding(false);
      });
  };

  const handleRowClick = (index, unitId) => {
    if (selectedRow === index) {
      setSelectedRow(null);
    } else {
      setSelectedRow(index);
    }
  };

  const handleFetchingEmployees = (value) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const Api = Backend.api + Backend.employees;
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
          setLoading(false);
          setError(false);
        } else {
          setLoading(false);
          setError(false);
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        toast.warning(error.message);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    handleFetchingEmployees();

    return () => {};
  }, []);

  return (
    <PageContainer title="Employees">
      <Grid container padding={2}>
        <Grid item xs={12}>
          <Grid xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingY: 3 }}>
            <Search />

            <Button variant="contained" color="primary" sx={{ paddingX: 2 }} onClick={() => handleAddEmployeeModal()}>
              Add Employees
            </Button>
          </Grid>

          <TableContainer component={Paper} sx={{ minHeight: '66dvh', border: 0.4, borderColor: theme.palette.grey[300], borderRadius: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="Organization unit table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Starting date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
                    <TableCell colSpan={7} sx={{ border: 0 }}>
                      <CircularProgress size={20} />
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow sx={{ padding: 4 }}>
                    <TableCell colSpan={7} sx={{ border: 0 }}>
                      <Typography variant="body2">There is error fetching the Employees</Typography>
                    </TableCell>
                  </TableRow>
                ) : data.length === 0 ? (
                  <TableRow sx={{ padding: 4 }}>
                    <TableCell colSpan={7} sx={{ border: 0 }}>
                      <Typography variant="body2">Employees not found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.map((employee, index) => (
                    <>
                      <TableRow
                        key={index}
                        sx={{
                          backgroundColor: selectedRow == index ? theme.palette.grey[100] : theme.palette.background.default,
                          ':hover': {
                            backgroundColor: theme.palette.grey[100],
                            color: theme.palette.background.default,
                            cursor: 'pointer',
                            borderRadius: 2
                          }
                        }}
                        onClick={() => navigate('/employees/view', { state: employee })}
                      >
                        <TableCell sx={{ display: 'flex', alignItems: 'center', border: 0 }}>
                          <Typography variant="subtitle1">{employee?.user?.name}</Typography>
                        </TableCell>
                        <TableCell sx={{ border: 0 }}>{employee?.gender ? employee?.gender : 'N/A'}</TableCell>
                        <TableCell sx={{ border: 0 }}>{employee?.user?.email}</TableCell>
                        <TableCell sx={{ border: 0 }}>{employee?.user?.phone ? employee?.user?.phone : 'N/A'}</TableCell>
                        <TableCell sx={{ border: 0 }}>{employee?.position ? employee?.position : 'N/A'}</TableCell>
                        <TableCell sx={{ border: 0 }}>{employee?.user?.roles?.name ? employee?.user?.roles?.name : 'N/A'}</TableCell>
                        <TableCell sx={{ border: 0 }}>{formatDate(employee?.created_at)?.formattedDate}</TableCell>
                        <TableCell sx={{ border: 0 }}>
                          <IconMenu />
                        </TableCell>
                      </TableRow>
                    </>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <AddEmployee
        add={add}
        isAdding={isAdding}
        onClose={handleAddEmployeeClose}
        handleSubmission={(value) => handleEmployeeAddition(value)}
      />

      <ToastContainer />
    </PageContainer>
  );
};

export default Employees;
