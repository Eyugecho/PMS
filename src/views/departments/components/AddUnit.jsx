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
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography
} from '@mui/material';
import { IconX } from '@tabler/icons-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Unit name is required'),
  parent_id: Yup.string().required('Unit is required'),
  type: Yup.string().required('Unit type is required')
});

export const AddUnit = ({ add, isAdding, unitss, types, managers, onClose, handleSubmission }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      parent_id: '',
      type: '',
      manager: null,
      unit: null,
      description: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmission(values);
    }
  });

  return (
    <React.Fragment>
      <Dialog
        open={add}
        onClose={onClose}
        sx={{
          backdropFilter: 'blur(10px)', // Frosted glass effect
          backgroundColor: 'rgba(255, 255, 255, 0.1)' // Optional: Lightens the backdrop
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 2 }}>
          <DialogTitle variant="h4">Add Unit</DialogTitle>
          <IconButton onClick={onClose}>
            <IconX size={20} />
          </IconButton>
        </Box>

        <form noValidate onSubmit={formik.handleSubmit}>
          <DialogContent>
            <FormControl fullWidth error={formik.touched.unit && Boolean(formik.errors.unit)}>
              <InputLabel htmlfor="unit">Select unit</InputLabel>

              <Select id="unit" name="parent_id" label="Select unit" value={formik.values.unit} onChange={formik.handleChange}>
                {unitss.length === 0 ? (
                  <Typography variant="body2" sx={{ padding: 1 }}>
                    Unit is not found
                  </Typography>
                ) : (
                  unitss?.map((unitt, index) => (
                    <MenuItem key={index} value={unitt.id}>
                      {unitt.name}
                    </MenuItem>
                  ))
                )}
              </Select>

              {formik.touched.parent_id && formik.errors.parent_id && (
                <FormHelperText error id="standard-weight-helper-text-parent_id">
                  {formik.errors.parent_id}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={formik.touched.type && Boolean(formik.errors.type)} sx={{ marginTop: 3 }}>
              <InputLabel htmlfor="type">Unit type</InputLabel>

              <Select id="type" name="type" label="Unit type" value={formik.values.type} onChange={formik.handleChange}>
                {types.length === 0 ? (
                  <Typography variant="body2" sx={{ padding: 1 }}>
                    Unit type is not found
                  </Typography>
                ) : (
                  types?.map((type, index) => (
                    <MenuItem key={index} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))
                )}
              </Select>

              {formik.touched.type && formik.errors.type && (
                <FormHelperText error id="standard-weight-helper-text-type">
                  {formik.errors.type}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={formik.touched.name && Boolean(formik.errors.name)} sx={{ marginTop: 3 }}>
              <InputLabel htmlfor="name">Name</InputLabel>
              <OutlinedInput id="name" name="name" label="name" value={formik.values.name} onChange={formik.handleChange} fullWidth />
              {formik.touched.name && formik.errors.name && (
                <FormHelperText error id="standard-weight-helper-text-name">
                  {formik.errors.name}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={formik.touched.manager && Boolean(formik.errors.manager)} sx={{ marginTop: 3 }}>
              <InputLabel htmlfor="manager">Unit manager (optional)</InputLabel>

              <Select
                id="manager"
                name="manager"
                label="Unit manager (optional)"
                value={formik.values.manager}
                onChange={formik.handleChange}
              >
                {managers.length === 0 ? (
                  <Typography variant="body2" sx={{ padding: 1 }}>
                    Manager not found
                  </Typography>
                ) : (
                  managers?.map((manager, index) => (
                    <MenuItem key={index} value={manager.id}>
                      {manager.user.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>

            <FormControl fullWidth error={formik.touched.description && Boolean(formik.errors.description)} sx={{ marginTop: 3 }}>
              <InputLabel htmlfor="description">Description (optional)</InputLabel>
              <OutlinedInput
                id="description"
                name="description"
                label="Description (optional)"
                value={formik.values.description}
                onChange={formik.handleChange}
                fullWidth
                multiline
                rows={4}
              />
              {formik.touched.description && formik.errors.description && (
                <FormHelperText error id="standard-weight-helper-text-description">
                  {formik.errors.description}
                </FormHelperText>
              )}
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ paddingX: 2 }}>
            <Button variant="" onClick={onClose} sx={{ marginLeft: 10 }}>
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
export default AddUnit;
