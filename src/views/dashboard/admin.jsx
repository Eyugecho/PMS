import React, { useEffect, useState } from 'react';
// material-ui
import Grid from '@mui/material/Grid';

// project imports
import { gridSpacing } from 'store/constant';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { IconArrowsDiagonal, IconBuilding, IconCheck, IconMenu2, IconRulerMeasure, IconUsers } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { startOfWeek, endOfDay, format } from 'date-fns';
import PageContainer from 'ui-component/MainPage';
import DrogaCard from 'ui-component/cards/DrogaCard';
import DrogaDonutChart from 'ui-component/charts/DrogaDonutChart';
import NotificationCard from './components/Notification';
import ActivityGraph from 'ui-component/charts/ActivityGraph';
import GetToken from 'utils/auth-token';
import Backend from 'services/backend';
import GetFiscalYear from 'utils/components/GetFiscalYear';
import ActivityIndicator from 'ui-component/indicators/ActivityIndicator';
import DateRangePicker from './components/DateRange';
import SelectorMenu from 'ui-component/menu/SelectorMenu';

const ChartTypes = [
  {
    label: 'Line Graph',
    value: 'line'
  },
  {
    label: 'Area Graph',
    value: 'area'
  },
  {
    label: 'Bar Chart',
    value: 'bar'
  }
];

