import { useState } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';

// third party
import { Formik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { IconCircleCheck } from '@tabler/icons-react';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MainCard from 'ui-component/cards/MainCard';
import Backend from 'services/backend';
import AuthWrapper from './components/AuthWrapper';
import { motion } from 'framer-motion';

// ============================|| RESET PASSWORD ||============================ //

const AnimatedSuccess = motion(Box);
const AnimateIcon = motion(IconCircleCheck);

const ResetPassword = ({ ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  const [logSpinner, setLogSpinner] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [passwordSet, setPasswordSet] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const redirectToSignin = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <AuthWrapper>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 28px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <MainCard>
                {passwordSet ? (
                  <AnimatedSuccess
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    sx={{ textAlign: 'center' }}
                  >
                    <AnimateIcon
                      initial={{ y: -100 }}
                      animate={{ y: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 20,
                        mass: 1,
                        duration: 0.6
                      }}
                      size={68}
                      color={theme.palette.success.dark}
                      className="text-success mb-3 mx-auto"
                    />
                    <Typography variant="body2" className="text-center">
                      New password is set successfully, you can signin now.
                    </Typography>
                  </AnimatedSuccess>
                ) : (
                  <>
                    <Grid container direction="column" justifyContent="center" spacing={2}>
                      <Grid item xs={12} container alignItems="center" justifyContent="center">
                        <Grid item xs={12}>
                          <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                            <Grid item>
                              <Stack alignItems="center" justifyContent="center" spacing={1}>
                                <Typography color={theme.palette.primary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                                  Reset Password
                                </Typography>
                              </Stack>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle1" textAlign={matchDownSM ? 'center' : 'inherit'}>
                            Enter and confirm new password
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Formik
                      initialValues={{
                        newPassword: '',
                        confirmPassword: '',
                        submit: null
                      }}
                      validationSchema={Yup.object().shape({
                        newPassword: Yup.string().min(4).max(255).required('New password is required'),
                        confirmPassword: Yup.string().min(4).max(255).required('Please confirm password')
                      })}
                      onSubmit={async (values, { setSubmitting }) => {
                        setLogSpinner(true);

                        const token = localStorage.getItem('token');
                        const Api = Backend.auth + Backend.setPassword;
                        const headers = {
                          Authorization: `Bearer ${token}`,
                          accept: 'application/json',
                          'Content-Type': 'application/json'
                        };

                        const data = {
                          password: values.newPassword,
                          confirm_password: values.confirmPassword
                        };

                        fetch(Api, {
                          method: 'POST',
                          headers: headers,
                          body: JSON.stringify(data)
                        })
                          .then((response) => response.json())
                          .then((response) => {
                            if (response.success) {
                              toast.success(response.data.message);
                              setSubmitting(false);
                              setLogSpinner(false);
                              setPasswordSet(true);
                            } else {
                              toast.error(response.data.message);
                              setSubmitting(false);
                              setLogSpinner(false);
                            }
                          })
                          .catch((err) => {
                            toast.error(err.message);
                            setSubmitting(false);
                            setLogSpinner(false);
                          });
                      }}
                    >
                      {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit} {...others}>
                          <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                          >
                            <InputLabel htmlFor="outlined-adornment-password-login">New Password</InputLabel>
                            <OutlinedInput
                              id="outlined-adornment-password-login"
                              type={showPassword ? 'text' : 'password'}
                              value={values.newPassword}
                              name="newPassword"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="New Password"
                            />
                            {touched.password && errors.password && (
                              <FormHelperText error id="standard-weight-helper-text-password-login">
                                {t(errors.password)}
                              </FormHelperText>
                            )}
                          </FormControl>

                          <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                          >
                            <InputLabel htmlFor="outlined-adornment-password-login">Confirm Password</InputLabel>
                            <OutlinedInput
                              id="outlined-adornment-password-login"
                              type={showPassword ? 'text' : 'password'}
                              value={values.confirmPassword}
                              name="confirmPassword"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    size="large"
                                  >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                  </IconButton>
                                </InputAdornment>
                              }
                              label="Confirm Password"
                            />
                            {touched.password && errors.password && (
                              <FormHelperText error id="standard-weight-helper-text-password-login">
                                {errors.password}
                              </FormHelperText>
                            )}
                          </FormControl>

                          {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                              <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                          )}

                          <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                              <Button
                                disableElevation
                                disabled={logSpinner}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                color="primary"
                              >
                                {logSpinner ? <CircularProgress size={20} color="primary" /> : 'Submit'}
                              </Button>
                            </AnimateButton>
                          </Box>
                        </form>
                      )}
                    </Formik>
                  </>
                )}
                <Button
                  type="button"
                  variant="text"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{ marginTop: 1 }}
                  onClick={() => redirectToSignin()}
                >
                  Sign In
                </Button>
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ToastContainer />
    </AuthWrapper>
  );
};

export default ResetPassword;
