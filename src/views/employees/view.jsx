import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, IconButton, InputAdornment, TablePagination, TextField, Typography, useTheme } from '@mui/material';
import PageContainer from 'ui-component/MainPage';
import {
  IconActivity,
  IconCalendar,
  IconChartDonut,
  IconChecklist,
  IconDotsVertical,
  IconGenderMale,
  IconMail,
  IconMinus,
  IconPhone,
  IconPlus,
  IconTargetArrow,
  IconTie,
  IconUser
} from '@tabler/icons-react';
import { useLocation } from 'react-router-dom';
import { DetailInfo } from './components/DetailInfo';
import { formatDate } from 'utils/function';
import { gridSpacing } from 'store/constant';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import Backend from 'services/backend';
import PlanTable from 'views/evaluation/components/PlanTable';
import DrogaCard from 'ui-component/cards/DrogaCard';
import ActivityIndicator from 'ui-component/indicators/ActivityIndicator';
import Fallbacks from 'utils/components/Fallbacks';
import PerformanceCard from 'ui-component/cards/PerformanceCard';
import GetToken from 'utils/auth-token';
import GetFiscalYear from 'utils/components/GetFiscalYear';
import PerKPI from 'ui-component/performance/PerKPI';
import DrogaButton from 'ui-component/buttons/DrogaButton';
import CreateTask from './components/CreateTask';
import StatusMenu from './components/TaskStatusMenu';

const TaskStatus = [
  { label: 'Pending', value: 'pending' },
  { label: 'In-progrees', value: 'inprogress' },
  { label: 'Done', value: 'done' },
  { label: 'Blocked', value: 'blocked' },
  { label: 'Cancelled', value: 'cancelled' }
];

const ViewEmployee = () => {
  const { state } = useLocation();
  const theme = useTheme();
  const selectedYear = useSelector((state) => state.customization.selectedFiscalYear);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [performance, setPerformance] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [task, setTask] = useState({
    loading: true,
    taskList: [],
    openModal: false,
    submitting: false,
    date: '',
    picker: false,
    changing: false
  });
  const [pagination, setPagination] = useState({
    page: 0,
    per_page: 10,
    total: 0
  });

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
    setDeleting(true);
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
        setDeleting(false);
      });
  };

  const handleEmployeeTask = async () => {
    setTask((prevTask) => ({ ...prevTask, loading: true }));
    const token = await GetToken();
    const Api =
      Backend.api +
      Backend.getEmployeeTask +
      state?.id +
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

  useEffect(() => {
    const handleFetchingPerformance = async () => {
      if (selectedYear) {
        setIsLoading(true);
        const token = await GetToken();
        const Api = Backend.api + Backend.employeePerformance + `${state?.id}?fiscal_year_id=${selectedYear?.id}`;

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

    handleFetchingPerformance();
  }, [selectedYear]);

  useEffect(() => {
    const handleFetchingEmployees = async () => {
      setLoading(true);
      const token = await GetToken();
      const Api = Backend.api + Backend.getEmployeeTarget + state?.id;
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
    handleFetchingEmployees();

    return () => {};
  }, [state?.id]);

  return (
    <PageContainer back={true} title="Employee Details">
      <Grid container sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }} spacing={gridSpacing}>
        <Grid item xs={12}>
          <DrogaCard>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 1,
                paddingLeft: 2,
                borderBottom: 0.4,
                borderColor: theme.palette.divider
              }}
            >
              <Typography variant="h4">Employee KPI's and Targets</Typography>
            </Box>

            <Box>
              {loading ? (
                <Box sx={{ padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CircularProgress size={20} />
                </Box>
              ) : error ? (
                <Box sx={{ padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body2">There is error fetching the Employees</Typography>
                </Box>
              ) : data.length === 0 ? (
                <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <IconTargetArrow size={80} color={theme.palette.grey[400]} />
                  <Typography variant="h4" sx={{ marginTop: 1.6 }}>
                    Employee target is not found
                  </Typography>
                  <Typography variant="caption">The list of assigned target will be listed here</Typography>
                </Box>
              ) : (
                <PlanTable plans={data} page="employee" />
              )}
            </Box>
          </DrogaCard>
        </Grid>
      </Grid>

      <Grid container sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: 2 }} spacing={gridSpacing}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <DrogaCard>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: 0.4,
                borderColor: theme.palette.divider,
                paddingBottom: 1.8
              }}
            >
              <Typography variant="h4">Employee Details</Typography>
            </Box>

            <Box>
              {state?.user && <DetailInfo label={'Full name'} info={state?.user?.name} icon={<IconUser size={22} />} />}
              {state?.gender && <DetailInfo label={'Gender'} info={state?.gender} icon={<IconGenderMale size={22} />} />}
              {state?.user?.email && <DetailInfo label={'Email'} info={state?.user?.email} icon={<IconMail size={22} />} />}
              {state?.user?.phone && <DetailInfo label={'Phone'} info={state?.user?.phone} icon={<IconPhone size={22} />} />}

              {state?.user?.role && <DetailInfo label={'Role'} info={state?.user?.role} icon={<IconTie size={22} />} />}
              {state?.position && <DetailInfo label={'Position'} info={state?.position} icon={<IconChartDonut size={22} />} />}

              {state?.user?.created_at && (
                <DetailInfo
                  label={'Start date'}
                  info={formatDate(state?.user?.created_at).formattedDate}
                  icon={<IconCalendar size={22} />}
                />
              )}
            </Box>
          </DrogaCard>

          <DrogaCard sx={{ mt: 2 }}>
            <Typography variant="h4">Overall Performance</Typography>

            <Grid container>
              <Grid item xs={12}>
                {isLoading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
                    <ActivityIndicator size={20} />
                  </Box>
                ) : performance.length > 0 ? (
                  <Grid container sx={{ marginTop: 2, borderTop: 0.8, borderColor: theme.palette.divider, padding: 1 }}>
                    <Grid item xs={12} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                      {performance?.map((period, index) => {
                        const periodName = Object.keys(period)[0];
                        const [text, number] = periodName.match(/[a-zA-Z]+|[0-9]+/g);
                        const formattedQuarterName = `${text} ${number}`;

                        return (
                          <PerformanceCard
                            key={index}
                            isEvaluated={period[periodName].is_evaluated}
                            performance={period[periodName]?.overall}
                            frequency={formattedQuarterName}
                          />
                        );
                      })}
                    </Grid>
                  </Grid>
                ) : (
                  <Fallbacks
                    severity="performance"
                    title={`No employee performance report`}
                    description={`The employee performances will be listed here`}
                    sx={{ paddingTop: 2 }}
                  />
                )}
              </Grid>
            </Grid>
          </DrogaCard>

          <DrogaCard sx={{ mt: 2 }}>
            <Typography variant="h4">Per KPI performance</Typography>

            <PerKPI isLoading={isLoading} performance={performance} />
          </DrogaCard>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <DrogaCard>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between'
              }}
            >
              <Box>
                <Typography variant="h4">Daily Activities</Typography>

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
              <DrogaButton
                title="Create Task"
                variant="text"
                icon={<IconPlus size="1.2rem" stroke="1.2" style={{ marginRight: 4 }} />}
                sx={{ boxShadow: 0, backgroundColor: theme.palette.grey[50] }}
                onPress={handleOpenCreateModal}
                disabled={data.length === 0}
              />
            </Box>

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
                      {deleting && selectedRow === item.id ? (
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

export default ViewEmployee;
