import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import { IconDots, IconDotsVertical, IconPlus, IconSortAscending, IconSortDescending } from '@tabler/icons-react';
import { useLocation } from 'react-router-dom';
import PageContainer from 'ui-component/MainPage';
import ContainerCard from './components/ContainerCard';
import Backend from 'services/backend';
import { UnitKpi } from './components/UnitKpi';
import { UnitKpiData } from 'data/units/UnitKpi';
import ActionMenu from 'ui-component/ActionMenu';
import { DotMenus } from 'data/menus/DotMenu';
import Fallbacks from 'utils/components/Fallbacks';

const ViewUnit = () => {
  const { state } = useLocation();
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const [sort, setSort] = useState(false);

  useEffect(() => {
    const handleFetchingUnitDetails = () => {
      const token = localStorage.getItem('token');
      const Api = Backend.api + Backend.units + `/details?id=${state?.id}`;
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
    <div>
      <CssBaseline />
      <PageContainer
        back={true}
        title={`${state?.name}`}
        rightOption={
          <IconButton>
            <IconDotsVertical size={20} />
          </IconButton>
        }
      >
        <Grid
          container
          sx={{
            backgroundColor: theme.palette.background.default,
            borderRadius: 2,
            marginTop: 2,
            paddingY: 3,
            paddingX: 2
          }}
        >
          <Grid xs={12} sx={{ minHeight: '60dvh' }}>
            <Grid container>
              <Grid xs={12} sm={12} md={8} lg={8.6} xl={8.6}>
                <ContainerCard>
                  <Stack direction="row" spacing={2} sx={{ padding: 1 }}>
                    <Chip
                      label={`Unit KPI's`}
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.background.default,
                        ':hover': { backgroundColor: theme.palette.primary.main }
                      }}
                    />
                  </Stack>

                  {/* <Box sx={{ minHeight: 432 }}>
                    {loading ? (
                      <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CircularProgress size={22} />
                      </Box>
                    ) : error ? (
                      <Fallbacks severity="error" title="Server error" description="There is error fetching departments" />
                    ) : data.length === 0 ? (
                      <Fallbacks
                        severity="kpi"
                        title="Unit kpi is not found"
                        description="The list of assigned unit will be listed here"
                        sx={{ paddingTop: 6 }}
                      />
                    ) : (
                      <Box>
                        <UnitKpi kpi={UnitKpiData} />
                      </Box>
                    )}
                  </Box> */}

                  <UnitKpi kpi={UnitKpiData} />
                </ContainerCard>
              </Grid>

              <Grid xs={12} sm={12} md={4} lg={3.4} xl={3.4}>
                <Box sx={{ minHeight: 240, border: 0.4, borderColor: theme.palette.grey[400], borderRadius: 1.6, paddingY: 1, margin: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingX: 1.6 }}>
                    <Typography variant="subtitle1">Unit Manger</Typography>
                    <ActionMenu icon={<IconDots size={18} />}>
                      <Box sx={{ paddingY: 1 }}>
                        {DotMenus?.map((menu, index) => (
                          <MenuItem key={index} sx={{ fontSize: 14, padding: 2 }}>
                            {menu.icon} {menu.name}
                          </MenuItem>
                        ))}
                      </Box>
                    </ActionMenu>
                  </Box>
                  <Divider sx={{ borderBottom: 0.4, borderColor: theme.palette.grey[400], marginY: 1 }} />

                  <Box>
                    {loading ? (
                      <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CircularProgress size={20} />
                      </Box>
                    ) : error ? (
                      <Fallbacks severity="error" title="Server error" description="There is error fetching unit manager detail" />
                    ) : data?.length === 0 ? (
                      <Fallbacks
                        severity="manager"
                        title="Unit manger detail is not found"
                        description="The unit might not have a manager"
                        sx={{ paddingTop: 6 }}
                      >
                        <Button variant="contained" color="primary">
                          Add Manager
                        </Button>{' '}
                      </Fallbacks>
                    ) : (
                      <p>Manger details</p>
                    )}
                  </Box>
                </Box>
                <Box sx={{ minHeight: 240, border: 0.4, borderColor: theme.palette.grey[400], borderRadius: 1.6, paddingY: 1, margin: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingX: 1.6, paddingY: 0.6 }}>
                    <Typography variant="subtitle1">Unit Supervisors</Typography>
                  </Box>
                  <Divider sx={{ borderBottom: 0.4, borderColor: theme.palette.grey[400], marginY: 1 }} />

                  <Box>
                    {loading ? (
                      <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CircularProgress size={20} />
                      </Box>
                    ) : error ? (
                      <Fallbacks severity="error" title="Server error" description="There is error fetching unit supervisors" />
                    ) : data?.length === 0 ? (
                      <Fallbacks
                        severity="supervisor"
                        title="Unit supervisors are not found"
                        description="The unit might not have a supervisors"
                        sx={{ paddingTop: 6 }}
                      />
                    ) : (
                      <p>Supervisors</p>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Grid container>
              <Grid xs={12}>
                <Box sx={{ minHeight: 240, border: 0.4, borderColor: theme.palette.grey[400], borderRadius: 1.6, paddingY: 1, margin: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingX: 1.6 }}>
                    <Typography variant="subtitle1">Unit Employees</Typography>

                    <IconButton onClick={() => setSort(!sort)}>
                      {sort ? <IconSortAscending size={18} /> : <IconSortDescending size={18} />}
                    </IconButton>
                  </Box>
                  <Divider sx={{ borderBottom: 0.4, borderColor: theme.palette.grey[400], marginY: 1 }} />

                  <Box sx={{ paddingX: 1.6 }}>
                    <p>Employees card</p>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </PageContainer>
    </div>
  );
};

export default ViewUnit;
