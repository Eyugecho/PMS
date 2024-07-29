import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import Iconify from '../../../ui-component/iconify/iconify';
// import Scrollbar from 'src/components/scrollbar';

import PrevilageTableNoData from '../previlage-table-no-data';
import PrevilageUserTableRow from '../previlage-table-row';
import PrevilageUserTableHead from '../previlage-table-head';
import PrevilageTableEmptyRows from '../previlage-table-empty-rows';
import PrevilageUserTableToolbar from '../previlage-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import config from '../../../configration/config';

export default function PrevilagePage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [previlage, setPrevilage] = useState([]);

  const [open, setOpen] = useState(false);
  const [newPrevilage, setNewPrevilage] = useState({
    name: '',
    description: '',
  });

  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // Fetch data from backend
    const fetchPrevilage = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await fetch(`${config.API_URL_Privilage}/permissions`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          console.log('response', response);
  
          if (response.status === 401) {
            console.error('Unauthorized. Redirecting to login...');
            window.location.href = 'http://localhost:4000/all/pages/login/login3';
            return;
          }
  
          if (!response.ok) {
            throw new Error(`Failed to fetch Privilage: ${response.statusText}`);
          }
          const result = await response.json();
          if (result.success && Array.isArray(result.data)) {
            setPrevilage(result.data);
          } else {
            console.error('Expected an array but got:', result.data);
          }
        } catch (error) {
          console.error('Failed to fetch Privilage:', error);
        }
    };

    fetchPrevilage();
  }, []);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = previlage.map((n) => n.name);
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
    setNewPrevilage((prevState) => ({
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

      const method = newPrevilage.id ? 'PATCH' : 'POST';
      const url = newPrevilage.id 
        ? `${config.API_URL_Privilage}/permissions/${newPrevilage.id}` 
        : `${config.API_URL_Privilage}/permissions`;

      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
        },
        body: JSON.stringify(newPrevilage),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 400 && result.message === 'already_exists privilage') {
          alert('Privilage already exists');
        } else {
          throw new Error(`HTTP error! status: ${response.status}, message: ${result.message}`);
        }
      } else {
        if (result.success) {
            setPrevilage((prevPrivilage) => [...prevPrivilage, result.data]);
          handleClose();
          setNewPrevilage({
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
        <DialogTitle>New Previlage</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={newPrevilage.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            value={newPrevilage.description}
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
          <PrevilageUserTableToolbar
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
            New Previlage
          </Button>
        </div>

        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <PrevilageUserTableHead
              order={order}
              orderBy={orderBy}
              rowCount={previlage.length}
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
              {previlage
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <PrevilageUserTableRow
                    key={row.uuid}
                    name={row.name}
                    description={row.description}
                    selected={selected.indexOf(row.name) !== -1}
                    handleClick={(event) => handleClick(event, row.name)}
                  />
                ))}

              <PrevilageTableEmptyRows
                height={77}
                emptyRows={emptyRows(page, rowsPerPage, previlage.length)}
              />

           
              {previlage.length === 0 && <PrevilageTableNoData query={filterName} />}

            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          page={page}
          component="div"
          count={previlage.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
