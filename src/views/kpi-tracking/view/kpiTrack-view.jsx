import React, { useState, useEffect } from 'react';
import {
  Card,
  Stack,
  Table,
  Button,
  Container,
  TableBody,
  Typography,
  TableContainer,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import KpiTTableNoData from '../KpiT-table-no-data';
import KpiTTableRow from '../KpiT-table-row';
import KpiTTableHead from '../KpiT-table-head';
import KpiTTableEmptyRows from '../KpiT-table-empty-rows';
import KpiTTableToolbar from '../KpiT-table-toolbar';
import { emptyRows, getComparator } from '../utils';
import Iconify from '../../../ui-component/iconify/iconify';
import config from '../../../configration/config';
import axios from 'axios';

export default function KpiTracking() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('kpi');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [kpis, setKpis] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [frequencies, setFrequencies] = useState([]);
  const [units, setUnits] = useState([]);
  const [measuringUnits, setMeasuringUnits] = useState([]);
  const [unitTypes, setUnitTypes] = useState([]);
  const [selectedUnitType, setSelectedUnitType] = useState('');
  const [newTracking, setNewTracking] = useState({
    kpi: '',
    period: '',
    measuringUnit: '',
    weight: '',
    frequency:'',
    unit: '',
    unitType: ''
  });
  const [trackingData, setTrackingData] = useState([]);

  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // Fetch KPI data
    const storedKpis = localStorage.getItem('kpis');
    if (storedKpis) {
      setKpis(JSON.parse(storedKpis));
    }

    // Fetch periods
    const storedPeriods = localStorage.getItem('periods');
    if (storedPeriods) {
      setPeriods(JSON.parse(storedPeriods));
    }

    // Fetch measuring units
    const storedMeasuringUnits = localStorage.getItem('measuring');
    if (storedMeasuringUnits) {
      setMeasuringUnits(JSON.parse(storedMeasuringUnits));
    }

    // Fetch tracking data
    const storedTrackingData = localStorage.getItem('trackingData');
    if (storedTrackingData) {
      setTrackingData(JSON.parse(storedTrackingData));
    }
    // Fetch Frequencies
        const storedFrequencies = localStorage.getItem('frequencies');
        if (storedFrequencies) {
          setFrequencies(JSON.parse(storedFrequencies));
        }
    // Fetch unit from API endpoint
    // const fetchUnits = async () => {
    //   try {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //       throw new Error('No token found');
    //     }

    //     const response = await fetch(`${config.API_URL_Units}/units`, {
    //       method: 'GET',
    //       headers: {
    //         'Authorization': `Bearer ${token}`,
    //         'Content-Type': 'application/json'
    //       }
    //     });

    //     if (response.status === 401) {
    //       console.error('Unauthorized. Redirecting to login...');
    //       window.location.href = 'http://localhost:4000/all/pages/login/login3';
    //       return;
    //     }

    //     if (!response.ok) {
    //       throw new Error(`Failed to fetch Units: ${response.statusText}`);
    //     }

    //     const result = await response.json();
    //     if (result.success && Array.isArray(result.data.data)) {
    //       setUnits(result.data.data);
    //     } else {
    //       console.error('Expected an array but got:', result.data);
    //     }
    //   } catch (error) {
    //     console.error('Failed to fetch Uints:', error);
    //   }

    // };

    // fetchUnits();
      // Fetch unit types from the backend
  // const fetchUnitTypes = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //       throw new Error('No token found');
  //     }

  //     const response = await fetch(`${config.API_URL_Units}/unit-types`, {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json'
  //       }
  //     });

  //     if (response.status === 401) {
  //       console.error('Unauthorized. Redirecting to login...');
  //       window.location.href = 'http://localhost:4000/all/pages/login/login3';
  //       return;
  //     }

  //     if (!response.ok) {
  //       throw new Error(`Failed to fetch unit types: ${response.statusText}`);
  //     }

  //     const result = await response.json();
  //     console.log(result);
  //     if (result.success && Array.isArray(result.data)) {
  //       setUnitTypes(result.data);
  //     } else {
  //       console.error('Expected an array but got:', result.data);
  //     }
  //   } catch (error) {
  //     console.error('Failed to fetch unit types:', error);
  //   }
  // };

  // fetchUnitTypes();

 // Fetch unit types and units from the backend
 // Fetch unit types and units from the backend
 const fetchUnitTypesWithUnits = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const unitTypesResponse = await fetch(`${config.API_URL_Units}/unit-types`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (unitTypesResponse.status === 401) {
      console.error('Unauthorized. Redirecting to login...');
      window.location.href = 'http://localhost:4000/all/pages/login/login3';
      return;
    }

    if (!unitTypesResponse.ok) throw new Error(`Failed to fetch unit types: ${unitTypesResponse.statusText}`);

    const unitTypesResult = await unitTypesResponse.json();
    if (!unitTypesResult.success || !Array.isArray(unitTypesResult.data)) {
      console.error('Expected an array of unit types but got:', unitTypesResult.data);
      throw new Error('Expected an array of unit types but got incorrect data structure.');
    }

    const unitTypes = unitTypesResult.data;
    setUnitTypes(unitTypes);

    // Fetch units for each unit type
    const unitsPromises = unitTypes.map(unitType =>
      fetch(`${config.API_URL_Units}/unit-by-type/${unitType.id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
    );

    const unitsResults = await Promise.all(unitsPromises);

    // Map units by their type
    const unitsByType = unitsResults.reduce((acc, unitsResult, index) => {
      if (unitsResult.success && Array.isArray(unitsResult.data)) {
        acc[unitTypes[index].id] = unitsResult.data;
      }
      return acc;
    }, {});

    setUnits(unitsByType);
  } catch (error) {
    console.error('Failed to fetch unit types or units:', error);
  }
};

fetchUnitTypesWithUnits();
  
  

  }, []);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = trackingData.map((n) => n.kpi);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, kpi) => {
    const selectedIndex = selected.indexOf(kpi);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, kpi);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTracking((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleUnitTypeChange = (event) => {
    const selectedUnitTypeId = event.target.value;
    setNewTracking({
      ...newTracking,
      unitType: selectedUnitTypeId,
      units: '' // Reset unit when unit type changes
    });
  };

  const handleUnitChange = (event) => {
    setNewTracking({
      ...newTracking,
      unit: event.target.value
    });
  };
  const handleRegister = async () => {
    const updatedTrackingData = [...trackingData, newTracking];
    setTrackingData(updatedTrackingData);
    localStorage.setItem('trackingData', JSON.stringify(updatedTrackingData));
    handleClose();
    setNewTracking({
      kpi: '',
      period: '',
      measuringUnit: '',
      weight: '',
      frequency:'',
      unit: '',
      unitType: ''
    });
  };

  return (
    <Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Kpi Tracking</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>KPI</InputLabel>
            <Select
              name="kpi"
              value={newTracking.kpi}
              onChange={handleChange}
            >
              {kpis.map((kpi, index) => (
                <MenuItem key={index} value={kpi.name}>
                  {kpi.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Fiscal Year</InputLabel>
            <Select
              name="period"
              value={newTracking.period}
              onChange={handleChange}
            >
              {periods.map((period, index) => (
                <MenuItem key={index} value={period.fiscalYear}>
                  {period.fiscalYear}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Unit Type</InputLabel>
            <Select
              name="unitType"
              value={selectedUnitType}
              onChange={handleUnitTypeChange}
            >
              {unitTypes.map((unitType) => (
                <MenuItem key={unitType.id} value={unitType.id}>
                  {unitType.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel>Units</InputLabel>
              <Select
                name="unit"
                value={newTracking.unit}
                onChange={handleChange}
              >
                {units[selectedUnitType]?.map((unit, index) => (
                  <MenuItem key={index} value={unit.name}>
                    {unit.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Frequencies</InputLabel>
            <Select
              name="frequency"
              value={newTracking.frequency}
              onChange={handleChange}
            >
              {frequencies.map((frequency, index) => (
                <MenuItem key={index} value={frequency.name}>
                  {frequency.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* <TextField
            margin="dense"
            name="value"
            label="Value"
            type="number"
            fullWidth
            value={newTracking.value}
            onChange={handleChange}
          /> */}
            <TextField
            margin="dense"
            name="weight"
            label="Weight"
            type="number"
            fullWidth
            value={newTracking.weight}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleRegister} variant="contained">
            Register
          </Button>
        </DialogActions>
      </Dialog>

      <Card>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <KpiTTableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
          <Button
            variant="contained"
            onClick={handleOpen}
            style={{ display: 'flex', justifySelf: 'end' }}
            sx={{
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light_icon,
              color: theme.palette.secondary.dark,
              '&[aria-controls="menu-list-grow"],&:hover': {
                background: theme.palette.secondary.dark_icon_hover,
                color: theme.palette.secondary.dark,
              },
              margin: '0 10px 0 0px',
            }}
          >
            Add
          </Button>
        </div>

        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <KpiTTableHead
              order={order}
              orderBy={orderBy}
              rowCount={trackingData.length}
              numSelected={selected.length}
              onRequestSort={handleSort}
              onSelectAllClick={handleSelectAllClick}
              headLabel={[
                { id: 'kpi', label: 'KPI' },
                { id: 'unitType', label: 'Unit Type' },
                { id: 'unit', label: 'Unit' },
                { id: 'period', label: 'Fiscal Year' },
                { id: 'measuringUnit', label: 'Measuring Unit' },
                { id: 'frequency', label: 'Frequency' },
                { id: 'weight', label: 'Weight' },
                { id: '' },
              ]}
            />
            <TableBody>
              {trackingData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <KpiTTableRow
                    key={index}
                    kpi={row.kpi}
                    period={row.period}
                    unitType={row.unitType}
                    unit={row.unit}
                    measuringUnit={row.measuringUnit}
                    weight={row.weight}
                    frequency={row.frequency}
                    selected={selected.indexOf(row.kpi) !== -1}
                    handleClick={(event) => handleClick(event, row.kpi)}
                  />
                ))}
              <KpiTTableEmptyRows
                height={emptyRows(page, rowsPerPage, trackingData.length)}
                emptyRows={emptyRows(page, rowsPerPage, trackingData.length)}
              />
              {/* <KpiTTableNoData
                isNotFound={!applyFilter({
                  data: trackingData,
                  comparator: getComparator(order, orderBy),
                  filterName,
                }).length}
                filterName={filterName}
              /> */}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={trackingData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
