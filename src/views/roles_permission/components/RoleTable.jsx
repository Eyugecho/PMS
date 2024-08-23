import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  TableHead,
  TableRow,
  IconButton,
  TableContainer,
  Paper,
  useTheme,
  Box,
  CircularProgress,
  Typography,
  TextField,
  ListItem,
  ListItemIcon
} from '@mui/material';
import { toast } from 'react-toastify';
import { MoreHoriz, MoreVert } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import Backend from 'services/backend';
import Fallbacks from 'utils/components/Fallbacks';
import DeletePrompt from 'ui-component/modal/DeletePrompt';

const RoleTable = ({ searchQuery }) => {
  const theme = useTheme();
  const [roleLoading, setRoleLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [editedRole, setEditedRole] = useState({ name: '' });
  const [deleteRole, setDeleteRole] = useState(false);


  const filteredRoles = roles.filter((role) => role.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleFetchingRole = () => {
    setRoleLoading(true);
    const token = localStorage.getItem('token');
    const Api = Backend.auth + Backend.roles;
    const header = {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    fetch(Api, {
      method: 'GET',
      headers: header
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setRoleLoading(false);
          setRoles(response.data);
        } else {
          setRoleLoading(false);
        }
      })
      .catch((error) => {
        setRoleLoading(false);
        setError(true);
        toast(error.message);
      });
  };

  const handleMenuOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
  };

  const handleOpenDetailModal = (index) => {
    setSelectedRole(roles[index]);
    setOpenDetailModal(true);
    handleCloseMenu();
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
    setSelectedRole(null);
  };

  const handleOpenEditModal = (role) => {
    setEditedRole({ name: role.name });
    setSelectedRole(role);
    setOpenEditModal(true);
    handleCloseMenu();
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedRole(null);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditedRole((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    const token = localStorage.getItem('token');
    const Api = Backend.auth + Backend.roles + `/${selectedRole.uuid}`;
    const header = {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    fetch(Api, {
      method: 'PATCH',
      headers: header,
      body: JSON.stringify(editedRole)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          toast('Role updated successfully');
          handleFetchingRole(); // Re-fetch roles to update the table
          handleCloseEditModal(); // Close the modal after successful update
        } else {
          toast('Error updating role');
        }
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  const handleDelete = (roleId) => {
    const token = localStorage.getItem('token');
    const Api = Backend.auth + Backend.roles + `/${roleId}`;
    const header = {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    fetch(Api, {
      method: 'DELETE',
      headers: header
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setRoles((prevRoles) => prevRoles.filter((role) => role.uuid !== roleId));
          toast('Role deleted successfully');
          handleFetchingRole();
        } else {
          toast('Error deleting role');
        }
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  const groupPermissionsByType = (permissions) => {
    return permissions.reduce((groups, permission) => {
      const { type } = permission;
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(permission);
      return groups;
    }, {});
  };

    const handleRemoveEmployee = (role) => {
      // setSelectedRow(role);
      setDeleteRole(true);
    };

  useEffect(() => {
    handleFetchingRole();
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{
        minHeight: '40dvh',
        width: '100%',
        border: 0.4,
        borderColor: theme.palette.grey[300],
        borderRadius: 2
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {['Role', 'Action'].map((header) => (
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
          {roleLoading ? (
            <Box
              sx={{
                padding: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CircularProgress size={20} />
            </Box>
          ) : error ? (
            <Fallbacks severity="error" title="Server error" description="There is error fetching Roles" />
          ) : filteredRoles.length === 0 ? (
            <Fallbacks
              severity="info"
              title="No Roles Found"
              description="The list of added Roles will be listed here"
              sx={{ paddingTop: 6 }}
            />
          ) : (
            filteredRoles.map((role, index) => (
              <TableRow
                key={index}
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
                <TableCell>{role.name}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={(event) => handleMenuOpen(event, index)}>
                    <MoreVert />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && selectedIndex === index}
                    onClose={handleCloseMenu}
                    sx={{
                      '& .MuiPaper-root': {
                        backdropFilter: 'blur(10px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        borderRadius: 2,
                        boxShadow: theme.shadows[1]
                      }
                    }}
                  >
                    <MenuItem onClick={() => handleOpenDetailModal(index)}>
                      <ListItemIcon>
                        <InfoIcon fontSize="small" style={{ paddingRight: '4px', color: 'gray' }} /> Details
                      </ListItemIcon>
                    </MenuItem>
                    <MenuItem onClick={() => handleOpenEditModal(role)}>
                      <ListItemIcon>
                        <EditIcon fontSize="small" style={{ paddingRight: '4px', color: '#11365A' }} /> Edit
                      </ListItemIcon>
                    </MenuItem>
                    <MenuItem onClick={() => handleDelete(role.uuid)}>
                      <ListItemIcon>
                        <DeleteIcon fontSize="small" style={{ paddingRight: '4px', color: 'red' }} /> Delete
                      </ListItemIcon>
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Dialog open={openDetailModal} onClose={handleCloseDetailModal}>
        <DialogTitle variant="h4">Details</DialogTitle>
        <DialogContent
          sx={{
            p: 3,
            backgroundColor: 'white',
            margin: 'auto',
            mt: '2%',
            width: 600,
            borderRadius: '10px'
          }}
        >
          {selectedRole && (
            <>
              <Typography variant="h5">Role Name: {selectedRole.name}</Typography>
              <TableContainer sx={{ marginTop: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Assigned Permission</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedRole.permissions.length > 0 ? (
                      Object.entries(groupPermissionsByType(selectedRole.permissions)).map(([type, perms], i) =>
                        perms.map((perm, index) => (
                          <TableRow key={index}>
                            <TableCell>{perm.name}</TableCell>
                          </TableRow>
                        ))
                      )
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2}>
                          <Fallbacks severity="info" title="No Data" description="No Permission Found" />
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <Typography variant="subtitle1" p={1}>
          Edit Role
        </Typography>
        <DialogContent
          sx={{
            p: 3,
            backgroundColor: 'white',
            margin: 'auto',
            mt: '2%',
            width: 400,
            borderRadius: '10px'
          }}
        >
          {selectedRole && (
            <Box component="form" noValidate autoComplete="off">
              <TextField fullWidth label="Role Name" name="name" value={editedRole.name} onChange={handleEditChange} sx={{ mb: 2 }} />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
{/* 
      {deleteRole && (
        <DeletePrompt
          type="Delete"
          open={deleteRole}
          title="Removing Role"
          description={`Are you sure you want to remove ` + `/${roleId}`}
          onNo={() => setDeleteRole(false)}
          onYes={() => handleDelete()}
          deleting={deleting}
          handleClose={() => setDelete(false)}
        />
      )} */}
    </TableContainer>
  );
};

export default RoleTable;
