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
  MenuItem
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import UnitsTableNoData from '../unit-table-no-data';
import UnitsTableRow from '../unit-table-row';
import UnitsTableHead from '../unit-table-head';
import UnitsTableEmptyRows from '../unit-table-empty-rows';
import UnitsTableToolbar from '../unit-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import Iconify from '../../../ui-component/iconify/iconify';
import config from '../../../configration/config';

export default function RolePage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [units, setUnits] = useState([]);
  const [newUnits, setNewUnits] = useState({
    name: '',
    description: ''
  });

  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch(`${config.API_URL_Role}/roles`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 401) {
          console.error('Unauthorized. Redirecting to login...');
          window.location.href = 'http://localhost:4000/all/pages/login/login3';
          return;
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch Units: ${response.statusText}`);
        }

        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          setUnits(result.data);
        } else {
          console.error('Expected an array but got:', result.data);
        }
      } catch (error) {
        console.error('Failed to fetch Uints:', error);
      }
    };

    fetchUnits();
  }, []);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = units.map((n) => n.name);
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
    setNewUnits((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const method = newUnits.id ? 'PATCH' : 'POST';
      const url = newUnits.id 
        ? `${config.API_URL_Role}/roles/${newUnits.id}` 
        : `${config.API_URL_Role}/roles`;

      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
        },
        body: JSON.stringify(newUnits),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 400 && result.message === 'already_exists role') {
          alert('Role already exists');
        } else {
          throw new Error(`HTTP error! status: ${response.status}, message: ${result.message}`);
        }
      } else {
        if (result.success) {
          setUnits((prevUnits) => [...prevUnits, result.data]);
          handleClose();
          setNewUnits({
            name: '',
            description: ''
          });
        } else {
          console.error('Error creating role:', result.message);
        }
      }
    } catch (error) {
      console.error('Error creating role:', error);
    }
  };

  return (
    <Container>
     

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Units</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={newUnits.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            value={newUnits.description}
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
      <UnitsTableToolbar
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
            New Units
          </Button>
        </div>
  
        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <UnitsTableHead
              order={order}
              orderBy={orderBy}
              rowCount={units.length}
              numSelected={selected.length}
              onRequestSort={handleSort}
              onSelectAllClick={handleSelectAllClick}
              headLabel={[
                { id: 'name', label: 'Name' },
                { id: 'description', label: 'Description' },
                { id: '' },
              ]}
            />
            <TableBody>
              {units
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <UnitsTableRow
                    key={row.id}
                    name={row.name}
                    description={row.description}
                    selected={selected.indexOf(row.name) !== -1}
                    handleClick={(event) => handleClick(event, row.name)}
                  />
                ))}

              <UnitsTableEmptyRows
                height={77}
                emptyRows={emptyRows(page, rowsPerPage, units.length)}
              />

              {units.length === 0 && <UnitsTableNoData query={filterName} />}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          page={page}
          component="div"
          count={units.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
