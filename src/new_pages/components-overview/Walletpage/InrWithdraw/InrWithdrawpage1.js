import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Grid, Typography, Stack, OutlinedInput, FormHelperText, Button, TextField, 
  useTheme, InputAdornment, Box, IconButton 
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Autocomplete from '@mui/material/Autocomplete';

import { Formik } from 'formik';
import * as Yup from 'yup';

import CardInr from './Card';
import UserBankdeatils from './UserBankdeatils';
import { NumericFormatCustom } from '../NumericFormatCustom';
import AnimateButton from '../../../../components/@extended/AnimateButton';

import useSWR from 'swr';
import { fetcher, getWalletURLINRWidthdraw, postWidthdrawData } from '../../../../api/wallet';
import { sendOtpSecurity } from '../../../../api/profile';

const InrWithdrawpage1 = ({ inrWithdrawData, setSnackbarMessage, setSnackbarOpen, setFormikValues, formikValues, setStep, step, securityData }) => {

  const theme = useTheme();
  const navigate = useNavigate();

  const [color, setColor] = useState('');
  const [displayText1, setDisplayText1] = useState('SEND OTP');
  const [displayText2, setDisplayText2] = useState('SEND OTP');
  const [isResendMOTP, setIsResendMOTP] = useState(false);
  const [isResendPOTP, setIsResendPOTP] = useState(false);

  console.log({ inrWithdrawData });
  
  const Accounts = [{
    Beneficiary: inrWithdrawData?.pfStatus?.accountName,
    BankName: inrWithdrawData?.pfStatus?.bankName,
    AcNumber: inrWithdrawData?.pfStatus?.accountNo,
    IFSCCode: inrWithdrawData?.pfStatus?.IFSCCode,
    payMode: inrWithdrawData?.pfStatus?.payMode,
  }];
  
  const handleOTP = async (action) => {
    try {
      const { data } = await sendOtpSecurity({
        accountType: 'GRAVITUS',
        postData: {
          verifyType: 'wSecurity',
          action
        }
      });
      if (Object.keys(data.result).length) {
        console.log({ data });
        setSnackbarMessage({ msg: 'OTP Sent successfully', success: true });
        setSnackbarOpen(true);
        if (!isResendMOTP && action === 'sendMOTP') {
          setIsResendMOTP(true);
          setDisplayText2('RESEND OTP');
        }
        if (!isResendPOTP && action === 'sendPOTP') {
          setIsResendPOTP(true);
          setDisplayText1('RESEND OTP');
        }
        // setColor('grey');
      } else {
        setSnackbarMessage({ msg: 'OTP Request failed', success: false });
        setSnackbarOpen(true);
      }
    } catch (err) {
      setSnackbarMessage({ msg: err.message, success: false });
      setSnackbarOpen(true);
    }

    // if (isResend) {
    //   setDisplayText('RESEND OTP');
    // } else {
    //   setDisplayText('SEND OTP');
    // }
    // setIsResend(true);
  };

  const goBack = () => {
    navigate(-1);
  }
  
  return (
    <>
      {/* <Grid pl={15} pt={2}>
        <Stack direction='row'>
          <ArrowBackIosNewIcon pt={10} sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }} />
        </Stack>
      </Grid> */}
      <CardInr>
        <Box display="flex" alignItems="center" >
          <IconButton onClick={goBack} disableRipple>
            <ArrowBackIosNewIcon
              sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
            />
          </IconButton>
          <Typography pb={0} pl={6} sx={{ textAlign: 'center' }} variant="h1" color="text.buy">
            INR Withdrawal
          </Typography>
        </Box>

        <Grid pt={2}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            textAlign: 'center',
            alignItems: 'center'
          }}>
          <Typography variant="body1" color="#00BBAB">
            Fees: {inrWithdrawData.estFees} INR
          </Typography>
          <Typography variant="body1" color="#00BBAB">
            Avl.Balance: {inrWithdrawData.walletInfo.mAvailable} INR
          </Typography>
        </Grid>

        <Stack pt={2}>
          <Formik
            initialValues={{
              bankAccount: null,
              withdrawamount: '',
              gcode: '',
              otpmail: '',
              otpmbl: ''
            }}
            validationSchema={Yup.object().shape({
              bankAccount: Yup.object().nullable().required('Please select your Bank Account*'),
              withdrawamount: Yup.number().positive().required("Don't leave a empty*").test(
                'insufficient-balance',
                'Insufficient balance',
                function (value) {
                  const availableBalance = inrWithdrawData.walletInfo.mAvailable; // Replace with your actual available balance
                  return parseFloat(value) <= availableBalance;
                }
              ).test(
                'minimum-amount',
                'Withdraw amount must be at least ₹ 300',
                (value) => parseFloat(value) >= 300
              ),
              otpmbl: step === 2 && securityData?.pSecurity?.enabled === '1' && Yup.number().positive().max(5).required("Don't leave a empty*"),
              otpmail: step === 2 && Yup.number().positive().max(5).required("Don't leave a empty*"),
              gcode: step === 2 && securityData?.gSecurity?.enabled === '1' && Yup.number().positive().max(6).required("Don't leave a empty*")
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              console.log({ values });
              if (step === 1) {
                setFormikValues({ ...formikValues, amount: values.withdrawamount });
                setStep(2);
                // try {
                //   const { data } = await postWidthdrawData({
                //     accountType: 'GRAVITUS',
                //     postData: {
                //       walletId: inrWithdrawData.walletInfo.walletId,
                //       toAddress: inrWithdrawData.pfStatus.accountNo,
                //       amount: values.withdrawamount
                //     }
                //   });
                //   if (Object.keys(data.result).length) {
                //     console.log({ data });
                //     setStep(2);
                //   } else {
                //     setSnackbarMessage({ msg: 'Withdraw Request failed', success: false });
                //     setSnackbarOpen(true);
                //   }
                // } catch (e) {
                //   setSnackbarMessage({ msg: e.message, success: false });
                //   setSnackbarOpen(true);
                //   console.log(e.message);
                // }
              }
              if (step === 2) {
                const phoneOTP = values.otpmbl;
                const googleOTP = values.gcode;
                const postData = {
                  walletId: inrWithdrawData.walletInfo.walletId,
                  toAddress: inrWithdrawData.pfStatus.accountNo,
                  amount: values.withdrawamount,
                  verifyType: 'wSecurity',
                  emailOTP: values.otpmail,
                  ...(securityData?.pSecurity?.enabled === '1' && { phoneOTP }),
                  ...(securityData?.gSecurity?.enabled === '1' && { googleOTP })
                };
                try {
                  const { data } = await withdrawSecurity({ accountType: 'GRAVITUS', postData });
                  if (Object.keys(data.result).length) {
                    console.log({ data });
                    setSnackbarMessage({ msg: 'otp validated', success: true });
                    setSnackbarOpen(true);
                    setOtpState(true);
                    handleClose();
                  } else {
                    setSnackbarMessage({ msg: 'Request failed', success: false });
                    setSnackbarOpen(true);
                  }
                } catch (err) {
                  setStatus({ success: false });
                  setErrors({ submit: err.message });
                  setSubmitting(false);
                }
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Typography pt={2} variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                  Select your Bank Account
                </Typography>
                <Grid pt={1}>
                  <Autocomplete
                    id="country-customized-option-demo"
                    value={values.bankAccount}
                    onChange={(e, val) => setFieldValue('bankAccount', val)}
                    options={Accounts}
                    getOptionLabel={(option) => `${option.AcNumber} (${option.Beneficiary})`}
                    renderOption={(props, option) => (
                      <Stack sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                        {...props} direction="row" spacing={1}>
                        <Typography>{option.AcNumber}</Typography>
                        <Typography>({option.Beneficiary})</Typography>
                      </Stack>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        value={values.bankAccount}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(touched.bankAccount && errors.bankAccount)}
                        placeholder="Select your Bank Account"
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
                  {touched.bankAccount && errors.bankAccount && (
                    <FormHelperText error id="standard-weight-helper-text-bankAccount">
                      {errors.bankAccount}
                    </FormHelperText>
                  )}
                </Grid>

                <UserBankdeatils bankData={inrWithdrawData.pfStatus} />

                <Grid item xs={12} sx={{ mt: -1 }} pt={5}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={4}>
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      Enter the amount to Withdraw
                    </Typography>
                    <Typography variant="body1" color="#00BBAB">
                      Min INR: {inrWithdrawData.withdrawMin}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid container spacing={3} pt={1}>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <TextField
                        id="withdrawamount"
                        value={values.withdrawamount}
                        name="withdrawamount"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder=""
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
                {step === 2 && (
                  <Stack pt={3}>
                    <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      OTP Confirmation
                    </Typography>
                    {/* <Typography
                      pt={2}
                      variant="body1"
                      sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                    >
                      Enter the OTP sent to your Email address or Mobile number.
                    </Typography> */}
                    <Grid item xs={12} pt={1}>
                      <Stack spacing={1}>
                        {securityData?.pSecurity?.enabled === '1' && (
                          <>
                            <Typography
                              variant="body1"
                              sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                            >
                              OTP will be send to {securityData?.pSecurity?.authKey}
                            </Typography>
                            <OutlinedInput
                              id="otpmbl-login"
                              type="text"
                              value={values.otpmbl}
                              name="otpmbl"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder=" "
                              fullWidth
                              error={Boolean(touched.otpmbl && errors.otpmbl)}
                              endAdornment={
                                <InputAdornment>
                                  <Button
                                    style={{
                                      color: color || (theme.palette.mode === 'dark' ? '#fff' : '#000'),
                                      fontSize: '12px'
                                    }}
                                    onClick={() => handleOTP('sendPOTP')}
                                  >
                                    {displayText1}
                                  </Button>
                                </InputAdornment>
                              }
                            />
                            {touched.otpmbl && errors.otpmbl && (
                              <FormHelperText error id="standard-weight-helper-text-otp-login">
                                {errors.otpmbl}
                              </FormHelperText>
                            )}
                          </>
                        )}
                        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                          OTP will be send to {securityData?.mSecurity?.authKey}
                        </Typography>
                        <OutlinedInput
                          id="otpmail-login"
                          type="text"
                          value={values.otpmail}
                          name="otpmail"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder=" "
                          fullWidth
                          error={Boolean(touched.otpmail && errors.otpmail)}
                          endAdornment={
                            <InputAdornment>
                              <Button
                                style={{
                                  color: color || (theme.palette.mode === 'dark' ? '#fff' : '#000'),
                                  fontSize: '12px'
                                }}
                                onClick={() => handleOTP('sendMOTP')}
                              >
                                {displayText2}
                              </Button>
                            </InputAdornment>
                          }
                        />
                        {touched.otpmail && errors.otpmail && (
                          <FormHelperText error id="standard-weight-helper-text-otp-login">
                            {errors.otpmail}
                          </FormHelperText>
                        )}
                        {securityData?.gSecurity?.enabled === '1' && (
                          <>
                            <Typography
                              variant="body1"
                              sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                            >
                              Google Authenticator Code
                            </Typography>
                            <OutlinedInput
                              id="gcode"
                              type="gcode"
                              value={values.gcode}
                              name="gcode"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder=""
                              fullWidth
                              error={Boolean(touched.gcode && errors.gcode)}
                            />
                            {touched.gcode && errors.gcode && (
                              <FormHelperText error id="standard-weight-helper-text-email-login">
                                {errors.gcode}
                              </FormHelperText>
                            )}
                          </>
                        )}
                      </Stack>
                    </Grid>
                  </Stack>
                )}
                <Grid item xs={12} pt={3}>
                  <AnimateButton>
                    <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                      {step === 1 ? 'SUBMIT' : 'WITHDRAW'}
                    </Button>
                  </AnimateButton>
                </Grid>
              </form>
            )}
          </Formik>
        </Stack>
      </CardInr >
    </>
  );
};

export default InrWithdrawpage1;
