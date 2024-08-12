import React ,{useEffect, useState}from 'react';
import { Modal, Box, Button, TextField, Checkbox, FormControlLabel,CircularProgress, Typography, Card, Grid, useTheme } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import Fallbacks from 'utils/components/Fallbacks';
import * as Yup from 'yup';

const roleSchema = Yup.object().shape({
  roleName: Yup.string().required('Role name is required'),
  permissions: Yup.array().of(Yup.string()).min(1, 'At least one permission is required'),
});

const AddRole = ({ open, handleClose, permissions = {}, onSave }) => {
  const [permissionLoading, setPermissionLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(permissions).length === 0) {
      // fetchPermissions();
      setPermissionLoading(false);

    } else {
      setPermissionLoading(false);
    }
  }
  , []);


  const theme = useTheme();

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ p: 3, backgroundColor: 'white', margin: 'auto', mt: '8%', width: 600, borderRadius: '10px' }}>
        <Typography variant="subtitle1">Role and Permission</Typography>
        <Formik
          initialValues={{ roleName: '', permissions: [] }}
          validationSchema={roleSchema}
          onSubmit={(values, { resetForm }) => {
            onSave(values);
            resetForm();
            handleClose(); // Close the modal after saving
          }}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form>
              <TextField
                name="roleName"
                label="New Role"
                value={values.roleName}
                onChange={handleChange}
                error={touched.roleName && Boolean(errors.roleName)}
                helperText={touched.roleName && errors.roleName}
                margin="normal"
                fullWidth
              />
              <Grid container spacing={2} mt={0.5}>
                {permissionLoading ? (
            <Box
              sx={{
                padding: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CircularProgress size={20} />
            </Box>
          ) : error ? (
            <Fallbacks
              severity="error"
              title="Server error"
              description="There is error fetching Permissions"
            />
          ) : permissions.length === 0 ? (
            <Fallbacks
              severity="info"
              title="No Permissions Found"
              description="The list of added Permissions will be listed here"
              sx={{ paddingTop: 6 }}
            />
          ) : Object.keys(permissions).map((type) => (
                  <Grid item xs={12} sm={6} md={4} key={type}>
                    <Card sx={{ p: 0.5, mb: 1, backgroundColor: theme.palette.grey[100] }}>
                      <Typography variant="h6">
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Typography>
                      {Array.isArray(permissions[type]) && permissions[type].map((perm) => (
                        <FormControlLabel
                          key={perm.id} 
                          control={
                            <Field
                              type="checkbox"
                              name="permissions"
                              value={perm.name} 
                              as={Checkbox}
                              checked={values.permissions.includes(perm.name)}
                              onChange={handleChange}
                            />
                          }
                          label={perm.name} 
                        />
                      ))}
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Save
              </Button>
              <Button onClick={handleClose} color="secondary" sx={{ mt: 2, ml: 2 }}> {/* Close modal */}
                Close
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddRole;
