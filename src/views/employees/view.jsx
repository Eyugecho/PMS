import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, IconButton, Typography, useTheme } from '@mui/material';
import PageContainer from 'ui-component/MainPage';
import {
  IconCalendar,
  IconChartDonut,
  IconDotsVertical,
  IconGenderMale,
  IconMail,
  IconPhone,
  IconTargetArrow,
  IconTie,
  IconUser
} from '@tabler/icons-react';
import { useLocation } from 'react-router-dom';
import { DetailInfo } from './components/DetailInfo';
import { formatDate } from 'utils/function';
import { gridSpacing } from 'store/constant';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Backend from 'services/backend';
import PlanTable from 'views/evaluation/components/PlanTable';
import DrogaCard from 'ui-component/cards/DrogaCard';
import ActivityIndicator from 'ui-component/indicators/ActivityIndicator';
import Fallbacks from 'utils/components/Fallbacks';
import PerformanceCard from 'ui-component/cards/PerformanceCard';
import GetToken from 'utils/auth-token';
import GetFiscalYear from 'utils/components/GetFiscalYear';
import PerKPI from 'ui-component/performance/PerKPI';

const ViewEmployee = () => {
  const { state } = useLocation();
  const theme = useTheme();
  const selectedYear = useSelector((state) => state.customization.selectedFiscalYear);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10
  });

  const [isLoading, setIsLoading] = useState(false);
  const [performance, setPerformance] = useState([]);

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
    const handleFetchingEmployees = () => {
      setLoading(true);
      const token = localStorage.getItem('token');
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
        <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
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
        </Grid>

        <Grid item xs={12} sm={12} md={8} lg={8} xl={9}>
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
    </PageContainer>
  );
};

export default ViewEmployee;
