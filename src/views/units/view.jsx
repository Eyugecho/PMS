import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, MenuItem, Typography, useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import PageContainer from 'ui-component/MainPage';
import Backend from 'services/backend';
import {
  IconBuilding,
  IconBuildingArch,
  IconCalendar,
  IconChairDirector,
  IconDirection,
  IconDotsVertical,
  IconMail,
  IconReplace,
  IconTargetArrow,
  IconUser
} from '@tabler/icons-react';
import { formatDate } from 'utils/function';
import { DetailInfo } from 'views/employees/components/DetailInfo';
import { toast } from 'react-toastify';
import { AssignManager } from './components/AssignManager';
import { useSelector } from 'react-redux';
import { gridSpacing } from 'store/constant';
import PlanTable from 'views/evaluation/components/PlanTable';
import ActionMenu from 'ui-component/ActionMenu';
import GetFiscalYear from 'utils/components/GetFiscalYear';
import PerformanceCard from 'ui-component/cards/PerformanceCard';
import DrogaCard from 'ui-component/cards/DrogaCard';
import ActivityIndicator from 'ui-component/indicators/ActivityIndicator';
import Fallbacks from 'utils/components/Fallbacks';
import PerKPI from 'ui-component/performance/PerKPI';
import GetToken from 'utils/auth-token';

const ViewUnit = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const selectedYear = useSelector((state) => state.customization.selectedFiscalYear);

  const [loadingUnit, setLoadingUnit] = useState(true);
  const [unit, setUnit] = useState([]);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    per_page: 20
  });

  const [open, setOpen] = useState(false);
  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [performance, setPerformance] = useState([]);

  useEffect(() => {
    const handleFetchingPerformance = async () => {
      if (selectedYear) {
        setIsLoading(true);
        const token = await GetToken();
        const Api = Backend.api + Backend.unitPerformance + `${state?.id}?fiscal_year_id=${selectedYear?.id}`;

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
            }
          })
          .catch((error) => {
            setPerformance([]);
            toast.error(error.message);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        return <GetFiscalYear />;
      }
    };

    if (state?.id) {
      handleFetchingPerformance();
    } else {
      navigate(-1);
    }
  }, [selectedYear]);

  const handleGettingUnitDetails = async () => {
    setLoadingUnit(true);
    const token = await GetToken();
    const Api = Backend.api + Backend.units + `/` + state?.id;
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
          setUnit(response.data);
          setError(false);
        } else {
          setError(false);
        }
      })
      .catch((error) => {
        toast(error.message);
        setError(true);
      })
      .finally(() => setLoadingUnit(false));
  };

  const handleFetchingUnitDetails = async () => {
    const token = await GetToken();
    const Api = Backend.api + Backend.getUnitTarget + state?.id;
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
          setError(false);
        }
      })
      .catch((error) => {
        toast(error.message);
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (state?.id) {
      handleGettingUnitDetails();
      handleFetchingUnitDetails();
    } else {
      navigate(-1);
    }

    return () => {};
  }, [state?.id]);

  return (
    <PageContainer back={true} title="Unit Details">
      <Grid container sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: 2 }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={3.8}
          lg={3.2}
          xl={3.2}
          sx={{
            minHeight: 300,
            background: theme.palette.grey[100],
            borderRadius: 2,
            fontSize: '0.9rem',
            marginTop: 0,
            borderBottom: `1px solid ${theme.palette.divider}`,
            position: 'relative',
            padding: '6px',
            '&:not(:last-of-type)': {
              borderRight: `1px solid ${theme.palette.divider}`
            }
          }}
        >
          {loadingUnit ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2, marginTop: 3 }}>
              <ActivityIndicator size={20} />
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 1,
                  paddingLeft: 2
                }}
              >
                <Typography variant="h4">Unit Detail Info</Typography>

                <ActionMenu icon={<IconDotsVertical size={18} />}>
                  <Box sx={{ paddingY: 1.6, paddingX: 1, backdropFilter: 'blur(10px)' }}>
                    <MenuItem sx={{ borderRadius: 2, padding: 1, paddingX: 2 }} onClick={() => handleOpenDialog()}>
                      <IconReplace size={20} style={{ paddingRight: 2 }} />{' '}
                      <Typography variant="body2" marginLeft={1}>
                        {unit?.manager ? 'Change manager' : 'Assign Manager'}
                      </Typography>
                    </MenuItem>
                  </Box>
                </ActionMenu>
              </Box>

              <Box sx={{ padding: 2, borderRadius: 2 }}>
                {unit?.name && <DetailInfo label={'Unit name'} info={unit?.name} icon={<IconBuildingArch size={22} />} />}
                {unit?.parent && <DetailInfo label={'Parent Unit'} info={unit?.parent?.name} icon={<IconBuilding size={22} />} />}
                {unit?.unit_type?.name && (
                  <DetailInfo label={'Unit type'} info={unit?.unit_type?.name} icon={<IconDirection size={22} />} />
                )}
                {unit?.manager?.user?.name && (
                  <DetailInfo label={'Manager name'} info={unit?.manager?.user?.name} icon={<IconUser size={22} />} />
                )}

                {unit?.manager?.user?.email && (
                  <DetailInfo label={'Manager email'} info={unit?.manager?.user?.email} icon={<IconMail size={22} />} />
                )}

                {unit?.manager?.job_position && (
                  <DetailInfo label={'Manager Position'} info={unit?.manager?.job_position?.name} icon={<IconChairDirector size={22} />} />
                )}

                {unit?.created_at && (
                  <DetailInfo label={'Creation date'} info={formatDate(unit?.created_at).formattedDate} icon={<IconCalendar size={22} />} />
                )}
              </Box>
            </>
          )}
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={7.9}
          lg={8.6}
          xl={8.6}
          sx={{
            backgroundColor: theme.palette.background.default,
            border: 0.4,
            borderColor: theme.palette.divider,
            borderRadius: 2
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 2,
              paddingLeft: 2,
              borderBottom: 0.4,
              borderColor: theme.palette.divider
            }}
          >
            <Typography variant="h4">Unit KPI's and Targets</Typography>
          </Box>

          <Box>
            {loading ? (
              <Box sx={{ padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress size={20} />
              </Box>
            ) : error ? (
              <Box sx={{ padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body2">There is error fetching the unit KPI's</Typography>
              </Box>
            ) : data.length === 0 ? (
              <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <IconTargetArrow size={80} color={theme.palette.grey[400]} />
                <Typography variant="h4" sx={{ marginTop: 1.6 }}>
                  Unit target is not found
                </Typography>
                <Typography variant="caption">The list of assigned target will be listed here</Typography>
              </Box>
            ) : (
              <PlanTable plans={data} page="unit" />
            )}
          </Box>
        </Grid>
      </Grid>

      <Grid container sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: 2 }} spacing={gridSpacing}>
        <Grid item xs={12} sm={12} md={4} lg={6} xl={6}>
          <DrogaCard>
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
        </Grid>

        <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
          <DrogaCard>
            <Typography variant="h4">Per KPI performance</Typography>
            <PerKPI isLoading={isLoading} performance={performance} />
          </DrogaCard>
        </Grid>
      </Grid>

      {state?.id && (
        <AssignManager
          open={open}
          handleDialogClose={() => handleClose()}
          unit_id={state.id}
          onRefresh={() => {
            handleClose();
            handleGettingUnitDetails();
          }}
        />
      )}
    </PageContainer>
  );
};

export default ViewUnit;
