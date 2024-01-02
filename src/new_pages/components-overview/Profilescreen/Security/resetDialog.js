import { useState, useEffect } from 'react';

import {
  Button, CircularProgress, Dialog, FormHelperText, Grid,
  InputAdornment, InputLabel, OutlinedInput, Stack, Typography,
  useTheme
} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';

import AnimateButton from 'src/components/@extended/AnimateButton';
import { Security_Reset, Send_OTP, postDataSystem } from 'src/api_ng/system_ng';

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

const ResetDialog = ({ openDialog, setOpenDialog, securityData, setSnackbarMessage, setSnackbarOpen, action, mutate }) => {
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);

  const [POTPcolor, setPOTPColor] = useState('');
  const [MOTPcolor, setMOTPColor] = useState('');

  const [resendPOTP, setResendPOTP] = useState('SEND OTP');
  const [resendMOTP, setResendMOTP] = useState('SEND OTP');

  const [isResendMOTP, setIsResendMOTP] = useState(false);
  const [isResendPOTP, setIsResendPOTP] = useState(false);

  function reqSendOTP(action) {
    try {
      var postData = { verifyType: 'rSecurity', action }
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
      // console.log('err', err)
      // setErrors({ submit: err.message });
      // setStatus({ success: false });
    }
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

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setResendPOTP('SEND OTP');
    setResendMOTP('SEND OTP')
    setPOTPColor('');
    setMOTPColor('');

    setIsResendMOTP(false);
    setIsResendPOTP(false);
  };

  const ResetSecurity = (values) => {
    setIsLoading(true);
    const phoneOTP = values.otpmbl;
    const googleOTP = values.authcode;
    var postData = {
      verifyType: 'rSecurity',
      secFeature: action === 'greset' ? 'google' : 'phone',
      emailOTP: values.otpmail,
      ...(securityData?.pSecurity?.enabled === '1' && { phoneOTP }),
      ...(securityData?.gSecurity?.enabled === '1' && { googleOTP })
    }

    postDataSystem(Security_Reset(), postData).then(function (res) {
      setIsLoading(false);
      handleCloseDialog();
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
        setSnackbarMessage({ msg: 'Reset your Authentication', success: true });
        setSnackbarOpen(true);
        handleCloseDialog();
        setIsLoading(false);
      }
    }, function (err) {
      // console.log(err);
      // Logout User
    });
  }
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="dialog-title">
      <Stack p={4} spacing={2} sx={{ background: theme.palette.mode === 'dark' ? '#131722' : 'text.cardbackground' }}>
        <Typography variant="h1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          Reset {action === 'greset' ? 'G-Authenticator' : 'SMS'} Security
        </Typography>
        <Formik
          initialValues={{
            otpmail: '',
            otpmbl: '',
            authcode: '',
            submit: null
          }}
          validationSchema={Yup.object().shape({
            otpmail: Yup.string().max(5).required('OTP is required*'),
            otpmbl: action === 'greset' && securityData?.pSecurity?.enabled === '1' && Yup.string().max(5).required('OTP is requried*'),
            authcode: action === 'preset' && securityData?.gSecurity?.enabled === '1' && Yup.string().max(6).required('OTP is requried*')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            setIsLoading(true);
            try {
              setIsLoading(true);
              setStatus({ success: false });
              setSubmitting(false);
              ResetSecurity(values);
            } catch (err) {
              setSnackbarMessage({ msg: err.message, success: false });
              setSnackbarOpen(true);
              handleCloseDialog();
              setIsLoading(false);
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              {action === 'greset' && securityData?.pSecurity?.enabled === '1' && (
                <Stack spacing={1} pt={3} width={440}>
                  <InputLabel htmlFor="otpmbl-login" variant="subtitle3" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                    OTP will sent to <Mobilenumber number={securityData?.pSecurity?.authKey} />
                  </InputLabel>
                  <OutlinedInput
                    id="otpmbl-login"
                    type="text"
                    value={values.otpmbl}
                    name="otpmbl"
                    onBlur={handleBlur}
                    // onChange={handleChange}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                      handleChange({ target: { name: 'otpmbl', value: numericValue } });
                    }}
                    placeholder=""
                    // fullWidth
                    error={Boolean(touched.otpmbl && errors.otpmbl)}
                    endAdornment={
                      <InputAdornment>
                        <Button
                          disableRipple
                          style={{
                            color: POTPcolor || (theme.palette.mode === 'dark' ? '#fff' : '#000'),
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
                </Stack>
              )}
              <Stack spacing={1} pt={3} width={440}>
                <InputLabel htmlFor="email-login" variant="body2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                  OTP will sent to <Email email={securityData?.mSecurity?.authKey} />
                </InputLabel>
                <OutlinedInput
                  id="email-login"
                  type="text"
                  value={values.otpmail}
                  name="otpmail"
                  onBlur={handleBlur}
                  // onChange={handleChange}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                    handleChange({ target: { name: 'otpmail', value: numericValue } });
                  }}
                  placeholder=""
                  // fullWidth
                  error={Boolean(touched.otpmail && errors.otpmail)}
                  endAdornment={
                    <InputAdornment>
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
                    </InputAdornment>
                  }
                />
                {touched.otpmail && errors.otpmail && (
                  <FormHelperText error id="standard-weight-helper-text-otp-login">
                    {errors.otpmail}
                  </FormHelperText>
                )}
              </Stack>
              {action === 'preset' && securityData?.gSecurity?.enabled === '1' && (
                <Stack spacing={1} pt={3} width={440}>
                  <InputLabel htmlFor="authcode-login" variant="subtitle3" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                    Enter the Google Authentication Code
                  </InputLabel>
                  <OutlinedInput
                    id="authcode-login"
                    type="text"
                    value={values.authcode}
                    name="authcode"
                    onBlur={handleBlur}
                    // onChange={handleChange}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                      handleChange({ target: { name: 'authcode', value: numericValue } });
                    }}
                    placeholder=""
                    fullWidth
                    error={Boolean(touched.authcode && errors.authcode)}
                  />
                  {touched.authcode && errors.authcode && (
                    <FormHelperText error id="standard-weight-helper-text-otp-login">
                      {errors.authcode}
                    </FormHelperText>
                  )}
                </Stack>
              )}
              <Grid item xs={12} pt={2.5}>
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
    </Dialog>
  );
};

export default ResetDialog;
