import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, CssBaseline, Divider, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { IconCircleCheckFilled, IconDotsVertical } from '@tabler/icons-react';
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

const ViewPlan = () => {
  const { state } = useLocation();

  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

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

  useEffect(() => {
    const handleFetchingDistribution = () => {
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

    handleFetchingDistribution();

    return () => {};
  }, [state?.id]);
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
            paddingY: 2,
            paddingX: 2
          }}
        >
          <TableContainer component={Paper}>
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
          <Grid container marginTop={1}>
            <Grid
              xs={12}
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              {state?.target?.map((target, index) => (
                <Box
                  key={index}
                  sx={{
                    minWidth: 140,
                    margin: 2,
                    paddingY: 1,
                    paddingX: 2,
                    borderRadius: 2,
                    backgroundColor: theme.palette.background.default
                  }}
                >
                  <Typography variant="body2">
                    {handleTargetNaming(state?.frequency?.name)} {index + 1}
                  </Typography>
                  <Box sx={{ paddingX: 2 }}>
                    <Typography variant="h2" sx={{ marginY: 2 }}>
                      {target.target}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Grid>
            <Button variant="contained" sx={{ margin: 2, boxShadow: 0 }} onClick={() => handleDistributeClick()}>
              Distribute Targets
            </Button>
          </Grid>

          <Grid
            xs={12}
            sx={{ minHeight: '60dvh', marginTop: 2, borderRadius: 2, padding: 2, backgroundColor: theme.palette.background.default }}
          >
            <Box sx={{ borderBottom: 0.4, borderColor: theme.palette.grey[200], paddingY: 1 }}>
              <Typography variant="h4">Target Ditributed</Typography>
            </Box>

            <UnitKpi column={DistributedKPIColumns} kpi={UnitKpiData} />

            {loading ? (
              <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress size={22} />
              </Box>
            ) : error ? (
              <Fallbacks severity="error" title="Server error" description="There is error fetching targets" />
            ) : data.length === 0 ? (
              <Fallbacks
                severity="kpi"
                title="There is no target found"
                description="The list of target for KPI will be listed here"
                sx={{ paddingTop: 6 }}
              />
            ) : (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="KPI table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Fiscal Year</TableCell>
                      <TableCell>KPI Name</TableCell>
                      <TableCell>KPI Weights</TableCell>
                      <TableCell>Total Targets</TableCell>
                      <TableCell>Measuring Unit</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconCircleCheckFilled size={20} />
                        <Typography variant="body2" sx={{ marginLeft: 2 }}>
                          {state?.fiscal_year.year}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">{state?.kpi?.name}</Typography>
                      </TableCell>
                      <TableCell>{state?.weight}</TableCell>
                      <TableCell>{state?.total_target}</TableCell>
                      <TableCell>{state?.kpi?.measuring_unit?.name}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>
        </Grid>
      </PageContainer>

      <DistributeTarget
        add={open}
        onClose={handleModalClose}
        plan_id={state?.id}
        targets={state?.target}
        handleSubmission={() => alert('submission')}
        naming={PeriodNaming(state?.frequency?.name)}
      />
    </div>
  );
};

export default ViewPlan;
