import React, { useEffect, useState } from 'react';
import { Alert, Box, Grid, IconButton, TablePagination, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CreatePlan } from './components/CreatePlan';
import { toast, ToastContainer } from 'react-toastify';
import { gridSpacing } from 'store/constant';
import { UpdatePlan } from './components/UpdatePlan';
import { useKPI } from 'context/KPIProvider';
import { Storage } from 'configration/storage';
import { useSelector } from 'react-redux';
import Backend from 'services/backend';
import PageContainer from 'ui-component/MainPage';
import AddButton from 'ui-component/buttons/AddButton';
import PlanCard from './components/PlanCard';
import ActivityIndicator from 'ui-component/indicators/ActivityIndicator';
import ErrorPrompt from 'utils/components/ErrorPrompt';
import Fallbacks from 'utils/components/Fallbacks';
import DeletePrompt from 'ui-component/modal/DeletePrompt';
import GetToken from 'utils/auth-token';
import axios from 'axios';
import Search from 'ui-component/search';
import SelectorMenu from 'ui-component/menu/SelectorMenu';
import GetFiscalYear from 'utils/components/GetFiscalYear';
import IsEmployee from 'utils/is-employee';
import hasPermission from 'utils/auth/hasPermission';
import DrogaCard from 'ui-component/cards/DrogaCard';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import PlanStatusNotice from './components/PlanStatusNotice';

