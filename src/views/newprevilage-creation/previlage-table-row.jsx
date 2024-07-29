import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import Iconify from '../../ui-component/iconify/iconify';

export default function PrevilageUserTableRow({
  selected,

name,

  description,


  handleClick,
}) {
  const [openMenu, setOpenMenu] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedData, setEditedData] = useState({
    name: name,
    description: description,


  });

  const handleOpenMenu = (event) => {
    setOpenMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
  };

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditSubmit = async () => {
    try {
      // Send PUT request to update the data on the backend
      const response = await axios.put(`https://droga-auth.amanueld.info/api/${editedData.id}`, editedData);
      
      if (response.data.success) {
        // Update the local state with the edited data if needed
        setPrevilage(prevState =>
          prevState.map(item =>
            item.id === editedData.id ? { ...item, ...editedData } : item
          )
        );
      } else {
        console.error('Failed to update data:', response.data.message);
      }
  
      console.log("Edited Data:", editedData);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  
    // Close the edit dialog
    handleCloseEditDialog();
  };
  
  const handleDelete = async (id) => {
    try {
      // Send DELETE request to remove the data on the backend
      const response = await axios.delete(`https://droga-auth.amanueld.info/api/${id}`);
  
      if (response.data.success) {
        // Update the local state to remove the deleted data
        setPrevilage(prevState => prevState.filter(item => item.id !== id));
        console.log("Deleted:", id);
      } else {
        console.error('Failed to delete data:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  
    // Close the menu after deletion
    handleCloseMenu();
  };
  
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell component="th">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </TableCell>
        
        <TableCell>{description}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
        <TextField
            margin="dense"
            name="name"
            label="Name"
            fullWidth
            value={editedData.name}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            name="description"
            label="description"
            fullWidth
            value={editedData.description}
            onChange={handleChange}
          />


        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Menu Popover */}
      <Popover
        open={!!openMenu}
        anchorEl={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleOpenEditDialog}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

PrevilageUserTableRow.propTypes = {
  handleClick: PropTypes.func,
  selected: PropTypes.bool,
  description: PropTypes.string,

};
