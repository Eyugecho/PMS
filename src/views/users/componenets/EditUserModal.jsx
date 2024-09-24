import React, { useState, useEffect } from 'react';
import {
  Dialog,
  TextField,
  Button,
  Box,
  useTheme,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  FormControl,
  CircularProgress,
  Autocomplete,
  Chip,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { IconX } from '@tabler/icons-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Backend from 'services/backend';
import GetToken from 'utils/auth-token';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Full name is required'),
  email: Yup.string().email().required('Email is required'),
  username: Yup.string().required('Username is required'),
  phone: Yup.string().required('Phone number is required'),
  created_at: Yup.string().required('Start date is required'),
  role: Yup.string().required('Role is required')
});

const UpdateUser = ({ open, userData, onClose, onSave, isUpdating, handleSubmission }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', roles: [] });
  const [roles, setRoles] = useState([]);
  const [roleIds, setRoleIds] = React.useState([]);
  const [selectedRoles, setSelectedRoles] = React.useState([]);

  const theme = useTheme();

  const handleRoleSelection = (event, value) => {
    setSelectedRoles(value);
console.log(value);

    const addedRole = value.find((role) => !selectedRoles.some((selectedRole) => selectedRole.uuid === role.uuid));
    const removeRole = selectedRoles.find((role) => !value.some((selectedRole) => selectedRole.uuid === role.uuid));

    if (addedRole) {
      setRoleIds((prevRoleIds) => [...prevRoleIds, addedRole.uuid]);
    }
    if (removeRole) {
      setRoleIds((prevRoleIds) => prevRoleIds.filter((id) => id !== removeRole.uuid));
    }
  };

  const getUUIDsFromSelectedRoles = () => {
    return selectedRoles.map((role) => role.uuid);
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      username: '',
      phone: '',
      role: '',
      created_at: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmission(values, getUUIDsFromSelectedRoles());
    }
  });
  const handleFetchingRoles = async () => {
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
          setRoles(response.data);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  const setFormInitialValues = () => {
    formik.setValues({
      ...formik.values,
      name: userData?.name,

      email: userData?.email,
      username: userData?.username,
      phone: userData?.phone,

    });

    setSelectedRoles(userData?.roles || []);
  };
  React.useEffect(() => {
    handleFetchingRoles();
    setFormInitialValues();

    return () => {};
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 2,
          width: '100%',
          backgroundColor: theme.palette.background.default,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: 2,
          paddingY: 0.6
        }}
      >
        <DialogTitle variant="h5" color={theme.palette.text.primary}>
          Update User
        </DialogTitle>
        <IconButton onClick={onClose}>
          <IconX size={20} color={theme.palette.text.primary} />
        </IconButton>
      </Box>

      <form noValidate onSubmit={formik.handleSubmit}>
        <DialogContent>
          <FormControl fullWidth error={formik.touched.name && Boolean(formik.errors.name)} sx={{ marginTop: 1 }}>
            <InputLabel htmlFor="name">Full name</InputLabel>
            <OutlinedInput id="name" name="name" label="Full name" value={formik.values.name} onChange={formik.handleChange} fullWidth />
            {formik.touched.name && formik.errors.name && (
              <FormHelperText error id="standard-weight-helper-text-name">
                {formik.errors.name}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth error={formik.touched.email && Boolean(formik.errors.email)} sx={{ marginTop: 2 }}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput id="email" name="email" label="Email" value={formik.values.email} onChange={formik.handleChange} fullWidth />
            {formik.touched.email && formik.errors.email && (
              <FormHelperText error id="standard-weight-helper-text-email">
                {formik.errors.email}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth error={formik.touched.phone && Boolean(formik.errors.phone)} sx={{ marginTop: 2 }}>
            <InputLabel htmlFor="phone">Phone</InputLabel>
            <OutlinedInput id="phone" name="phone" label="Phone" value={formik.values.phone} onChange={formik.handleChange} fullWidth />
            {formik.touched.phone && formik.errors.phone && (
              <FormHelperText error id="standard-weight-helper-text-phone">
                {formik.errors.phone}
              </FormHelperText>
            )}
          </FormControl>

          <Autocomplete
            id="roles"
            multiple
            options={roles || []}
            getOptionLabel={(option) => option?.name || ''}
            value={selectedRoles}
            onChange={handleRoleSelection}
            isOptionEqualToValue={(option, value) => option.uuid === value.uuid} // <-- Equality check added here
            renderTags={(value, getTagProps) =>
              value.map((option, index) => <Chip className="roles-chip" label={option?.name || ''} {...getTagProps({ index })} />)
            }
            fullWidth
            renderInput={(params) => <TextField {...params} label="Select Roles" variant="outlined" />}
            sx={{ marginTop: 4 }}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" sx={{ paddingX: 6, boxShadow: 0 }} disabled={isUpdating}>
            {isUpdating ? <CircularProgress size={18} sx={{ color: 'white' }} /> : 'Done'}
          </Button>
          <Button onClick={onClose} variant="outlined" color="inherit">
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UpdateUser;
