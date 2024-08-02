import { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, useTheme } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import Backend from 'services/backend';
import FrequencyMenu from './FrequencyMenu';

const FrequencySelection = () => {
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const getFiscalYear = localStorage.getItem('selectFiscal');
  const SelectFiscalYear = JSON.parse(getFiscalYear);
  const [selectedKpi, setSelectedKpi] = useState([]);

  const handleFrequencySelection = (item, id) => {
    setSelectedKpi((prevSelectedKpi) =>
      prevSelectedKpi.map((kpi, i) => (kpi.kpi_id === id ? { ...kpi, frequency_id: item.id, f_name: item.name, f_value: item.value } : kpi))
    );
  };

  useEffect(() => {
    const handleFetchingPeriods = () => {
      const token = localStorage.getItem('token');
      const Api = Backend.api + Backend.frequencies;
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

    handleFetchingPeriods();

    return () => {};
  }, [SelectFiscalYear.id]);

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
      <Box sx={{ padding: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ minWidth: 60 }}>Fiscal Year</TableCell>
              <TableCell sx={{ minWidth: 170 }}>KPI Name</TableCell>
              <TableCell sx={{ minWidth: 60 }}>Frequency</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedKpi?.map((kpi, index) => (
              <TableRow key={index}>
                <TableCell>{SelectFiscalYear ? SelectFiscalYear.year : 'Not selected'}</TableCell>
                <TableCell>{kpi.name}</TableCell>
                <TableCell>
                  {' '}
                  <FrequencyMenu menu={data} selected={kpi?.f_name} onSelect={(menu) => handleFrequencySelection(menu, kpi.kpi_id)} />
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

export default FrequencySelection;
