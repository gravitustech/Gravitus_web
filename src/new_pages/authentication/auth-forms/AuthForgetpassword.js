import React from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  OutlinedInput,
  Stack,
  // InputLabel,
  CircularProgress,
  Typography,
  useTheme
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from '../../../components/@extended/AnimateButton';
import { useState } from 'react';
import { Reset_Password, postDataSystem } from 'src/api_ng/system_ng';

// ============================|| FIREBASE - LOGIN ||============================ //

const GravitusAuthForgetpassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const ResetPassword = (values) => {
    setIsLoading(true);
    var postData = { emailId: values.email }

    postDataSystem(Reset_Password(), postData).then(function (res) {
      setIsLoading(false);
      if (res.error !== 'ok') {
        if (res.error.name == "Missing Authorization") {
          // Logout User
        }
        else if (res.error.name == "Invalid Authorization") {
          // Logout User
        }
        else {
          if (res.error.name != undefined) {
            setSnackbarMessage({ msg: res.error.name, success: false });
            setSnackbarOpen(true);
          }
          else if (res.error.action != undefined) {
            setSnackbarMessage({ msg: res.error.message, success: false });
            setSnackbarOpen(true);
          }
          else {
            setSnackbarMessage({ msg: res.error, success: false });
            setSnackbarOpen(true);
          }
        }
      } else {
        navigate('/forgetpasswordstatus', { state: { email: values.email } });
      }
    }, function (err) {
      // console.log(err);
      // Logout User
    });
  }

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(128, 'EmailId must be at most 128 characters').required('Email is required*')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          setIsLoading(true);

          try {
            setStatus({ success: false });
            setSubmitting(false);
            ResetPassword(values);
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <Typography htmlFor="email-login" variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                    Enter your Registered Email Id
                  </Typography>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Email*"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                    {isLoading ? <CircularProgress color="inherit" size={30} /> : 'NEXT'}
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default GravitusAuthForgetpassword;
