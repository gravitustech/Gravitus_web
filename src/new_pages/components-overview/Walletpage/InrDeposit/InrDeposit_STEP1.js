import {
  Grid, Typography, Stack, OutlinedInput, FormHelperText, Button, TextField,
  useTheme, IconButton, Box, Dialog
} from '@mui/material';

import AnimateButton from '../../../../components/@extended/AnimateButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Autocomplete from '@mui/material/Autocomplete';

import doticon from '../../../../assets/images/gravitusimage/doticon.svg';
import { NumericFormatCustom } from '../_Essentials/NumericFormatCustom';
import CardInr from '../InrWithdraw/Card';

import { Formik } from 'formik';
import * as Yup from 'yup';

import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const InrDeposit_STEP1 = ({ depositFrom, depositTo, setStep, setFormikValues, formikValues, handleOpen, handleClose, open }) => {

  const theme = useTheme();
  const navigate = useNavigate();
  const Deposit = [{ DepositMode: 'IMPS' }, { DepositMode: 'NEFT' }, { DepositMode: 'RTGS' }];

  const goBack = () => {
    navigate(-1);
  }

  return (
    <>
      {depositFrom && depositTo && (
        <CardInr>
          <Box display="flex" alignItems="center">
            <IconButton onClick={goBack} disableRipple >
              <ArrowBackIosNewIcon
                sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
              />
            </IconButton>
            <Typography pb={0} pl={12} sx={{ textAlign: 'center' }} variant="h1" color="text.buy">
              INR Deposit
            </Typography>
          </Box>
          <Stack pt={2}>
            <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
              Kindly read the following instructions before depositing your amount
            </Typography>
          </Stack>

          <Stack pt={2} spacing={3}>
            <Stack direction="row" spacing={1} style={{ alignItems: 'flex-start' }}>
              <img src={doticon} alt="doticon" style={{ paddingTop: '8px' }} />
              <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                Deposit via bank transfer using deposit partners
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} style={{ alignItems: 'flex-start' }}>
              <img src={doticon} alt="doticon" style={{ paddingTop: '8px' }} />
              <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                Deposit partner bank details will be displayed in the next page after you submit your deposit amount. Kindly transfer the
                deposit amount only to that account
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} style={{ alignItems: 'flex-start' }}>
              <img src={doticon} alt="doticon" style={{ paddingTop: '8px' }} />
              <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                Deposit via your linked bank account only. Deposits from any other account will not reflect in your balance.
              </Typography>
            </Stack>
          </Stack>

          <Stack pt={2} direction="row" spacing={6.5} sx={{ justfyContent: 'space-between' }}>
            <Typography variant="body1" color="text.buy">
              Limit: ₹ {depositTo.minAmount} to ₹ {depositTo.maxAmount}
            </Typography>
            <Typography variant="body1" color="text.buy">
              Transaction fees: ₹ {depositTo.depositFees}
            </Typography>
          </Stack>

          <Stack pt={1}>
            <Formik
              initialValues={{
                depositamount: '',
                paymode: null,
                submit: null
              }}
              validationSchema={Yup.object().shape({
                paymode: Yup.string().nullable().required('Please Select the mode of transfer*'),
                depositamount: Yup.number().positive().required("Don't leave empty*")
                  .test(
                    'minimum-amount',
                    'Deposit amount must be at least ₹ 100',
                    (value) => parseFloat(value) >= 100
                  ).test(
                    'minimum-amount',
                    'Deposit amount should not exceeds ₹ 1,00,000',
                    (value) => parseFloat(value) <= 100000
                  ),
              })}
              onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                console.log({ values });
                setFormikValues({ ...formikValues, depositAmount: values.depositamount, payMode: values.paymode });
                setStep(2);
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
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <Typography
                    pt={2}
                    variant="body1"
                    sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                  >
                    Deposit Mode
                  </Typography>
                  <Grid pt={1}>
                    <Autocomplete
                      id="country-customized-option-demo"
                      options={Deposit.map((item) => item.DepositMode)}
                      // disableCloseOnSelect
                      value={values.paymode}
                      onChange={(e, val) => setFieldValue('paymode', val)}
                      // getOptionLabel={(option) => `${option.DepositMode}`}
                      renderOption={(props, option) => (
                        <Stack {...props} direction="row" spacing={1} backgroundColor={theme.palette.mode === 'dark' ? '#262B39' : '#FFFFFF'}>
                          <Typography sx={{color:theme.palette.mode === 'dark' ? '#F7F7F7' : 'text.secondary'}}>{option}</Typography>
                        </Stack>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select the mode of transfer"
                          value={values.paymode}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={Boolean(touched.paymode && errors.paymode)}
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
                    {touched.paymode && errors.paymode && (
                      <FormHelperText error id="standard-weight-helper-text-paymode">
                        {errors.paymode}
                      </FormHelperText>
                    )}
                  </Grid>

                  <Grid item xs={12} sx={{ mt: -1 }} pt={2}>
                    <Typography
                      pt={2}
                      variant="body1"
                      sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                    >
                      Enter the amount to Deposit
                    </Typography>
                  </Grid>
                  <Grid container spacing={3} pt={1}>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <TextField
                          id="depositamount"
                          value={values.depositamount}
                          name="depositamount"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder=""
                          fullWidth
                          error={Boolean(touched.depositamount && errors.depositamount)}
                          InputProps={{
                            inputComponent: NumericFormatCustom
                          }}
                        />
                        {touched.depositamount && errors.depositamount && (
                          <FormHelperText error id="standard-weight-helper-text-email-login">
                            {errors.depositamount}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} pt={3}>
                    <AnimateButton>
                      <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                        SUBMIT
                      </Button>
                    </AnimateButton>
                  </Grid>
                </form>
              )}
            </Formik>
          </Stack>

          <Dialog open={open}>
            <Stack p={4} spacing={2.5} sx={{ background: theme.palette.mode === 'dark' ? '#131722' : 'text.cardbackground' }}>
              <Typography variant="h4" sx={{ color: theme.palette.mode === 'dark' ? 'text.white' : 'text.secondary' }}>
                Do not pay via UPI deposit for this deposit
              </Typography>

              <Stack spacing={2} pt={2}>
                <Stack direction="row" spacing={1} style={{ alignItems: 'flex-start' }}>
                  <img src={doticon} alt="doticon" style={{ paddingTop: '8px' }} />
                  <Typography
                    variant="body1"
                    sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}
                  >
                    Please deposit funds only via NEFT, RTGS or IMPS. Do not use <br /> UPI apps such as Gpay, Phonepe, Paytm,
                    BHIM, etc.
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} style={{ alignItems: 'flex-start' }}>
                  <img src={doticon} alt="doticon" style={{ paddingTop: '8px' }} />
                  <Typography
                    variant="body1"
                    sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}
                  >
                    Note: UPI deposits will be rejected and refunded within 15 <br /> days. Gravitus will not be responsible for
                    any loss of funds <br /> sent via UPI.
                  </Typography>
                </Stack>
              </Stack>

              <Stack pt={1} direction="row" spacing={2} justifyContent="space-between">
                <Button variant="contained5" onClick={goBack}>
                  Cancel
                </Button>
                <Button variant="contained6" onClick={handleClose}>I agree and continue further</Button>
              </Stack>
            </Stack>
          </Dialog>
        </CardInr>
      )}
    </>
  );
};

export default InrDeposit_STEP1;