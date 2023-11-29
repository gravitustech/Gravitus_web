import React, { useState, useEffect } from 'react';
import {
  Card,
  Grid,
  Stack,
  Typography,
  useTheme,
  Button,
  OutlinedInput,
  FormHelperText,
  Select,
  MenuItem,
  Tooltip,
  IconButton,
  InputLabel
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import copyicon from '../../../../assets/images/gravitusimage/copyicon.svg';
import AnimateButton from 'src/components/@extended/AnimateButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import InputAdornment from '@mui/material/InputAdornment';
import notesicon from '../../../../assets/images/gravitusimage/notesicon.svg';
import { updateAuth, sendOtpSecurity, enableSecurity, disableSecurity } from '../../../../api/profile';
import DoneIcon from '@mui/icons-material/Done';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CopyToClipboard from 'react-copy-to-clipboard';
import ResetDialog from './resetDialog';

const IOSSwitch = styled((props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(({ theme }) => ({
  width: 42,
  height: 24,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 3,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#00BBAB' : '#00BBAB',
        opacity: 1,
        border: 0
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5
      }
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff'
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
    }
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 18,
    height: 18
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500
    })
  }
}));

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

const EmailUpdate = ({ email }) => {
  const theme = useTheme();
  const firstTwo = email.slice(0, 2);
  const lastTwo = email.slice(-10);
  const middle = '*******';

  const maskedEmail = `${firstTwo}${middle}${lastTwo}`;

  return (
    <Typography pt={1} pr={4} variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
      {maskedEmail}
    </Typography>
  );
};

