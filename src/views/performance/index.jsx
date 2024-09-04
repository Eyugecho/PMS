import React, { useEffect, useState } from 'react';
import { Box, Chip, Grid, TablePagination, Typography } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import Backend from 'services/backend';
import PageContainer from 'ui-component/MainPage';
import Search from 'ui-component/search';
import GetToken from 'utils/auth-token';
import ActivityIndicator from 'ui-component/indicators/ActivityIndicator';
import ErrorPrompt from 'utils/components/ErrorPrompt';
import Fallbacks from 'utils/components/Fallbacks';
import UnitPerformanceList from './components/UnitPerformanceList';
import GetFiscalYear from 'utils/components/GetFiscalYear';
import EmployeePerformanceList from './components/EmployeePerformanceList';

const Performance = () => {
  const selectedYear = useSelector((state) => state.customization.selectedFiscalYear);

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [tab, setTab] = useState('units');
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({
    page: 0,
    per_page: 10,
    total: 0
  });

  const [selectedUnit, setSelectedUnit] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [performance, setPerformance] = useState([]);

  const handleTabChange = (value) => {
    setTab(value);
    value !== tab && handleFetchingUnits(value);
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

  const handleFetchingUnits = async (value) => {
    setLoading(true);
    const token = await GetToken();
    const units = Backend.api + Backend.getActiveDepartments + `?page=${pagination.page}&per_page=${pagination.per_page}&search=${search}`;
    const employee = Backend.api + Backend.getActiveEmployees + `?page=${pagination.page}&per_page=${pagination.per_page}&search=${search}`;
    const Api = value == 'employees' ? employee : units;
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
          setPagination({ ...pagination, total: response.data.total });
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

  const handleViewPerformance = (selected) => {
    if (selected?.id === selectedUnit) {
      setSelectedUnit(null);
    } else {
      setSelectedUnit(selected?.id);
      handleFetchingPerformance(selected?.id);
    }
  };

  const handleFetchingPerformance = async (value) => {
    if (selectedYear) {
      setIsLoading(true);
      const token = await GetToken();
      const units = Backend.api + Backend.unitPerformance + `${value}?fiscal_year_id=${selectedYear?.id}`;
      const employee = Backend.api + Backend.employeePerformance + `${value}?fiscal_year_id=${selectedYear?.id}`;
      const Api = tab == 'employees' ? employee : units;
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
            setPerformance(response.data.performance);
            console.log(response.data.performance);
            
          } else {
            setPerformance([]);
            toast.warning(response.data.message);
          }
        })
        .catch((error) => {
          setPerformance([]);
          toast.warning(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      return <GetFiscalYear />;
    }
  };

  useEffect(() => {
    if (mounted) {
      selectedUnit && handleFetchingPerformance(selectedUnit);
    } else {
      setMounted(true);
    }
  }, [selectedYear]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      handleFetchingUnits(tab);
    }, 800);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [search]);

  useEffect(() => {
    if (mounted) {
      handleFetchingUnits(tab);
    } else {
      setMounted(true);
    }
  }, [pagination.page, pagination.per_page]);
  return (
    <PageContainer
      title="Performances"
      rightOption={
        <Box sx={{ display: 'flex', alignItems: 'center', marginY: 1 }}>
          {['units', 'employees'].map((item, index) => (
            <Chip
              key={index}
              label={item}
              sx={{ marginLeft: index > 0 && 2, cursor: 'pointer', textTransform: 'capitalize', paddingX: 2, paddingY: 0.4 }}
              color="primary"
              variant={tab === item ? 'filled' : 'outlined'}
              onClick={() => handleTabChange(item)}
            />
          ))}
        </Box>
      }
    >
      <Grid container>
        <Grid item xs={12} sx={{ padding: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingX: 1, marginY: 2 }}>
            <Search value={search} onChange={(event) => handleSearchFieldChange(event)} />
          </Box>

          {loading ? (
            <Grid container>
              <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
                <ActivityIndicator size={20} />
              </Grid>
            </Grid>
          ) : error ? (
            <ErrorPrompt title="Server Error" message={`Unable to retrive ${tab} performance `} />
          ) : data.length === 0 ? (
            <Fallbacks
              severity="units"
              title={`${tab} are not found`}
              description={`The list of ${tab} performance will be listed here`}
              sx={{ paddingTop: 6 }}
            />
          ) : tab === 'employees' ? (
            <EmployeePerformanceList
              employees={data}
              onView={(unit) => handleViewPerformance(unit)}
              selected={selectedUnit}
              isLoading={isLoading}
              performance={performance}
            />
          ) : (
            <UnitPerformanceList
              units={data}
              onView={(unit) => handleViewPerformance(unit)}
              selected={selectedUnit}
              isLoading={isLoading}
              performance={performance}
            />
          )}
        </Grid>
      </Grid>
      {!loading && data.length > 0 && (
        <TablePagination
          component="div"
          rowsPerPageOptions={[10, 25, 50, 100]}
          count={pagination.total}
          rowsPerPage={pagination.per_page}
          page={pagination.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </PageContainer>
  );
};

export default Performance;
