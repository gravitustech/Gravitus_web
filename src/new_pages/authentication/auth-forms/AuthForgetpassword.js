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
  Typography
  // useTheme
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { resetPassword } from '../../../api/auth';

// project import
import AnimateButton from '../../../components/@extended/AnimateButton';
import { useState } from 'react';

// ============================|| FIREBASE - LOGIN ||============================ //

const GravitusAuthForgetpassword = () => {
  // const theme = useTheme();
  const navigate = useNavigate();

  const inputs = { accountType: 'GRAVITUS' };
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required*')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          setIsLoading(true);

          try {
            console.log({ values });
            const { data } = await resetPassword({ ...inputs, postData: { emailId: values.email } });
            if (data.error === 'ok') {
              console.log({ data });
              navigate('/forgetpasswordstatus');
            } else {
              setIsLoading(false);
              setSnackbarMessage({ msg: data.error, success: false });
              setSnackbarOpen(true);
            }

            setStatus({ success: false });
            setSubmitting(false);
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
                  <Typography htmlFor="email-login" variant="body1" >
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
