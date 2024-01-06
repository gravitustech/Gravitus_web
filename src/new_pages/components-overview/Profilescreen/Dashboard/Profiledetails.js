import React, { useState, useEffect } from 'react';

import {
  Grid, Stack, Avatar, Typography, useTheme, Button,
  OutlinedInput, FormHelperText, Select, MenuItem, CircularProgress
} from '@mui/material';

import ErrorIcon from '@mui/icons-material/Error';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import * as Yup from 'yup';
import { Formik } from 'formik';

import Dialog from '@mui/material/Dialog';
import InputAdornment from '@mui/material/InputAdornment';
import AnimateButton from 'src/components/@extended/AnimateButton';

import { SEND_OTP, sendMOTP, postDataSystem, Reset_Mobile_Number, set_Mobile_Number, Update_Mobile_Number } from 'src/api_ng/system_ng';
import MenuItems from '../MenuItems';

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

const Profiledetails = ({ userData, setSnackbarMessage, setSnackbarOpen, mutate }) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  //send otp
  const [color, setColor] = useState('');
  const [displayText, setDisplayText] = useState('SEND OTP');
  const [isResend, setIsResend] = useState(false);

  //Sms-auth dialogbox
  const [smsopenDialog, smssetOpenDialog] = useState(false);
  const [otpState, setOtpState] = useState(false);
  const smshandleClickOpenDialog = () => {
    smssetOpenDialog(true);
  };

  const smshandleCloseDialog = () => {
    smssetOpenDialog(false);
    setOtpState(false)
    setDisplayText('SEND OTP');
    setColor('');
    setIsResend(false)
  };

  //Sms-auth dialogbox

  const [resetopenDialog, resetsetOpenDialog] = useState(false);

  const resethandleClickOpenDialog = () => {
    resetsetOpenDialog(true);
  };

  const resethandleCloseDialog = () => {
    resetsetOpenDialog(false);
    setDisplayText('SEND OTP');
    setColor('');
    setIsResend(false)
  };

  function reqSendMOTP() {
    try {
      var postData = { accountType: 'GRAVITUS' }
      postDataSystem(sendMOTP(), postData).then(function (res) {
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
          if (!isResend) {
            setIsResend(true);
            setDisplayText('RESEND OTP');
          }
          setColor('grey');

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

  function reqSendOTP() {
    try {
      var postData = { accountType: 'GRAVITUS' }
      postDataSystem(SEND_OTP(), postData).then(function (res) {
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
          if (!isResend) {
            setIsResend(true);
            setDisplayText('RESEND OTP');
          }
          setColor('grey');

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

  useEffect(() => {
    let timeoutId;
    if (isResend) {
      timeoutId = setTimeout(() => {
        setDisplayText('RESEND OTP');
        setColor('');
        // setIsResend('RESEND OTP');
        setIsResend(false);
      }, 30000); // 1 minute = 60000 milliseconds
    }
    return () => clearTimeout(timeoutId);
  }, [isResend]);

  const handleResetConfirm = (values) => {
    setIsLoading(true);
    var postData = {
      validateOTP: values.otpemail
    }
    postDataSystem(Reset_Mobile_Number(), postData).then(function (res) {
      setIsLoading(false);
      resethandleCloseDialog();
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
        setIsLoading(false);
        setSnackbarMessage({ msg: 'Mobile number reset successfully', success: true });
        setSnackbarOpen(true);
        resethandleCloseDialog();
      }
    }, function (err) {
      // console.log(err);
      // Logout User
    });
  };

  const UpdateMobile = (values) => {
    setIsLoading(true);
    var PostData = {
      mobileNo: values.mobilenumber, intCode: '+91'
    }

    postDataSystem(Update_Mobile_Number(), PostData).then(function (res) {
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
        mutate();
        setIsLoading(false);
        setSnackbarMessage({ msg: 'Mobile no submitted', success: true });
        setSnackbarOpen(true);
        setOtpState(true);
      }
      setOtpState(true);
    }, function (err) {
      // console.log(err);
      // Logout User
    });
  }

  const SetMobile = (values) => {
    setIsLoading(true);
    var PostData = {
      validateOTP: values.otpmbl
    }
    postDataSystem(set_Mobile_Number(), PostData).then(function (res) {
      setIsLoading(false);
      smshandleCloseDialog();
      // setOtpState(false);
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
        setIsLoading(false);
        setSnackbarMessage({ msg: 'otp validated', success: true });
        setSnackbarOpen(true);
        smshandleCloseDialog();
      }
    }, function (err) {
      // console.log(err);
      // Logout User
    });
  }

  const MobileNumber = () => {
    return (
      <>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Typography pr={{
            xs: 0,
            sm: 0,
            md: 0,
            lg: 0
          }} variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
            Phone
          </Typography>
          {userData.mobileNo && userData.mobileNo !== '0' ? (
            <>
              <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                {userData.intCode} {userData.mobileNo}
              </Typography>
              {userData.mobileVerified === 'true' ? (
                <CheckCircleIcon sx={{ color: 'text.buy', fontSize: 18 }} />
              ) : (
                <ErrorIcon sx={{ color: '#F3BA2F', fontSize: 18 }} />
              )}
              {userData.mobileVerified === 'true' ? (
                <Button variant="editbutton" onClick={resethandleClickOpenDialog}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <ModeEditIcon sx={{ fontSize: '16px' }} />
                    <Typography variant="body1" sx={{ color: 'text.buy' }}>
                      Reset
                    </Typography>
                  </Stack>
                </Button>
              ) : (
                <Button variant="editbutton" onClick={smshandleClickOpenDialog}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <ModeEditIcon sx={{ fontSize: '16px' }} />
                    <Typography variant="body1" sx={{ color: 'text.buy' }}>
                      Verify
                    </Typography>
                  </Stack>
                </Button>
              )}
            </>
          ) : (
            <>
              <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                Update Mobile Number
              </Typography>
              <Button variant="editbutton" onClick={smshandleClickOpenDialog}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <ModeEditIcon sx={{ fontSize: '16px' }} />
                  <Typography variant="body1" sx={{ color: 'text.buy' }}>
                    Update
                  </Typography>
                </Stack>
              </Button>
            </>
          )}
          <Dialog open={smsopenDialog} onClose={smshandleCloseDialog} aria-labelledby="dialog-title">
            <Stack p={4} spacing={1.5} sx={{ background: theme.palette.mode === 'dark' ? '#131722' : 'text.cardbackground' }}>
              <Typography pr={{
                xs: 1.5,
                sm: 1.5,
                md: 0,
                lg: 0
              }} variant="h4" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                Mobile Number update
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                Get your mobile number verified to unlock features.
              </Typography>
              <Formik
                initialValues={{
                  mobilenumber: '',
                  otpmbl: ''
                }}
                validationSchema={
                  otpState
                    ? Yup.object().shape({
                      otpmbl: Yup.string().max(255).required('OTP is required*')
                    })
                    : Yup.object().shape({
                      mobilenumber: Yup.string().max(10).required("Don't leave a empty")
                    })
                }
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                  setIsLoading(true);
                  try {
                    setIsLoading(true);
                    setStatus({ success: false });
                    setSubmitting(false);
                    otpState
                      ? (
                        SetMobile(values)
                      ) : (
                        UpdateMobile(values)
                      )
                  } catch (err) {
                    setIsLoading(false);
                    setStatus({ success: false });
                    setErrors({ submit: err.message });
                    setSubmitting(false);
                    smshandleCloseDialog();
                  }
                }}
              >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                  <>
                    <form noValidate onSubmit={handleSubmit}>
                      <Grid item spacing={3} pt={1}>
                        {otpState ? (
                          <Grid item xs={12}>
                            <Stack spacing={1}>
                              <Typography
                                variant="body1"
                                sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                              >
                                OTP will be send to  <Mobilenumber number={values.mobilenumber} />
                              </Typography>
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
                                      onClick={() => reqSendOTP()}
                                      disabled={isResend}
                                    >
                                      {displayText}
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
                          </Grid>
                        ) : (
                          <Grid item xs={12}>
                            <Stack spacing={1}>
                              <Typography
                                variant="body1"
                                sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                              >
                                Enter your mobile number
                              </Typography>
                              <OutlinedInput
                                id="mobilenumber"
                                type="mobilenumber"
                                value={values.mobilenumber}
                                name="mobilenumber"
                                onBlur={handleBlur}
                                // onChange={handleChange}
                                onChange={(e) => {
                                  const numericValue = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                                  handleChange({ target: { name: 'mobilenumber', value: numericValue } });
                                }}
                                placeholder=""
                                fullWidth
                                error={Boolean(touched.mobilenumber && errors.mobilenumber)}
                                startAdornment={
                                  <InputAdornment position="start">
                                    <Select variant="standard" defaultValue={0}>
                                      {countries.map((country, index) => (
                                        <MenuItem key={index} value={index}>
                                          {`${country.label} (+${country.phone})`}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </InputAdornment>
                                }
                              />
                              {touched.mobilenumber && errors.mobilenumber && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                  {errors.mobilenumber}
                                </FormHelperText>
                              )}
                            </Stack>
                          </Grid>
                        )}
                      </Grid>
                      <Grid item xs={12} pt={2}>
                        <AnimateButton>
                          <Button fullWidth size="large" type="submit" variant="contained">
                            {isLoading ? <CircularProgress color="inherit" size={30} /> : 'SUBMIT'}
                          </Button>
                        </AnimateButton>
                      </Grid>
                    </form>
                  </>
                )}
              </Formik>
            </Stack>
          </Dialog>

          <Dialog open={resetopenDialog} onClose={resethandleCloseDialog} aria-labelledby="dialog-title">
            <Stack p={4} spacing={1} sx={{ background: theme.palette.mode === 'dark' ? '#131722' : 'text.cardbackground' }}>
              <Typography variant="h4" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                Reset Mobile Number
              </Typography>
              {/* <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        Get your mobile number verified to unlock features.
                      </Typography> */}
              <Formik
                initialValues={{
                  otpemail: ''
                }}
                validationSchema={Yup.object().shape({
                  otpemail: Yup.string().max(5).required('OTP is required*')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                  setIsLoading(true);
                  try {
                    setStatus({ success: false });
                    setSubmitting(false);
                    handleResetConfirm(values)
                  } catch (err) {
                    setIsLoading(false);
                    setStatus({ success: false });
                    setErrors({ submit: err.message });
                    setSubmitting(false);
                    resethandleCloseDialog();
                  }
                }}
              >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                  <>
                    <form noValidate onSubmit={handleSubmit}>
                      <Grid item spacing={3} pt={1}>
                        <Grid item xs={12} pt={1}>
                          <Stack spacing={1}>
                            <Typography
                              variant="body1"
                              sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                            >
                              Otp will sent to <Email email={userData.emailId} />
                            </Typography>
                            <OutlinedInput
                              id="otpemail-login"
                              type="text"
                              value={values.otpemail}
                              name="otpemail"
                              onBlur={handleBlur}
                              // onChange={handleChange}
                              onChange={(e) => {
                                const numericValue = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                                handleChange({ target: { name: 'otpemail', value: numericValue } });
                              }}
                              placeholder=" "
                              fullWidth
                              error={Boolean(touched.otpemail && errors.otpemail)}
                              endAdornment={
                                <InputAdornment>
                                  <Button
                                    disableRipple
                                    style={{
                                      color: color || (theme.palette.mode === 'dark' ? '#fff' : '#000'),
                                      fontSize: '12px'
                                    }}
                                    onClick={() => reqSendMOTP()}
                                    disabled={isResend}
                                  >
                                    {displayText}
                                  </Button>
                                </InputAdornment>
                              }
                            />
                            {touched.otpemail && errors.otpemail && (
                              <FormHelperText error id="standard-weight-helper-text-otp-login">
                                {errors.otpemail}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} pt={2}>
                        <AnimateButton>
                          <Button fullWidth size="large" type="submit" variant="contained">
                            {isLoading ? <CircularProgress color="inherit" size={30} /> : 'SUBMIT'}
                          </Button>
                        </AnimateButton>
                      </Grid>
                    </form>
                  </>
                )}
              </Formik>
            </Stack>
          </Dialog>
        </Stack>
      </>
    )
  }

  const UserId = () => {
    return (
      <Stack direction="row" spacing={2}>
        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          User ID
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          {userData.userId}
        </Typography>
      </Stack>
    )
  }

  const EmailId = () => {
    return (
      <Stack direction="row" spacing={1.5}
        alignItems="center">
        <Typography pr={{
          xs: 0,
          sm: 0,
          md: 0,
          lg: 0
        }} variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          Email
        </Typography>
        <Typography
          pl={0.5}
          variant="body1"
          sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
        >
          {userData.emailId}
        </Typography>
        <CheckCircleIcon sx={{ color: 'text.buy', fontSize: 18 }} />
      </Stack>
    )
  }
  return (
    <>
      {/* Mobile view */}
      <Grid
        display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}
        pt={{ xs: 1, sm: 1 }}
        pb={{ xs: 2, sm: 2 }}
        pl={{ xs: 2, sm: 2 }}
        pr={{ xs: 3, sm: 3 }}
        xs={12}
        md={12}
      >
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <Avatar
              alt=""
              src=""
              sx={{
                width: 22,
                height: 22,
                fontSize: 22
              }}
            />
            <Stack spacing={1}>
              <UserId />
            </Stack>
          </Stack>
          <Stack>
            <EmailId />
            <MobileNumber />
          </Stack>
        </Stack>
      </Grid>
      {/* Desktop view */}
      <Grid
        display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}
        md={12} p={3} style={{ flexDirection: 'row' }}>
        <Grid xs={12} md={9} style={{ display: 'flex', flexDirection: 'column' }}>
          <Grid style={{ display: 'flex', flexDirection: 'row' }}>
            <Stack direction="row" spacing={2}>
              <Avatar
                alt=""
                src=""
                sx={{
                  width: 34,
                  height: 34,
                  fontSize: 22
                }}
              />
              <UserId />
            </Stack>

            <Stack spacing={1} pl={5}>
              <EmailId />
              <MobileNumber />
            </Stack>
          </Grid>
        </Grid >
      </Grid >
    </>
  );
};

export default Profiledetails;

const countries = [{ code: 'IN', label: 'India', phone: '91' }];
