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

import { sendOTP, updateMobileNumber, resetMobileNumber, setMobileNumber, sendMOTP } from '../../../../api/profile';

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
    setDisplayText('RESEND OTP');
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
    setDisplayText('RESEND OTP');
    setColor('');
    setIsResend(false)
  };

  const handleOTP = async (action) => {
    try {
      const { data } = action === 'POTP' ? await sendOTP({ accountType: 'GRAVITUS' }) : await sendMOTP({ accountType: 'GRAVITUS' });
      if (Object.keys(data.result).length) {
        // console.log({ data });
        setSnackbarMessage({ msg: isResend ? 'OTP Resent successfully' : 'OTP Sent successfully', success: true });
        setSnackbarOpen(true);
        if (!isResend) {
          setIsResend(true);
          setDisplayText('RESEND OTP');
        }
        setColor('grey');
      } else {
        if (data.error && (data.error.name !== undefined)) {
          setSnackbarMessage({ msg: data.error.name, success: false });
        } else if (data.error) {
          setSnackbarMessage({ msg: data.error, success: false });
        } else {
          setSnackbarMessage({ msg: 'OTP Request failed', success: false });
        }
        setSnackbarOpen(true);
      }
    } catch (err) {
      setSnackbarMessage({ msg: err.message, success: false });
      setSnackbarOpen(true);
    }
  };

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

  return (
    <>
      <Grid md={12} p={3} style={{ display: 'flex', flexDirection: 'row' }}>
        <Grid md={9} style={{ display: 'flex', flexDirection: 'column' }}>
          <Grid style={{ display: 'flex', flexDirection: 'row' }}>
            <Grid>
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
                <Stack spacing={1}>
                  {/* <Stack direction="row" spacing={0.5} alignItems="center">
                    <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                      {userData.fullName}
                    </Typography>
                    {userData ? (
                      <ErrorIcon sx={{ color: '#F3BA2F', fontSize: 18 }} />
                    ) : (
                      <CheckCircleIcon sx={{ color: 'text.buy', fontSize: 18 }} />
                    )}
                  </Stack> */}
                  <Stack direction="row" spacing={2}>
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                      User ID
                    </Typography>
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      {userData.userId}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
            <Grid pl={5}>
              <Stack spacing={1}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
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
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
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
                    <Stack p={4} spacing={2} width={520} sx={{ background: theme.palette.mode === 'dark' ? '#131722' : 'text.cardbackground' }}>
                      <Typography variant="h4" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
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
                          // console.log({ values });
                          try {
                            const { data } = otpState
                              ? await setMobileNumber({
                                accountType: 'GRAVITUS',
                                postData: { validateOTP: values.otpmbl }
                              })
                              : await updateMobileNumber({
                                accountType: 'GRAVITUS',
                                postData: { mobileNo: values.mobilenumber, intCode: '+91' }
                              });
                            if (Object.keys(data.result).length) {
                              // console.log({ data });
                              mutate();
                              setIsLoading(false);
                              setSnackbarMessage({ msg: otpState ? 'otp validated' : 'Mobile no submitted', success: true });
                              setSnackbarOpen(true);
                              if (otpState) {
                                smshandleCloseDialog();
                              }
                              setOtpState(true);
                            } else {
                              setIsLoading(false);
                              setSnackbarMessage({ msg: 'Request failed', success: false });
                              setSnackbarOpen(true);
                              smshandleCloseDialog();
                            }
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
                                              onClick={() => handleOTP('POTP')}
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
                          // console.log({ values });
                          try {
                            const { data } = await resetMobileNumber({
                              accountType: 'GRAVITUS',
                              postData: { validateOTP: values.otpemail }
                            });
                            if (Object.keys(data.result).length) {
                              // console.log({ data });
                              mutate();
                              setIsLoading(false);
                              setSnackbarMessage({ msg: 'Mobile number reset successfully', success: true });
                              setSnackbarOpen(true);
                              resethandleCloseDialog();
                            } else {
                              setIsLoading(false);
                              setSnackbarMessage({ msg: 'Request failed', success: false });
                              setSnackbarOpen(true);
                              resethandleCloseDialog();
                            }
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
                              {/* <Grid item xs={12} sx={{ mt: -1 }}>
                                <Typography
                                  variant="body1"
                                  sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                                >
                                  Enter your mobile number
                                </Typography>
                              </Grid> */}
                              <Grid item spacing={3} pt={1}>
                                {/* <Grid item xs={12}>
                                  <Stack spacing={1}>
                                    <OutlinedInput
                                      id="mobilenumber"
                                      type="mobilenumber"
                                      value={values.mobilenumber}
                                      name="mobilenumber"
                                      onBlur={handleBlur}
                                      // onChange={handleChange}
                                      onChange={(e) => {
                                        const numericValue = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                                        handleChange({ target: { name: "mobilenumber", value: numericValue } });
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
                                </Grid> */}

                                <Grid item xs={12} pt={1}>
                                  <Stack spacing={1} width={420}>
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
                                            onClick={() => handleOTP('MOTP')}
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
              </Stack>
            </Grid>
          </Grid>
        </Grid>

        <Grid md={3}>{/* <img src={dashboardprofileimg} alt='dashboardprofileimg' width={200}/> */}</Grid>
      </Grid>
    </>
  );
};

export default Profiledetails;

const countries = [{ code: 'IN', label: 'India', phone: '91' }];
