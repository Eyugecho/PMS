import React, { useEffect, useState } from 'react';
import { Box, Grid, IconButton, TablePagination, TextField, Typography, useTheme } from '@mui/material';
import PageContainer from 'ui-component/MainPage';
import Search from 'ui-component/search';
import DrogaCard from 'ui-component/cards/DrogaCard';
import DrogaButton from 'ui-component/buttons/DrogaButton';
import { IconChecklist, IconChevronLeft, IconChevronRight, IconMinus, IconPlus } from '@tabler/icons-react';
import ActivityIndicator from 'ui-component/indicators/ActivityIndicator';
import StatusMenu from 'views/employees/components/TaskStatusMenu';
import Backend from 'services/backend';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import CreateTask from './components/CreateTask';
import { gridSpacing } from 'store/constant';
import GetToken from 'utils/auth-token';
import { formatDate } from 'utils/function';
import ActivityChart from './components/ActivityChart';

const TaskStatus = [
  { label: 'Pending', value: 'pending' },
  { label: 'In-progrees', value: 'inprogress' },
  { label: 'Done', value: 'done' },
  { label: 'Blocked', value: 'blocked' },
  { label: 'Cancelled', value: 'cancelled' }
];

const Todo = () => {
  const theme = useTheme();
  const selectedYear = useSelector((state) => state.customization.selectedFiscalYear);

  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const [task, setTask] = useState({
    loading: true,
    taskList: [],
    openModal: false,
    submitting: false,
    date: '',
    picker: false,
    changing: false,
    search: '',
    deleting: false
  });

  const [pagination, setPagination] = useState({
    page: 0,
    per_page: 10,
    total: 0
  });

  const handleSearchFieldChange = (event) => {
    const value = event.target.value;
    setTask((prevTask) => ({ ...prevTask, search: value }));
  };

  const handleDateChange = (event) => {
    const value = event.target.value;
    setTask((prevTask) => ({ ...prevTask, date: value }));
  };

  const handleTodayClick = () => {
    setTask((prevTask) => ({ ...prevTask, picker: true }));
  };
  const handleChangePage = (event, newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination({ ...pagination, per_page: event.target.value });
    setPage(0);
  };

  const handleStatusChange = async (event, task) => {
    const value = event.target.value;

    setTask((prevTask) => ({ ...prevTask, changing: true }));
    const token = await GetToken('token');
    const Api = Backend.api + Backend.employeeTaskStatus + task.id;
    const header = {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    const data = {
      status: value
    };

    fetch(Api, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          handleEmployeeTask();
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setTask((prevTask) => ({ ...prevTask, changing: false }));
      });
  };

  const handleOpenCreateModal = () => {
    setTask((prevTask) => ({ ...prevTask, openModal: true }));
  };

  const handleCloseCreateModal = () => {
    setTask((prevTask) => ({ ...prevTask, openModal: false }));
  };

  const handleTaskCreation = async (value) => {
    setTask((prevTask) => ({ ...prevTask, submitting: true }));
    const token = await GetToken('token');
    const Api = Backend.api + Backend.employeeTasks;
    const header = {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    const data = {
      kpi_tracker_id: value?.plan_id,
      title: value?.task,
      description: value?.description
    };

    fetch(Api, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          toast.success(response.message);
          handleEmployeeTask();
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setTask((prevTask) => ({ ...prevTask, submitting: false, openModal: false }));
      });
  };

  const handleDeleteTask = async (id) => {
    setSelectedRow(id);
    setTask((prevTask) => ({ ...prevTask, deleting: true }));
    const token = await GetToken('token');
    const Api = Backend.api + Backend.employeeTasks + '/' + id;

    const headers = {
      Authorization: `Bearer` + token,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    fetch(Api, {
      method: 'DELETE',
      headers: headers
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          toast.success(response.data.message);
          handleEmployeeTask();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setTask((prevTask) => ({ ...prevTask, deleting: false }));
      });
  };

  const handleEmployeeTask = async () => {
    setTask((prevTask) => ({ ...prevTask, loading: true }));
    const token = await GetToken();
    const Api =
      Backend.api +
      Backend.employeeTasks +
      `?date=${task.date}&fiscal_year_id=${selectedYear?.id}&page=${pagination.page}&per_page=${pagination.per_page}`;

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
          setTask((prevTask) => ({ ...prevTask, taskList: response.data.data }));
          setPagination({ ...pagination, total: response.data.total });
          handleCloseCreateModal();
        } else {
          toast.warning(response.message);
        }
      })
      .catch((error) => {
        toast.warning(error.message);
      })
      .finally(() => {
        setTask((prevTask) => ({ ...prevTask, loading: false }));
      });
  };

  useEffect(() => {
    handleEmployeeTask();
  }, [task.date, pagination.page, pagination.per_page]);

  return (
    <PageContainer
      title="To do tasks"
      rightOption={
        <DrogaButton
          title="Create Task"
          variant="contained"
          icon={<IconPlus size="1.2rem" stroke="1.2" style={{ marginRight: 4 }} />}
          sx={{ boxShadow: 0 }}
          onPress={handleOpenCreateModal}
        />
      }
    >
      <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 3.8, px: 2 }}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={12} md={7} lg={8} xl={8}>
              <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 1.8 }}>
                <Search value={task.search} onChange={(event) => handleSearchFieldChange(event)} />

                <Box>
                  {task.picker ? (
                    <TextField
                      id="date"
                      name="date"
                      type="date"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            border: 'none'
                          }
                        },
                        ml: -2,
                        p: 0,
                        mt: -1
                      }}
                      value={task.date}
                      onChange={handleDateChange}
                    />
                  ) : (
                    <Typography
                      variant="body1"
                      mt={1}
                      onClick={() => handleTodayClick()}
                      sx={{ cursor: 'pointer', ':hover': { fontWeight: theme.typography.fontWeightMedium } }}
                    >
                      Today
                    </Typography>
                  )}
                </Box>
              </Grid>
              <DrogaCard sx={{ backgroundColor: 'transparent', border: 0, p: 0 }}>
                {task.loading ? (
                  <Box sx={{ padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={20} />
                  </Box>
                ) : task.taskList.length === 0 ? (
                  <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <IconChecklist size={80} color={theme.palette.grey[400]} />
                    <Typography variant="h4" sx={{ marginTop: 1.6 }}>
                      No task planned today
                    </Typography>
                    <Typography variant="caption">The list of created task will be listed here</Typography>
                  </Box>
                ) : (
                  <Box sx={{ marginTop: 3 }}>
                    {task.taskList?.map((item, index) => (
                      <DrogaCard
                        key={index}
                        sx={{
                          backgroundColor: theme.palette.grey[50],
                          marginTop: 1.6,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          py: 1
                        }}
                      >
                        <Box>
                          <Typography variant="body1">{item.plan?.kpi?.name}</Typography>
                          <Typography variant="h4" my={1}>
                            {item.title}
                          </Typography>

                          <Typography variant="subtitle2">{formatDate(item?.date).formattedDate}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <StatusMenu
                            name="status"
                            options={TaskStatus}
                            selected={item.status}
                            handleSelection={(event) => handleStatusChange(event, item)}
                          />
                          {task.deleting && selectedRow === item.id ? (
                            <ActivityIndicator size={16} />
                          ) : (
                            <IconButton onClick={() => handleDeleteTask(item.id)} title="remove">
                              <IconMinus size="1.2rem" stroke="1.6" color={theme.palette.error.main} />
                            </IconButton>
                          )}
                        </Box>
                      </DrogaCard>
                    ))}

                    {pagination.total > pagination.per_page && (
                      <TablePagination
                        component="div"
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        count={pagination.total}
                        rowsPerPage={pagination.per_page}
                        page={pagination.page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Tasks per page"
                      />
                    )}
                  </Box>
                )}
              </DrogaCard>
            </Grid>

            <Grid item xs={12} sm={12} md={5} lg={4} xl={4}>
              <DrogaCard>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h4">Activities in Septemeber </Typography>

                  <Box>
                    <IconButton sx={{ marginRight: 2 }}>
                      <IconChevronLeft size="1.4rem" stroke="1.8" />
                    </IconButton>
                    <IconButton>
                      <IconChevronRight size="1.4rem" stroke="1.8" />
                    </IconButton>
                  </Box>
                </Box>

                <ActivityChart />
              </DrogaCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <CreateTask
        open={task.openModal}
        handleCloseModal={handleCloseCreateModal}
        kpi={data}
        handleTaskSubmission={(values) => handleTaskCreation(values)}
        submitting={task.submitting}
      />
    </PageContainer>
  );
};

export default Todo;
