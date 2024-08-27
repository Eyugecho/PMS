import React, { useEffect, useState } from 'react';
import { Box, Grid, IconButton, TablePagination, Typography } from '@mui/material';
import { gridSpacing } from 'store/constant';
import { toast } from 'react-toastify';
import { IconSortAscending, IconSortDescending } from '@tabler/icons-react';
import PageContainer from 'ui-component/MainPage';
import DrogaCard from 'ui-component/cards/DrogaCard';
import Search from 'ui-component/search';
import TaskCard from './components/TaskCard';
import ActivityIndicator from 'ui-component/indicators/ActivityIndicator';
import ErrorPrompt from 'utils/components/ErrorPrompt';
import Fallbacks from 'utils/components/Fallbacks';
import GetToken from 'utils/auth-token';
import Backend from 'services/backend';
import SelectorMenu from 'ui-component/menu/SelectorMenu';
import GetFiscalYear from 'utils/components/GetFiscalYear';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const taskTypes = [
  { label: 'All Types', value: '' },
  { label: 'Planning', value: 'planning' },
  { label: 'Evaluation', value: 'evaluation' }
];

const taskStatuses = [
  { label: 'All Status', value: '' },
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Amended', value: 'amended' }
];

const Tasks = () => {
  const selectedYear = useSelector((state) => state.customization.selectedFiscalYear);
  const navigate = useNavigate();

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

  const [filter, setFilter] = useState({
    type: '',
    status: 'pending',
    sort: false
  });

  const handleFiltering = (event) => {
    const { value, name } = event.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleSorting = () => {
    setFilter({ ...filter, sort: !filter.sort });
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
    if (selectedYear) {
      setLoading(true);
      const token = await GetToken();
      const Api =
        Backend.api +
        Backend.getActiveEmployees +
        `?page=${pagination.page}&per_page=${pagination.per_page}&search=${search}&type=${filter.type}&status${filter.status}&sort=${filter.sort}&?fiscal_year_id=${selectedYear?.id}`;

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
    } else {
      <GetFiscalYear />;
    }
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      handleFetchingTasks();
    }, 800);

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
    <PageContainer title="Tasks">
      <Grid container padding={2.4}>
        <Grid item xs={12} marginTop={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <Search value={search} onChange={(event) => handleSearchFieldChange(event)} />
        </Grid>

        <Grid container spacing={gridSpacing} marginTop={0.2}>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <DrogaCard sx={{ minHeight: 400 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3, px: 2 }}>
                <SelectorMenu name="type" options={taskTypes} selected={filter.type} handleSelection={handleFiltering} />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <SelectorMenu name="status" options={taskStatuses} selected={filter.status} handleSelection={handleFiltering} />
                  <IconButton
                    sx={{ marginLeft: 2 }}
                    onClick={() => handleSorting()}
                    title={filter.sort ? 'Ascending order' : 'Descending order'}
                  >
                    {filter.sort ? <IconSortAscending size="1.2rem" /> : <IconSortDescending size="1.2rem" />}
                  </IconButton>
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
                  <Grid item xs={12} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <TaskCard
                      type="planning"
                      status="approved"
                      title="Self Development"
                      description="Yemisirach is waiting for your approval, don't forget to reflect on her task"
                      image=""
                      username="Yemisirach Abebe"
                      position="Pharmacist"
                      step={3}
                      date="14/08/2024"
                      onPress={() => navigate('/task/detail')}
                    />
                    <TaskCard
                      type="planning"
                      status="pending"
                      title="Self Development"
                      description="Yemisirach is waiting for your approval, don't forget to reflect on her task"
                      image=""
                      username="Yemisirach Abebe"
                      position="Pharmacist"
                      step={4}
                      date="14/08/2024"
                    />
                  </Grid>
                )}
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
                  labelRowsPerPage="Items per page"
                />
              )}
            </DrogaCard>
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <DrogaCard>
              <Typography variant="h4">Tasks Summary</Typography>
            </DrogaCard>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Tasks;
