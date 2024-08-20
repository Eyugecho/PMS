import { useState } from 'react';
import { Box, CircularProgress, Grid, IconButton, Paper, TextField, Typography, useTheme } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { IconChevronRight, IconChevronUp } from '@tabler/icons-react';
import { useKPI } from 'context/KPIProvider';
import { MeasuringUnitConverter, PeriodNaming } from 'utils/function';
import Backend from 'services/backend';
import GetToken from 'utils/auth-token';

const TargetDistribution = () => {
  const theme = useTheme();
  const { selectedKpi, distributeTarget } = useKPI();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [expand, setExpand] = useState();

  const getFiscalYear = localStorage.getItem('selectFiscal');
  const SelectFiscalYear = JSON.parse(getFiscalYear);

  const handleFrequencySelection = (event, kpi_id, period_id) => {
    const value = event.target.value;

    distributeTarget(value, kpi_id, period_id);
  };

  const handleAccordion = (index, frequency_id) => {
    if (expand === index) {
      setExpand(null);
    } else {
      setExpand(index);
      handleFetchingPeriods(frequency_id);
    }
  };

  const handlePeriodCounts = (index, frequencies) => {
    if (frequencies > 1) {
      return index + 1;
    }
    return '';
  };

  const handleFetchingPeriods = async (frequency_id) => {
    setLoading(true);
    setData([]);
    const token = await GetToken();
    const Api = Backend.api + Backend.planningPeriods + `?fiscal_year=${SelectFiscalYear?.id}&frequency_id=${frequency_id}&type=planning`;
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
          setData(response.data.periods);
          setLoading(false);
          setError(false);
        } else {
          setLoading(false);
          setError(false);
        }
      })
      .catch((error) => {
        toast.error(error.message);
        setError(true);
        setLoading(false);
      });
  };

  return (
    <Box>
      {selectedKpi?.map((kpi, index) => (
        <Box key={index} sx={{ marginY: 2 }}>
          <Paper
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 1.6,
              border: 0.6,
              borderColor: theme.palette.divider,
              backgroundColor: theme.palette.primary.light,
              cursor: 'pointer',
              marginY: 0.4
            }}
            onClick={() => handleAccordion(index, kpi.frequency_id)}
          >
            <Typography variant="h4">{kpi?.name}</Typography>
            <Box>
              <Typography variant="caption"> Total target</Typography>
              <Typography variant="subtitle1">
                {' '}
                {kpi?.total_target}
                {MeasuringUnitConverter(kpi?.mu)}
              </Typography>
            </Box>
            <IconButton> {expand === index ? <IconChevronUp size={18} /> : <IconChevronRight size={18} />} </IconButton>
          </Paper>

          {expand === index && (
            <Box
              sx={{
                padding: 1.6,
                marginY: 0.4
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1">Evaluation frequency</Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.main,
                    paddingY: 0.4,
                    paddingX: 2,
                    borderRadius: 20,
                    marginLeft: 1
                  }}
                >
                  {kpi.f_name}
                </Typography>
              </Box>

              <Box sx={{ marginTop: 2, minHeight: '10dvh' }}>
                {loading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
                    <CircularProgress size={20} />
                  </Box>
                ) : error ? (
                  <Typography variant="subtitle1">Error fetching periods</Typography>
                ) : data.length === 0 ? (
                  <Typography variant="subtitle1">Please set period first</Typography>
                ) : (
                  <Grid container spacing={2}>
                    {data?.map((period, index) => {
                      const targetPeriod = kpi.targets?.find((target) => target.period_id === period.id);

                      return (
                        <Grid item xs={12} sm={6} md={4} key={period.id}>
                          <TextField
                            type="number"
                            label={`${PeriodNaming(kpi?.f_name)} ${handlePeriodCounts(index, kpi.f_value)}`}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={targetPeriod ? targetPeriod.target : ''}
                            onChange={(event) => handleFrequencySelection(event, kpi?.id, period.id)}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                )}
              </Box>
            </Box>
          )}
        </Box>
      ))}

      <ToastContainer />
    </Box>
  );
};

export default TargetDistribution;
