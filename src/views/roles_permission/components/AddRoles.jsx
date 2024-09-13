import React, { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Typography,
  Card,
  Grid,
  useTheme
} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, FieldArray } from 'formik';
import Fallbacks from 'utils/components/Fallbacks';
import * as Yup from 'yup';

const roleSchema = Yup.object().shape({
  roleName: Yup.string().required('Role name is required'),
  permissions: Yup.array().of(Yup.string()).min(1, 'At least one permission is required')
});

const AddRole = ({ open, handleClose, permissions = {}, onSave }) => {
  const [permissionLoading, setPermissionLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(permissions).length === 0) {
      setPermissionLoading(false);
    } else {
      setPermissionLoading(false);
    }
  }, [permissions]);

  const theme = useTheme();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          maxHeight: '80vh',
          overflowY: 'auto',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 4
        }}
      >
        <Typography variant="subtitle1">Role and Permission</Typography>
        <Formik
          initialValues={{ roleName: '', permissions: [] }}
          validationSchema={roleSchema}
          onSubmit={(values, { resetForm, setSubmitting, setFieldError }) => {
            if (values.permissions.length === 0) {
              setFieldError('permissions', 'Please select at least one permission.');
              setSubmitting(false);
              return;
            }

            onSave(values)
              .then(() => {
                resetForm();
                handleClose();
                toast.success('Role saved successfully!');
              })
              .catch(() => {
                toast.error('Failed to save role. Please try again.');
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form>
              <TextField
                name="roleName"
                label="New Role"
                value={values.roleName}
                onChange={(e) => setFieldValue('roleName', e.target.value)}
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
                      justifyContent: 'center'
                    }}
                  >
                    <CircularProgress size={20} />
                  </Box>
                ) : error ? (
                  <Fallbacks severity="error" title="Server error" description="There is an error fetching Permissions" />
                ) : Object.keys(permissions).length === 0 ? (
                  <Fallbacks
                    severity="info"
                    title="No Permissions Found"
                    description="The list of added Permissions will be listed here"
                    sx={{ paddingTop: 6 }}
                  />
                ) : (
                  <FieldArray
                    name="permissions"
                    render={({ push, remove }) =>
                      Object.keys(permissions).map((type) => (
                        <Grid item xs={12} sm={6} md={3} key={type}>
                          <Card sx={{ p: 0.5, mb: 1, backgroundColor: theme.palette.grey[100] }}>
                            <Typography variant="h6">{type.charAt(0).toUpperCase() + type.slice(1)}</Typography>
                            {Array.isArray(permissions[type]) &&
                              permissions[type].map((perm) => (
                                <FormControlLabel
                                  key={perm.id}
                                  control={
                                    <Field
                                      type="checkbox"
                                      name="permissions"
                                      value={perm.name}
                                      as={Checkbox}
                                      checked={values.permissions.includes(perm.name)}
                                      onChange={() => {
                                        if (values.permissions.includes(perm.name)) {
                                          setFieldValue(
                                            'permissions',
                                            values.permissions.filter((p) => p !== perm.name)
                                          );
                                        } else {
                                          setFieldValue('permissions', [...values.permissions, perm.name]);
                                        }
                                      }}
                                    />
                                  }
                                  label={perm.name}
                                />
                              ))}
                          </Card>
                        </Grid>
                      ))
                    }
                  />
                )}
              </Grid>
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Save
              </Button>
              <Button onClick={handleClose} variant="" sx={{ mt: 2, ml: 2 }}>
                Close
              </Button>

              {errors.permissions && touched.permissions && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{
                    mt: 2,
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid red',
                    textAlign: 'center'
                  }}
                >
                  {errors.permissions}
                </Typography>
              )}
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddRole;