const Planning = () => {
  const theme = useTheme();
  const selectedYear = useSelector((state) => state.customization.selectedFiscalYear);
  const navigate = useNavigate();
  const isEmployee = IsEmployee();
  const { handleUpdatePlan } = useKPI();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [selectedPerspective, setSelectedPerspectve] = useState(0);
  const [create, setCreate] = useState(false);

  const [canPlan, setCanPlan] = useState(false);
  const [canDistribute, setCanDistribute] = useState(false);
  const [canChangeStatus, setCanChangeStatus] = useState(false);
  const [planStatus, setPlanStatus] = useState('');

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [update, setUpdate] = useState(false);
  const [selectedPlanID, setSelectedPlanID] = useState(null);
  const [deletePlan, setDeletePlan] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState('');
  const [changingStatus, setchangingStatus] = useState(false);
  const [perspectiveTypes] = useState([{ label: 'All Perspectives', value: '' }]);
  const [measuringUnit] = useState([{ label: 'All Measuring Units', value: '' }]);
  const [filter, setFilter] = useState({
    m_unit: '',
    perspective: ''
  });
  const [pagination, setPagination] = useState({
    page: 0,
    per_page: 10,
    total: 0
  });

  const handleSearchFieldChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    setPagination({ ...pagination, page: 0 });
  };
  const handlePerspectiveCollapsing = (index) => {
    if (selectedPerspective === index) {
      setSelectedPerspectve(null);
    } else {
      setSelectedPerspectve(index);
    }
  };
  const handleFiltering = (event) => {
    const { value, name } = event.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleChangePage = (event, newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination({ ...pagination, per_page: event.target.value, page: 0 });
  };

  const handleCreatePlan = () => {
    setCreate(true);
  };

  const handleCreateModalClose = () => {
    setCreate(false);
  };

  const handleSettingUP = (selected) => {
    const newKPI = {
      id: selected?.kpi_id,
      f_name: selected?.frequency?.name,
      f_value: selected?.frequency?.value,
      frequency_id: selected?.frequency_id,
      mu: selected?.kpi?.measuring_unit?.name,
      name: selected?.kpi?.name,
      total_target: selected?.total_target,
      weight: selected?.weight
    };

    const targets = selected?.target?.map((prevTarget) => ({ period_id: prevTarget?.period_id, target: prevTarget?.target }));
    handleUpdatePlan([{ ...newKPI, targets: targets }]);
    Storage.setItem('selectFiscal', JSON.stringify({ id: selected?.fiscal_year_id, year: '' }));

    setSelectedPlanID(selected?.id);
    setUpdate(true);
  };

  const handleUpdatingPlan = (plan) => {
    handleSettingUP(plan);
  };

  const handleUpdateModalClose = () => {
    handleUpdatePlan([]);
    setUpdate(false);
    setSelectedPlanID(null);
  };

  const handleDeletePlan = (data) => {
    setSelectedPlan(data);
    setDeletePlan(true);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const token = await GetToken();
      const Api = Backend.api + Backend.deletePlan + `/${selectedPlan?.id}`;
      const response = await axios.delete(Api, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setDeletePlan(false);
        toast.success(response.data.data.message);
        handleFetchingPlan();
      } else {
        toast.error(response.data.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleting(false);
    }
  };

  //Plan fetching reated function goes down here
  const handleSettingUpPerspectiveFilter = (perspective) => {
    perspectiveTypes.length < 2 &&
      perspective.forEach((perspective) => perspectiveTypes.push({ label: perspective.name, value: perspective.id }));
  };

  const handleSettingUpMeasuringUnitFilter = (measuring_unit) => {
    measuringUnit.length < 2 && measuring_unit.forEach((m_unit) => measuringUnit.push({ label: m_unit.name, value: m_unit.id }));
  };

  const handleFetchingPlan = async () => {
    setLoading(true);
    const token = await GetToken();
    const Api =
      Backend.api +
      Backend.getMyPlans +
      `?fiscal_year_id=${selectedYear?.id}&page=${pagination.page}&per_page=${pagination.per_page}&search=${search}&perspective_type_id=${filter.perspective}&measuring_unit_id=${filter.m_unit}`;
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
        if (response.success && response.data?.plans) {
          setData(response.data?.plans?.data);
          setCanPlan(response?.data?.can_plan);
          setCanDistribute(response?.data?.can_distribute);
          setCanChangeStatus(response.data?.can_change_status);
          setPlanStatus(response.data?.plan_status);

          handleSettingUpPerspectiveFilter(response.data?.perspectiveTypes);
          handleSettingUpMeasuringUnitFilter(response.data?.measuringUnits);
          setPagination({ ...pagination, total: response.data?.plans?.total });
          setError(false);
        } else {
          toast.warning(response.data.message);
          setError(false);
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

  const handlePlanStatus = async (status) => {
    setchangingStatus(true);
    const token = await GetToken();
    const Api = Backend.api + Backend.planStatus;
    const header = {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    const data = {
      fiscal_year_id: selectedYear?.id,
      status: status
    };

    fetch(Api, { method: 'POST', headers: header, body: JSON.stringify(data) })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          toast.success(response?.data?.message);
          handleFetchingPlan();
        } else {
          toast.error(response?.data?.message);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      })
      .finally(() => {
        setchangingStatus(false);
      });
  };

  useEffect(() => {
    if (mounted) {
      handleFetchingPlan();
    } else {
      setMounted(true);
    }
  }, [selectedYear?.id, pagination.page, pagination.per_page, filter]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      handleFetchingPlan();
    }, 600);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [search]);

  const groupedPlans = [];

  data.forEach((plan) => {
    const perspectiveType = plan?.kpi?.perspective_type?.name;

    if (perspectiveType) {
      if (!groupedPlans[perspectiveType]) {
        groupedPlans[perspectiveType] = [];
      }
      groupedPlans[perspectiveType].push(plan);
    }
  });

  return (
    <PageContainer
      title={'Planning'}
      rightOption={
        hasPermission('create:kpitracker') && (
          <>
            {canPlan && (
              <AddButton props={{ varaint: 'contained' }} title={'Create new plan'} onPress={() => handleCreatePlan()} disable={loading} />
            )}
          </>
        )
      }
    >
      {canChangeStatus && (
        <PlanStatusNotice
          status={planStatus}
          changingStatus={changingStatus}
          onAccept={() => handlePlanStatus('accepted')}
          onOpenToDiscussion={() => handlePlanStatus('open for discussion')}
          onEsclate={() => handlePlanStatus('escalated')}
        />
      )}

      <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 3.8, px: 2 }}>
        <Grid item xs={12} sm={12} md={4} lg={2.6} xl={2}>
          <Search value={search} onChange={(event) => handleSearchFieldChange(event)} />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <SelectorMenu name="perspective" options={perspectiveTypes} selected={filter.perspective} handleSelection={handleFiltering} />
            <Box sx={{ marginLeft: 2 }}>
              <SelectorMenu name="m_unit" options={measuringUnit} selected={filter.m_unit} handleSelection={handleFiltering} />
            </Box>
          </Box>
        </Grid>
      </Grid>

      {loading ? (
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 8
            }}
          >
            <ActivityIndicator size={20} />
          </Grid>
        </Grid>
      ) : error ? (
        <ErrorPrompt title="Server Error" message="Unable to retrive Plans" />
      ) : data.length === 0 ? (
        <Fallbacks
          severity="planning"
          title="Plan is not found"
          description="The list of added plan will be listed here"
          sx={{ paddingTop: 6 }}
        />
      ) : (
        <Grid container sx={{ paddingX: 2, marginTop: 0.2 }} spacing={gridSpacing}>
          {Object.keys(groupedPlans).map((perspectiveType, index) => (
            <Grid item xs={12} key={perspectiveType}>
              <DrogaCard
                onPress={() => handlePerspectiveCollapsing(index)}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
              >
                <Typography variant="h4" gutterBottom sx={{ m: 1 }}>
                  {perspectiveType}
                </Typography>

                <IconButton onClick={() => handlePerspectiveCollapsing(index)}>
                  {selectedPerspective === index ? (
                    <IconChevronDown size="1.4rem" stroke="1.4" />
                  ) : (
                    <IconChevronRight size="1.4rem" stroke="1.4" />
                  )}
                </IconButton>
              </DrogaCard>

              {selectedPerspective === index && (
                <Grid container spacing={2} mt={0.6}>
                  {groupedPlans[perspectiveType].map((plan, index) => (
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4} key={index}>
                      <PlanCard
                        plan={plan}
                        onPress={() => navigate('/planning/view', { state: { ...plan, can_distribute: canDistribute } })}
                        onEdit={() => handleUpdatingPlan(plan)}
                        onDelete={() => handleDeletePlan(plan)}
                        editInitiative={true}
                        is_employee={isEmployee}
                        sx={{
                          ':hover': {
                            boxShadow: theme.shadows[1],
                            transform: 'scale(1.03)',
                            transition: 'transform 0.3s ease-in-out'
                          }
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && pagination.total > pagination.per_page && (
        <TablePagination
          component="div"
          rowsPerPageOptions={[10, 25, 50, 100]}
          count={pagination.total}
          rowsPerPage={pagination.per_page}
          page={pagination.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Plans per page"
        />
      )}
      <CreatePlan add={create} onClose={handleCreateModalClose} onSucceed={() => handleFetchingPlan()} />
      {selectedPlanID && (
        <UpdatePlan
          add={update}
          plan_id={selectedPlanID}
          onClose={handleUpdateModalClose}
          onSucceed={() => handleFetchingPlan()}
          isUpdate={true}
        />
      )}
      {deletePlan && (
        <DeletePrompt
          type="Delete"
          open={deletePlan}
          title="Deleting Plan"
          description={`Are you sure you want to delete ` + selectedPlan?.kpi?.name}
          onNo={() => setDeletePlan(false)}
          onYes={() => handleDelete()}
          deleting={deleting}
          handleClose={() => setDeletePlan(false)}
        />
      )}
      <ToastContainer />
    </PageContainer>
  );
};

export default Planning;
