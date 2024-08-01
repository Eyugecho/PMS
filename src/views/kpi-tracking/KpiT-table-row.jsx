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
import { fr } from '@faker-js/faker';

export default function KpiTTableRow({
  selected,

  kpi,

  period,
  measuringUnit,
  weight,
  frequency,
  unit,
  unitType,
// measuring,
// weight,


  handleClick,
}) {
  const [openMenu, setOpenMenu] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedData, setEditedData] = useState({
    kpi: kpi,
    period: period,
    measuringUnit: measuringUnit,
    weight: weight,
    frequency: frequency,
    unit: unit,
    unitType: unitType,
    // measuring: measuring,
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
    console.log("Deleted:", kpi);
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
            {kpi}
          </Typography>
        </TableCell>
        <TableCell>{unitType}</TableCell>
        
        <TableCell>{unit}</TableCell>
        
        <TableCell>{period}</TableCell>
        <TableCell>{measuringUnit}</TableCell>
        <TableCell>{frequency}</TableCell>
        <TableCell>{weight}</TableCell>


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
            name="kpi"
            label="kpi"
            fullWidth
            value={editedData.kpi}
            onChange={handleChange}
          />
        <TextField
            margin="dense"
            name="unitType"
            label="unitType"
            fullWidth
            value={editedData.unitType}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            name="unit"
            label="Units"
            fullWidth
            value={editedData.unit}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="period"
            label="Fiscal Year"
            fullWidth
            value={editedData.period}
            onChange={handleChange}
          />
        <TextField
            margin="dense"
            name="measuringUnit"
            label="measuringUnit"
            fullWidth
            value={editedData.measuringUnit}
            onChange={handleChange}
          />
        <TextField
            margin="dense"
            name="weight"
            label="weight"
            fullWidth
            value={editedData.weight}
            onChange={handleChange}
          />
        <TextField
            margin="dense"
            name="frequency"
            label="frequency"
            fullWidth
            value={editedData.frequency}
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

KpiTTableRow.propTypes = {
  handleClick: PropTypes.func,
  selected: PropTypes.bool,
  period: PropTypes.string,
  measuringUnit: PropTypes.string,
  kpi: PropTypes.string,
  weight: PropTypes.string,
  frequency: PropTypes.string,
  unittype: PropTypes.string,
  unit: PropTypes.string,
    // measuring: PropTypes.string,


};
