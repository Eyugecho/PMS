import React, { useEffect, useState } from 'react';
import { Box, Grid, TablePagination, useTheme } from '@mui/material';
import { gridSpacing } from 'store/constant';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import PageContainer from 'ui-component/MainPage';
import Search from 'ui-component/search';
import ActivityIndicator from 'ui-component/indicators/ActivityIndicator';
import ErrorPrompt from 'utils/components/ErrorPrompt';
import Fallbacks from 'utils/components/Fallbacks';
import SelectorMenu from 'ui-component/menu/SelectorMenu';
import GetToken from 'utils/auth-token';
import Backend from 'services/backend';
import ApprovalTasks from './components/ApprovalTasks';
import Header from './components/Header';

const taskStatuses = [
  { label: 'All Status', value: '' },
  { label: 'Accepted', value: 'accepted' },
  { label: 'Approved', value: 'approved' },
  { label: 'Escalated', value: 'escalated' },
  { label: 'Open for discussion', value: 'open for discussion' },
  { label: 'Pending', value: 'pending' },
  { label: 'Rejected', value: 'rejected' }
];

const Approvals = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const bigDevice = useMediaQuery(theme.breakpoints.up('md'));
  const selectedYear = useSelector((state) => state.customization.selectedFiscalYear);

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({
    page: 0,
    per_page: 10,
    total: 0
  });

  const [taskTypes] = useState([
    { label: 'All Types', value: '' },
    { label: 'Planning', value: 'planning' },
    { label: 'Evaluation', value: 'evaluation' }
  ]);

  const [filter, setFilter] = useState({
    type: '',
    status: '',
    sort: false
  });

  const handleFiltering = (event) => {
    const { value, name } = event.target;
    setFilter({ ...filter, [name]: value });
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

  const handleFetchingTasks = async () => {
    setLoading(true);
    const token = await GetToken();
    const Api =
      Backend.api +
      Backend.getApprovalTasks +
      `?fiscal_year_id=${selectedYear?.id}&page=${pagination.page}&per_page=${pagination.per_page}&search=${search}&type=${filter.type}&status=${filter.status}`;

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
          setData(response.data);
          // setPagination({ ...pagination, total: response.data.total });
          setError(false);
        } else {
          toast.warning(response.message);
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
      handleFetchingTasks();
    }, 500);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [search]);

  useEffect(() => {
    if (mounted) {
      handleFetchingTasks();
    } else {
      setMounted(true);
    }
  }, [selectedYear, pagination.page, pagination.per_page, filter]);

  return (
    <PageContainer title="Approval Tasks">
      <Grid container padding={2.4}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing} marginTop={0.2}>
            <Grid item xs={12}>
              <Box sx={{ minHeight: 400 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3, px: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Search value={search} onChange={(event) => handleSearchFieldChange(event)} />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ marginRight: 2 }}>
                      <SelectorMenu name="type" options={taskTypes} selected={filter.type} handleSelection={handleFiltering} />
                    </Box>
                    <SelectorMenu name="status" options={taskStatuses} selected={filter.status} handleSelection={handleFiltering} />
                  </Box>
                </Box>
                <Grid container>
                  {loading ? (
                    <Grid container>
                      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
                        <ActivityIndicator size={20} />
                      </Grid>
                    </Grid>
                  ) : error ? (
                    <ErrorPrompt title="Server Error" message={`There is error retriving tasks`} />
                  ) : data.length === 0 ? (
                    <Fallbacks
                      severity="tasks"
                      title={`Tasks are not found`}
                      description={`The list of task will be listed here`}
                      sx={{ paddingTop: 6 }}
                    />
                  ) : (
                    <Grid container>
                      <Grid item xs={12}>
                        {bigDevice && <Header levelTwo={true} />}
                        {data.map((item, index) => (
                          <ApprovalTasks
                            key={index}
                            profile={item.name}
                            taskType={item.task_name}
                            name={item.user_name}
                            position={item.user_name}
                            unit={item.user_unit_name}
                            createdOn={format(new Date(item?.created_at), 'dd-MM-yyyy')}
                            levelOne={item.status}
                            levelTwo={item.status}
                            bigDevice={bigDevice}
                            onPress={() => navigate('/approval/view', { state: { id: item.id } })}
                          />
                        ))}
                      </Grid>
                    </Grid>
                  )}
                </Grid>
                {!loading && pagination.total > pagination.per_page && (
                  <TablePagination
                    component="div"
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    count={pagination.total}
                    rowsPerPage={pagination.per_page}
                    page={pagination.page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Items per page"
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <ToastContainer />
    </PageContainer>
  );
};

export default Approvals;
