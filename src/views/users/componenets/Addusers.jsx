import React, { useState } from 'react';
import {
  Modal,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  DialogTitle,
  useTheme
} from '@mui/material';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import DrogaCard from 'ui-component/cards/DrogaCard';
import { IconX } from '@tabler/icons-react';
import DrogaFormModal from 'ui-component/modal/DrogaFormModal';

const AddUser = ({ add, isAdding, roles, onClose, onSubmit }) => {
  const theme = useTheme();
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userDetails.email || !userDetails.password || !userDetails.name) {
      toast.error('Please fill all required fields.');
      return;
    }
    onSubmit(userDetails);
  };

  return (
    <DrogaFormModal
      open={add}
      title="Add User"
      handleClose={onClose}
      onCancel={onClose}
      onSubmit={(event) => handleSubmit(event)}
      submitting={isAdding}
    >
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
    </DrogaFormModal>
  );
};

export default AddUser;
