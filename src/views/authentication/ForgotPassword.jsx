import React, { useState } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  Grid,
  IconButton,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useFormik } from 'formik';

// third party
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import AuthWrapper from './components/AuthWrapper';
import MainCard from 'ui-component/cards/MainCard';
import Backend from 'services/backend';
import Verification from './components/verifyOTP';
import { IconArrowLeft } from '@tabler/icons-react';

// ============================|| AUTH - FORGOT PASSWORD ||============================ //

Yup.addMethod(Yup.string, 'ethiopianPhone', function (errorMessage) {
  return this.test('ethiopianPhone', errorMessage, function (value) {
    const { path, createError } = this;
    const regex = /^(?:\+251|251|0)?[79]\d{8}$/;
    return regex.test(value) || createError({ path, message: errorMessage || 'Invalid Ethiopian phone number' });
  });
});

const validationSchema = Yup.object().shape({
  phone: Yup.string().ethiopianPhone('Invalid Ethiopian phone number').max(9).required('Phone number is required')
});

const ForgotPassword = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  const [verification, setVerification] = useState(false);

  const formik = useFormik({
    initialValues: {
      phone: '',
      submit: null
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      handleSubmission(values);
    }
  });

  const handleSubmission = (values) => {
    setIsSubmitting(true);

    var Api = Backend.auth + Backend.resetPassword;
    var headers = {
      accept: 'application/json',
      'Content-Type': 'application/json'
    };

    fetch(Api, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ phone: '251' + values.phone })
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setIsSubmitting(false);
          setVerification(true);
        } else {
          setIsSubmitting(false);
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
      });
  };

  const [isSubmitting, setIsSubmitting] = useState(formik.isSubmitting);

  return (
    <AuthWrapper>
      <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 28px)' }}>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4} sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
          <MainCard>
            {verification ? (
              <Box>
                <Verification
                  phone={formik.values.phone}
                  onWrong={() => setVerification(false)}
                  onResend={() => handleSubmission(formik.values)}
                  isResending={isSubmitting}
                  onClose={() => setVerification(false)}
                />
              </Box>
            ) : (
              <React.Fragment>
                <Grid container direction="column" justifyContent="center" spacing={2}>
                  <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Grid
                      container
                      direction={matchDownSM ? 'column-reverse' : 'row'}
                      alignItems="center"
                      justifyContent="center"
                      sx={{ marginBottom: 3 }}
                    >
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography color={theme.palette.primary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                            Forgot Password
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" textAlign={matchDownSM ? 'center' : 'inherit'}>
                        Enter phone address associated with your account
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <form noValidate onSubmit={formik.handleSubmit}>
                  <Box
                    sx={{
                      padding: 1.4,
                      minWidth: '90%',
                      borderRadius: 2,
                      marginTop: 2,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography
                      color="primary"
                      sx={{
                        border: 0.8,
                        borderColor: theme.palette.primary.main,
                        padding: 1.9,
                        borderRadius: 2,
                        marginRight: 1,
                        fontWeight: 'bold'
                      }}
                    >
                      +251
                    </Typography>
                    <OutlinedInput
                      id="phone-number"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      fullWidth
                      placeholder="Your phone number"
                      error={formik.touched.phone && Boolean(formik.errors.phone)}
                    />
                    <Box>
                      <AnimateButton>
                        <Button
                          disableElevation
                          disabled={isSubmitting}
                          type="submit"
                          variant="contained"
                          color="primary"
                          sx={{
                            padding: 1.6,
                            borderRadius: 1.6,
                            fontWeight: 'bold',
                            marginLeft: 1,
                            paddingX: 2
                          }}
                        >
                          {isSubmitting ? <CircularProgress size={20} color="primary" /> : 'Submit'}
                        </Button>
                      </AnimateButton>
                    </Box>
                  </Box>

                  {formik.touched.phone && formik.errors.phone && (
                    <Box sx={{ mt: 2, paddingX: 1.4 }}>
                      <FormHelperText error>{formik.errors.phone}</FormHelperText>
                    </Box>
                  )}
                </form>
              </React.Fragment>
            )}
          </MainCard>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default ForgotPassword;
