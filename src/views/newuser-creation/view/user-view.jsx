import React, { useState, useEffect } from 'react';
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
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import TableNoData from '../table-no-data';

import config from '../../../configration/config';

export default function UserPage() {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0); // Total items from backend
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    position: '',
    started_date: '',
  });

  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
    
        const response = await fetch(`${config.API_URL_User_Create}/employees?page=${page + 1}&per_page=${rowsPerPage}`, {
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
          throw new Error(`Failed to fetch employees: ${response.statusText}`);
        }
    
        const result = await response.json();
        console.log('response:', response);
        
        if (result.success && Array.isArray(result.data.data)) {
          console.log('result:', result);
          setEmployees(result.data.data);
          setTotalItems(result.data.total);
          console.log('result:', result.data.total);
        } else {
          console.error('Expected an array but got:', result.data);
        }
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    };
    
    fetchEmployees();
  }, [page, rowsPerPage]); // Fetch employees when page or rowsPerPage changes

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = employees.map((n) => n.name);
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
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  const handleFilterByName = (event) => {
    setPage(0);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'started_date') {
      const formattedDate = new Date(value).toISOString().split('T')[0]; // Format to YYYY-MM-DD
      setNewUser((prevState) => ({
        ...prevState,
        [name]: formattedDate,
      }));
    } else {
      setNewUser((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleRegister = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const method = newUser.id ? 'PATCH' : 'POST'; // Use 'PATCH' for updating existing users
      const url = newUser.id 
        ? `${config.API_URL_User_Create}/employees/${newUser.id}` 
        : `${config.API_URL_User_Create}/employees`;
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
        },
        body: JSON.stringify(newUser),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 400 && result.message === 'Email already in use.') {
          alert('The email you entered is already in use. Please use a different email.');
        } else {
          console.error('Error response:', result);
          throw new Error(`HTTP error! status: ${response.status}, message: ${result.message}`);
        }
      } else {
        if (result.success) {
          if (newUser.id) {
            setEmployees(prevEmployees => 
              prevEmployees.map(user => 
                user.id === newUser.id ? result.data.employee : user
              )
            );
          } else {
            setEmployees(prevEmployees => [
              ...prevEmployees,
              result.data.employee
            ]);
          }
          handleClose();
          setNewUser({
            name: '',
            phone: '',
            email: '',
            password: '',
            position: '',
            started_date: '',
          });
        } else {
          console.error('Failed to create or update employee:', result.message);
        }
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employees.length) : 0;

  const isNotFound = employees.length === 0;

  return (
    <Container maxWidth="lg">


      <Card>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <UserTableToolbar
          numSelected={selected.length}
          onFilterName={handleFilterByName}
        />
        <Button variant="contained" onClick={handleOpen}       style={{ display: 'flex', justifySelf: 'end' }}
            sx={{
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light_icon,
              color: theme.palette.secondary.dark,
              '&[aria-controls="menu-list-grow"],&:hover': {
                background: theme.palette.secondary.dark_icon_hover,
                color: theme.palette.secondary.dark,
              },
              margin: '0 10px 0 0px',
            }}>
          New User
        </Button>
        </div>
        
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserTableHead
              order={order}
              orderBy={orderBy}
       
              rowCount={employees.length}
              numSelected={selected.length}
              onRequestSort={handleSort}
              onSelectAllClick={handleSelectAllClick}
              headLabel={[
                { id: 'name', label: 'Name', alignRight: false },
                { id: 'email', label: 'Email', alignRight: false },
                { id: 'phone', label: 'Phone', alignRight: false },
                { id: 'position', label: 'Position', alignRight: false },
                { id: 'started_date', label: 'Started Date', alignRight: false },
              ]}
            />
            <TableBody>
              {employees
                .map((row) => {
                  const { id, user,started_date } = row;
                  return (
                  <UserTableRow
                  key={id}
                  name={user?.name || 'N/A'}
                  email={user?.email || 'N/A'}
                  // password={user?.password || 'N/A'}
                  phone={user?.phone || 'N/A'}
                  position={row.position || 'N/A'}
                  started_date={started_date || 'N/A'}
                  selected={selected.indexOf(user?.name) !== -1}
                  handleClick={(event) => handleClick(event, user?.name)}
                  onEdit={() => handleEdit(id)} // Pass ID to onEdit
                  onDelete={() => handleDelete(id)} // Pass ID to onDelete
                />
                  );
})}
              <TableEmptyRows  emptyRows={emptyRows} />
              {isNotFound && (
                <TableNoData
                  colSpan={6}
                  title="No Users found"
                />
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalItems}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            name="name"
            value={newUser.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            name="email"
            value={newUser.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="phone"
            label="Phone"
            type="text"
            fullWidth
            variant="outlined"
            name="phone"
            value={newUser.phone}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            name="password"
            value={newUser.password}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="position"
            label="Position"
            type="text"
            fullWidth
            variant="outlined"
            name="position"
            value={newUser.position}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="started_date"
            label="Started Date"
            type="date"
            fullWidth
            variant="outlined"
            name="started_date"
            value={newUser.started_date}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRegister} color="primary">
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
