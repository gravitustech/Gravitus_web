import {
  Grid, OutlinedInput, Stack, Typography, useTheme, FormHelperText,
  Button, IconButton, TextField, InputAdornment
} from '@mui/material';

import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';

import { Formik } from 'formik';
import * as Yup from 'yup';

import CoinSelectTextfield from './CoinSelectInput';
import FormLabel from '../../../_Essentials/FormLabel';

import { NumericFormatCustom } from '../../../_Essentials/NumericFormatCustom';
import AnimateButton from '../../../../../../components/@extended/AnimateButton';

import useSWR, { mutate } from 'swr';
import React, { useState, useRef, useEffect } from 'react';

import { Send_OTP } from '../../../../../../api_ng/system_ng';
import { sendOtpSecurity } from '../../../../../../api/profile';
import { Wallet_Fetch_ById, Estimate_Withdrawal, Sign_Withdrawal, postDataWallet } from '../../../../../../api_ng/wallet_ng';

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

const FormWithdraw = ({ walletList, walletId, walletData, setWalletId, setWalletData, setHistoryData, setSnackbarMessage, setSnackbarOpen }) => {
  const theme = useTheme();

  const [color, setColor] = useState('');
  const [resendPOTP, setResendPOTP] = useState('SEND OTP');
  const [resendMOTP, setResendMOTP] = useState('SEND OTP');

  const [isResendMOTP, setIsResendMOTP] = useState(false);
  const [isResendPOTP, setIsResendPOTP] = useState(false);
  
  const [showInitWDL, setShowInitWDL] = useState(false);
  const [confirmOrInitWDL, setConfirmOrInitWDL] = useState(false);

  const [withdrawData, setWithdrawData] = useState(null);
  const [signWithdrawal, setSignWithdrawal] = useState(null);

  const formikEW = useRef();
  const formikSW = useRef();

  const updateAmount = (e, setFieldValue) => {
    if (e.target.name === 'amount') {
      const firstValue = parseFloat(e.target.value);
      const secondValue = isNaN(firstValue) ? '' : firstValue + walletData?.estFees;

      setFieldValue('amount', e.target.value);
      setFieldValue('total', secondValue);
    }
  };

  const closeConfirmOrSignWDL = () => {
    setConfirmOrInitWDL(false);
    setIsResendMOTP(false);
    setIsResendPOTP(false);
    setShowInitWDL(false);
  };

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

  function InitWithdrawal(postData) {
    postDataWallet(Sign_Withdrawal(), postData).then(function (res) {
      console.log(res, 'Sign Withdrawal');

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
        setShowInitWDL(false);
        setConfirmOrInitWDL(false);

        setIsResendMOTP(false);
        setIsResendPOTP(false);

        setSnackbarMessage({ msg: res.result, success: false });
        setSnackbarOpen(true);

        formikEW.current.resetForm({
          values: {
            toAddress : '',
            amount    : '',
            total     : ''
            // submit: null
          }
        });

        formikSW.current.resetForm({
          values: {
            gcode   : '',
            otpmail : '',
            otpmbl  : ''
          }
        });

        mutate(Wallet_Fetch_ById);
      }
    }, function (err) {
      console.log(err);
      // Logout User
    });
  }

  const showInitWithdrawal = async () => {
    setShowInitWDL(true);
  };

  function estimateWithdrawal() {
    var postData = withdrawData;
    postData.walletId = walletId;

    postDataWallet(Estimate_Withdrawal(), postData).then(function (res) {
      console.log(res, 'Estimate Withdrawal');

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
        // console.log(res.result, 'Estimate WDL');
        setSignWithdrawal(res.result);
        setConfirmOrInitWDL(true);
      }
    }, function (err) {
      console.log(err);
      // Logout User
    });
  }

  useEffect(() => {
    let timeoutId;

    if (isResendMOTP) {
      timeoutId = setTimeout(() => {
        setResendMOTP('RESEND OTP');
        setIsResendMOTP(false);
        setColor('');
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
        setColor('');
      }, 30000);
    }
    return () => clearTimeout(timeoutId);
  }, [isResendPOTP]);

  return (
    <Grid>
      <Formik
        innerRef={formikEW}
        initialValues={{
          toAddress: '',
          amount: '',
          total: '',
          coin: null,
          submit: null
        }}
        validationSchema={Yup.object().shape({
          coin: Yup.object().nullable().required("Please select the coin*"),
          toAddress: Yup.string().max(255).required("Don't leave empty*"),
          amount: Yup.number().positive().required("Don't leave empty*").test(
            'insufficient-balance',
            'Insufficient balance',
            function (value) {
              const availableBalance = walletData?.walletInfo?.mAvailable; // Replace with your actual available balance
              return parseFloat(value) <= availableBalance;
            }
          ),
          // total: Yup.number().required("Don't leave empty*"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setWithdrawData(values);
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
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue, coin }) => (
          <>
            <form noValidate onSubmit={handleSubmit}>
              <Grid>
                <Stack direction="row" justifyContent="space-between" alignItems="center" pb={3} sx={{ width: '100%' }}>
                  <FormLabel number="01." title="Select the coin" />
                </Stack>
                <CoinSelectTextfield
                  walletList={walletList}
                  walletId={walletId}
                  setWalletId={setWalletId}
                  setHistoryData={setHistoryData}
                  setWalletData={setWalletData}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={coin}
                  touched={touched}
                  errors={errors}
                  values={values}
                  setFieldValue={setFieldValue}
                />
                <Stack direction="row" justifyContent="space-between" alignItems="center" pt={3} pb={3} sx={{ width: '100%' }}>
                  <FormLabel number="02." title="Withdrawal To" />
                </Stack>
                <Grid pl={5}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" pb={1} sx={{ width: '90%' }}>
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                      Address
                    </Typography>

                    <Stack direction="row" spacing={0.5}>
                      <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        Network
                      </Typography>
                      <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {walletData?.walletInfo?.walletNetwork}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack spacing={1} sx={{ width: '90%' }}>
                    <OutlinedInput
                      id="toAddress"
                      type="toAddress"
                      value={values.toAddress}
                      name="toAddress"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter withdrawal address"
                      error={Boolean(touched.toAddress && errors.toAddress)}
                    />
                    {touched.toAddress && errors.toAddress && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {errors.toAddress}
                      </FormHelperText>
                    )}
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" pt={2.5} pb={1} sx={{ width: '90%' }}>
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                      Amount
                    </Typography>

                    <Stack direction="row" spacing={0.5}>
                      <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        Avbl
                      </Typography>
                      <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {walletData?.walletInfo?.mAvailable} {walletData?.walletInfo?.crypto}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack spacing={1} sx={{ width: '90%' }}>
                    <TextField
                      id="amount"
                      type="amount"
                      value={values.amount}
                      name="amount"
                      onBlur={handleBlur}
                      onChange={(e) => updateAmount(e, setFieldValue)}
                      placeholder="Enter the amount"
                      error={Boolean(touched.amount && errors.amount)}
                      InputProps={{
                        inputComponent: NumericFormatCustom
                      }}
                    />
                    {touched.amount && errors.amount && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {errors.amount}
                      </FormHelperText>
                    )}
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" pt={2.5} pb={1} sx={{ width: '90%' }}>
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                      Total Amount
                    </Typography>

                    <Stack direction="row" spacing={0.5}>
                      <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        Estimated Fee
                      </Typography>
                      <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {walletData?.estFees} {walletData?.walletInfo?.crypto}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack spacing={1} sx={{ width: '90%' }}>
                    <TextField
                      id="total"
                      type="total"
                      value={values.total}
                      name="total"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Total Amount"
                      disabled
                      // readyonly
                      error={Boolean(touched.total && errors.total)}
                      InputProps={{
                        inputComponent: NumericFormatCustom
                      }}
                    />
                    {touched.total && errors.total && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {errors.total}
                      </FormHelperText>
                    )}
                  </Stack>
                  <Grid item xs={12} pt={5}>
                    <AnimateButton>
                      <Button
                        sx={{ width: '90%' }}
                        disableElevation
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        SUBMIT
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>

              </Grid>
            </form>

            <Dialog onClose={closeConfirmOrSignWDL} open={confirmOrInitWDL}>
              {!showInitWDL ? (
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
                        To Address
                      </Typography>
                      <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {signWithdrawal?.toAddress}
                      </Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        Amount
                      </Typography>
                      <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {signWithdrawal?.amount} {walletData?.walletInfo?.crypto}
                      </Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        Total Amount
                      </Typography>
                      <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {signWithdrawal?.total} {walletData?.walletInfo?.crypto}
                      </Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        Estimated Fee
                      </Typography>
                      <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {signWithdrawal?.transFees} {walletData?.walletInfo?.crypto}
                      </Typography>
                    </Stack>

                    <Stack pt={1} direction="row" spacing={0} justifyContent="space-around">
                      <Button variant="contained5" onClick={closeConfirmOrSignWDL}>
                        Cancel
                      </Button>
                      <Button variant="contained4" onClick={showInitWithdrawal}>
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
                      otpmbl: signWithdrawal?.pSecurity?.enabled === '1' && Yup.number().positive().required("Don't leave a empty"),
                      otpmail: Yup.number().positive().required("Don't leave a empty"),
                      gcode: signWithdrawal?.gSecurity?.enabled === '1' && Yup.number().positive().required("Don't leave a empty")
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                      const phoneOTP = values.otpmbl;
                      const googleOTP = values.gcode;

                      const signData = {
                        walletId    : walletId,
                        toAddress   : signWithdrawal.toAddress,
                        amount      : signWithdrawal.amount,
                        verifyType  : 'wSecurity',
                        emailOTP    : values.otpmail,
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
                                    endAdornment={
                                      <InputAdornment>
                                        <Button
                                          disableRipple
                                          style={{
                                            color: color || (theme.palette.mode === 'dark' ? '#fff' : '#000'),
                                            fontSize: '12px'
                                          }}
                                          onClick={() => reqSendOTP('sendPOTP')}
                                          disabled={isResendPOTP}
                                        >
                                          {resendPOTP}
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
                                endAdornment={
                                  <InputAdornment>
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
                                  </InputAdornment>
                                }
                              />
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
    </Grid>
  );
};

export default FormWithdraw;