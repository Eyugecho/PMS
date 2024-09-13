import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
  TextField,
  useTheme,
  ListItemIcon,
  Checkbox,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Chip
} from '@mui/material';
import { toast } from 'react-toastify';
import { MoreHoriz } from '@mui/icons-material';
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
  const [allPermissions, setAllPermissions] = useState([]); // To store all available permissions
  const [selectedPermissions, setSelectedPermissions] = useState([]);
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
  setSelectedPermissions(role.permissions.map((perm) => perm.uuid)); // Map current permissions to the UUIDs
  setOpenEditModal(true);
  handleCloseMenu();

  // Fetch all permissions from the backend
  const token = localStorage.getItem('token');
  const Api = Backend.auth + Backend.permissi; // Assuming this is the correct endpoint
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
        setAllPermissions(response.data); // Store all permissions
      } else {
        toast('Error fetching permissions');
      }
    })
    .catch((error) => {
      toast(error.message);
    });
};
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedRole(null);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditedRole((prev) => ({ ...prev, [name]: value }));
  };
const handlePermissionChange = (permissionId) => {
  setSelectedPermissions((prevSelected) => {
    if (prevSelected.includes(permissionId)) {
      return prevSelected.filter((id) => id !== permissionId); // Deselect permission
    } else {
      return [...prevSelected, permissionId]; // Select permission
    }
  });
};


const handleSaveEdit = () => {
  const token = localStorage.getItem('token');
  const Api = Backend.auth + Backend.roles + `/${selectedRole.uuid}`;
  const header = {
    Authorization: `Bearer ${token}`,
    accept: 'application/json',
    'Content-Type': 'application/json'
  };

  // Prepare the payload with role name and selected permissions
  const payload = {
    name: editedRole.name,
    permissions: selectedPermissions // Send the updated list of permissions
  };

  fetch(Api, {
    method: 'PATCH',
    headers: header,
    body: JSON.stringify(payload)
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        toast('Role updated successfully');
        handleFetchingRole();
        handleCloseEditModal();
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
    setDeleteRole(true);
  };

  useEffect(() => {
    handleFetchingRole();
  }, []);

  return (
    <Box
      component={Paper}
      sx={{
        minHeight: '40dvh',
        width: '100%',
        border: 0.4,
        borderColor: theme.palette.grey[300],
        borderRadius: 2,
        p: 2
      }}
    >
      {roleLoading ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '40dvh'
          }}
        >
          <CircularProgress size={20} />
        </Box>
      ) : error ? (
        <Fallbacks severity="error" title="Server error" description="There is an error fetching Roles" />
      ) : filteredRoles.length === 0 ? (
        <Fallbacks severity="info" title="No Roles Found" description="The list of added Roles will be listed here" />
      ) : (
        filteredRoles.map((role, index) => (
          <Box key={role.uuid} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h3" sx={{ mt: 1, fontWeight: 'bold' }}>
                {role.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton color="primary" onClick={(event) => handleMenuOpen(event, index)}>
                  <MoreHoriz />
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
                  <MenuItem onClick={() => handleOpenEditModal(role)}>
                    <ListItemIcon>
                      <EditIcon fontSize="small" style={{ paddingRight: '4px', color: 'gray' }} /> Edit
                    </ListItemIcon>
                  </MenuItem>
                  <MenuItem onClick={() => handleDelete(role.uuid)}>
                    <ListItemIcon>
                      <DeleteIcon fontSize="small" style={{ paddingRight: '4px', color: 'red' }} /> Delete
                    </ListItemIcon>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
            <Divider sx={{ borderBottom: 0.4, borderColor: theme.palette.grey[300], my: 2 }} />

            <Box sx={{ mb: 2 }}>
              {Object.entries(groupPermissionsByType(role.permissions)).map(([type, perms], i) => (
                <Box key={i} sx={{ mb: 3 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      textTransform: 'capitalize',
                      mb: 2,
                      color: theme.palette.primary.main,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <InfoIcon sx={{ mr: 1 }} />
                    Assigned Permissions
                  </Typography>

                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                      gap: 2
                    }}
                  >
                    {perms.map((perm, idx) => (
                      <Paper
                        key={idx}
                        elevation={1}
                        sx={{
                          padding: 2,
                          borderRadius: 2,
                          backgroundColor: theme.palette.background.paper,
                          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'scale(1.02)',
                            boxShadow: theme.shadows[8]
                          }
                        }}
                      >
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                          {perm.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {perm.description || 'No description available'}
                        </Typography>
                        <Chip label="Assigned" color="success" size="small" sx={{ mt: 1, fontWeight: 'bold', fontSize: '0.75rem' }} />
                      </Paper>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>

            <Divider sx={{ borderBottom: 0.4, borderColor: theme.palette.grey[300], my: 3 }} />
          </Box>
        ))
      )}

      {/* Edit Modal */}
      <Dialog open={openEditModal} onClose={handleCloseEditModal} fullWidth={true} maxWidth="lg">
        <DialogTitle>Edit Role</DialogTitle>
        <DialogContent>
          <Box>
            <TextField label="Role Name" name="name" value={editedRole.name} onChange={handleEditChange} fullWidth margin="dense" />
        
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3}>
              {allPermissions.length === 0 ? (
                <Typography>No permissions available</Typography>
              ) : (
                Object.entries(groupPermissionsByType(allPermissions)).map(([type, permissions]) => (
                  <Grid item xs={12} key={type}>
                    <Card
                      variant="outlined"
                      sx={{
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.01)'
                        }
                      }}
                    >
                      <CardHeader
                        title='Permissions'
                        sx={{
                          backgroundColor: '#f5f5f5',
                          color: '#333',
                          fontWeight: 'bold',
                          textTransform: 'uppercase'
                        }}
                      />
                      <CardContent>
                        <Grid container spacing={0}>
                          {permissions.map((permission) => (
                            <Grid item xs={12} sm={6} md={4} key={permission.uuid}>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  p: 1,
                                  borderRadius: '2px',
                                  transition: 'background-color 0.3s',
                                  '&:hover': {
                                    backgroundColor: '#f0f0f0'
                                  }
                                }}
                              >
                                <Checkbox
                                  checked={selectedPermissions.includes(permission.uuid)}
                                  onChange={() => handlePermissionChange(permission.uuid)}
                                />
                                <Typography sx={{ ml: 1 }}>{permission.name}</Typography>
                          
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal}>Cancel</Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Details Modal */}
      <Dialog open={openDetailModal} onClose={handleCloseDetailModal}>
        <DialogTitle>Role Details</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Role Name:</Typography>
          <Typography>{selectedRole?.name}</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Permissions:
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {selectedRole?.permissions.length === 0 ? (
              <Typography>No permissions assigned</Typography>
            ) : (
              selectedRole?.permissions.map((perm) => <Chip key={perm.uuid} label={perm.name} sx={{ mr: 1, mb: 1 }} />)
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoleTable;
