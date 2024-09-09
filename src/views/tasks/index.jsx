import React, { useEffect, useState } from 'react';
import { Box, Divider, Grid, IconButton, TablePagination, TextField, Typography, useTheme } from '@mui/material';
import { gridSpacing } from 'store/constant';
import { toast, ToastContainer } from 'react-toastify';
import { IconDetails, IconSortAscending, IconSortDescending } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { formatDate } from 'utils/function';
import PageContainer from 'ui-component/MainPage';
import DrogaCard from 'ui-component/cards/DrogaCard';
import Search from 'ui-component/search';
import TaskCard from './components/TaskCard';
import ActivityIndicator from 'ui-component/indicators/ActivityIndicator';
import ErrorPrompt from 'utils/components/ErrorPrompt';
import Fallbacks from 'utils/components/Fallbacks';
import SelectorMenu from 'ui-component/menu/SelectorMenu';
import GetFiscalYear from 'utils/components/GetFiscalYear';
import DrogaButton from 'ui-component/buttons/DrogaButton';
import ApprovalWorkflow from 'services/workflow';
import GetToken from 'utils/auth-token';
import Backend from 'services/backend';
import PlanCard from 'views/planning/components/PlanCard';
import DrogaModal from 'ui-component/modal/DrogaModal';
import DrogaFormModal from 'ui-component/modal/DrogaFormModal';
import { IconClipboardList } from '@tabler/icons-react';
import EmployeeProfile from './components/EmployeeProfile';
import UnitProfile from './components/UnitProfile';
import { borderTopColor } from '@mui/system';
import EvaluationCard from 'views/evaluation/components/EvaluationCard';

const taskStatuses = [
  { label: 'All Status', value: '' },
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Amended', value: 'amended' }
];

