import {
  Grid,
  Stack,
  Avatar,
  Typography,
  useTheme,
  Button,
  OutlinedInput,
  FormHelperText,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import dashboardprofileimg from '../../../../assets/images/gravitusimage/dashboardprofileimg.svg';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'src/components/@extended/AnimateButton';
import Dialog from '@mui/material/Dialog';
import InputAdornment from '@mui/material/InputAdornment';
import { sendOTP, updateMobileNumber, resetMobileNumber, setMobileNumber, sendMOTP } from '../../../../api/profile';
import useSWR from 'swr';

const WalletIcon = () => (
  <svg width="26" height="26" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M38.7501 16.1101H35.0382V11.3159C35.0372 10.451 34.6932 9.62182 34.0816 9.01025C33.4701 8.39869 32.6409 8.05467 31.776 8.05366C31.1723 8.03461 29.779 8.06738 29.1617 8.05366C26.0458 -2.68341 10.7561 -2.6857 7.62959 8.05366H4.79422C3.52302 8.05467 2.30418 8.5601 1.40531 9.45897C0.506438 10.3578 0.00100929 11.5767 0 12.8479V37.0019C0.000602889 38.3305 0.528142 39.6047 1.46691 40.5449C2.40567 41.4851 3.67901 42.0145 5.00764 42.0172H38.7501C39.794 42.0156 40.7946 41.5996 41.532 40.8608C42.2695 40.1219 42.6834 39.1205 42.683 38.0766V33.9836H33.3385C26.8202 33.7321 26.8316 24.3929 33.3385 24.1513H42.683V20.0506C42.6834 19.0067 42.2695 18.0054 41.532 17.2665C40.7946 16.5276 39.794 16.1117 38.7501 16.1101ZM4.79422 16.1101C3.92802 16.1101 3.0973 15.766 2.4848 15.1535C1.8723 14.541 1.52821 13.7103 1.52821 12.8441C1.52821 11.9779 1.8723 11.1471 2.4848 10.5346C3.0973 9.92215 3.92802 9.57806 4.79422 9.57806C5.37349 9.57272 6.71801 9.58187 7.30947 9.57806C6.97575 11.8094 7.33491 14.0894 8.33844 16.1101H4.79422ZM19.3141 14.6009C19.3341 14.7124 19.3294 14.827 19.3004 14.9365C19.2713 15.046 19.2186 15.1478 19.1459 15.2347C19.0732 15.3216 18.9823 15.3914 18.8797 15.4394C18.7771 15.4874 18.6652 15.5122 18.5519 15.5122C18.4386 15.5122 18.3267 15.4874 18.2241 15.4394C18.1214 15.3914 18.0306 15.3216 17.9579 15.2347C17.8852 15.1478 17.8325 15.046 17.8034 14.9365C17.7743 14.827 17.7697 14.7124 17.7897 14.6009C16.8064 14.3631 15.5839 12.2496 17.0961 11.918C17.2981 11.9046 17.4972 11.9716 17.6499 12.1044C17.8027 12.2371 17.8968 12.425 17.9116 12.6268C17.9262 12.7868 17.9999 12.9355 18.1183 13.0441C18.2367 13.1526 18.3913 13.2131 18.5519 13.2137C18.7217 13.2137 18.8845 13.1463 19.0046 13.0262C19.1247 12.9061 19.1921 12.7433 19.1921 12.5735C19.1921 12.4037 19.1247 12.2408 19.0046 12.1208C18.8845 12.0007 18.7217 11.9332 18.5519 11.9332C18.0478 11.9295 17.5609 11.75 17.1751 11.4256C16.7893 11.1013 16.5287 10.6525 16.4384 10.1566C16.3481 9.66068 16.4336 9.14881 16.6803 8.70926C16.927 8.2697 17.3193 7.93001 17.7897 7.74878V7.5811C17.7919 7.47473 17.8163 7.36999 17.8611 7.2735C17.9059 7.17701 17.9702 7.09087 18.05 7.02052C18.1299 6.95017 18.2234 6.89715 18.3248 6.8648C18.4261 6.83246 18.5331 6.82149 18.6389 6.8326C18.7447 6.84371 18.847 6.87666 18.9395 6.92935C19.0319 6.98204 19.1124 7.05334 19.1758 7.13873C19.2393 7.22412 19.2843 7.32175 19.3081 7.42545C19.3319 7.52914 19.334 7.63664 19.3141 7.74116C20.2729 7.96982 21.5145 10.0171 20.0305 10.3784C19.8297 10.3983 19.629 10.3382 19.4721 10.2113C19.3152 10.0843 19.2146 9.90061 19.1921 9.70001C19.1789 9.57717 19.1304 9.46079 19.0525 9.3649C18.9746 9.26901 18.8706 9.19771 18.7531 9.1596C18.6356 9.12148 18.5095 9.11819 18.3902 9.1501C18.2708 9.18202 18.1632 9.24778 18.0804 9.33947C17.9976 9.43115 17.9431 9.54484 17.9235 9.66681C17.9038 9.78879 17.9199 9.91384 17.9697 10.0269C18.0196 10.1399 18.101 10.2361 18.2043 10.3039C18.3076 10.3717 18.4283 10.4081 18.5519 10.4089C19.0563 10.4137 19.5432 10.5942 19.929 10.9192C20.3147 11.2443 20.5751 11.6936 20.6653 12.1899C20.7555 12.6862 20.67 13.1985 20.4234 13.6385C20.1768 14.0785 19.7845 14.4189 19.3141 14.6009ZM25.244 15.6147C25.1416 15.7686 25.0596 15.9351 25.0001 16.1101H21.8446C22.8951 15.3763 23.6843 14.3265 24.0972 13.1134C24.5102 11.9002 24.5254 10.587 24.1408 9.36465C23.7561 8.14227 22.9916 7.07443 21.9584 6.31638C20.9252 5.55834 19.6771 5.1496 18.3956 5.1496C17.1142 5.1496 15.8661 5.55834 14.8329 6.31638C13.7996 7.07443 13.0351 8.14227 12.6505 9.36465C12.2658 10.587 12.2811 11.9002 12.694 13.1134C13.107 14.3265 13.8961 15.3763 14.9467 16.1101H11.7988C11.1276 15.129 10.6614 14.0224 10.4283 12.8567C10.1952 11.6911 10.1999 10.4903 10.4421 9.32653C10.853 7.52582 11.865 5.91879 13.3115 4.77023C14.7579 3.62167 16.5525 3.00009 18.3994 3.00792C24.8088 2.91645 28.7859 10.3075 25.244 15.6147ZM33.5138 16.1101H28.4681C29.4647 14.0872 29.8209 11.8086 29.4894 9.57806C29.9902 9.5872 31.2928 9.5712 31.776 9.57806C32.0042 9.57796 32.2303 9.62284 32.4412 9.71013C32.652 9.79743 32.8437 9.92544 33.005 10.0868C33.1664 10.2482 33.2944 10.4398 33.3817 10.6507C33.469 10.8616 33.5139 11.0876 33.5138 11.3159V16.1101Z"
      fill="#B4B4B4"
    />
    <path
      d="M33.3384 25.6756C28.8582 25.8105 28.8537 32.3182 33.3384 32.4592H42.683V25.6756C41.8217 25.6794 34.3964 25.6726 33.3384 25.6756ZM33.9329 30.165C33.6408 30.165 33.3607 30.0489 33.1541 29.8424C32.9476 29.6358 32.8316 29.3557 32.8316 29.0636C32.8316 28.7715 32.9476 28.4913 33.1541 28.2848C33.3607 28.0782 33.6408 27.9622 33.9329 27.9622C34.225 27.9622 34.5052 28.0782 34.7117 28.2848C34.9183 28.4913 35.0343 28.7715 35.0343 29.0636C35.0343 29.3557 34.9183 29.6358 34.7117 29.8424C34.5052 30.0489 34.225 30.165 33.9329 30.165Z"
      fill="#B4B4B4"
    />
  </svg>
);

const Profiledeatils = ({ userData, setSnackbarMessage, setSnackbarOpen, mutate }) => {
  const theme = useTheme();

  //Sms-auth dialogbox
  console.log({ userData });

  const [smsopenDialog, smssetOpenDialog] = useState(false);
  const [otpState, setOtpState] = useState(false);
  const smshandleClickOpenDialog = () => {
    smssetOpenDialog(true);
  };

  const smshandleCloseDialog = () => {
    smssetOpenDialog(false);
    setOtpState(false)
  };

  //Sms-auth dialogbox

  const [resetopenDialog, resetsetOpenDialog] = useState(false);

  const resethandleClickOpenDialog = () => {
    resetsetOpenDialog(true);
  };

  const resethandleCloseDialog = () => {
    resetsetOpenDialog(false);
  };
  //send otp
  const [color, setColor] = useState('');
  const [displayText, setDisplayText] = useState('SEND OTP');
  const [isResend, setIsResend] = useState(false);

  const handleOTP = async (action) => {
    try {
      const { data } = action === 'POTP' ? await sendOTP({ accountType: 'GRAVITUS' }) : await sendMOTP({ accountType: 'GRAVITUS' });
      if (Object.keys(data.result).length) {
        console.log({ data });
        setSnackbarMessage({ msg: isResend ? 'OTP Resent successfully' : 'OTP Sent successfully', success: true });
        setSnackbarOpen(true);
        if (!isResend) {
          setIsResend(true);
          setDisplayText('RESEND OTP');
        }
        setColor('grey');
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
                    <Stack p={4} spacing={2}>
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
                          console.log({ values });
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
                              console.log({ data });
                              mutate();
                              setSnackbarMessage({ msg: otpState ? 'otp validated' : 'Mobile no submitted', success: true });
                              setSnackbarOpen(true);
                              if (otpState) {
                                smshandleCloseDialog();
                              }
                              setOtpState(true);
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
                                {otpState ? (
                                  <Grid item xs={12}>
                                    <Stack spacing={1}>
                                      <Typography
                                        variant="body1"
                                        sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                                      >
                                        Enter the OTP
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
                                    SUBMIT
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
                    <Stack p={4} spacing={1}>
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
                          console.log({ values });
                          try {
                            const { data } = await resetMobileNumber({
                              accountType: 'GRAVITUS',
                              postData: { validateOTP: values.otpemail }
                            });
                            if (Object.keys(data.result).length) {
                              console.log({ data });
                              mutate();
                              setSnackbarMessage({ msg: 'Mobile number reset successfully', success: true });
                              setSnackbarOpen(true);
                              resethandleCloseDialog();
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
                                  <Stack spacing={1}>
                                    <Typography
                                      variant="body1"
                                      sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                                    >
                                      Otp will sent to {userData.emailId}
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
                                    SUBMIT
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

export default Profiledeatils;

const countries = [{ code: 'IN', label: 'India', phone: '91' }];
