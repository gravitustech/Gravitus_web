import Autocomplete from "@mui/material/Autocomplete";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AnimateButton from '../../../../components/@extended/AnimateButton';

import CardInr from './Card';
import GravitusBankdeatils from './UserBankdeatils';
import { NumericFormatCustom } from '../_Essentials/NumericFormatCustom';

import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Grid, Typography, Stack, OutlinedInput, FormHelperText, Button, TextField, useTheme } from '@mui/material';

const InrWithdraw_SP = () => {
  const theme = useTheme();

  const Coins = [
    { BankName: "ICIC", AcNumber: '15789385126215' },
    { BankName: "SBI", AcNumber: '36976556226542' },
  ];
  
  return (
    <>
      {/* <Grid pl={15} pt={2}>
        <Stack direction='row'>
          <ArrowBackIosNewIcon pt={10} sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }} />
        </Stack>
      </Grid> */}
      <CardInr >
        <Typography pb={0} sx={{ textAlign: 'center' }} variant='h1' color='text.buy'>
          INR Withdrawal
        </Typography>
        <Stack pt={2} direction='row' spacing={20} sx={{ justfyContent: 'space-between' }}>
          <Typography variant='body1' color='text.buy'>
            Fees: 0%
          </Typography>
          <Typography variant='body1' color='text.buy'>
            Avl.Balance: 1500.00 INR
          </Typography>
        </Stack>

        <Stack pt={2}>
          <Formik
            initialValues={{
              withdrawamount: '',
              otp: '',
              submit: null
            }}
            validationSchema={Yup.object().shape({
              withdrawamount: Yup.string().max(255).required('withdrawamount is required*'),
              otp: Yup.string().max(255).required('otp is required*'),

            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              try {
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
                <Typography pt={2} variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                  Select your bank account
                </Typography>
                <Grid pt={1}>
                  <Autocomplete
                    id="country-customized-option-demo"
                    options={Coins}
                    // disableCloseOnSelect
                    getOptionLabel={(option) => `${option.BankName} ${option.AcNumber}`}
                    renderOption={(props, option) => (
                      <Stack {...props} direction='row' spacing={1}>
                        <Typography >
                          {option.BankName}
                        </Typography>
                        <Typography >
                          {option.AcNumber}
                        </Typography>
                      </Stack>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select your bank account"
                        sx={{
                          "& .MuiInputBase-input": {
                            height: '6px',
                            borderRadius: '5px',
                            borderColor: '#959595',
                          },
                        }} />

                    )}
                  />
                </Grid>

                <GravitusBankdeatils />

                <Grid item xs={12} sx={{ mt: -1 }} pt={3}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>Enter the amount to Withdraw</Typography>
                    <Typography variant="body1" color="text.buy">
                      Min INR: 500.00
                    </Typography>
                  </Stack>
                </Grid>
                <Grid container spacing={3} pt={1}>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <TextField
                        id="withdrawamount"
                        type="withdrawamount"
                        value={values.withdrawamount}
                        name="withdrawamount"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Eg: 1500.00"
                        fullWidth
                        error={Boolean(touched.withdrawamount && errors.withdrawamount)}
                        InputProps={{
                          inputComponent: NumericFormatCustom
                        }}
                      />
                      {touched.withdrawamount && errors.withdrawamount && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {errors.withdrawamount}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
                <Stack pt={3}>
                  <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }} >
                    OTP Confirmation
                  </Typography>
                  <Typography pt={2} variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                    Enter the OTP sent to your Email address or Mobile number.
                  </Typography>
                  <Grid item xs={12} pt={1}>
                    <Stack spacing={1}>
                      <OutlinedInput
                        id="otp"
                        type="otp"
                        value={values.otp}
                        name="otp"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter OTP"
                        fullWidth
                        error={Boolean(touched.otp && errors.otp)}
                      />
                      {touched.otp && errors.otp && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {errors.otp}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                </Stack>
                <Grid item xs={12} pt={3}>
                  <AnimateButton>
                    <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                      Withdraw
                    </Button>
                  </AnimateButton>
                </Grid>
              </form>
            )}
          </Formik>
        </Stack>

      </CardInr>
    </>

  )
}

export default InrWithdraw_SP;
