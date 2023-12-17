import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import { Button, FormHelperText, Grid, OutlinedInput, Stack, InputLabel, InputAdornment, Link, useTheme, Typography } from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import CustomSnackBar from '../../../components/snackbar';
import AnimateButton from '../../../components/@extended/AnimateButton';

import useSWR from 'swr';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminUserStateAction } from '../../../appRedux/actions/adminUser';
import { fetcher, getSecurityURL, sendOtpSecurity, signinSecurity } from '../../../api/profile';
import { Send_OTP, postDataSystem } from 'src/api_ng/system_ng';

// ============================|| FIREBASE - LOGIN ||============================ //

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

const GravitusAuthLoginVerify = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.user.user);

  const [verifyMethodState, setVerifyMethodState] = useState(false);
  const [verifyMethod, setVerifyMethod] = useState('email');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  const [POTPcolor, setPOTPColor] = useState('');
  const [MOTPcolor, setMOTPColor] = useState('');

  const [resendPOTP, setResendPOTP] = useState('SEND OTP');
  const [resendMOTP, setResendMOTP] = useState('SEND OTP');

  const [isResendMOTP, setIsResendMOTP] = useState(false);
  const [isResendPOTP, setIsResendPOTP] = useState(false);

  const { data, error, isLoading } = useSWR(
    getSecurityURL(),
    (url) => fetcher(url, { accountType: 'GRAVITUS' })
    // { suspense: true }
  );

  const handleVerifyMethod = (str) => {
    setVerifyMethod(str);
    setVerifyMethodState(false);
  };

  function reqSendOTP(action) {
    try {
      var postData = { verifyType: 'sSecurity', action }
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
      {data && verifyMethodState ? (
        <Grid item xs={12}>
          <Stack spacing={3}>
            {data?.result?.gSecurity?.enabled === '1' && (
              <AnimateButton>
                <Button
                  disableElevation
                  fullWidth
                  size="large"
                  variant="contained2"
                  onClick={() => handleVerifyMethod(data?.result?.gSecurity?.authType)}
                >
                  <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <Typography variant="title2">Google Authenticator</Typography>
                      <ArrowRightIcon sx={{ color: 'text.buy', fontSize: '32px' }} />
                    </Stack>
                  </Grid>
                </Button>
              </AnimateButton>
            )}
            {data?.result?.mSecurity?.enabled === '1' && (
              <AnimateButton>
                <Button
                  disableElevation
                  fullWidth
                  size="large"
                  variant="contained2"
                  onClick={() => handleVerifyMethod(data?.result?.mSecurity?.authType)}
                >
                  <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <Typography variant="title2">Email Verification</Typography>
                      <ArrowRightIcon sx={{ color: 'text.buy', fontSize: '32px' }} />
                    </Stack>
                  </Grid>
                </Button>
              </AnimateButton>
            )}
            {data?.result?.pSecurity?.enabled === '1' && (
              <AnimateButton>
                <Button
                  disableElevation
                  fullWidth
                  size="large"
                  variant="contained2"
                  onClick={() => handleVerifyMethod(data?.result?.pSecurity?.authType)}
                >
                  <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <Typography variant="title2">Phone Number Verification</Typography>
                      <ArrowRightIcon sx={{ color: 'text.buy', fontSize: '32px' }} />
                    </Stack>
                  </Grid>
                </Button>
              </AnimateButton>
            )}
          </Stack>
        </Grid>
      ) : (
        <Formik
          initialValues={{
            otpmail: '',
            otpmbl: '',
            authcode: ''
          }}
          validationSchema={Yup.object().shape({
            otpmail: verifyMethod === 'email' && Yup.number().positive().required('OTP is required*'),
            otpmbl: verifyMethod === 'phone' && Yup.number().positive().required('OTP is required*'),
            authcode: verifyMethod === 'google' && Yup.number().positive().required('G-Code is required*')
          })}
          // validationSchema={
          //   (verifyMethod === 'email' && Yup.object().shape({ otpmail: Yup.string().max(5).required('OTP is required') }),
          //   verifyMethod === 'phone' && Yup.object().shape({ otpmbl: Yup.string().max(5).required('OTP is required') }),
          //   verifyMethod === 'google' && Yup.object().shape({ authcode: Yup.string().max(6).required('Auth code is required') }))
          // }
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            console.log({ values });
            const phoneOTP = values.otpmbl;
            const emailOTP = values.otpmail;
            const googleOTP = values.authcode;
            const postData = {
              verifyType: 'sSecurity',
              userId: userDetails.id,
              emailId: userDetails.emailId,
              password: userDetails.password,
              ...(phoneOTP && { phoneOTP }),
              ...(emailOTP && { emailOTP }),
              ...(googleOTP && { googleOTP })
            };
            try {
              const { data } = await signinSecurity({ accountType: 'GRAVITUS', postData });
              if (Object.keys(data.result).length) {
                console.log({ data });
                setSnackbarMessage({ msg: 'login verified successfully', success: true });
                setSnackbarOpen(true);
                dispatch(
                  setAdminUserStateAction({
                    isAuthenticated: true
                  })
                );

                navigate('/', { replace: true });
              } else {
                setSnackbarMessage({ msg: 'Request failed', success: false });
                setSnackbarOpen(true);
              }
            } catch (err) {
              setSnackbarMessage({ msg: err.message, success: false });
              setSnackbarOpen(true);
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {verifyMethod === 'email' && (
                    <Stack spacing={1}>
                      <InputLabel htmlFor="email-login" variant="body2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        OTP will be sent to <Email email={data?.result?.mSecurity?.authKey} />
                      </InputLabel>
                      <OutlinedInput
                        id="email-login"
                        type="text"
                        value={values.otpmail}
                        name="otpmail"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter OTP"
                        fullWidth
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
                  )}
                  {verifyMethod === 'phone' && (
                    <Stack spacing={1}>
                      <InputLabel htmlFor="otpmbl-login" variant="subtitle3" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        OTP will be sent to <Mobilenumber number={data.result.pSecurity.authKey} />
                      </InputLabel>
                      <OutlinedInput
                        id="otpmbl-login"
                        type="text"
                        value={values.otpmbl}
                        name="otpmbl"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter OTP"
                        fullWidth
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
                  {verifyMethod === 'google' && (
                    <Stack spacing={1}>
                      <InputLabel htmlFor="authcode-login" variant="subtitle3">
                        Enter the Google Authentication Code
                      </InputLabel>
                      <OutlinedInput
                        id="authcode-login"
                        type="text"
                        value={values.authcode}
                        name="authcode"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter CODE"
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
                </Grid>

                {/* mobilenumber verify textfield */}
                {/* <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="otpmbl-login" variant='subtitle3' >Enter the OTP sent to 8508275959</InputLabel>
                  <OutlinedInput
                    id="otpmbl-login"
                    type="text"
                    value={values.otpmbl}
                    name="otpmbl"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter OTP"
                    fullWidth
                    error={Boolean(touched.otpmbl && errors.otpmbl)}
                    endAdornment={
                      <InputAdornment  >
                        <Button
                          style={{
                            color: color || (theme.palette.mode === 'dark' ? '#fff' : '#000'),
                            fontSize: "12px"
                          }}
                          onClick={reqSendOTP}
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
              </Grid> */}

                {/* GoogleAuth verify textfield */}
                {/* <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="authcode-login" variant='subtitle3' >Enter the Google Authentication Code</InputLabel>
                  <OutlinedInput
                    id="authcode-login"
                    type="text"
                    value={values.authcode}
                    name="authcode"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter CODE"
                    fullWidth
                    error={Boolean(touched.authcode && errors.authcode)}
                  />
                  {touched.authcode && errors.authcode && (
                    <FormHelperText error id="standard-weight-helper-text-otp-login">
                      {errors.authcode}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid> */}
                <Grid item xs={12}>
                  <AnimateButton>
                    <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                      NEXT
                    </Button>
                  </AnimateButton>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                  <Link
                    variant="body2"
                    onClick={() => setVerifyMethodState(true)}
                    color="text.buy"
                    sx={{ textAlign: 'center', cursor: 'pointer' }}
                  >
                    Switch to other ways ?
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      )}
      <CustomSnackBar
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        snackbarMessage={snackbarMessage && snackbarMessage.msg}
        success={snackbarMessage && snackbarMessage.success}
      />
    </>
  );
};

export default GravitusAuthLoginVerify;
