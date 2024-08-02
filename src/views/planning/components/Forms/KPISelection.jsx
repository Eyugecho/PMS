import { useEffect, useState } from 'react';
import { Box, Chip, IconButton, InputBase, Table, TableBody, TableCell, TableHead, TableRow, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { KPIData } from './kpi';
import { ToastContainer, toast } from 'react-toastify';
import Backend from 'services/backend';

const KPISelection = () => {
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const getFiscalYear = localStorage.getItem('selectFiscal');
  const SelectFiscalYear = JSON.parse(getFiscalYear);
  const [selectedKpi, setSelectedKpi] = useState([]);

  const handleSelection = (event, value) => {
    setSelectedKpi(
      value.map((kpi) => ({
        kpi_id: kpi?.id,
        name: kpi?.name,
        weight: 0,
        mu: kpi?.measuring_unit?.name,
        total_target: ''
      }))
    );
  };

  const handleWeightChange = (event, id) => {
    const value = event.target.value;
    const newWeight = parseFloat(value);

    const newSelectedKpi = selectedKpi.map((kpi, i) => (kpi.kpi_id === id ? { ...kpi, weight: newWeight ? newWeight : 0 } : kpi));

    const totalWeight = newSelectedKpi.reduce((sum, kpi) => sum + parseFloat(kpi.weight), 0);
    if (totalWeight > 100) {
      toast.warn('Total weight exceeded 100%');
    } else {
      setSelectedKpi(newSelectedKpi);
    }
  };

  const handleTargetChange = (event, id) => {
    const value = event.target.value;
    setSelectedKpi((prevSelectedKpi) => prevSelectedKpi.map((kpi, i) => (kpi.kpi_id === id ? { ...kpi, total_target: value } : kpi)));
  };

  useEffect(() => {
    const handleFetchingKPI = () => {
      const token = localStorage.getItem('token');
      const Api = Backend.api + Backend.kpi;
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

    handleFetchingKPI();

    return () => {};
  }, []);

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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Autocomplete
          multiple
          options={data}
          getOptionLabel={(option) => option.name}
          onChange={handleSelection}
          renderTags={(value, getTagProps) => value.map((option, index) => <Chip label={option.name} {...getTagProps({ index })} />)}
          fullWidth
          renderInput={(params) => <TextField {...params} label="Select a KPI" variant="outlined" />}
        />
      </Box>

      <Box sx={{ padding: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ minWidth: 60 }}>Fiscal Year</TableCell>
              <TableCell sx={{ minWidth: 140 }}>KPI Name</TableCell>
              <TableCell sx={{ minWidth: 60 }}>Weight(%)</TableCell>
              <TableCell sx={{ minWidth: 120 }}>Measuring Unit</TableCell>
              <TableCell sx={{ minWidth: 100 }}>Target</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedKpi?.map((kpi, index) => (
              <TableRow key={index}>
                <TableCell>{SelectFiscalYear ? SelectFiscalYear.year : 'Not selected'}</TableCell>
                <TableCell>{kpi.name}</TableCell>
                <TableCell>
                  <InputBase
                    sx={{ p: 0.5, border: 1, borderRadius: 2, borderColor: theme.palette.primary.main }}
                    value={kpi.weight}
                    onChange={(event) => handleWeightChange(event, kpi.kpi_id)}
                    inputProps={{ 'aria-label': 'weight' }}
                    type="number"
                  />
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }}>{kpi.mu}</TableCell>
                <TableCell>
                  <InputBase
                    sx={{ p: 0.5, border: 1, borderRadius: 2, borderColor: theme.palette.primary.main }}
                    value={kpi.total_target}
                    onChange={(event) => handleTargetChange(event, kpi.kpi_id)}
                    inputProps={{ 'aria-label': 'target' }}
                    type="number"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <ToastContainer />
    </Box>
  );
};

export default KPISelection;
