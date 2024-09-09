import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, MenuItem, Typography, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import PageContainer from 'ui-component/MainPage';
import Backend from 'services/backend';
import {IconBuilding,IconCalendar,IconChairDirector,IconChartDonut,IconDirection,IconDotsVertical,IconMail,IconReplace,IconTargetArrow,IconUser} from '@tabler/icons-react';
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

const IconColor = 'black';

const ViewUnit = () => {
  const { state } = useLocation();
  const theme = useTheme();
  const selectedYear = useSelector((state) => state.customization.selectedFiscalYear);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    per_page: 20
  });

  const [managers, setManagers] = useState([]);
  const [loadingManager, setManagerLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
    handleGettingManager();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGettingManager = () => {
    setOpen(true);

    if (managers.length == 0) {
      setManagerLoading(true);
      var Api = Backend.api + Backend.getManagers;
      const token = localStorage.getItem('token');
      var headers = {
        Authorization: `Bearer` + token,
        accept: 'application/json',
        'Content-Type': 'application/json'
      };

      fetch(Api, { method: 'GET', headers: headers })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            setManagerLoading(false);
            setManagers(response.data);
          } else {
            setManagerLoading(false);
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          setManagerLoading(false);
          toast.error(error.message);
        });
    }
  };

  const handleSearchingManager = () => {
    setSearching(true);
    var Api = Backend.api + Backend.getManagers + `?search=${search}`;
    const token = localStorage.getItem('token');
    var headers = {
      Authorization: `Bearer` + token,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    fetch(Api, { method: 'GET', headers: headers })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setSearching(false);
          setManagers(response.data);
        } else {
          setSearching(false);
          handlePrompts(response.message, 'error');
        }
      })
      .catch((error) => {
        setSearching(false);
        handlePrompts(error, 'error');
      });
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
    const handleFetchingUnitDetails = () => {
      const token = localStorage.getItem('token');
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
            setLoading(false);
            setError(false);
          } else {
            setLoading(false);
            setError(false);
          }
        })
        .catch((error) => {
          toast(error.message);
          setError(true);
          setLoading(false);
        });
    };

    handleFetchingUnitDetails();

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
            background: theme.palette.grey[100],
            color: '#000',
            borderRadius: 2,
            fontSize: '0.9rem',
            marginTop: 0,
            borderBottom: `2px solid ${theme.palette.divider}`,
            position: 'relative',
            padding: '12px 16px',
            '&:not(:last-of-type)': {
              borderRight: `1px solid ${theme.palette.divider}`
            },
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 1,
              paddingLeft: 2,
              borderBottom: 0.4,
              borderColor: theme.palette.grey[500]
            }}
          >
            <Typography variant="h4">Unit Info</Typography>

            <ActionMenu icon={<IconDotsVertical size={18} />}>
              <Box sx={{ paddingY: 1.6, paddingX: 1, backdropFilter: 'blur(10px)' }}>
                <MenuItem sx={{ borderRadius: 2, padding: 1, paddingX: 2 }} onClick={() => handleOpenDialog()}>
                  <IconReplace size={20} style={{ paddingRight: 2 }} />{' '}
                  <Typography variant="body2" marginLeft={1}>
                    {state?.manager ? 'Change manager' : 'Assign Manager'}
                  </Typography>
                </MenuItem>
              </Box>
            </ActionMenu>
          </Box>

          <Box sx={{ padding: 2, backgroundColor: theme.palette.grey[50], borderRadius: 2 }}>
            {state?.name && <DetailInfo label={'Unit name'} info={state?.name} icon={<IconBuilding size={24} color={IconColor} />} />}
            {state?.unit_type?.name && (
              <DetailInfo label={'Unit type'} info={state?.unit_type?.name} icon={<IconDirection size={24} color={IconColor} />} />
            )}
            {state?.manager?.user?.name && (
              <DetailInfo label={'Manager name'} info={state?.manager?.user?.name} icon={<IconUser size={24} color={IconColor} />} />
            )}
            {state?.manager?.position && (
              <DetailInfo
                label={'Manager Position'}
                info={state?.manager?.position}
                icon={<IconChairDirector size={24} color={IconColor} />}
              />
            )}

            {state?.manager?.user?.email && (
              <DetailInfo label={'Manager email'} info={state?.manager?.user?.email} icon={<IconMail size={24} color={IconColor} />} />
            )}
            {state?.position && (
              <DetailInfo label={'Position'} info={state?.position} icon={<IconChartDonut size={24} color={IconColor} />} />
            )}

            {state?.user?.created_at && (
              <DetailInfo
                label={'Start date'}
                info={formatDate(state?.user?.created_at).formattedDate}
                icon={<IconCalendar size={24} color={IconColor} />}
              />
            )}
          </Box>
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
            borderColor: theme.palette.grey[200],
            borderRadius: 2
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 1,
              paddingLeft: 2,
              borderBottom: 0.4,
              borderColor: theme.palette.grey[200]
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

      <AssignManager
        open={open}
        handleDialogClose={() => handleClose()}
        managers={managers}
        unit_id={state.id}
        isLoading={loadingManager}
        searchText={search}
        searching={searching}
        onTextChange={(event) => setSearch(event.target.value)}
        onSubmit={() => handleSearchingManager()}
      />
    </PageContainer>
  );
};

export default ViewUnit;
