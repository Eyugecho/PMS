import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Typography,
  useTheme
} from '@mui/material';
import { IconInfoCircle, IconX } from '@tabler/icons-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Backend from 'services/backend';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Full name is required'),
  gender: Yup.string().required('Unit type is required'),
  email: Yup.string().email().required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  position: Yup.string().required('The employee position is required'),
  start_date: Yup.date().required('Stat date is required')
});

export const AddEmployee = ({ add, isAdding, onClose, handleSubmission }) => {
  const theme = useTheme();

  const [units, setUnits] = React.useState([]);
  const [roles, setRoles] = React.useState([]);

  const formik = useFormik({
    initialValues: {
      name: '',
      gender: '',
      email: '',
      phone: '',
      unit: null,
      position: '',
      role: '',
      start_date: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmission(values);
    }
  });

  const handleFetchingManagers = () => {
    const token = localStorage.getItem('token');
    const Api = Backend.api + Backend.units;
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
          setUnits(response.data.data);
        }
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  React.useEffect(() => {
    handleFetchingManagers();
    return () => {};
  }, []);
  return (
    <React.Fragment>
      <Dialog open={add} onClose={onClose}>
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 2,
            width: '100%',
            backgroundColor: theme.palette.primary.main,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: 2,
            paddingY: 0.6
          }}
        >
          <DialogTitle variant="h4" color={theme.palette.background.default}>
            Add Employee
          </DialogTitle>
          <IconButton onClick={onClose}>
            <IconX size={20} color={theme.palette.background.default} />
          </IconButton>
        </Box>

        <form noValidate onSubmit={formik.handleSubmit}>
          <DialogContent>
            <FormControl fullWidth error={formik.touched.name && Boolean(formik.errors.name)} sx={{ marginTop: 1 }}>
              <InputLabel htmlfor="name">Full name</InputLabel>
              <OutlinedInput id="name" name="name" label="Full name" value={formik.values.name} onChange={formik.handleChange} fullWidth />
              {formik.touched.name && formik.errors.name && (
                <FormHelperText error id="standard-weight-helper-text-name">
                  {formik.errors.name}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl error={formik.touched.gender && Boolean(formik.errors.gender)} sx={{ marginLeft: 1.4, marginTop: 2.4 }}>
              <FormLabel id="gender">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around'
                }}
              >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
              </RadioGroup>
            </FormControl>

            <FormControl fullWidth error={formik.touched.email && Boolean(formik.errors.email)} sx={{ marginTop: 2.4 }}>
              <InputLabel htmlFor="email">Email address </InputLabel>
              <OutlinedInput
                id="email"
                name="email"
                label="Email address"
                value={formik.values.email}
                onChange={formik.handleChange}
                fullWidth
              />
              {formik.touched.email && formik.errors.email && (
                <FormHelperText error id="standard-weight-helper-text-name">
                  {formik.errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={formik.touched.phone && Boolean(formik.errors.phone)} sx={{ marginTop: 3 }}>
              <InputLabel htmlfor="phone">Phone number</InputLabel>
              <OutlinedInput
                id="phone"
                name="phone"
                label="Phone number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                fullWidth
              />
              {formik.touched.phone && formik.errors.phone && (
                <FormHelperText error id="standard-weight-helper-text-phone">
                  {formik.errors.phone}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={formik.touched.unit && Boolean(formik.errors.unit)} sx={{ marginTop: 3 }}>
              <InputLabel htmlfor="unit">Unit (optional)</InputLabel>

              <Select id="unit" name="unit" label="Unit (optional)" value={formik.values.unit} onChange={formik.handleChange}>
                {units.length === 0 ? (
                  <Typography variant="body2" sx={{ padding: 1 }}>
                    Unit not found
                  </Typography>
                ) : (
                  units?.map((unit, index) => (
                    <MenuItem key={index} value={unit.id}>
                      {unit.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>

            <FormControl fullWidth error={formik.touched.role && Boolean(formik.errors.role)} sx={{ marginTop: 3 }}>
              <InputLabel htmlfor="role">Role</InputLabel>

              <Select id="role" name="role" label="Role" value={formik.values.role} onChange={formik.handleChange}>
                {roles.length === 0 ? (
                  <Typography variant="body2" sx={{ padding: 1 }}>
                    Role not found
                  </Typography>
                ) : (
                  roles?.map((role, index) => (
                    <MenuItem key={index} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
            <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', paddingX: 1, marginTop: 0.8 }}>
              <IconInfoCircle size={14} style={{ paddingRight: 2 }} /> The default role for employee is <b> Employee</b>
            </Typography>

            <FormControl fullWidth error={formik.touched.position && Boolean(formik.errors.position)} sx={{ marginTop: 3 }}>
              <InputLabel htmlfor="position">Position</InputLabel>
              <OutlinedInput
                id="position"
                name="position"
                label="Position"
                value={formik.values.position}
                onChange={formik.handleChange}
                fullWidth
              />
              {formik.touched.position && formik.errors.position && (
                <FormHelperText error id="standard-weight-helper-text-position">
                  {formik.errors.position}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={formik.touched.phone && Boolean(formik.errors.phone)} sx={{ marginTop: 3 }}>
              <InputLabel htmlfor="start_date" shrink={true}>
                Start Date
              </InputLabel>
              <OutlinedInput
                id="start_date"
                name="start_date"
                label="Start Date"
                type="date"
                value={formik.values.start_date}
                onChange={formik.handleChange}
                fullWidth
              />
              {formik.touched.start_date && formik.errors.start_date && (
                <FormHelperText error id="standard-weight-helper-text-start_date">
                  {formik.errors.start_date}
                </FormHelperText>
              )}
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ paddingX: 2 }}>
            <Button onClick={onClose} sx={{ marginLeft: 10 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ paddingX: 6, boxShadow: 0 }} disabled={isAdding}>
              {isAdding ? <CircularProgress size={18} sx={{ color: 'white' }} /> : 'Done'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};