const MobilenumberUpdate = ({ number }) => {
  const theme = useTheme();
  const firstTwo = number.slice(0, 2);
  const lastTwo = number.slice(-2);
  const middle = '******';

  const Mobilenumber = `${firstTwo}${middle}${lastTwo}`;

  return (
    <Typography pt={1} variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
      {Mobilenumber}
    </Typography>
  );
};
const Securityscreen = ({ securityData, setSnackbarMessage, setSnackbarOpen, mutate }) => {
  const theme = useTheme();
  // console.log({ securityData });
  //G-auth dialogbox

  const [displayText1, setDisplayText1] = useState('SEND OTP');
  const [isResendPOTP, setIsResendPOTP] = useState(false);
  const [isPOtpLoading, setIsPOtpLoading] = useState(false);

  const [displayText2, setDisplayText2] = useState('SEND OTP');
  const [isResendMOTP, setIsResendMOTP] = useState(false);
  const [isMOtpLoading, setIsMOtpLoading] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const [otpState, setOtpState] = useState(false);
  const [resetAction, setResetAction] = useState(false);

  const handleOTP = async (action, flag) => {
    console.log({ flag });
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
          verifyType: flag ? 'dSecurity' : 'vSecurity',
          action
        }
      });
      if (Object.keys(data.result).length) {
        console.log({ data });
        // setSnackbarMessage({ msg: isResendMOTP ? 'OTP Resent successfully' : 'OTP Sent successfully', success: true });
        // setSnackbarMessage({ msg: isResendPOTP ? 'OTP Resent successfully' : 'OTP Sent successfully', success: true });
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

  const handleNext = async (phone) => {
    console.log({ phone });
    setOtpState(true);
    const postData = phone ? { action: 'updatePAuth', mobileNo: phone, intCode: '+91' } : { action: 'updateGAuth' };
    try {
      const { data } = await updateAuth({
        accountType: 'GRAVITUS',
        postData
      });
      if (Object.keys(data.result).length) {
        console.log({ data });
        setSnackbarMessage({ msg: 'Authentication request sent', success: true });
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage({ msg: 'Auth request failed', success: false });
        setSnackbarOpen(true);
      }
    } catch (err) {
      setSnackbarMessage({ msg: err.message, success: false });
      setSnackbarOpen(true);
    }
  };

  const handleClickOpenDialog = () => {
    if (securityData?.gSecurity && securityData?.gSecurity?.enabled === '1') {
      setOtpState(true);
    } else {
      setOtpState(false);
    }
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setOtpState(false);
    setIsResendMOTP(false);
    setIsResendPOTP(false);
    // setDisplayText1('SEND OTP');
    // setDisplayText2('SEND OTP');
  };

  //Sms-auth dialogbox

  const [smsopenDialog, smssetOpenDialog] = useState(false);

  const smshandleClickOpenDialog = () => {
    // if (securityData.pSecurity) {
    if (securityData.pSecurity && securityData?.pSecurity?.enabled === '1') {
      setOtpState(true);
    }
    smssetOpenDialog(true);
    // }
    // else {
    //   setSnackbarMessage({ msg: 'Update mobile number', success: false });
    //   setSnackbarOpen(true);
    // }
  };

  const smshandleCloseDialog = () => {
    setIsResendMOTP(false);
    setIsResendPOTP(false);
    setDisplayText1('SEND OTP');
    setDisplayText2('SEND OTP');
    smssetOpenDialog(false);
    setOtpState(false);
  };

  const handleReset = (action) => {
    setOpenResetDialog(true);
    setResetAction(action);
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {/* <Typography variant='title1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          2 Factor Authentication
        </Typography> */}

        <Stack pt={3} spacing={2}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: '10px',
              boxShadow: 'none',
              color: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
            }}
          >
            <Grid pl={5} pr={5} pt={3} pb={3} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography pt={1} variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                Google Authenticator
              </Typography>

              <Stack direction="row" spacing={4}>
                {securityData?.gShow === 'true' && (
                  <Button variant="transparent" onClick={() => handleReset('greset')}>
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                      Reset
                    </Typography>
                  </Button>
                )}

                {/* G-AUTH Enable dialog box */}
                <FormControlLabel onClick={handleClickOpenDialog} control={<IOSSwitch checked={securityData?.gShow === 'true'} />} />
                <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="dialog-title" >
                  <Stack p={4} spacing={2.5}width={540}>
                    <Typography variant="h1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      G-Authenticator Security
                    </Typography>
                    {otpState ? (
                      <>
                        <Formik
                          initialValues={{
                            gcode: '',
                            otpmail: '',
                            otpmbl: ''
                          }}
                          // validationSchema={
                          //   (securityData.pSecurity.enabled === '1' &&
                          //     Yup.object().shape({ otpmbl: Yup.string().max(5).required("OTP is requried*") }),
                          //   Yup.object().shape({ otpmail: Yup.string().max(5).required("OTP is requried*") }),
                          //   Yup.object().shape({ gcode: Yup.string().max(6).required("G-Code is requried*") }))
                          // }
                          validationSchema={Yup.object().shape({
                            otpmbl: securityData?.pSecurity?.enabled === '1' && Yup.string().max(5).required('OTP is requried*'),
                            otpmail: Yup.string().max(5).required('OTP is requried*'),
                            gcode: Yup.string().max(6).required('G-Code is requried*')
                          })}
                          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                            console.log({ values });
                            const phoneOTP = values.otpmbl;
                            const postData = {
                              verifyType: securityData?.gSecurity?.enabled === '1' ? 'dSecurity' : 'vSecurity',
                              secFeature: 'google',
                              googleOTP: values.gcode,
                              emailOTP: values.otpmail,
                              ...(securityData?.pSecurity?.enabled === '1' && { phoneOTP })
                            };
                            try {
                              const { data } =
                                securityData?.gSecurity?.enabled === '1'
                                  ? await disableSecurity({ accountType: 'GRAVITUS', postData })
                                  : await enableSecurity({ accountType: 'GRAVITUS', postData });
                              if (Object.keys(data.result).length) {
                                console.log({ data });
                                mutate();
                                setSnackbarMessage({ msg: 'otp validated', success: true });
                                setSnackbarOpen(true);
                                setOtpState(true);
                                handleCloseDialog();
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
                                          OTP will be send to <Mobilenumber number={securityData?.pSecurity?.authKey} />
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
                                                disabled={isPOtpLoading}
                                                style={{
                                                  color: isPOtpLoading ? 'grey' : theme.palette.mode === 'dark' ? '#fff' : '#000',
                                                  fontSize: '12px'
                                                }}
                                                onClick={() => handleOTP('sendPOTP', securityData?.gSecurity?.enabled === '1')}
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
                                      OTP will be send to <Email email={securityData?.mSecurity?.authKey} />
                                    </Typography>
                                    <OutlinedInput
                                      id="otpmail-login"
                                      type="text"
                                      value={values.otpmail}
                                      name="otpmail"
                                      onBlur={handleBlur}
                                      // onChange={handleChange}
                                      onChange={(e) => {
                                        const numericValue = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                                        handleChange({ target: { name: 'otpmail', value: numericValue } });
                                      }}
                                      placeholder=" "
                                      fullWidth
                                      error={Boolean(touched.otpmail && errors.otpmail)}
                                      endAdornment={
                                        <InputAdornment>
                                          <Button
                                            disabled={isMOtpLoading}
                                            style={{
                                              color: isMOtpLoading ? 'grey' : theme.palette.mode === 'dark' ? '#fff' : '#000',
                                              fontSize: '12px'
                                            }}
                                            onClick={() => handleOTP('sendMOTP', securityData?.gSecurity?.enabled === '1')}
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
                                      // onChange={handleChange}
                                      onChange={(e) => {
                                        const numericValue = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                                        handleChange({ target: { name: 'gcode', value: numericValue } });
                                      }}
                                      placeholder=""
                                      fullWidth
                                      error={Boolean(touched.gcode && errors.gcode)}
                                    />
                                    {touched.gcode && errors.gcode && (
                                      <FormHelperText error id="standard-weight-helper-text-email-login">
                                        {errors.gcode}
                                      </FormHelperText>
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
                      </>
                    ) : (
                      <>
                        <Stack
                          direction="row"
                          spacing={1}
                          style={{ alignItems: 'flex-start' }}
                          sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}
                        >
                          <Typography variant="title2">1.</Typography>
                          <Typography variant="title2">Download</Typography>
                          <Typography
                            variant="title2"
                            sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                          >
                            Google Authenticator.
                          </Typography>
                        </Stack>
                        <Stack
                          spacing={1}
                          direction="row"
                          style={{ alignItems: 'flex-start' }}
                          sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}
                        >
                          <Typography variant="title2">2.</Typography>

                          <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                            Save your Google secret key on paper. This key will <br /> allow you to restore your account in case your phone
                            is <br />
                            lost.
                          </Typography>
                        </Stack>
                        <Card
                          sx={{
                            borderRadius: '10px',
                            border: '1px solid',
                            boxShadow: 'none',
                            backgroundColor: 'transparent'
                          }}
                        >
                          <Grid
                            p={1.5}
                            pl={2}
                            pr={2}
                            alignItems="center"
                            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                          >
                            <Typography
                              variant="title2"
                              sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                            >
                              {securityData?.gSecurity?.authKey}
                            </Typography>
                            <CopyToClipboard text={securityData?.gSecurity?.authKey} onCopy={handleCopy}>
                              <Tooltip placement="top" disableFocusListener title={copied ? 'Copied' : 'Click to copy'} arrow>
                                <IconButton disableRipple>
                                  {copied ? <DoneIcon color="#C1C1C1" /> : <img src={copyicon} alt="copy" style={{ cursor: 'pointer' }} />}
                                </IconButton>
                              </Tooltip>
                            </CopyToClipboard>
                            {/* <img src={copyicon} alt="copyicon" /> */}
                          </Grid>
                        </Card>
                        <Grid item xs={12}>
                          <AnimateButton>
                            <Button fullWidth size="large" type="submit" variant="contained" onClick={() => handleNext()}>
                              NEXT
                            </Button>
                          </AnimateButton>
                        </Grid>
                      </>
                    )}
                  </Stack>
                </Dialog>
              </Stack>
            </Grid>
          </Card>
        </Stack>

        <Stack pt={3} spacing={2}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: '10px',
              boxShadow: 'none',
              color: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
            }}
          >
            <Grid pl={5} pr={5} pt={3} pb={3} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography pt={1} variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                SMS Authentication
              </Typography>
              {securityData?.pSecurity && <MobilenumberUpdate number={securityData?.pSecurity?.authKey} />}
              <Stack direction="row" spacing={4}>
                {securityData?.pShow === 'true' && (
                  <Button variant="transparent" onClick={() => handleReset('preset')}>
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                      Reset
                    </Typography>
                  </Button>
                )}

                {/* SMS Enable dialog box */}
                <FormControlLabel onClick={smshandleClickOpenDialog} control={<IOSSwitch checked={securityData?.pShow === 'true'} />} />
                <Dialog open={smsopenDialog} onClose={smshandleCloseDialog} aria-labelledby="dialog-title">
                  <Stack p={4} spacing={2} width={520}>
                    <Typography variant="h1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      SMS Security
                    </Typography>
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                      Protect your withdrawals and account with SMS <br />
                      authentication.
                    </Typography>
                    <Formik
                      initialValues={{
                        otpmbl: '',
                        mobilenumber: '',
                        otpmail: '',
                        gcode: ''
                      }}
                      validationSchema={
                        otpState
                          ? Yup.object().shape({
                            otpmbl: Yup.string().max(5).required('OTP is requried*'),
                            otpmail: Yup.string().max(5).required('OTP is requried*'),
                            gcode: securityData?.gSecurity?.enabled === '1' && Yup.string().max(6).required('G-Code is requried*')
                          })
                          : Yup.object().shape({ mobilenumber: Yup.string().max(10).required("Don't leave a empty") })
                      }
                      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        console.log({ values });
                        const googleOTP = values.gcode;
                        const postData = {
                          verifyType: securityData?.pSecurity?.enabled === '1' ? 'dSecurity' : 'vSecurity',
                          secFeature: 'phone',
                          phoneOTP: values.otpmbl,
                          emailOTP: values.otpmail,
                          ...(securityData?.gSecurity?.enabled === '1' && { googleOTP })
                        };
                        if (otpState) {
                          try {
                            const { data } =
                              securityData?.pSecurity?.enabled === '1'
                                ? await disableSecurity({ accountType: 'GRAVITUS', postData })
                                : await enableSecurity({ accountType: 'GRAVITUS', postData });
                            if (Object.keys(data.result).length) {
                              console.log({ data });
                              mutate();
                              setOtpState(false);
                              setSnackbarMessage({ msg: 'Authentication is Enabled', success: true });
                              setSnackbarOpen(true);
                              smshandleCloseDialog();
                            } else {
                              setSnackbarMessage({ msg: 'Request failed', success: false });
                              setSnackbarOpen(true);
                            }
                          } catch (err) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                          }
                        } else {
                          handleNext(values.mobilenumber);
                        }
                      }}
                    >
                      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                        <>
                          <form noValidate onSubmit={handleSubmit}>
                            {otpState ? (
                              <>
                                <Grid item xs={12} pt={1}>
                                  <Stack spacing={1}>
                                    <Typography
                                      variant="body1"
                                      sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                                    >
                                      OTP will be send to <Mobilenumber number={securityData?.pSecurity?.authKey || values.mobilenumber} />
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
                                            disabled={isPOtpLoading}
                                            style={{
                                              color: isPOtpLoading ? 'grey' : theme.palette.mode === 'dark' ? '#fff' : '#000',
                                              fontSize: '12px'
                                            }}
                                            onClick={() => handleOTP('sendPOTP', securityData?.pSecurity?.enabled === '1')}
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
                                      // onChange={handleChange}
                                      onChange={(e) => {
                                        const numericValue = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                                        handleChange({ target: { name: 'otpmail', value: numericValue } });
                                      }}
                                      placeholder=" "
                                      fullWidth
                                      error={Boolean(touched.otpmail && errors.otpmail)}
                                      endAdornment={
                                        <InputAdornment>
                                          <Button
                                            disabled={isMOtpLoading}
                                            style={{
                                              color: isMOtpLoading ? 'grey' : theme.palette.mode === 'dark' ? '#fff' : '#000',
                                              fontSize: '12px'
                                            }}
                                            onClick={() => handleOTP('sendMOTP', securityData?.pSecurity?.enabled === '1')}
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
                                          // onChange={handleChange}
                                          onChange={(e) => {
                                            const numericValue = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                                            handleChange({ target: { name: 'gcode', value: numericValue } });
                                          }}
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
                              </>
                            ) : (
                              <>
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
                                <Grid item xs={12} pt={2}>
                                  <AnimateButton>
                                    <Button fullWidth size="large" type="submit" variant="contained">
                                      Next
                                    </Button>
                                  </AnimateButton>
                                </Grid>
                              </>
                            )}
                          </form>
                        </>
                      )}
                    </Formik>
                  </Stack>
                </Dialog>
              </Stack>
            </Grid>
          </Card>
        </Stack>

        <Stack pt={3} spacing={2}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: '10px',
              boxShadow: 'none',
              color: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
            }}
          >
            <Grid pl={5} pr={5} pt={3} pb={3} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography pt={1} variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                Email Authentication
              </Typography>
              {securityData?.mSecurity && <EmailUpdate email={securityData?.mSecurity?.authKey} />}

              <Stack direction="row" spacing={4}>
                <FormControlLabel disabled control={<IOSSwitch defaultChecked />} />
              </Stack>
            </Grid>
          </Card>
        </Stack>

        <Stack pt={3}>
          <Stack direction="row" spacing={1}>
            <img src={notesicon} alt="notesicon" width={16} />
            <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
              Enable a minimum of two features. Secure your account by enabling 2-factor authentication.
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      <ResetDialog
        openDialog={openResetDialog}
        setOpenDialog={setOpenResetDialog}
        setSnackbarMessage={setSnackbarMessage}
        setSnackbarOpen={setSnackbarOpen}
        action={resetAction}
        securityData={securityData}
        mutate={mutate}
      />
    </Grid>
  );
};
export default Securityscreen;

const countries = [{ code: 'IN', label: 'India', phone: '91' }];
