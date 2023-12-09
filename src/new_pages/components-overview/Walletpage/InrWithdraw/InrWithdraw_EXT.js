import React, { useState, useRef, useEffect } from 'react';

import {
  Grid, Typography, Stack, OutlinedInput, FormHelperText, Button,
  TextField, useTheme, InputAdornment, Box, IconButton, Dialog, Autocomplete
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import CardInr from './Card';
import UserBankdeatils from './UserBankdeatils';
import { NumericFormatCustom } from '../NumericFormatCustom';
import AnimateButton from '../../../../components/@extended/AnimateButton';

import { useNavigate } from 'react-router-dom';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { sendOtpSecurity } from '../../../../api/profile';
import { Sign_Withdrawal, postDataWallet } from '../../../../api_ng/wallet_ng';

const Email = ({ email }) => {
  const theme = useTheme();
  const firstTwo = email.slice(0, 4);
  const lastTwo = email.slice(-10);
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
  const firstTwo = number.slice(0, 2);
  const lastTwo = number.slice(-2);
  const middle = '******';

  const Mobilenumber = `${firstTwo}${middle}${lastTwo}`;

  return (
    <>
      {Mobilenumber}
    </>
  );
};

const InrWithdraw_EXT = ({ inrWithdrawData, setSnackbarMessage, setSnackbarOpen, setFormikValues, formikValues, setStep, step, securityData }) => {

  const theme = useTheme();
  const navigate = useNavigate();

  const [color, setColor] = useState('');

  const [resendPOTP, setResendPOTP] = useState('SEND OTP');
  const [resendMOTP, setResendMOTP] = useState('SEND OTP');

  const [isResendMOTP, setIsResendMOTP] = useState(false);
  const [isResendPOTP, setIsResendPOTP] = useState(false);

  const [selectedBankAccount, setSelectedBankAccount] = useState(null);
  const [checkWithdraw, setCheckWithdraw] = useState(null);

  const [confirmOrSignWDL, setConfirmOrSignWDL] = useState(false);
  const [showSignWDL, setShowSignWDL] = useState(false);

  const formikEW = useRef();
  const formikSW = useRef();

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

  function estimateWithdrawal() {
    // Add Estimate Withdrawal Logic
    setConfirmOrSignWDL(true);
  }

  const closeConfirmOrSignWDL = () => {
    setConfirmOrSignWDL(false);
    setIsResendMOTP(false);
    setIsResendPOTP(false);
    setShowSignWDL(false);
  };

  const showSignWithdrawal = async () => {
    setShowSignWDL(true);
  };

  function signWithdrawal(postData) {
    postDataWallet(Sign_Withdrawal(), postData).then(function (res) {
      console.log(res);

      if (res.error !== 'ok') {
        handleCloseDialog();
        setIsLoading(false);

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
        setShowSignWDL(false);
        setConfirmOrSignWDL(false);

        setIsResendMOTP(false);
        setIsResendPOTP(false);

        setSnackbarMessage({ msg: res.result, success: false });
        setSnackbarOpen(true);

        formikSW.current.resetForm({
          values: {
            gcode: '',
            otpmail: '',
            otpmbl: ''
          }
        });

        formikEW.current.resetForm({
          values: {
            address: '',
            amount: '',
            totalAmount: '',
            coin: null,
            submit: null
          }
        });
      }
    }, function (err) {
      console.log(err);
      // Logout User
    });
  }

  const reqSendOTP = async (action) => {
    try {
      const { data } = await sendOtpSecurity({
        accountType: 'GRAVITUS',
        postData: { verifyType: 'wSecurity', action }
      });

      if (Object.keys(data.result).length) {
        setSnackbarMessage({ msg: 'OTP Sent successfully', success: true });
        setSnackbarOpen(true);

        if (!isResendMOTP && action === 'sendMOTP') {
          if (!isResendMOTP) {
            setIsResendMOTP(true);
            setResendMOTP('RESEND OTP');
          }
          setColor('grey');
        }
        if (!isResendPOTP && action === 'sendPOTP') {
          if (!isResendPOTP) {
            setIsResendPOTP(true);
            setResendPOTP('RESEND OTP');
          }
          setColor('grey');
        }
      } else {
        setSnackbarMessage({ msg: 'OTP Request failed', success: false });
        setSnackbarOpen(true);
      }
    } catch (err) {
      setSnackbarMessage({ msg: err.message, success: false });
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    let timeoutId;
    if (isResendMOTP) {
      timeoutId = setTimeout(() => {
        setResendMOTP('RESEND OTP');
        setColor('');
        // setIsResendMOTP('RESEND OTP');
        setIsResendMOTP(false);
      }, 30000); // 1 minute = 60000 milliseconds
    }
    return () => clearTimeout(timeoutId);
  }, [isResendMOTP]);

  useEffect(() => {
    let timeoutId;
    if (isResendPOTP) {
      timeoutId = setTimeout(() => {
        setResendPOTP('RESEND OTP');
        setColor('');
        // setIsResendPOTP('RESEND OTP');
        setIsResendPOTP(false);
      }, 30000); // 1 minute = 60000 milliseconds
    }
    return () => clearTimeout(timeoutId);
  }, [isResendPOTP]);

  return (
    <>
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
            innerRef={formikEW}
            initialValues={{
              bankAccount: null,
              withdrawamount: '',
              gcode: '',
              otpmail: '',
              otpmbl: ''
            }}
            validationSchema={Yup.object().shape({
              bankAccount: Yup.object().nullable().required('Please select your Bank Account*'),
              withdrawamount: Yup.number().positive().required("Don't leave a empty*")
                .test(
                  'insufficient-balance',
                  'Insufficient balance',
                  function (value) {
                    const availableBalance = inrWithdrawData.walletInfo.mAvailable;  
                    return parseFloat(value) <= availableBalance;
                  }
                )
                .test(
                  'minimum-amount',
                  'Withdraw amount must be at least ₹ 300',
                  (value) => parseFloat(value) >= 300
                ),
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              console.log({ values });
              try {
                setCheckWithdraw(values);
                estimateWithdrawal(values);

                setStatus({ success: false });
                setSubmitting(false);
              } catch (err) {
                setErrors({ submit: err.message });
                setStatus({ success: false });
                setSubmitting(false);
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
              <><form noValidate onSubmit={handleSubmit}>
                <Typography pt={2} variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                  Select your Bank Account
                </Typography>

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
                        }} />
                      {touched.withdrawamount && errors.withdrawamount && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {errors.withdrawamount}
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

                <Dialog onClose={closeConfirmOrSignWDL} open={confirmOrSignWDL}>
                  {!showSignWDL ? (
                    (
                      <Stack p={4} spacing={2.5}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                          <Typography variant="h4" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                            Withdrawal Details
                          </Typography>
                          <IconButton edge="end" color="inherit" onClick={closeConfirmOrSignWDL} aria-label="close">
                            <CloseIcon />
                          </IconButton>
                        </Stack>
                        <Stack pt={1} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                          <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                            {' '}
                            Withdrawal To (A/C Number)
                          </Typography>
                          <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                            {Accounts[0]?.AcNumber}
                          </Typography>
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                          <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                            Amount
                          </Typography>
                          <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                            {checkWithdraw?.withdrawamount} INR
                          </Typography>
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                          <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                            Estimated Fee
                          </Typography>
                          <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                            {inrWithdrawData.estFees} INR
                          </Typography>
                        </Stack>

                        <Stack pt={1} direction="row" spacing={4} justifyContent="space-around">
                          <Button variant="contained5" onClick={closeConfirmOrSignWDL}>
                            Cancel
                          </Button>
                          <Button variant="contained4" onClick={showSignWithdrawal}>
                            Confirm
                          </Button>
                        </Stack>
                      </Stack>
                    )
                  ) : (
                    <Stack p={4} spacing={2.5} width={480}>
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
                          otpmbl: securityData?.pSecurity?.enabled === '1' && Yup.number().positive().required("Don't leave a empty"),
                          otpmail: Yup.number().positive().required("Don't leave a empty"),
                          gcode: securityData?.gSecurity?.enabled === '1' && Yup.number().positive().required("Don't leave a empty")
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                          const phoneOTP = values.otpmbl;
                          const googleOTP = values.gcode;

                          const signData = {
                            walletId: walletId,
                            toAddress: checkWithdraw.bankAccount,
                            amount: checkWithdraw.withdrawamount,
                            verifyType: 'wSecurity',
                            emailOTP: values.otpmail,
                            ...(securityData?.pSecurity?.enabled === '1' && { phoneOTP }),
                            ...(securityData?.gSecurity?.enabled === '1' && { googleOTP })
                          };

                          try {
                            signWithdrawal(signData);
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
                                  {securityData?.pSecurity?.enabled === '1' && (
                                    <>
                                      <Typography
                                        variant="body1"
                                        sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                                      >
                                        OTP will be send to  <Mobilenumber number={securityData?.pSecurity?.authKey} />
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
                                              color: color || (theme.palette.mode === 'dark' ? '#fff' : '#000'),
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
                                    OTP will be send to <Email email={securityData?.mSecurity?.authKey} />
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
                                          color: color || (theme.palette.mode === 'dark' ? '#fff' : '#000'),
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
                                    SUBMIT
                                  </Button>
                                </AnimateButton>
                              </Grid>
                            </form>
                          </>
                        )}
                      </Formik>
                    </Stack>
                  )}
                </Dialog>
              </>
            )}
          </Formik>
        </Stack>
      </CardInr >
    </>
  );
};

export default InrWithdraw_EXT;