const AdminDashboard = () => {
  const theme = useTheme();
  const selectedYear = useSelector((state) => state.customization.selectedFiscalYear);

  const getMostRecentMonday = () => {
    const today = new Date();
    return startOfWeek(today, { weekStartsOn: 1 });
  };

  const [startDate, setStartDate] = useState(getMostRecentMonday());
  const [endDate, setEndDate] = useState(endOfDay(new Date()));

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [statLoading, setStatLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [chartType, setChartType] = useState('line');

  const handleChartSelection = (event) => {
    const value = event.target.value;
    setChartType(value);
  };

  const handleFetchingActvities = async () => {
    if (selectedYear) {
      setLoading(true);
      const token = await GetToken();

      const Api =
        Backend.api +
        Backend.employeesTaskGraph +
        `?fiscal_year_id=${selectedYear?.id}&start_date=${format(startDate, 'yyyy-MM-dd')}&end_date=${format(endDate, 'yyyy-MM-dd')}`;
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
          } else {
            toast.warning(response.message);
          }
        })
        .catch((error) => {
          toast.warning(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      return <GetFiscalYear />;
    }
  };

  const handleFetchingStats = async () => {
    if (selectedYear) {
      setStatLoading(true);
      const token = await GetToken();
      const Api = Backend.api + Backend.getStats;

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
            setStats(response.data);
          } else {
            toast.warning(response.message);
          }
        })
        .catch((error) => {
          toast.warning(error.message);
        })
        .finally(() => {
          setStatLoading(false);
        });
    } else {
      return <GetFiscalYear />;
    }
  };

  useEffect(() => {
    if (endDate < startDate) {
      setEndDate(endOfDay(startDate));
    }
  }, [startDate]);

  useEffect(() => {
    handleFetchingStats();
  }, [selectedYear]);

  useEffect(() => {
    handleFetchingActvities();
  }, [selectedYear, startDate, endDate]);
  return (
    <PageContainer title="Dashboard">
      <Grid container spacing={gridSpacing} sx={{ margin: 1 }}>
        <Grid item xs={11.6}>
          <Grid container spacing={gridSpacing} sx={{ display: 'flex', alignItems: 'center' }}>
            <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
              <DrogaCard sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                {statLoading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={20} />
                  </Box>
                ) : (
                  <React.Fragment>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <IconButton
                        sx={{
                          backgroundColor: theme.palette.primary[800],
                          padding: 1,
                          ':hover': { backgroundColor: theme.palette.primary[800] }
                        }}
                      >
                        <IconRulerMeasure size="1.4rem" stroke="1.8" color="white" />
                      </IconButton>

                      <Box sx={{ marginLeft: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="h3" color={theme.palette.primary[800]}>
                            {stats?.kpis}
                          </Typography>
                          <Typography variant="subtitle1" color={theme.palette.primary[800]} sx={{ marginLeft: 0.6 }}>
                            KPI's
                          </Typography>
                        </Box>

                        <Typography variant="subtitle1" color={theme.palette.text.primary}>
                          {stats?.perspectiveTypes} Perspectives
                        </Typography>
                      </Box>
                    </Box>

                    <IconArrowsDiagonal size="1.4rem" stroke="1.8" color="#ccc" />
                  </React.Fragment>
                )}
              </DrogaCard>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
              <DrogaCard sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                {statLoading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={20} />
                  </Box>
                ) : (
                  <React.Fragment>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <IconButton
                        sx={{
                          backgroundColor: 'green',
                          padding: 1,
                          ':hover': { backgroundColor: 'green' }
                        }}
                      >
                        <IconCheck size="1.4rem" stroke="1.8" color="white" />
                      </IconButton>

                      <Box sx={{ marginLeft: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="h3" color="green">
                            {stats?.used_kpis}
                          </Typography>
                          <Typography variant="subtitle1" color="green" sx={{ marginLeft: 0.6 }}>
                            Planned KPI's
                          </Typography>
                        </Box>

                        <Typography variant="subtitle1" color={theme.palette.text.primary} sx={{ marginLeft: 0.4 }}>
                          KPI Used this year
                        </Typography>
                      </Box>
                    </Box>

                    <IconArrowsDiagonal size="1.4rem" stroke="1.8" color="#ccc" />
                  </React.Fragment>
                )}
              </DrogaCard>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
              <DrogaCard sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                {statLoading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={20} />
                  </Box>
                ) : (
                  <React.Fragment>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <IconButton
                        sx={{
                          backgroundColor: '#8000ff',
                          padding: 1,
                          ':hover': { backgroundColor: '#8000ff' }
                        }}
                      >
                        <IconBuilding size="1.4rem" stroke="1.8" style={{ color: '#fff' }} />
                      </IconButton>

                      <Box sx={{ marginLeft: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="h3" color="#8000ff">
                            {stats?.units}
                          </Typography>
                          <Typography variant="subtitle1" color="#8000ff" sx={{ marginLeft: 0.6 }}>
                            Units
                          </Typography>
                        </Box>

                        <Typography variant="subtitle1" color={theme.palette.text.primary} sx={{ marginLeft: 0.4 }}>
                          Total
                        </Typography>
                      </Box>
                    </Box>

                    <IconArrowsDiagonal size="1.4rem" stroke="1.8" color="#ccc" />
                  </React.Fragment>
                )}
              </DrogaCard>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
              <DrogaCard sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                {statLoading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={20} />
                  </Box>
                ) : (
                  <React.Fragment>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <IconButton
                        sx={{
                          backgroundColor: '#cc5d02',
                          padding: 1,
                          ':hover': { backgroundColor: '#cc5d02' }
                        }}
                      >
                        <IconUsers size="1.4rem" stroke="1.8" style={{ color: '#fff' }} />
                      </IconButton>

                      <Box sx={{ marginLeft: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="h3" color="#cc5d02">
                            {stats?.employees}
                          </Typography>
                          <Typography variant="subtitle1" color="#cc5d02" sx={{ marginLeft: 0.6 }}>
                            Employees
                          </Typography>
                        </Box>

                        <Typography variant="subtitle1" color={theme.palette.text.primary} sx={{ marginLeft: 0.4 }}>
                          Total
                        </Typography>
                      </Box>
                    </Box>

                    <IconArrowsDiagonal size="1.4rem" stroke="1.8" color="#ccc" />
                  </React.Fragment>
                )}
              </DrogaCard>
            </Grid>
          </Grid>

          <Grid container spacing={gridSpacing} marginY={2} sx={{ minHeight: 200 }}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4">Daily Activities</Typography>
                  <SelectorMenu name="chart" options={ChartTypes} selected={chartType} handleSelection={handleChartSelection} />
                </Box>
                <DateRangePicker startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
              </Box>

              {loading ? (
                <Grid container>
                  <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
                    <ActivityIndicator size={20} />
                  </Grid>
                </Grid>
              ) : (
                chartType && <ActivityGraph data={data} type={chartType} />
              )}
            </Grid>
          </Grid>

          <Grid container spacing={gridSpacing} marginTop={1}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <DrogaCard sx={{ minHeight: 280, paddingY: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h4">Company performance</Typography>
                  <IconButton>
                    <IconMenu2 size="1.2rem" stroke="1.8" />
                  </IconButton>
                </Box>

                <Grid container spacing={gridSpacing}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    xl={6}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',

                      marginTop: 4
                    }}
                  >
                    <DrogaDonutChart value={85} size={60} />
                    <Typography variant="subtitle1" marginTop={1.6} color={theme.palette.text.primary}>
                      Average Performance
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    xl={6}
                    sx={{
                      marginTop: 2,
                      borderLeft: 1,
                      borderColor: theme.palette.divider
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: 1
                      }}
                    >
                      <DrogaDonutChart value={96} size={24} />
                      <Box sx={{ marginLeft: 1.8 }}>
                        <Typography variant="h4">Marketting</Typography>
                        <Typography variant="body2">Average performance</Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginY: 2
                      }}
                    >
                      <DrogaDonutChart value={88} size={24} />
                      <Box sx={{ marginLeft: 1.8 }}>
                        <Typography variant="h4">Sales</Typography>
                        <Typography variant="body2">Average performance</Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginY: 1
                      }}
                    >
                      <DrogaDonutChart value={86} size={24} />
                      <Box sx={{ marginLeft: 1.8, width: '70%' }}>
                        <Typography variant="h4" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          Subpply Chain management
                        </Typography>
                        <Typography variant="body2">Average performance</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </DrogaCard>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <DrogaCard sx={{ minHeight: 280, paddingY: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 0.8 }}>
                  <Typography variant="h4">Recent Notifications</Typography>
                </Box>

                <NotificationCard />
                <NotificationCard />
                <NotificationCard />
              </DrogaCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AdminDashboard;
