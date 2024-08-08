import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// config
import config from '../../../../configration/config';
import { decodeToken, hasRole, hasPermission } from '../../../../store/permissionUtils';
import { setUser } from '../../../../store/actions';

const AuthLogin = ({ ...others }) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      const response = await axios.post(`${config.API_URL}/login-with-email`, {
        email: values.email,
        password: values.password
      });

      if (response.data.success) {
        const { access_token } = response.data.data; // Ensure to extract access_token from data

        // Ensure token is a string
        if (typeof access_token !== 'string') {
          throw new Error('Invalid token format');
        }

        const decodedToken = decodeToken(access_token);
        const user = {
          id: decodedToken.sub,
          name: decodedToken.name,
          email: decodedToken.email,
          roles: decodedToken.roles,
          permissions: decodedToken.roles.flatMap((role) => role.permissions)
        };

        localStorage.setItem('token', access_token);
        dispatch(setUser(user));

        toast.success('Login successful!');

        if (hasRole(user.roles, 'CEO')) {
          navigate('/kpi/kpi-managment');
        } else if (hasRole(user.roles, 'Admin')) {
          navigate('/Eod/Eod-act');
        } else {
          navigate('/');
        }
      } else {
        setStatus({ success: false });
        setErrors({ submit: response.data.message });
        setSubmitting(false);
      }
    } catch (error) {
      setStatus({ success: false });
      setErrors({ submit: error.message });
      setSubmitting(false);
    }
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 3 }}>
            {/* <Typography variant="subtitle1" style={{fontSize:'12px'}}>Sign in with Email address</Typography> */}
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={handleLogin}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl style={{ display: 'flex' }} error={Boolean(touched.email && errors.email)}>
              <InputLabel htmlFor="outlined-adornment-email-login" style={{ fontSize: '12px' }}>
                Email Address / Username
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                sx={{ marginBottom: '16px' }}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address / Username"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl style={{ display: 'flex', marginTop: 2 }} error={Boolean(touched.password && errors.password)}>
              <InputLabel htmlFor="outlined-adornment-password-login" style={{ fontSize: '12px' }}>
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                sx={{ marginBottom: '16px' }}
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
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                }
                label="Remember me"
              />
              <Link to={'/forgot-password'} variant="subtitle1" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                Forgot Password?
              </Link>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 4 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{
                    padding: 1.6,
                    transition: 'all .2s ease-in-out',
                    color: theme.palette.secondary.dark,
                    '&[aria-controls="menu-list-grow"],&:hover': {
                      background: theme.palette.secondary.dark_icon_hover,
                      color: theme.palette.secondary.dark
                    },
                    borderRadius: `${customization.borderRadius}px`
                  }}
                >
                  Sign in
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
