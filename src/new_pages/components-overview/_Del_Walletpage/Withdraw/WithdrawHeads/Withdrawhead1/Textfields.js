import React, { useState } from 'react';
import {
  Grid,
  OutlinedInput,
  Stack,
  Typography,
  useTheme,
  FormHelperText,
  Button,
  IconButton,
  TextField,
  InputAdornment
} from '@mui/material';
import AnimateButton from '../../../../../../components/@extended/AnimateButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { postWidthdrawData } from '../../../../../../api/wallet';
import { NumericFormatCustom } from '../../../NumericFormatCustom';
import { sendOtpSecurity, withdrawSecurity } from '../../../../../../api/profile';
import CoinSelectTextfield from './CoinSelectTextfield';
import Depositehead1Components from '../../../Deposit/DepositeHeads/Depositehead1/Depositehead1Components';

const Textfields = ({ walletId, walletData, setSnackbarMessage, setSnackbarOpen, securityData, walletList, setWalletId, setHistoryData, setWalletData }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [otpState, setOtpState] = useState(false);

  const [displayText1, setDisplayText1] = useState('SEND OTP');
  const [displayText2, setDisplayText2] = useState('SEND OTP');
  const [isResendMOTP, setIsResendMOTP] = useState(false);
  const [isResendPOTP, setIsResendPOTP] = useState(false);
  const [formikValues, setFormikValues] = useState(null);
  const [color, setColor] = useState('');
  const [selectedCoin, setSelectedCoin] = useState(null);
  console.log({ walletData });
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsResendMOTP(false);
    setIsResendPOTP(false);
    setOtpState(false);
  };

  const handleConfirm = async () => {
    console.log({ formikValues });
    setOtpState(true);
    // try {
    //   const { data } = await postWidthdrawData({
    //     accountType: 'GRAVITUS',
    //     postData: { walletId, toAddress: formikValues.address, amount: formikValues.amount }
    //   });
    //   if (Object.keys(data.result).length) {
    //     console.log({ data });
    //     setOtpState(true);
    //   } else {
    //     setSnackbarMessage({ msg: 'Withdraw Request failed', success: false });
    //     setSnackbarOpen(true);
    //   }
    // } catch (e) {
    //   setSnackbarMessage({ msg: e.message, success: false });
    //   setSnackbarOpen(true);
    //   console.log(e.message);
    // }
    // setOpen(false);
  };

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

  const handleCustomChange = (e, setFieldValue) => {
    if (e.target.name === 'amount') {
      const firstValue = parseFloat(e.target.value);
      const secondValue = isNaN(firstValue) ? '' : firstValue + walletData?.estFees;
      setFieldValue('amount', e.target.value);
      setFieldValue('totalAmount', secondValue);
    }
  };

  return (
    <Grid>
      <Formik
        initialValues={{
          address: '',
          amount: '',
          totalAmount: '',
          coin: null,
          submit: null
        }}
        validationSchema={Yup.object().shape({
          coin: Yup.object().nullable().required("Please select the coin*"),
          address: Yup.string().max(255).required("Don't leave empty*"),
          amount: Yup.number().positive().required("Don't leave empty*").test(
            'insufficient-balance',
            'Insufficient balance',
            function (value) {
              const availableBalance = walletData?.walletInfo?.mAvailable; // Replace with your actual available balance
              return parseFloat(value) <= availableBalance;
            }
          ),
          // totalAmount: Yup.number().required("Don't leave empty*"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          console.log({ values });
          setFormikValues(values);
          setOpen(true);
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
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue, coin }) => (
          <>
            <form noValidate onSubmit={handleSubmit}>
              <Grid>
                <Stack direction="row" justifyContent="space-between" alignItems="center" pb={3} sx={{ width: '100%' }}>
                  <Depositehead1Components number="01." title="Select the coin" />
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
                  <Depositehead1Components number="02." title="Withdrawal To" />
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
                      id="address"
                      type="address"
                      value={values.address}
                      name="address"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter withdrawal address"
                      error={Boolean(touched.address && errors.address)}
                    />
                    {touched.address && errors.address && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {errors.address}
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
                      onChange={(e) => handleCustomChange(e, setFieldValue)}
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
                      id="Total-Amount"
                      type="totalAmount"
                      value={values.totalAmount}
                      name="totalAmount"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Total Amount"
                      disabled
                      // readyonly
                      error={Boolean(touched.totalAmount && errors.totalAmount)}
                      InputProps={{
                        inputComponent: NumericFormatCustom
                      }}
                    />
                    {touched.totalAmount && errors.totalAmount && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {errors.totalAmount}
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

            <Dialog onClose={handleClose} open={open}>
              {otpState ? (
                <Stack p={4} spacing={2.5}>
                  <Typography variant="h1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                    Widthdraw Security
                  </Typography>
                  <Formik
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
                      console.log({ values });
                      const phoneOTP = values.otpmbl;
                      const googleOTP = values.gcode;
                      const postData = {
                        walletId,
                        toAddress: formikValues.address,
                        amount: formikValues.amount,
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
                              <Typography
                                variant="body1"
                                sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                              >
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
              ) : (
                <Stack p={4} spacing={2.5}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <Typography variant="h4" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      Withdrawal Details
                    </Typography>
                    <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
                      <CloseIcon />
                    </IconButton>
                  </Stack>

                  <Stack pt={1} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                      {' '}
                      To Address
                    </Typography>
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      {values.address}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                      Amount
                    </Typography>
                    <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      {values.amount} {walletData?.walletInfo?.crypto}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                      {' '}
                      Total Amount
                    </Typography>
                    <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      {values.totalAmount} {walletData?.walletInfo?.crypto}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                      Estimated Fee
                    </Typography>
                    <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      {walletData?.estFees} {walletData?.walletInfo?.crypto}
                    </Typography>
                  </Stack>

                  <Stack pt={1} direction="row" spacing={0} justifyContent="space-around">
                    <Button variant="contained5" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button variant="contained4" onClick={handleConfirm}>
                      Confirm
                    </Button>
                  </Stack>
                </Stack>
              )}
            </Dialog>
          </>
        )}
      </Formik>
    </Grid>
  );
};

export default Textfields;
