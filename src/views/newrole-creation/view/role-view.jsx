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
import RoleTableNoData from '../role-table-no-data';
import RoleTableRow from '../role-table-row';
import RoleTableHead from '../role-table-head';
import RoleTableEmptyRows from '../role-table-empty-rows';
import RoleTableToolbar from '../role-table-toolbar';
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
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({
    name: '',
    description: ''
  });

  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const fetchRoles = async () => {
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
          throw new Error(`Failed to fetch Roles: ${response.statusText}`);
        }

        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          setRoles(result.data);
        } else {
          console.error('Expected an array but got:', result.data);
        }
      } catch (error) {
        console.error('Failed to fetch Roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = roles.map((n) => n.name);
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
    setNewRole((prevState) => ({
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

      const method = newRole.id ? 'PATCH' : 'POST';
      const url = newRole.id 
        ? `${config.API_URL_Role}/roles/${newRole.id}` 
        : `${config.API_URL_Role}/roles`;

      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
        },
        body: JSON.stringify(newRole),
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
          setRoles((prevRoles) => [...prevRoles, result.data]);
          handleClose();
          setNewRole({
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
        <DialogTitle>New Role</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={newRole.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            value={newRole.description}
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
      <RoleTableToolbar
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
            New Role
          </Button>
        </div>
  
        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <RoleTableHead
              order={order}
              orderBy={orderBy}
              rowCount={roles.length}
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
              {roles
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <RoleTableRow
                    key={row.id}
                    name={row.name}
                    description={row.description}
                    selected={selected.indexOf(row.name) !== -1}
                    handleClick={(event) => handleClick(event, row.name)}
                  />
                ))}

              <RoleTableEmptyRows
                height={77}
                emptyRows={emptyRows(page, rowsPerPage, roles.length)}
              />

              {roles.length === 0 && <RoleTableNoData query={filterName} />}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          page={page}
          component="div"
          count={roles.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
