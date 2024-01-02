import React, { useState } from 'react';

import {
  Button, Grid, Stack, Typography, Autocomplete, TextareaAutosize,
  FormHelperText, TextField, useTheme, CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { raiseTicket } from '../../../../api/profile';
import AnimateButton from '../../../../components/@extended/AnimateButton';
import notesicon from '../../../../assets/images/gravitusimage/notesicon.svg';
import { Ticket_Raised, postDataSystem } from 'src/api_ng/system_ng';

const StyledTextarea = styled(TextareaAutosize)(({ theme, error }) => ({
  width: 'auto',
  fontFamily: 'IBM Plex Sans, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: 1.5,
  padding: 12,
  borderRadius: '3px 3px 0 3px',
  color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  background: 'transparent',
  border: `1px solid ${error ? 'red' : theme.palette.mode === 'dark' ? '#424a53' : '#d0d7de'}`,
  boxShadow: `0px 2px 2px ${theme.palette.mode === 'dark' ? '#24292f' : '#f6f8fa'}`,
  '&:hover': {
    borderColor: error ? 'red' : '#00BBAB'
  },
  '&:focus': {
    borderColor: error ? 'red' : '#00BBAB',
    boxShadow: `0 0 0 .2px ${theme.palette.mode === 'dark' ? '#00BBAB' : '#00BBAB'}`
  },
  '&:focus-visible': {
    outline: 0
  }
}));

const SupportScreen = ({ setSnackbarMessage, setSnackbarOpen, mutate }) => {
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);

  const Category = [
    { Category: 'Deposit' },
    { Category: 'Identity' },
    { Category: 'Paymodes' },
    { Category: 'P2P Trade' },
    { Category: 'SPOT Trade' },
    { Category: 'Withdraw' },
    { Category: 'Others' }
  ];


  const handleCustomChange = (e, val, setFieldValue) => {
    // console.log({ setFieldValue }, { val });
    if (val) {
      setFieldValue('category', val.Category);
    }
  };

  const ticketRaised = (values, actions) => {
    setIsLoading(true);
    var postData = {
      category: values.category,
      message: values.message
    }
    postDataSystem(Ticket_Raised(), postData).then(function (res) {
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
        actions.resetForm({ values: { message: '', category: null } });
        mutate();
        setSnackbarMessage({ msg: 'Ticket raised successfully', success: true });
        setSnackbarOpen(true);
        setIsLoading(false);
      }
    }, function (err) {
      // console.log(err);
      // Logout User
    });
  }
  return (
    <Grid pt={4} pb={4} pl={4} pr={4}>
      <Stack>
        <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          Create Ticket
        </Typography>
        <Formik
          initialValues={{
            message: '',
            category: null,
            submit: null
          }}
          validationSchema={Yup.object().shape({
            message: Yup.string().trim().max(255).required("Don't leave empty"),
            category: Yup.string().max(255).nullable().required('Select the type of category')
          })}
          onSubmit={async (values, actions) => {
            setIsLoading(true);
            try {
              ticketRaised(values, actions)
            } catch (err) {
              setSnackbarMessage({ msg: err.message, success: false });
              setSnackbarOpen(true);
              setIsLoading(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue, error }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Typography pt={2} variant="body2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                Category
              </Typography>
              <Grid pt={1}>
                <Autocomplete
                  id="country-customized-option-demo"
                  options={Category.map((item) => item.Category)}
                  value={values.category}
                  // disableCloseOnSelect
                  onChange={(e, val) => setFieldValue('category', val)}
                  // onChange={(e, val) => handleCustomChange(e, val, setFieldValue)}
                  renderOption={(props, option) => (
                    <Stack {...props} direction="row" spacing={1} backgroundColor={theme.palette.mode === 'dark' ? '#0F121A' : '#FFFFFF'}>
                      <Typography sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>{option}</Typography>
                    </Stack>
                  )}
                  // selectOnFocus
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select the type of Category"
                      name="category"
                      value={values.category}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(touched.category && errors.category)}
                      sx={{
                        '& .MuiInputBase-input': {
                          height: '6px',
                          borderRadius: '5px',
                          borderColor: '#959595'
                        }
                      }}
                    />

                  )}
                />
                {touched.category && errors.category && (
                  <FormHelperText error id="standard-weight-helper-text-category">
                    {errors.category}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }} pt={2}>
                <Typography pt={2} variant="body2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                  Message
                </Typography>
              </Grid>
              <Grid container spacing={3} pt={1}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <StyledTextarea
                      aria-label="minimum height"
                      minRows={3}
                      id="message"
                      type="message"
                      value={values.message}
                      name="message"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder=" "
                      fullWidth
                      error={Boolean(touched.message && errors.message)}
                    />
                    {touched.message && errors.message && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {errors.message}
                      </FormHelperText>
                    )}
                    {/* <OutlinedInput
                      id="message"
                      type="message"
                      value={values.message}
                      name="message"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder=" "
                      fullWidth
                      error={Boolean(touched.message && errors.message)}
                    />
                    {touched.message && errors.message && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {errors.message}
                      </FormHelperText>
                    )} */}
                  </Stack>
                </Grid>
              </Grid>

              <Grid item xs={12} pt={3}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                    {isLoading ? <CircularProgress color="inherit" size={30} /> : 'SUBMIT'}
                  </Button>
                </AnimateButton>
              </Grid>
            </form>
          )}
        </Formik>
      </Stack>

      <Stack pt={3}>
        <Stack direction="row" spacing={1}>
          <img src={notesicon} alt="notesicon" width={16} />
          <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
            Submit your issue and will addressed within 2-4 business days.
          </Typography>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default SupportScreen;
