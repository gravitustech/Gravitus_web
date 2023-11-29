import {
  Button,
  Dialog,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import { resetSecurity, sendOtpSecurity } from '../../../../api/profile';
import AnimateButton from 'src/components/@extended/AnimateButton';
import * as Yup from 'yup';

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

const ResetDialog = ({ openDialog, setOpenDialog, securityData, setSnackbarMessage, setSnackbarOpen, action, mutate }) => {
  const theme = useTheme();
  console.log({ securityData });
  const [displayText1, setDisplayText1] = useState('SEND OTP');
  const [displayText2, setDisplayText2] = useState('SEND OTP');
  const [isResendMOTP, setIsResendMOTP] = useState(false);
  const [isResendPOTP, setIsResendPOTP] = useState(false);
  const [isMOtpLoading, setIsMOtpLoading] = useState(false);
  const [isPOtpLoading, setIsPOtpLoading] = useState(false);

  const handleOTP = async (action) => {
    if (action === 'sendPOTP') {
      console.log({ action });
      setIsPOtpLoading(true);
    }
    if (action === 'sendMOTP') {
      setIsMOtpLoading(true);
    }
    try {
      const { data } = await sendOtpSecurity({
        accountType: 'GRAVITUS',
        postData: {
          verifyType: 'rSecurity',
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

  useEffect(() => {
    let timeoutId;
    if (isPOtpLoading) {
      timeoutId = setTimeout(() => {
        setDisplayText1('RESEND OTP');
        setIsPOtpLoading(false);
      }, 30000); // 1 minute = 60000 milliseconds
    }
    return () => clearTimeout(timeoutId);
  }, [isPOtpLoading]);

  useEffect(() => {
    let timeoutId;
    if (isMOtpLoading) {
      timeoutId = setTimeout(() => {
        setDisplayText2('RESEND OTP');
        setIsMOtpLoading(false);
      }, 30000); // 1 minute = 60000 milliseconds
    }
    return () => clearTimeout(timeoutId);
  }, [isMOtpLoading]);


  const handleCloseDialog = () => {
    setOpenDialog(false);
    setIsResendMOTP(false);
    setIsResendPOTP(false);
    setDisplayText1('SEND OTP');
    setDisplayText2('SEND OTP');
  };
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="dialog-title">
      <Stack p={4} spacing={2}>
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
            console.log({ values });
            const phoneOTP = values.otpmbl;
            const googleOTP = values.authcode;
            const postData = {
              verifyType: 'rSecurity',
              secFeature: action === 'greset' ? 'google' : 'phone',
              emailOTP: values.otpmail,
              ...(securityData?.pSecurity?.enabled === '1' && { phoneOTP }),
              ...(securityData?.gSecurity?.enabled === '1' && { googleOTP })
            };
            try {
              const { data } = await resetSecurity({ accountType: 'GRAVITUS', postData });
              if (Object.keys(data.result).length) {
                console.log({ data });
                mutate();
                setSnackbarMessage({ msg: 'Rest your Authentication', success: true });
                setSnackbarOpen(true);
                handleCloseDialog();
              } else {
                setSnackbarMessage({ msg: 'Request failed', success: false });
                setSnackbarOpen(true);
              }
            } catch (err) {
              setSnackbarMessage({ msg: err.message, success: false });
              setSnackbarOpen(true);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              {action === 'greset' && securityData?.pSecurity?.enabled === '1' && (
                <Stack spacing={1} pt={3} width={440}>
                  <InputLabel htmlFor="otpmbl-login" variant="subtitle3">
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
                          disabled={isPOtpLoading}
                          style={{
                            color: isPOtpLoading ? "grey" : (theme.palette.mode === 'dark' ? '#fff' : '#000'),
                            fontSize: '12px'
                          }}
                          onClick={() => handleOTP('sendPOTP')}
                        >
                          {displayText1}
                        </Button>
                        {/* <Button
                          style={{
                            color: color || (theme.palette.mode === 'dark' ? '#fff' : '#000'),
                            fontSize: '12px'
                          }}
                          onClick={() => handleOTP('sendPOTP')}
                        >
                          Send OTP
                        </Button> */}
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
                <InputLabel htmlFor="email-login" variant="body2">
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
                        disabled={isMOtpLoading}
                        style={{
                          color: isMOtpLoading ? "grey" : (theme.palette.mode === 'dark' ? '#fff' : '#000'),
                          fontSize: '12px'
                        }}
                        onClick={() => handleOTP('sendMOTP')}
                      >
                        {displayText2}
                      </Button>
                      {/* <Button
                        style={{
                          color: color || (theme.palette.mode === 'dark' ? 'white' : 'black'),
                          fontSize: '12px'
                        }}
                        onClick={() => handleOTP('sendMOTP')}
                      >
                        send OTP
                      </Button> */}
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
                  <InputLabel htmlFor="authcode-login" variant="subtitle3">
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
                    SUBMIT
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
