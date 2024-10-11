import React, { useEffect, useState } from 'react';
import { Box, Chip, CircularProgress, Grid, Typography, useTheme } from '@mui/material';
import { IconTargetArrow } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PeriodNaming } from 'utils/function';
import { gridSpacing } from 'store/constant';
import { useKPI } from 'context/KPIProvider';
import { UpdatePlan } from './components/UpdatePlan';
import { Storage } from 'configration/storage';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import DistributeTarget from './components/DistributeTarget';
import Backend from 'services/backend';
import PageContainer from 'ui-component/MainPage';
import TargetTable from './components/TargetTable';
import PlanCard from './components/PlanCard';
import DrogaButton from 'ui-component/buttons/DrogaButton';
import Search from 'ui-component/search';
import DeletePrompt from 'ui-component/modal/DeletePrompt';
import GetToken from 'utils/auth-token';
import axios from 'axios';
import IsEmployee from 'utils/is-employee';
import PerKPIPerformance from './components/PerKPIPerformance';
import ActivityIndicator from 'ui-component/indicators/ActivityIndicator';

const ViewPlan = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isEmployee = IsEmployee();
  const { state } = useLocation();
  const { handleUpdatePlan } = useKPI();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState(state ? state : null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [tab, setTab] = useState('units');
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [deletePlan, setDeletePlan] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState('');

  /*** Update plan functionality implemented below  this*/
  const handleUpdateModalClose = () => {
    handleUpdatePlan([]);
    setUpdate(false);
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
    setUpdate(true);
  };

  const handleUpdatingPlan = (plan) => {
    handleSettingUP(plan);
  };

  /** Delete plan functionality implemented below this */
  const handleDeletePlan = () => {
    setDeletePlan(true);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const token = await GetToken();
      const Api = Backend.api + Backend.deletePlan + `/${state?.id}`;
      const response = await axios.delete(Api, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setDeletePlan(false);
        toast.success(response.data.data.message);
        navigate(-1);
      } else {
        toast.error(response.data.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleting(false);
    }
  };

  /** Target distribution functionality implemented below this */
  const handleDistributeClick = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  /** The child unit and employee searching functionality implemented below this */

  const handleSearchFieldChange = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  /**The functionality that switch the tabs from unit to employee and vice versa is implemented below this */
  const handleTabChange = (value) => {
    setTab(value);
  };

  const handleGettingPlanDetails = async () => {
    const token = await GetToken();
    const Api = Backend.api + Backend.showPlan + '/' + state?.id;
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
          setPlan(response.data);
          setError(false);
        } else {
          setError(false);
        }
      })
      .catch((error) => {
        toast(error.message);
        setError(true);
      });
  };

  const handleFetchingDistribution = async () => {
    setLoading(true);
    const token = await GetToken();
    const Api = Backend.api + Backend.childTarget + state?.id + `?unit_type=${tab}&search=${search}`;
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
          setError(false);
        } else {
          setError(true);
        }
      })
      .catch((error) => {
        toast(error.message);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      handleFetchingDistribution();
    }, 800);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [search]);

  useEffect(() => {
    handleGettingPlanDetails();
    if (mounted) {
      handleFetchingDistribution();
    } else {
      setMounted(true);
    }
  }, [state?.id, tab]);

  return (
    <React.Fragment>
      <PageContainer back={true} title={`${state ? plan?.kpi?.name : 'Plan Detail'}`}>
        <Grid
          container
          spacing={gridSpacing}
          sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 0.5, padding: 2 }}
        >
          <Grid item xs={12} sm={12} md={12} lg={4} xl={3}>
            <PlanCard
              plan={plan}
              onEdit={() => handleUpdatingPlan(plan)}
              onDelete={() => handleDeletePlan(plan)}
              hideOptions={state?.can_distribute}
            />

            {!isEmployee && plan?.status === 'approved' && (
              <DrogaButton
                fullWidth
                title={'Cascade Targets'}
                onPress={() => handleDistributeClick()}
                sx={{ marginY: 2, padding: 1.6, boxShadow: 0 }}
              />
            )}
          </Grid>

          {isEmployee ? (
            <Grid item xs={12} sm={12} md={12} lg={7.8} xl={8}>
              <PerKPIPerformance plan={state} />
            </Grid>
          ) : (
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={7.8}
              xl={8}
              sx={{
                marginTop: 2
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 2.4 }}>
                <Typography variant="h4">Target Distributed</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
              <Grid container>
                <Grid item xs={12} md={11} sm={8} lg={4} xl={4}>
                  <Search title="Search" value={search} onChange={(event) => handleSearchFieldChange(event)} />
                </Grid>
              </Grid>

              {loading ? (
                <Box sx={{ padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ActivityIndicator size={20} />
                </Box>
              ) : error ? (
                <Box sx={{ padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body2">There is error fetching the targets</Typography>
                </Box>
              ) : data.length === 0 ? (
                <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <IconTargetArrow size={80} color={theme.palette.grey[400]} />
                  <Typography variant="h4" sx={{ marginTop: 1.6 }}>
                    There is no distribution
                  </Typography>
                  <Typography variant="caption">The list of distributed target will be listed here</Typography>
                </Box>
              ) : (
                <TargetTable plans={data} onRefresh={() => handleFetchingDistribution()} />
              )}
            </Grid>
          )}
        </Grid>
      </PageContainer>

      <UpdatePlan
        add={update}
        plan_id={state?.id}
        onClose={handleUpdateModalClose}
        onSucceed={() => handleGettingPlanDetails()}
        isUpdate={true}
      />
      {deletePlan && (
        <DeletePrompt
          type="Delete"
          open={deletePlan}
          title="Deleting Plan"
          description={`Are you sure you want to delete ` + plan?.kpi?.name}
          onNo={() => setDeletePlan(false)}
          onYes={() => handleDelete()}
          deleting={deleting}
          handleClose={() => setDeletePlan(false)}
        />
      )}

      <DistributeTarget
        add={open}
        onClose={handleModalClose}
        plan_id={plan?.id}
        targets={plan?.target}
        naming={PeriodNaming(plan?.frequency?.name)}
        onRefresh={() => handleFetchingDistribution()}
      />
      <ToastContainer />
    </React.Fragment>
  );
};

export default ViewPlan;
