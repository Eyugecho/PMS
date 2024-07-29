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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Iconify from '../../ui-component/iconify/iconify';


// Add onEdit and onDelete props
export default function UserTableRow({
  selected,
  name,
  email,
  // password,
  phone,
  position,
  started_date,
  onEdit,
  onDelete,  // Add onDelete
  handleClick,
}) {
  const [openMenu, setOpenMenu] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedData, setEditedData] = useState({
    name: name,
    email: email,
    phone: phone,
    position: position,
    started_date: started_date,



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
  const handleDelete = () => {
    // Handle deletion here
    // This is where you would typically delete the row from your backend or state management
    console.log("Deleted:", name);
    handleCloseMenu(); // Close the menu after deletion
  };
  const handleEditSubmit = () => {
    // Update the row data with editedData
    // This is where you would typically update your backend or state management
    console.log("Edited Data:", editedData);

    // Close the edit dialog
    handleCloseEditDialog();
  };


  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </TableCell>

        <TableCell>{email}</TableCell>
        {/* <TableCell>{password}</TableCell> */}
        <TableCell>{phone}</TableCell>
        <TableCell>{position}</TableCell>
        <TableCell>{started_date}</TableCell>

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
            label="name"
            fullWidth
            value={editedData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="email"
            fullWidth
            value={editedData.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="phone"
            label="phone"
            fullWidth
            value={editedData.phone}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="position"
            label="position"
            fullWidth
            value={editedData.position}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="started_date"
            label="started_date"
            fullWidth
            value={editedData.started_date}
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

UserTableRow.propTypes = {
  selected: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,  // Add onDelete
};

