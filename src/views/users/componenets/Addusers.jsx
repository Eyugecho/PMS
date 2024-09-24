import React, { useState } from 'react';
import { Modal, Button, TextField, Box, Typography, FormControl, InputLabel, Select, MenuItem, ListItemText } from '@mui/material';
import { toast } from 'react-toastify';

const AddUser = ({ add, isAdding, roles, onClose, onSubmit }) => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    roles: []
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleRoleChange = (event) => {
    const selectedRoles = event.target.value; 
    setUserDetails({ ...userDetails, roles: selectedRoles }); 
  };

  const handleSubmit = () => {
    if (!userDetails.email || !userDetails.password || !userDetails.name) {
      toast.error('Please fill all required fields.');
      return;
    }
    onSubmit(userDetails); 
  };

  return (
    <Modal open={add} onClose={onClose}>
      <Box
        sx={{
          padding: 4,
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 24,
          maxWidth: 500,
          margin: 'auto',
          mt: '4%'
        }}
      >
        <Typography variant="h6" component="h2">
          Add New User
        </Typography>
        <TextField fullWidth label="Name" name="name" value={userDetails.name} onChange={handleChange} margin="normal" required />
        
        <TextField fullWidth label="Email" name="email" value={userDetails.email} onChange={handleChange} margin="normal" required />
        <TextField fullWidth label="Phone" name="phone" value={userDetails.phone} onChange={handleChange} margin="normal" />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={userDetails.password}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Confirm Password"
          name="password_confirmation"
          type="password"
          value={userDetails.password_confirmation}
          onChange={handleChange}
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Roles</InputLabel>
          <Select
            multiple
            value={userDetails.roles}
            onChange={handleRoleChange}
            renderValue={(selected) =>
              roles
                .filter((role) => selected.includes(role.uuid)) 
                .map((role) => role.name)
                .join(', ')
            }
          >
            {roles.map((role) => (
              <MenuItem key={role.uuid} value={role.uuid}>
                <ListItemText primary={role.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button variant="outlined" onClick={onClose} sx={{ marginRight: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} disabled={isAdding}>
            {isAdding ? 'Adding...' : 'Add User'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddUser;
