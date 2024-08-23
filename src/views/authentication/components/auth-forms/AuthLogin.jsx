import { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles';
import { Formik } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import config from '../../../../configration/config';
import { decodeToken, hasRole } from '../../../../store/permissionUtils';
import { setUser } from '../../../../store/actions/actions';
import { AuthContext } from 'context/AuthContext';
import { Storage } from 'configration/storage';

const AuthLogin = ({ ...others }) => {
  const theme = useTheme();
  const { signin } = useContext(AuthContext);
  const customization = useSelector((state) => state.customization);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleLogin = async (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      const data = {
        email: values.email,
        password: values.password
      };

      fetch(`${config.API_URL}/login-with-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            const { access_token, expires_in } = response.data;

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

            const ttl = new Date(expires_in * 1000);
            const expirationTime = ttl.getTime();
            Storage.setItem('token', access_token);
            Storage.setItem('tokenExpiration', expirationTime);

            dispatch(setUser(user));
            signin();
            navigate('/');
          } else {
            setStatus({ success: false });
            setErrors({ submit: response.data.message });
            setSubmitting(false);
          }
        })
        .catch((error) => {
          setStatus({ success: false });
          setErrors({ submit: error.message });
          setSubmitting(false);
        });
    } catch (error) {
      setStatus({ success: false });
      setErrors({ submit: error.message });
      setSubmitting(false);
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '', submit: null }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={handleLogin}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          <Grid container direction="column" justifyContent="center" spacing={2}>
            <Grid item xs={12} container alignItems="center" justifyContent="center">
              <Box sx={{ mb: 3 }}>
                {/* <Typography variant="subtitle1" style={{fontSize:'12px'}}>Sign in with Email address</Typography> */}
              </Box>
            </Grid>
          </Grid>

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
              color="primary"
            />
            {touched.password && errors.password && (
              <FormHelperText error id="standard-weight-helper-text-password-login">
                {errors.password}
              </FormHelperText>
            )}
          </FormControl>

          <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1}>
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
                  '&[aria-controls="menu-list-grow"],&:hover': {
                    background: theme.palette.primary[800]
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
  );
};

export default AuthLogin;
