import React, { useEffect, useState } from 'react';
import { Box, Button, Chip, CircularProgress, CssBaseline, Divider, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { IconCircleCheckFilled, IconDotsVertical, IconTargetArrow } from '@tabler/icons-react';
import { useLocation } from 'react-router-dom';
import Backend from 'services/backend';
import PageContainer from 'ui-component/MainPage';
import Fallbacks from 'utils/components/Fallbacks';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { UnitKpi } from 'views/departments/components/UnitKpi';
import { UnitKpiData } from 'data/units/UnitKpi';
import { DistributedKPIColumns } from 'data/planning/columns';
import { DistributeTarget } from './components/DistributeTarget';
import { PeriodNaming } from 'utils/function';
import PlanTable from 'views/evaluation/components/PlanTable';
import TargetTable from './components/TargetTable';

const ViewPlan = () => {
  const { state } = useLocation();

  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [tab, setTab] = useState('units');
  const [open, setOpen] = useState(false);

  const handleDistributeClick = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleTargetNaming = (name) => {
    if (name) {
      let f_name;
      switch (name) {
        case 'Monthly':
          f_name = 'Month';
          break;

        case 'Annually':
          f_name = 'Annum';
          break;

        case 'Quarterly':
          f_name = 'Quarter';
          break;

        case 'Weekly':
          f_name = 'Week';
          break;

        case 'Bi-weekly':
          f_name = 'Bi-weekly';
          break;

        case 'Daily':
          f_name = 'Day';
          break;

        default:
          f_name = 'Season';
          break;
      }
      return f_name;
    }
  };

  const handleTabChange = (value) => {
    setTab(value);
  };

  useEffect(() => {
    const handleFetchingDistribution = () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      const Api = Backend.api + Backend.childTarget + state?.id + `?unit_type=${tab}`;
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
            console.log(response.data);
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

    handleFetchingDistribution();

    return () => {};
  }, [state?.id, tab]);
  return (
    <div>
      <CssBaseline />
      <PageContainer
        back={true}
        title={`${state ? state?.kpi?.name : 'Plan Details'}`}
        rightOption={
          <IconButton>
            <IconDotsVertical size={20} />
          </IconButton>
        }
      >
        <Grid
          container
          sx={{
            borderRadius: 2,
            marginTop: 2,
            paddingY: 2
          }}
        >
          <TableContainer component={Paper} sx={{ border: 0.4, borderColor: theme.palette.grey[300], borderRadius: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="KPI table">
              <TableHead>
                <TableRow>
                  <TableCell>Fiscal Year</TableCell>
                  <TableCell>KPI Name</TableCell>
                  <TableCell>KPI Weights(%)</TableCell>
                  <TableCell>Total Targets</TableCell>
                  <TableCell>Measuring Unit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ display: 'flex', alignItems: 'center', border: 0 }}>
                    <IconCircleCheckFilled size={20} />
                    <Typography variant="body2" sx={{ marginLeft: 2 }}>
                      {state?.fiscal_year.year}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ border: 0 }}>
                    <Typography variant="subtitle1">{state?.kpi.name}</Typography>
                  </TableCell>
                  <TableCell sx={{ border: 0 }}>{state?.weight}</TableCell>
                  <TableCell sx={{ border: 0 }}>{state?.total_target}</TableCell>
                  <TableCell sx={{ border: 0 }}>{state?.kpi?.measuring_unit?.name}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Grid
              xs={12}
              sm={12}
              md={3.8}
              lg={2.9}
              xl={2}
              sx={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {state?.target?.map((target, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: 0.5,
                    paddingY: 0.8,
                    paddingX: 2,
                    border: 0.4,
                    borderColor: theme.palette.grey[300],
                    borderRadius: 2,
                    backgroundColor: theme.palette.background.default
                  }}
                >
                  <Typography variant="body2">
                    {handleTargetNaming(state?.frequency?.name)} {index + 1}
                  </Typography>
                  <Box sx={{ paddingX: 2 }}>
                    <Typography variant="h4" sx={{ marginY: 2 }}>
                      {target.target}
                    </Typography>
                  </Box>
                </Box>
              ))}
              <Button
                variant="contained"
                sx={{ marginY: 2, marginX: 1, padding: 1.2, boxShadow: 0 }}
                onClick={() => handleDistributeClick()}
              >
                Distribute Targets
              </Button>
            </Grid>

            <Grid
              xs={12}
              sm={12}
              md={8}
              lg={9}
              xl={9.9}
              sx={{
                border: 0.4,
                borderColor: theme.palette.grey[300],
                borderRadius: 2,
                padding: 2,
                marginTop: 0.5,
                backgroundColor: theme.palette.background.default
              }}
            >
              <Typography variant="h4">Target Distributed</Typography>
              <Box sx={{ marginBottom: 2.4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginY: 3 }}>
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

              {loading ? (
                <Box sx={{ padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CircularProgress size={20} />
                </Box>
              ) : error ? (
                <Box sx={{ padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body2">There is error fetching the targets</Typography>
                </Box>
              ) : data.length === 0 ? (
                <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <IconTargetArrow size={80} color={theme.palette.grey[400]} />
                  <Typography variant="h4" sx={{ marginTop: 1.6 }}>
                    Target is not found
                  </Typography>
                  <Typography variant="caption">The list of distributed target will be listed here</Typography>
                </Box>
              ) : (
                <TargetTable plans={data} />
              )}
            </Grid>
          </Grid>
        </Grid>
      </PageContainer>

      <DistributeTarget
        add={open}
        onClose={handleModalClose}
        plan_id={state?.id}
        targets={state?.target}
        naming={PeriodNaming(state?.frequency?.name)}
      />
    </div>
  );
};

export default ViewPlan;
