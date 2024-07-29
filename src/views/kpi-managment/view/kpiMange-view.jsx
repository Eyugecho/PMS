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
import KpiMTableNoData from '../KpiM-table-no-data';
import KpiMTableRow from '../KpiM-table-row';
import KpiMTableHead from '../KpiM-table-head';
import KpiMTableEmptyRows from '../KpiM-table-empty-rows';
import KpiMTableToolbar from '../KpiM-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import Iconify from '../../../ui-component/iconify/iconify';
import config from '../../../configration/config';

export default function KpiManagement() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [kpis, setKpis] = useState([]);
  const [newKpi, setNewKpi] = useState({
    name: '',
    perspective: '',
    category: '',
    measuring: '',
    weight: ''
  });
  const [perspectives, setPerspectives] = useState([]);
  const [categories, setCategories] = useState([]);
  const [measuring, setMeasuring] = useState([]);

  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // Fetch registered perspectives
    const storedPerspectives = localStorage.getItem('perceptive');
    if (storedPerspectives) {
      setPerspectives(JSON.parse(storedPerspectives));
    }

    // Fetch registered categories
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }

    // Fetch registered measuring units
    const storedMeasuring = localStorage.getItem('measuring');
    if (storedMeasuring) {
      setMeasuring(JSON.parse(storedMeasuring));
    }

    // Fetch registered KPIs
    const storedKpis = localStorage.getItem('kpis');
    if (storedKpis) {
      setKpis(JSON.parse(storedKpis));
    }
  }, []);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = kpis.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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
    setNewKpi((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    const updatedKpis = [...kpis, newKpi];
    setKpis(updatedKpis);
    localStorage.setItem('kpis', JSON.stringify(updatedKpis));
    handleClose();
    setNewKpi({
      name: '',
      perspective: '',
      category: '',
      measuring: '',
      weight: ''
    });
  };

  const renderWeightInput = () => {
    switch (newKpi.measuring) {
      case 'number':
        return (
          <TextField
            margin="dense"
            name="weight"
            label="Weight"
            type="number"
            fullWidth
            value={newKpi.weight}
            onChange={handleChange}
          />
        );
      case 'percent':
        return (
          <TextField
            margin="dense"
            name="weight"
            label="Weight (%)"
            type="number"
            fullWidth
            value={newKpi.weight}
            onChange={handleChange}
            inputProps={{ min: 0, max: 100 }}
          />
        );
      // Add more cases as needed for other types of measuring units
      default:
        return (
          <TextField
            margin="dense"
            name="weight"
            label="Weight"
            type="text"
            fullWidth
            value={newKpi.weight}
            onChange={handleChange}
          />
        );
    }
  };

  return (
    <Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New KPI</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={newKpi.name}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Perspective</InputLabel>
            <Select
              name="perspective"
              value={newKpi.perspective}
              onChange={handleChange}
            >
              {perspectives.map((perspective, index) => (
                <MenuItem key={index} value={perspective}>
                  {perspective}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={newKpi.category}
              onChange={handleChange}
            >
              {categories.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Measuring Unit</InputLabel>
            <Select
              name="measuring"
              value={newKpi.measuring}
              onChange={handleChange}
            >
              {measuring.map((measuring, index) => (
                <MenuItem key={index} value={measuring.unit}>
                  {measuring.unit} ({measuring.type})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {renderWeightInput()}
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
          <KpiMTableToolbar
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
            New KPI
          </Button>
        </div>

        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <KpiMTableHead
              order={order}
              orderBy={orderBy}
              rowCount={kpis.length}
              numSelected={selected.length}
              onRequestSort={handleSort}
              onSelectAllClick={handleSelectAllClick}
              headLabel={[
                { id: 'name', label: 'Name' },
                { id: 'perspective', label: 'Perspective' },
                { id: 'category', label: 'Category' },
                { id: 'measuring', label: 'Measuring Unit' },
                { id: 'weight', label: 'Weight' },
                { id: '' },
              ]}
            />
            <TableBody>
              {kpis
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <KpiMTableRow
                    key={index}
                    name={row.name}
                    perspective={row.perspective}
                    category={row.category}
                    measuring={row.measuring}
                    weight={row.weight}
                    selected={selected.indexOf(row.name) !== -1}
                    handleClick={(event) => handleClick(event, row.name)}
                  />
                ))}
              <KpiMTableEmptyRows
                height={77}
                emptyRows={emptyRows(page, rowsPerPage, kpis.length)}
              />
              {kpis.length === 0 && <KpiMTableEmptyRows query={filterName} />}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={kpis.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
