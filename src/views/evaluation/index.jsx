import { Box, Chip, CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Backend from 'services/backend';
import PageContainer from 'ui-component/MainPage';
import UnitTable from './components/UnitTable';
import { toast } from 'react-toastify';
import EmployeeTable from './components/EmployeeTable';

const Evaluations = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const [tab, setTab] = useState('units');

  const handleTabChange = (value) => {
    setTab(value);
    value !== tab && handleFetchingUnits(value);
  };

  const handleFetchingUnits = (value) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const units = Backend.api + Backend.getDepartments;
    const employee = Backend.api + Backend.getEmployees;
    const Api = value === 'employees' ? employee : units;
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
    handleFetchingUnits();

    return () => {};
  }, []);
  return (
    <PageContainer back={true} title="Evaluations">
      <Grid container>
        <Grid item xs={12} sx={{ padding: 2 }}>
          <Box sx={{ paddingX: 1, marginBottom: 2.4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginY: 1 }}>
              {['units', 'employees'].map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  sx={{ marginLeft: index > 0 && 2, cursor: 'pointer', textTransform: 'capitalize', paddingX: 2, paddingY: 0.4 }}
                  color="primary"
                  variant={tab === item ? 'filled' : 'outlined'}
                  onClick={() => handleTabChange(item)}
                >
                  {item}
                </Chip>
              ))}
            </Box>
          </Box>

          {loading ? (
            <Grid container>
              <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
                <CircularProgress size={20} />
              </Grid>
            </Grid>
          ) : tab === 'employees' ? (
            <EmployeeTable employees={data} />
          ) : (
            <UnitTable units={data} />
          )}
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Evaluations;
