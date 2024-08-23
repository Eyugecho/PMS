import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Avatar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MoreVert } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UnitsTable = ({ units, onEdit, onDelete }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);

  const handleClick = (event, unit) => {
    setAnchorEl(event.currentTarget);
    setSelectedUnit(unit);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUnit(null);
  };

  const handleView = () => {
    navigate('/units/view', { state: selectedUnit });
    handleClose();
  };

  const handleOpenEditModal = () => {
    if (onEdit && selectedUnit) {
      onEdit(selectedUnit);
    }
    handleClose();
  };

  const handleDelete = () => {
    if (onDelete && selectedUnit) {
      onDelete(selectedUnit.id);
    }
    handleClose();
  };

  return (
    <Paper
      sx={{
        minHeight: '66dvh',
        border: 0.4,
        borderColor: theme.palette.grey[300],
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
    >
      <TableContainer>
        <Table
          sx={{
            minWidth: 650,
            borderCollapse: 'collapse'
          }}
          aria-label="Organization unit table"
        >
          <TableHead>
            <TableRow>
              {['Unit Name', 'Parent Unit', 'Unit Type', 'Manager', 'Actions'].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    background: theme.palette.grey[100],
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    borderBottom: `2px solid ${theme.palette.divider}`,
                    position: 'relative',
                    padding: '12px 16px',
                    '&:not(:last-of-type)': {
                      borderRight: `1px solid ${theme.palette.divider}`
                    }
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {units?.map((unit) => (
              <TableRow
                key={unit.id}
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 2,
                  '&:nth-of-type(odd)': {
                    backgroundColor: theme.palette.grey[50]
                  },
                  '&:hover': {
                    backgroundColor: theme.palette.grey[100]
                  }
                }}
              >
                <TableCell
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: 0,
                    padding: '12px 16px'
                  }}
                >
                  <Typography variant="subtitle3" sx={{ flexGrow: 1 }}>
                    {unit.name}
                  </Typography>
                </TableCell>

                <TableCell
                  sx={{
                    border: 0,
                    padding: '12px 16px'
                  }}
                >
                  {unit?.parent ? unit?.parent?.name : 'No Parent'}
                </TableCell>

                <TableCell
                  sx={{
                    border: 0,
                    padding: '12px 16px'
                  }}
                >
                  {unit.unit_type?.name}
                </TableCell>
                <TableCell
                  sx={{
                    border: 0,
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Avatar alt={unit.manager?.user?.name} sx={{ width: 25, height: 25, marginRight: 1 }} />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle3" sx={{ flexGrow: 1 }}>
                      {unit.manager?.user?.name}
                    </Typography>
                    <Typography variant="subtitle2">{unit.manager?.position}</Typography>
                  </div>
                </TableCell>
                <TableCell
                  sx={{
                    border: 0,
                    padding: '12px 16px'
                  }}
                >
                  <IconButton onClick={(event) => handleClick(event, unit)} size="small">
                    <MoreVert />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    sx={{
                      '& .MuiPaper-root': {
                        backdropFilter: 'blur(10px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        borderRadius: 2,
                        boxShadow: theme.shadows[1]
                      }
                    }}
                  >
                    <MenuItem onClick={handleView}>
                      <ListItemIcon>
                        <VisibilityIcon fontSize="small" style={{ paddingRight: '4px', color: 'gray' }} />
                      </ListItemIcon>
                      View
                    </MenuItem>
                    <MenuItem onClick={handleOpenEditModal}>
                      <ListItemIcon>
                        <EditIcon fontSize="small" style={{ paddingRight: '4px', color: '#11365A' }} />
                      </ListItemIcon>
                      Edit
                    </MenuItem>
                    {/* <MenuItem onClick={handleDelete}>
                      <ListItemIcon>
                        <DeleteIcon fontSize="small" style={{ paddingRight: '4px', color: 'red' }} />
                      </ListItemIcon>
                      Delete
                    </MenuItem> */}
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
export default UnitsTable;
