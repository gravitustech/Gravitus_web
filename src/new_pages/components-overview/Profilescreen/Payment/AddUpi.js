import React from 'react';
import { Grid, Stack, Button, Typography, FormHelperText, OutlinedInput, useTheme } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Notes from './Notes';
import { useNavigate } from 'react-router';
import { updatePayment } from '../../../../api/profile';
const AddUpi = ({ setValue, setSnackbarMessage, setSnackbarOpen, userData, mutate }) => {
  console.log({ userData });
  const theme = useTheme();
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/profile/support');
    setValue('4');
  };
  return (
    <>
      <Formik
        initialValues={{
          name: userData?.details?.name,
          upiid: userData?.details?.upiId
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required("Don't leave empty"),
          upiid: Yup.string()
            .test('upiid-validation', 'Invalid UPI ID address', function (value) {
              if (!value) {
                return this.createError({ message: "Don't leave empty" });
              }
              return /^\w.+@\w+$/.test(value);
            })
            .required("Don't leave empty")
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          console.log({ values });
          try {
            const { data } = await updatePayment({
              accountType: 'GRAVITUS',
              postData: { payMode: 'UPI', name: values.name, upiId: values.upiid }
            });
            if (Object.keys(data.result).length) {
              console.log({ data });
              mutate();
              setSnackbarMessage({ msg: 'Payment updated successfully', success: true });
              setSnackbarOpen(true);
              console.log({ values });
              setStatus({ success: false });
              setSubmitting(false);
            } else {
              setSnackbarMessage({ msg: 'Payment updation failed', success: false });
              setSnackbarOpen(true);
            }
          } catch (err) {
            setSnackbarMessage({ msg: err.message, success: false });
            setSnackbarOpen(true);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3} pt={4} pb={2} pl={8} pr={8}>
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
                    Update
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
