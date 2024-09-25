import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DrogaButton from 'ui-component/buttons/DrogaButton';
import ActivityIndicator from 'ui-component/indicators/ActivityIndicator';

const validationSchema = Yup.object().shape({
  perspectiveName: Yup.string().required('Perpective name is required')
});

const EditPerspectives = ({ open, selected, handleClose, handleSubmission, submitting }) => {
  const formik = useFormik({
    initialValues: {
      perspectiveName: selected ? selected?.name : ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmission(values);
    }
  });
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle variant="h4">Edit New Perspective</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="perspectiveName"
            name="perspectiveName"
            label="Perspective Name"
            type="text"
            fullWidth
            value={formik.values.perspectiveName}
            onChange={formik.handleChange}
            error={formik.touched.perspectiveName && Boolean(formik.errors.perspectiveName)}
            helperText={formik.touched.perspectiveName && formik.errors.perspectiveName}
          />
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>

            <DrogaButton title={submitting ? <ActivityIndicator size={18} sx={{ color: 'white' }} /> : 'Submit'} type="submit" />
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EditPerspectives;
