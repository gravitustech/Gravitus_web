import {
  Grid, Typography, Stack, OutlinedInput, FormHelperText, Button, TextField,
  useTheme, InputAdornment, Box, IconButton, Dialog, Autocomplete, CircularProgress
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { NumericFormatCustom } from '../_Essentials/NumericFormatCustom';
import AnimateButton from '../../../../components/@extended/AnimateButton';

import UserBankdeatils from './UserBankdeatils';
import CardInr from './Card';

import * as Yup from 'yup';
import { Formik } from 'formik';

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR, { mutate } from 'swr';

import { Send_OTP, postDataSystem } from '../../../../api_ng/system_ng';
import { sendOtpSecurity } from '../../../../api/profile';
import { Estimate_Withdrawal, Sign_Withdrawal, Pre_Rs_Withdraw, postDataWallet } from '../../../../api_ng/wallet_ng';

const Email = ({ email }) => {
  const theme = useTheme();
  const firstTwo = email?.slice(0, 4);
  const lastTwo = email?.slice(-10);

  const middle = '*******';
  const maskedEmail = `${firstTwo}${middle}${lastTwo}`;

  return (
    <>
      {maskedEmail}
    </>
  );
};

const Mobilenumber = ({ number }) => {
  const theme = useTheme();
  const firstTwo = number?.slice(0, 2);
  const lastTwo = number?.slice(-2);

  const middle = '******';
  const Mobilenumber = `${firstTwo}${middle}${lastTwo}`;

  return (
    <>
      {Mobilenumber}
    </>
  );
};

const InrWithdraw_sp = ({ inrWithdrawData, setSnackbarMessage, setSnackbarOpen, setFormikValues, formikValues, setStep, step }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [otpisLoading, setOtpIsLoading] = useState(false);
  // console.log('inrWithdrawData', inrWithdrawData)

  const [POTPcolor, setPOTPColor] = useState('');
  const [MOTPcolor, setMOTPColor] = useState('');

  const [resendPOTP, setResendPOTP] = useState('SEND OTP');
  const [resendMOTP, setResendMOTP] = useState('SEND OTP');

  const [isResendMOTP, setIsResendMOTP] = useState(false);
  const [isResendPOTP, setIsResendPOTP] = useState(false);

  const [confirmWDL, setConfirmWDL] = useState(false);
  const [initiateWDL, setInitiateWDL] = useState(false);

  const [withdrawData, setWithdrawData] = useState(null);
  const [signWithdrawal, setSignWithdrawal] = useState(null);
  const [selectedBankAccount, setSelectedBankAccount] = useState(null);

  const formikEW = useRef();
  const formikSW = useRef();
  var securityData = null;

  const goBack = () => {
    navigate(-1);
  }

  const Accounts = [{
    Beneficiary: inrWithdrawData?.pfStatus?.accountName,
    BankName: inrWithdrawData?.pfStatus?.bankName,
    AcNumber: inrWithdrawData?.pfStatus?.accountNo,
    IFSCCode: inrWithdrawData?.pfStatus?.IFSCCode,
    payMode: inrWithdrawData?.pfStatus?.payMode,
  }];

  const closeConfirmWDL = () => {
    setConfirmWDL(false);
    setIsResendMOTP(false);
    setIsResendPOTP(false);
  };

  const closeInitiateWDL = () => {
    setInitiateWDL(false);

    setResendPOTP('SEND OTP');
    setResendMOTP('SEND OTP')
    setPOTPColor('');
    setMOTPColor('');

    setIsResendMOTP(false);
    setIsResendPOTP(false);
  };

  function reqSendOTP(action) {
    try {
      var postData = { verifyType: 'wSecurity', action }
      postDataSystem(Send_OTP(), postData).then(function (res) {
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
            else {
              setSnackbarMessage({ msg: res.error, success: false });
              setSnackbarOpen(true);
            }
          }
        } else {
          // console.log(res.result, 'SENT OTP');
          setSnackbarMessage({ msg: 'OTP Sent successfully', success: true });
          setSnackbarOpen(true);

          if (!isResendMOTP && action === 'sendMOTP') {
            if (!isResendMOTP) {
              setIsResendMOTP(true);
              setResendMOTP('RESEND OTP');
            }
            setMOTPColor('grey');
          }

          if (!isResendPOTP && action === 'sendPOTP') {
            if (!isResendPOTP) {
              setIsResendPOTP(true);
              setResendPOTP('RESEND OTP');
            }
            setPOTPColor('grey');
          }
        }
      }, function (err) {
        // console.log(err);
        // Logout User
      });
    } catch (err) {
      setErrors({ submit: err.message });
      setStatus({ success: false });
    }
  }

  function InitWithdrawal(postData) {
    setOtpIsLoading(true);
    postDataWallet(Sign_Withdrawal(), postData).then(function (res) {
      setOtpIsLoading(false);
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
          else {
            setSnackbarMessage({ msg: res.error, success: false });
            setSnackbarOpen(true);
          }
        }
      } else {
        // console.log(res.result, 'Sign Withdrawal');
        setInitiateWDL(false);

        setResendPOTP('SEND OTP');
        setResendMOTP('SEND OTP');

        setPOTPColor('');
        setMOTPColor('');

        setIsResendMOTP(false);
        setIsResendPOTP(false);

        setSnackbarMessage({ msg: res.result, success: false });
        setSnackbarOpen(true);

        setSelectedBankAccount(null);
        formikEW.current.resetForm({
          values: {
            bankAccount: null,
            amount: '',
            submit: null
          }
        });

        formikSW.current.resetForm({
          values: {
            gcode: '',
            otpmail: '',
            otpmbl: ''
          }
        });

        mutate(Pre_Rs_Withdraw);
      }
    }, function (err) {
      // console.log(err);
      // Logout User
    });
  }

  function estimateWithdrawal(values) {
    setIsLoading(true);
    setWithdrawData(values);
    var postData = values;
    postData.walletId = 17; // INR Listing

    postDataWallet(Estimate_Withdrawal(), postData).then(function (res) {
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
        // console.log(res.result, 'Estimate WDL');
        setSignWithdrawal(res.result);
        setConfirmWDL(true);
      }
    }, function (err) {
      // console.log(err);
      // Logout User
    });
  }

  useEffect(() => {
    let timeoutId;
    if (isResendMOTP) {
      timeoutId = setTimeout(() => {
        setResendMOTP('RESEND OTP');
        setIsResendMOTP(false);
        setMOTPColor('');
      }, 30000);
    }
    return () => clearTimeout(timeoutId);
  }, [isResendMOTP]);

  useEffect(() => {
    let timeoutId;
    if (isResendPOTP) {
      timeoutId = setTimeout(() => {
        setResendPOTP('RESEND OTP');
        setIsResendPOTP(false);
        setPOTPColor('');
      }, 30000);
    }
    return () => clearTimeout(timeoutId);
  }, [isResendPOTP]);
  return (
    <>
      <Stack pt={2}>
        <Formik
          innerRef={formikEW}
          initialValues={{
            bankAccount: null,
            amount: ''
          }}
          validationSchema={Yup.object().shape({
            bankAccount: Yup.object().nullable().required('Please select your Bank Account*'),
            amount: Yup.number().positive().required("Don't leave a empty*")
              .test(
                'insufficient-balance',
                'Insufficient balance',
                function (value) {
                  const availableBalance = inrWithdrawData?.walletInfo?.mAvailable;
                  return parseFloat(value) <= availableBalance;
                }
              )
              .test(
                'minimum-amount',
                `Withdraw amount must be at least ₹ ${inrWithdrawData?.withdrawMin}`,
                (value) => parseFloat(value) >= inrWithdrawData?.withdrawMin
              ),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              values.toAddress = values.bankAccount.AcNumber;
              estimateWithdrawal(values);
              setStatus({ success: false });
              setSubmitting(false);
              setIsLoading(true);
            } catch (err) {
              setErrors({ submit: err.message });
              setStatus({ success: false });
              setSubmitting(false);
              setIsLoading(false);
            }
          }}
        >

          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
            <>
              <form noValidate onSubmit={handleSubmit}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={4}>
                  <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                    Select Account
                  </Typography>
                  <Typography variant="body1" color="#00BBAB">
                    Avl.Balance: ₹ {inrWithdrawData.walletInfo.mAvailable}
                  </Typography>
                </Stack>
                <Grid pt={1}>
                  <Autocomplete
                    id="country-customized-option-demo"
                    value={values.bankAccount}
                    onChange={(e, val) => {
                      setFieldValue('bankAccount', val);
                      setSelectedBankAccount(val); // Set the selected bank account
                    }}
                    options={Accounts}
                    getOptionLabel={(option) => `${option.AcNumber} (${option.Beneficiary})`}
                    renderOption={(props, option) => (
                      <Stack sx={{
                        color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary',
                        backgroundColor: theme.palette.mode === 'dark' ? '#262B39' : '#FFFFFF'
                      }}
                        {...props} direction="row" spacing={1}>
                        <Typography sx={{ color: theme.palette.mode === 'dark' ? '#F7F7F7' : 'text.secondary' }}>{option.AcNumber}</Typography>
                        <Typography sx={{ color: theme.palette.mode === 'dark' ? '#F7F7F7' : 'text.secondary' }}>({option.Beneficiary})</Typography>
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
                        }} />
                    )} />
                  {touched.bankAccount && errors.bankAccount && (
                    <FormHelperText error id="standard-weight-helper-text-bankAccount">
                      {errors.bankAccount}
                    </FormHelperText>
                  )}
                </Grid>

                {selectedBankAccount && (
                  <UserBankdeatils bankData={inrWithdrawData.pfStatus} />
                )}
                {/* <Stack pt={2}>
                  <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                    Avl.Balance: ₹ {inrWithdrawData.walletInfo.mAvailable}
                  </Typography>
                </Stack> */}

                <Grid item xs={12} sx={{ mt: -1 }} pt={3}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={4}>
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      Withdraw Amount
                    </Typography>
                    <Typography variant="body1" color="#00BBAB">
                      Min INR: ₹ {inrWithdrawData.withdrawMin}
                    </Typography>
                  </Stack>
                </Grid>

                <Grid container spacing={3} pt={1}>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <TextField
                        id="amount"
                        value={values.amount}
                        name="amount"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder=""
                        fullWidth
                        error={Boolean(touched.amount && errors.amount)}
                        InputProps={{
                          inputComponent: NumericFormatCustom
                        }} />
                      {touched.amount && errors.amount && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {errors.amount}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
                <Stack pt={2} direction="row" justifyContent="space-between">
                  <Typography variant="body1" color="text.buy">
                  </Typography>
                  <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                    {/* Transaction fees: ₹ {depositTo.depositFees} */}
                    Withdraw fees: ₹ {inrWithdrawData.estFees}
                  </Typography>
                </Stack>
                <Grid item xs={12} pt={1}>
                  <AnimateButton>
                    <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                      {isLoading ? <CircularProgress color="inherit" size={30} /> : 'SUBMIT'}
                    </Button>
                  </AnimateButton>
                </Grid>
              </form>

              <Dialog onClose={closeConfirmWDL} open={confirmWDL}>
                <Stack p={4} spacing={2.5} sx={{ background: theme.palette.mode === 'dark' ? '#131722' : 'text.cardbackground' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <Typography variant="h4" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      Withdrawal Details
                    </Typography>
                    <IconButton edge="end" color="inherit" onClick={closeConfirmWDL} aria-label="close">
                      <CloseIcon />
                    </IconButton>
                  </Stack>
                  <Stack pt={1} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                      Withdrawal To (A/C Number)
                    </Typography>
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      {signWithdrawal?.toAddress}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                      Total Amount
                    </Typography>
                    <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      {signWithdrawal?.total} INR
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                      Estimated Fee
                    </Typography>
                    <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      {signWithdrawal?.transFees} INR
                    </Typography>
                  </Stack>

                  <Stack pt={1} direction="row" spacing={4} justifyContent="space-around">
                    <Button variant="contained5" onClick={closeConfirmWDL}>
                      Cancel
                    </Button>
                    <Button variant="contained4" onClick={() => { setConfirmWDL(false); setInitiateWDL(true) }}>
                      Confirm
                    </Button>
                  </Stack>
                </Stack>
              </Dialog>

              <Dialog onClose={closeInitiateWDL} open={initiateWDL}>
                <Stack p={4} spacing={2.5} sx={{ background: theme.palette.mode === 'dark' ? '#131722' : 'text.cardbackground' }}>
                  <Typography variant="h1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                    Widthdraw Security
                  </Typography>
                  <Formik
                    innerRef={formikSW}
                    initialValues={{
                      gcode: '',
                      otpmail: '',
                      otpmbl: ''
                    }}
                    validationSchema={Yup.object().shape({
                      otpmbl: signWithdrawal?.pSecurity?.enabled === '1' && Yup.number().positive().required("Don't leave a empty"),
                      otpmail: Yup.number().positive().required("Don't leave a empty"),
                      gcode: signWithdrawal?.gSecurity?.enabled === '1' && Yup.number().positive().required("Don't leave a empty")
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                      const phoneOTP = values.otpmbl;
                      const googleOTP = values.gcode;

                      const signData = {
                        walletId: 17, // INR Wallet Listing
                        toAddress: signWithdrawal.toAddress,
                        amount: signWithdrawal.amount,
                        verifyType: 'wSecurity',
                        emailOTP: values.otpmail,
                        ...(signWithdrawal?.pSecurity?.enabled === '1' && { phoneOTP }),
                        ...(signWithdrawal?.gSecurity?.enabled === '1' && { googleOTP })
                      };

                      try {
                        InitWithdrawal(signData);
                      } catch (err) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                      }
                    }}
                  >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                      <>
                        <form noValidate onSubmit={handleSubmit}>
                          <Grid item spacing={3} pt={1}>
                            <Stack spacing={1}>
                              {signWithdrawal?.pSecurity?.enabled === '1' && (
                                <>
                                  <Typography
                                    variant="body1"
                                    sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                                  >
                                    OTP will be send to  <Mobilenumber number={signWithdrawal?.pSecurity?.authKey} />
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
                                    endAdornment={<InputAdornment>
                                      <Button
                                        style={{
                                          color: POTPcolor || (theme.palette.mode === 'dark' ? '#fff' : '#000'),
                                          fontSize: '12px'
                                        }}
                                        onClick={() => reqSendOTP('sendPOTP')}
                                        disabled={isResendPOTP}
                                      >
                                        {resendPOTP}
                                      </Button>
                                    </InputAdornment>} />
                                  {touched.otpmbl && errors.otpmbl && (
                                    <FormHelperText error id="standard-weight-helper-text-otp-login">
                                      {errors.otpmbl}
                                    </FormHelperText>
                                  )}
                                </>
                              )}
                              <Typography
                                variant="body1"
                                sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                              >
                                OTP will be send to <Email email={signWithdrawal?.mSecurity?.authKey} />
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
                                endAdornment={<InputAdornment>
                                  <Button
                                    disableRipple
                                    style={{
                                      color: MOTPcolor || (theme.palette.mode === 'dark' ? '#fff' : '#000'),
                                      fontSize: '12px'
                                    }}
                                    onClick={() => reqSendOTP('sendMOTP')}
                                    disabled={isResendMOTP}
                                  >
                                    {resendMOTP}
                                  </Button>
                                </InputAdornment>} />
                              {touched.otpmail && errors.otpmail && (
                                <FormHelperText error id="standard-weight-helper-text-otp-login">
                                  {errors.otpmail}
                                </FormHelperText>
                              )}
                              {signWithdrawal?.gSecurity?.enabled === '1' && (
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
                                    error={Boolean(touched.gcode && errors.gcode)} />
                                  {touched.gcode && errors.gcode && (
                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                      {errors.gcode}
                                    </FormHelperText>
                                  )}
                                </>
                              )}
                            </Stack>
                          </Grid>
                          <Grid item xs={12} pt={2}>
                            <AnimateButton>
                              <Button fullWidth size="large" type="submit" variant="contained">
                                {otpisLoading ? <CircularProgress color="inherit" size={30} /> : 'SUBMIT'}
                              </Button>
                            </AnimateButton>
                          </Grid>
                        </form>
                      </>
                    )}
                  </Formik>
                </Stack>
              </Dialog>
            </>
          )}
        </Formik>
      </Stack>
    </>
  );
};

export default InrWithdraw_sp;