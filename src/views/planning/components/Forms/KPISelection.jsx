import { useEffect, useState } from 'react';
import { Box, Chip, Grid, InputBase, Table, TableBody, TableCell, TableHead, TableRow, useTheme } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { useKPI } from 'context/KPIProvider';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Backend from 'services/backend';
import ActivityIndicator from 'ui-component/indicators/ActivityIndicator';
import ErrorPrompt from 'utils/components/ErrorPrompt';
import noresult from '../../../../assets/images/no_result.png';
import GetToken from 'utils/auth-token';

const KPISelection = () => {
  const theme = useTheme();
  const { selectedKpi, addOrRemoveKPI, updateKPI } = useKPI();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState(' ');

  const handleSelection = (event, newValue) => {
    const newlySelectedKpis = newValue;
    const previouslySelectedKpis = selectedKpi;

    const addedKpis = newlySelectedKpis.filter((kpi) => !previouslySelectedKpis.some((existingKpi) => existingKpi.id === kpi.id));
    const removedKpis = previouslySelectedKpis.filter((kpi) => !newlySelectedKpis.some((newKpi) => newKpi.id === kpi.id));

    addedKpis.forEach((kpi) => addOrRemoveKPI(kpi));
    removedKpis.forEach((kpi) => addOrRemoveKPI(kpi));
  };

  const handleWeightChange = (event, id) => {
    const newWeight = event.target.value;
    updateKPI(id, { weight: newWeight });
  };

  const handleTargetChange = (event, id) => {
    const newTarget = event.target.value;
    updateKPI(id, { total_target: newTarget });
  };

  useEffect(() => {
    const handleFetchingKPI = async () => {
      const token = await GetToken();
      const Api = Backend.api + Backend.kpi + `?search=${search}`;
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
            setData(response.data.data);
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

    const delayDebounceFn = setTimeout(() => {
      if (search) {
        handleFetchingKPI();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <Box>
      {loading ? (
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 8
            }}
          >
            <ActivityIndicator size={20} />
          </Grid>
        </Grid>
      ) : error ? (
        <ErrorPrompt image={noresult} title="Server Error" message="Unable to retrive kpi" />
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Autocomplete
              id="kpi-list"
              multiple
              options={data}
              getOptionLabel={(option) => option.name}
              value={selectedKpi}
              onChange={handleSelection}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => <Chip key={index} label={option.name} {...getTagProps({ index })} />)
              }
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select a KPI"
                  variant="outlined"
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? <ActivityIndicator size={16} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    )
                  }}
                />
              )}
              disableClearable
            />
          </Box>

          <Box sx={{ padding: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 130 }}>KPI Name</TableCell>
                  <TableCell sx={{ minWidth: 60 }}>Weight(%)</TableCell>
                  <TableCell sx={{ minWidth: 100 }}>Measured by</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Target</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedKpi?.map((kpi, index) => (
                  <TableRow key={index}>
                    <TableCell>{kpi.name}</TableCell>
                    <TableCell>
                      <InputBase
                        sx={{ p: 0.5, border: 1, borderRadius: 2, borderColor: theme.palette.primary.main }}
                        value={kpi.weight}
                        onChange={(event) => handleWeightChange(event, kpi.id)}
                        inputProps={{ 'aria-label': 'weight' }}
                        type="number"
                      />
                    </TableCell>
                    <TableCell sx={{ textTransform: 'capitalize' }}>{kpi.mu}</TableCell>
                    <TableCell>
                      <InputBase
                        sx={{ p: 0.5, border: 1, borderRadius: 2, borderColor: theme.palette.primary.main }}
                        value={kpi.total_target}
                        onChange={(event) => handleTargetChange(event, kpi.id)}
                        inputProps={{ 'aria-label': 'target' }}
                        type="number"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </>
      )}
      <ToastContainer />
    </Box>
  );
};

export default KPISelection;
