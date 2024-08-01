import { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, IconButton, TextField, Typography, useTheme } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import Backend from 'services/backend';
import { IconChevronRight, IconChevronUp } from '@tabler/icons-react';

const TargetDistribution = () => {
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const getFiscalYear = localStorage.getItem('selectFiscal');
  const SelectFiscalYear = JSON.parse(getFiscalYear);
  const [selectedKpi, setSelectedKpi] = useState([]);
  const [expand, setExpand] = useState(null);

  const handleFrequencySelection = (event, kpi_id, period_id) => {
    const value = event.target.value;
    setSelectedKpi((prevSelectedKpi) =>
      prevSelectedKpi.map((kpi) => {
        if (kpi.kpi_id === kpi_id) {
          if (kpi.targets) {
            const periodExists = kpi.targets.some((targeted) => targeted.period_id === period_id);
            const newTargetPeriod = periodExists
              ? kpi.targets.map((targeted) => (targeted.period_id === period_id ? { ...targeted, target: value } : targeted))
              : [...kpi.targets, { period_id: period_id, target: value }];
            return { ...kpi, targets: newTargetPeriod };
          } else {
            return { ...kpi, targets: [{ period_id: period_id, target: value }] };
          }
        }
        return kpi;
      })
    );
  };

  const handleAccordion = (index, frequency_id) => {
    if (expand === index) {
      setExpand(null);
    } else {
      setExpand(index);
      handleFetchingPeriods(frequency_id);
    }
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

  const handleAnnumName = (index, frequencies) => {
    if (frequencies > 1) {
      return index + 1;
    }
    return '';
  };

  const handleFetchingPeriods = (frequency_id) => {
    setLoading(true);
    setData([]);
    const token = localStorage.getItem('token');
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

  useEffect(() => {
    const kpiSelected = localStorage.getItem('selectedKPI');
    const parseKPI = kpiSelected ? JSON.parse(kpiSelected) : [];

    setSelectedKpi(parseKPI);
  }, []);

  useEffect(() => {
    if (selectedKpi.length > 0) {
      localStorage.setItem('selectedKPI', JSON.stringify(selectedKpi));
    }
  }, [selectedKpi]);

  return (
    <Box>
      {selectedKpi?.map((kpi, index) => (
        <Box key={index} sx={{ marginY: 2 }}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 1.6,
              border: 0.6,
              borderRadius: 2,
              borderColor: theme.palette.primary.main,
              backgroundColor: theme.palette.grey[50],
              cursor: 'pointer',
              marginY: 0.4
            }}
            onClick={() => handleAccordion(index, kpi.frequency_id)}
          >
            <Typography variant="body2">{kpi?.name}</Typography>
            <Box>
              <Typography variant="caption"> Total target</Typography>
              <Typography variant="subtitle1"> {kpi?.total_target}</Typography>
            </Box>
            <IconButton> {expand === index ? <IconChevronUp size={18} /> : <IconChevronRight size={18} />} </IconButton>
          </Box>

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
                  //   <TargetInputField count={kpi?.f_value} name={handleTargetNaming(kpi?.f_name)} />
                  <Grid container spacing={2}>
                    {data?.map((period, index) => {
                      const targetPeriod = kpi.targets?.find((target) => target.period_id === period.id);

                      return (
                        <Grid item xs={12} sm={6} md={4} key={period.id}>
                          <TextField
                            type="number"
                            label={`${handleTargetNaming(kpi?.f_name)} ${handleAnnumName(index, kpi.f_value)}`}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={targetPeriod ? targetPeriod.target : ''}
                            onChange={(event) => handleFrequencySelection(event, kpi?.kpi_id, period.id)}
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