const Tasks = () => {
  const theme = useTheme();
  const selectedYear = useSelector((state) => state.customization.selectedFiscalYear);
  const user = useSelector((state) => state.user.user);

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

  const [workflows] = useState([{ label: 'All Types', value: '' }]); //list of the app workflows
  const [filter, setFilter] = useState({
    type: '',
    status: '',
    sort: false
  });
  const [selected, setSelected] = useState();
  const handleFiltering = (event) => {
    const { value, name } = event.target;
    setFilter({ ...filter, [name]: value });
  };

  //task detail related code goes below
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detailData, setDetailData] = useState([]);

  const handleTaskDetail = (task) => {
    if (task?.data?.id) {
      setSelected(task);
    } else {
      toast.error('There is error fetching task detail');
    }
  };

  // approve, ammend and reject task action button click is handled below
  const [actionType, setActionType] = useState({
    type: '',
    comment: '',
    openModal: false,
    submitting: false
  });

  const handleTaskAction = (action) => {
    setActionType({ ...actionType, type: action, openModal: true });
  };

  const handleCommentChange = (event) => {
    const value = event.target.value;

    setActionType({
      ...actionType,
      comment: value
    });
  };

  const handleCloseModal = () => {
    setActionType({ ...actionType, openModal: false });
  };

  const handleActionSubmission = (event) => {
    event.preventDefault();

    if (selected && user && actionType.type) {
      setActionType({ ...actionType, submitting: true });
      const Api = ApprovalWorkflow.api + ApprovalWorkflow.taskAction;
      const header = {
        Authorization: `${ApprovalWorkflow.API_KEY}`,
        accept: 'application/json',
        'Content-Type': 'application/json'
      };

      const userRoles = [];
      user?.roles?.forEach((role) => userRoles.push({ role_id: role.uuid, role_name: role.name }));

      const data = {
        result: actionType.type,
        comments: actionType.comment,
        roles: userRoles,
        task_id: selected?.id,
        user_id: user?.id
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
          } else {
            toast.warning(response.message);
          }
        })
        .catch((error) => {
          toast.warning(error.message);
        })
        .finally(() => {
          setActionType({ ...actionType, submitting: false });
        });
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

  const setupWorkflowState = (workflow) => {
    workflows.length < 2 && workflow.forEach((workflow) => workflows.push({ label: workflow.name, value: workflow.id }));
  };

  const handleFetchingWorkflows = async () => {
    const Api = ApprovalWorkflow.api + ApprovalWorkflow.id + '/workflows';
    const header = {
      Authorization: `${ApprovalWorkflow.API_KEY}`,
      accept: 'application/json'
    };

    fetch(Api, {
      method: 'GET',
      headers: header
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          response?.data?.applicationWorkflows?.workflows && setupWorkflowState(response?.data?.applicationWorkflows?.workflows);
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFetchingTasks = async () => {
    if (selectedYear) {
      setLoading(true);
      const Api =
        ApprovalWorkflow.api +
        ApprovalWorkflow.tasks +
        `?page=${pagination.page}&per_page=${pagination.per_page}&search=${search}&type=${filter.type}&status=${filter.status}`;

      const header = {
        Authorization: `${ApprovalWorkflow.API_KEY}`,
        accept: 'application/json',
        'Content-Type': 'application/json'
      };

      const userRoles = [];
      user?.roles?.forEach((role) => userRoles.push({ role_id: role.uuid, role_name: role.name }));

      const data = {
        user_id: user?.id,
        roles: userRoles
      };

      fetch(Api, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            setData(response.data.tasks);
            setPagination({ ...pagination, total: response.data.total });
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
    } else {
      <GetFiscalYear />;
    }
  };

  const handleFetchingTaskDetail = async (task) => {
    if (task?.data?.id) {
      setSelected(task);

      setLoadingDetail(true);

      const token = await GetToken();
      const plan = Backend.api + Backend.showPlan + `/${task?.data?.id}`;
      const evaluation = Backend.api + Backend.showTarget + `${task?.data?.id}`;
      const Api = task.workflow?.name === 'Evaluation' ? evaluation : plan;

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
            setDetailData(response.data);
          } else {
            setDetailData([]);
            toast.warning(response.message);
          }
        })
        .catch((error) => {
          toast.warning(error.message);
        })
        .finally(() => {
          setLoadingDetail(false);
        });
    } else {
      toast.error('There is error fetching task detail');
    }
  };

  useEffect(() => {
    handleFetchingWorkflows();
  }, []);

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
        <Grid container spacing={gridSpacing} marginTop={0.2}>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <Box sx={{ minHeight: 400 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3, px: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Search value={search} onChange={(event) => handleSearchFieldChange(event)} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ marginRight: 2 }}>
                    <SelectorMenu name="type" options={workflows} selected={filter.type} handleSelection={handleFiltering} />
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
                  <Grid item xs={12} sm={12} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {data?.map((task, index) => (
                      <TaskCard
                        key={index}
                        type={task.workflow.name}
                        status={task.status}
                        title={task.title}
                        description={task.description}
                        step={task.step}
                        date={formatDate(task.created_at).formattedDate}
                        onPress={() => handleFetchingTaskDetail(task)}
                      />
                    ))}
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
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <DrogaCard sx={{ minHeight: 240 }}>
              <Typography variant="h4">Task Details</Typography>

              {selected && detailData ? (
                <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {loadingDetail ? (
                    <Grid container>
                      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
                        <ActivityIndicator size={20} />
                      </Grid>
                    </Grid>
                  ) : error ? (
                    <ErrorPrompt title="Server Error" message={`There is error retriving task detail`} />
                  ) : detailData.length === 0 ? (
                    <Fallbacks
                      severity="tasks"
                      title={`Tasks details is not found`}
                      description={`The detail of task is shown here`}
                      sx={{ paddingTop: 6 }}
                    />
                  ) : selected?.workflow?.name === 'Planning' ? (
                    <Grid item xs={12}>
                      {detailData?.employee && (
                        <EmployeeProfile name={detailData?.employee?.user?.name} position={detailData?.employee?.position} />
                      )}
                      {detailData?.unit && (
                        <UnitProfile
                          name={detailData?.unit?.name}
                          managerName={detailData?.unit?.manager?.user?.name}
                          position={detailData?.unit?.manager?.position}
                        />
                      )}
                      <Divider sx={{ borderColor: theme.palette.divider, my: 1.4 }} />

                      {detailData?.target && <PlanCard plan={{ ...detailData }} sx={{ border: 0, p: 0.4, my: 3 }} />}
                      {selected?.status === 'pending' && (
                        <React.Fragment>
                          <DrogaButton
                            title="Approve"
                            variant="contained"
                            sx={{
                              backgroundColor: 'green',
                              ':hover': { backgroundColor: 'green' },
                              width: '100%',
                              boxShadow: 0,
                              p: 1.4,
                              marginTop: 2
                            }}
                            onPress={() => handleTaskAction('approved')}
                          />
                          <Grid container mt={1} spacing={gridSpacing}>
                            <Grid item xs={12}>
                              <DrogaButton
                                title="Amend"
                                variant="text"
                                sx={{ width: '100%' }}
                                onPress={() => handleTaskAction('amended')}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <DrogaButton
                                title="Reject"
                                variant="text"
                                color="error"
                                sx={{ width: '100%' }}
                                onPress={() => handleTaskAction('rejected')}
                              />
                            </Grid>
                          </Grid>
                        </React.Fragment>
                      )}
                    </Grid>
                  ) : selected.workflow?.name === 'Evaluation' ? (
                    <Grid item xs={12}>
                      {detailData?.kpi_tracker?.employee && (
                        <EmployeeProfile
                          name={detailData?.kpi_tracker?.employee?.user?.name}
                          position={detailData?.kpi_tracker?.employee?.position}
                        />
                      )}
                      {detailData?.kpi_tracker?.unit && (
                        <UnitProfile
                          name={detailData?.kpi_tracker?.unit?.name}
                          managerName={detailData?.kpi_tracker?.unit?.manager?.user?.name}
                          position={detailData?.kpi_tracker?.unit?.manager?.position}
                        />
                      )}
                      <Divider sx={{ borderColor: theme.palette.divider, my: 1.4 }} />
                      {detailData && <EvaluationCard evaluation={{ ...detailData }} sx={{ border: 0, p: 0.4, my: 3 }} />}

                      {selected?.status === 'pending' && (
                        <React.Fragment>
                          <DrogaButton
                            title="Approve"
                            variant="contained"
                            sx={{
                              backgroundColor: 'green',
                              ':hover': { backgroundColor: 'green' },
                              width: '100%',
                              boxShadow: 0,
                              p: 1.4,
                              marginTop: 2
                            }}
                            onPress={() => handleTaskAction('approved')}
                          />
                          <Grid container mt={1} spacing={gridSpacing}>
                            <Grid item xs={12}>
                              <DrogaButton
                                title="Amend"
                                variant="text"
                                sx={{ width: '100%' }}
                                onPress={() => handleTaskAction('amended')}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <DrogaButton
                                title="Reject"
                                variant="text"
                                color="error"
                                sx={{ width: '100%' }}
                                onPress={() => handleTaskAction('rejected')}
                              />
                            </Grid>
                          </Grid>
                        </React.Fragment>
                      )}
                    </Grid>
                  ) : (
                    <Typography variant="subtitle1"> The task does not have categorized type</Typography>
                  )}
                </Grid>
              ) : (
                <Box sx={{ margin: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <IconClipboardList size="3rem" stroke="1.2" color="grey" />
                  <Typography variant="h4" color={theme.palette.text.primary} mt={1.6}>
                    Selected task detail view
                  </Typography>

                  <Typography variant="subtitle2">The detail of task you choosed shown here</Typography>
                </Box>
              )}
            </DrogaCard>
          </Grid>
        </Grid>
      </Grid>
      <DrogaFormModal
        open={actionType.openModal}
        title="Remark"
        handleClose={handleCloseModal}
        onCancel={handleCloseModal}
        onSubmit={handleActionSubmission}
        submitting={actionType.submitting}
      >
        <TextField
          multiline
          minRows={5}
          name="remark"
          value={actionType.comment}
          onChange={handleCommentChange}
          placeholder="Write remark here"
          variant="standard"
          fullWidth
        />
      </DrogaFormModal>
      <ToastContainer />
    </PageContainer>
  );
};

export default Tasks;
