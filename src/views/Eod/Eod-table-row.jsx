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

import Iconify from '../../ui-component/iconify/iconify';

export default function EodTableRow({
  selected,

name,

perspective,
// category,
measuring,
// weight,


  handleClick,
}) {
  const [openMenu, setOpenMenu] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedData, setEditedData] = useState({
    name: name,
    perspective: perspective,
    // category: category,
    measuring: measuring,
    // weight: weight,


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

  const handleEditSubmit = () => {
    // Update the row data with editedData
    // This is where you would typically update your backend or state management
    console.log("Edited Data:", editedData);

    // Close the edit dialog
    handleCloseEditDialog();
  };

  const handleDelete = () => {
    // Handle deletion here
    // This is where you would typically delete the row from your backend or state management
    console.log("Deleted:", name);
    handleCloseMenu(); // Close the menu after deletion
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
        
        <TableCell>{perspective}</TableCell>
        {/* <TableCell>{category}</TableCell> */}
        <TableCell>{measuring}</TableCell>
        {/* <TableCell>{weight}</TableCell> */}

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Unit</DialogTitle>
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
            name="perspective"
            label="perspective"
            fullWidth
            value={editedData.perspective}
            onChange={handleChange}
          />
        {/* <TextField
            margin="dense"
            name="category"
            label="category"
            fullWidth
            value={editedData.category}
            onChange={handleChange}
          /> */}
        <TextField
            margin="dense"
            name="measuring"
            label="categmeasuringory"
            fullWidth
            value={editedData.measuring}
            onChange={handleChange}
          />
        {/* <TextField
            margin="dense"
            name="weight"
            label="weight"
            fullWidth
            value={editedData.weight}
            onChange={handleChange}
          /> */}

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

EodTableRow.propTypes = {
  handleClick: PropTypes.func,
  selected: PropTypes.bool,
  perspective: PropTypes.string,
  // category: PropTypes.string,
  name: PropTypes.string,
    measuring: PropTypes.string,


};
