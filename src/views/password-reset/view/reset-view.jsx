import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
// import config from '../../../../config/config';

export default function ResetPage ({ ...others }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangePassword = async (values, { setErrors, setStatus, setSubmitting }) => {
    // try {
    //   const response = await axios.post(`${config.API_URL}/change-password`, {
    //     oldPassword: values.oldPassword,
    //     newPassword: values.newPassword,
    //     confirmPassword: values.confirmPassword,
    //   });

      if (response.data.success) {
        toast.success('Password changed successfully!');
        navigate('/dashboard');
      } else {
        setStatus({ success: false });
        setErrors({ submit: response.data.message });
        setSubmitting(false);
      }
    // } catch (error) {
    //   setStatus({ success: false });
    //   setErrors({ submit: error.message });
    //   setSubmitting(false);
    // }
  };

  return (
    <>
     

      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          oldPassword: Yup.string().max(255).required('Old Password is required'),
          newPassword: Yup.string().max(255).required('New Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm Password is required')
        })}
        onSubmit={handleChangePassword}
        
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others} style={{background: '#fff',borderRadius: '10px',
            padding:'20px'}}>
            <FormControl style={{ display: 'flex' }} error={Boolean(touched.oldPassword && errors.oldPassword)}  sx={{
      maxWidth: { xs: 400, lg: 380 },
      margin: { xs: 2.5, md: 3 },
      '& > *': {
        flexGrow: 1,
        flexBasis: '50%'
      }
    }}>
              <InputLabel htmlFor="outlined-adornment-old-password" style={{ fontSize: '12px' }}>Old Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-old-password"
                type={showOldPassword ? 'text' : 'password'}
                value={values.oldPassword}
                name="oldPassword"
                style={{ height: '35px', marginBottom: '0px' }}
                onBlur={handleBlur}
                onChange={handleChange}
                label="Old Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowOldPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      
                    >
                      {showOldPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {touched.oldPassword && errors.oldPassword && (
                <FormHelperText error id="standard-weight-helper-text-old-password">
                  {errors.oldPassword}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl style={{ display: 'flex' }} error={Boolean(touched.newPassword && errors.newPassword)}  sx={{
      maxWidth: { xs: 400, lg: 380 },
      margin: { xs: 2.5, md: 3 },
      '& > *': {
        flexGrow: 1,
        flexBasis: '50%'
      }
    }}>
              <InputLabel htmlFor="outlined-adornment-new-password" style={{ fontSize: '12px' }}>New Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-new-password"
                type={showNewPassword ? 'text' : 'password'}
                value={values.newPassword}
                name="newPassword"
                style={{ height: '35px', marginBottom: '0px' }}
                onBlur={handleBlur}
                onChange={handleChange}
                label="New Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showNewPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {touched.newPassword && errors.newPassword && (
                <FormHelperText error id="standard-weight-helper-text-new-password">
                  {errors.newPassword}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl style={{ display: 'flex' }} error={Boolean(touched.confirmPassword && errors.confirmPassword)}  sx={{
      maxWidth: { xs: 400, lg: 380 },
      margin: { xs: 2.5, md: 3 },
      '& > *': {
        flexGrow: 1,
        flexBasis: '50%'
      }
    }}>
              <InputLabel htmlFor="outlined-adornment-confirm-password" style={{ fontSize: '12px' }}>Confirm Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={values.confirmPassword}
                name="confirmPassword"
                style={{ height: '35px' }}
                onBlur={handleBlur}
                onChange={handleChange}
                label="Confirm Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <FormHelperText error id="standard-weight-helper-text-confirm-password">
                  {errors.confirmPassword}
                </FormHelperText>
              )}
            </FormControl>

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box  sx={{
      maxWidth: { xs: 400, lg: 280},
      margin: { xs: 2.5, md: 3 },
      '& > *': {
        flexGrow: 1,
        flexBasis: '50%'
      }
    }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{
                    transition: 'all .2s ease-in-out',
                    color: theme.palette.secondary.dark,
                    '&[aria-controls="menu-list-grow"],&:hover': {
                      background: theme.palette.secondary.dark_icon_hover,
                      color: theme.palette.secondary.dark
                    },
                    borderRadius: `${customization.borderRadius}px`
                  }}
                >
                  Change Password
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};


