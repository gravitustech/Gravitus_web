import React, { useState } from 'react';

import {
  Grid, Stack, Button, Typography, FormHelperText,
  OutlinedInput, useTheme, CircularProgress
} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';

import { useNavigate } from 'react-router';

import Notes from './Notes';
import { Update_PayModes, postDataSystem } from 'src/api_ng/system_ng';

const AddUpi = ({ setValue, setSnackbarMessage, setSnackbarOpen, userData, mutate }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = () => {
    navigate('/profile/support');
    setValue('4');
  };

  const UpdateUPI = (values) => {
    setIsLoading(true);
    var postData = {
      payMode: 'UPI', name: values.name, upiId: values.upiid
    }

    postDataSystem(Update_PayModes(), postData).then(function (res) {
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
        mutate();
        setSnackbarMessage({ msg: 'Payment updated successfully', success: true });
        setSnackbarOpen(true);
        setIsLoading(false);
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
          name: userData?.details?.name,
          upiid: userData?.details?.upiId
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().trim().max(255).required("Don't leave empty"),
          upiid: Yup.string().trim()
            .test('upiid-validation', 'Invalid UPI ID address', function (value) {
              if (!value) {
                return this.createError({ message: "Don't leave empty" });
              }
              return /^\w.+@\w+$/.test(value);
            })
            .required("Don't leave empty")
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setIsLoading(true);
            setStatus({ success: false });
            setSubmitting(false);
            UpdateUPI(values);
          } catch (err) {
            setSnackbarMessage({ msg: err.message, success: false });
            setSnackbarOpen(true);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
            setIsLoading(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3} pb={2}
              pt={{ xs: 2, sm: 2, md: 4, lg: 4 }}
              pl={{ xs: 2, sm: 4, md: 8, lg: 8 }}
              pr={{ xs: 2, sm: 4, md: 8, lg: 8 }}
            >
              <Grid item xs={12} >
                <Stack>
                  <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                    Add UPI Payment Method
                  </Typography>
                </Stack>
                <Stack spacing={1} pt={3}>
                  <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                    Name
                  </Typography>
                  <OutlinedInput
                    id="name"
                    type="name"
                    value={values.name}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder=""
                    fullWidth
                    readOnly={userData?.checked}
                    error={Boolean(touched.name && errors.name)}
                  />
                  {touched.name && errors.name && (
                    <FormHelperText error id="standard-weight-helper-text-name">
                      {errors.name}
                    </FormHelperText>
                  )}
                </Stack>

                <Stack spacing={1} pt={3}>
                  <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                    UPI ID
                  </Typography>
                  <OutlinedInput
                    id="upiid"
                    type="upiid"
                    value={values.upiid}
                    name="upiid"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder=""
                    fullWidth
                    readOnly={userData?.checked}
                    error={Boolean(touched.upiid && errors.upiid)}
                  />
                  {touched.upiid && errors.upiid && (
                    <FormHelperText error id="standard-weight-helper-text-upiid">
                      {errors.upiid}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" spacing={3} pt={2}>
                  <Button variant="supportbutton" onClick={handleNavigate}>
                    Support
                  </Button>
                  <Button disableElevation disabled={userData?.checked} type="submit" variant={'updatebutton'}>
                    {isLoading ? <CircularProgress color="inherit" size={30} /> : 'Update'}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      <Notes description="Your UPI details will be shown to counterpart traders. Please make sure to enter the correct data." />
    </>
  );
};

export default AddUpi;
