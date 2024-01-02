import warninggif from '../../../../../../assets/images/gravitusimage/warninggif.svg';
import ordersuccessgif from '../../../../../../assets/images/gravitusimage/ordersuccesgif.svg';
import Timeoutgif from '../../../../../../assets/images/gravitusimage/Timeoutgif.svg';

import {
  Typography, Stack, Avatar, useTheme, Grid, Card, TextField, FormHelperText,
  IconButton, Box, Stepper, Step, StepLabel, Button, Badge, Dialog, Autocomplete,
  TextareaAutosize, Modal, Tooltip, CircularProgress
} from '@mui/material';

import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Check, DeleteForever } from '@mui/icons-material';

import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from "@mui/material/styles";

import React, { useState, useRef, useEffect, useReducer } from 'react';
import useSWR, { mutate } from 'swr';
import PropTypes from "prop-types";
import moment from 'moment';

import * as Yup from 'yup';
import { Formik } from 'formik';

import UpiImpsTabs from './Payment_Tabs';
import Trade_Price_Dts from './Trade_Price_Dts';

import ImageCropper from 'src/components/_cropper';
import { P2P_OrderDetails_URL, P2P_AppealToEscrow_URL, P2P_OrderClosure_URL, formDataP2P, postDataP2P, P2P_Appeal_Cancel } from 'src/api_ng/peer2peer_ng';
import { useNavigate } from 'react-router';

const StyledTextarea = styled(TextareaAutosize)(({ theme, error }) => ({
  width: 'auto',
  fontFamily: 'IBM Plex Sans, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: 1.5,
  padding: 12,
  borderRadius: '3px 3px 0 3px',
  color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  background: 'transparent',
  border: `1px solid ${error ? 'red' : (theme.palette.mode === 'dark' ? '#424a53' : '#d0d7de')}`,
  boxShadow: `0px 2px 2px ${theme.palette.mode === 'dark' ? '#24292f' : '#f6f8fa'}`,
  '&:hover': {
    borderColor: error ? 'red' : '#00BBAB',
  },
  '&:focus': {
    borderColor: error ? 'red' : '#00BBAB',
    boxShadow: `0 0 0 .2px ${theme.palette.mode === 'dark' ? '#00BBAB' : '#00BBAB'}`,
  },
  '&:focus-visible': {
    outline: 0,
  },
  '&::placeholder': {
    fontSize: '14px', // Adjust the font size as desired
    color: theme.palette.mode === 'dark' ? '#A3A3A3' : '#A3A3A3', // Adjust the color as desired
    fontWeight: 400
  },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4'
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor'
  }
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? <Check className="QontoStepIcon-completedIcon" /> : <div className="QontoStepIcon-circle" />}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#FF4E4E'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#FF4E4E'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 4,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1
  }
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 25,
  height: 25,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor: '#FF4E4E'
  }),
  ...(ownerState.completed && {
    backgroundColor: '#FF4E4E'
  })
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {completed ? <div className="QontoStepIcon-circle">{props.icon}</div> : <div className="QontoStepIcon-circle">{props.icon}</div>}
    </ColorlibStepIconRoot>
  );
}

const Trade_Seller_Dts_Ext = ({ SUPERData, setSnackbarOpen, setSnackbarMessage }) => {
  const theme = useTheme();
  const formikAPL = useRef();
  const navigate = useNavigate();

  const counterPart = SUPERData?.counterPart;
  const orderDetails = SUPERData?.orderDetails;

  const [timeLeftOver, setTimeLeftOver] = useReducer(updateTimeLeftOver, null);
  const [expiryTime, setExpiryTime] = useReducer(updateLeftOverMins, null);
  // console.log('SUPERData', SUPERData);

  function updateTimeLeftOver(state, action) {
    if (action.type === 'setDATA') {
      // console.log(action.data, 'Time Left Over');
      return action.data;
    }
  }

  function updateLeftOverMins(state, action) {
    if (action.type === 'setDATA') {
      return action.data;
    }
  }

  const [activeStep, setActiveStep] = React.useState(
    SUPERData?.actionCaption === "Order Timed Out" ? 2 :
      SUPERData?.superStatus === 2 ? 2
        : SUPERData?.superStatus === 0 ? 0 : 1
  );

  useEffect(() => {
    if (orderDetails != undefined) {
      var remaining = parseInt(expiryTime) - parseInt(moment().format('x'));
      var nLeftOverMins = (parseInt(remaining) / 60000).toFixed(0);
      var stopTimer = undefined;

      if (nLeftOverMins > 0 && orderDetails.status != 1 && orderDetails.status != -1 && orderDetails.status != -2) {
        setTimeLeftOver({ type: 'setDATA', data: nLeftOverMins });

        stopTimer = setInterval(() => {
          var remaining = parseInt(expiryTime) - parseInt(moment().format('x'));
          var nLeftOverMins = (parseInt(remaining) / 60000).toFixed(0);
          // console.log(nLeftOverMins, 'nLeftOverMins');

          if (nLeftOverMins > 0) {
            setTimeLeftOver({ type: 'setDATA', data: nLeftOverMins });
          }
          else {
            setTimeLeftOver({ type: 'setDATA', data: 0 });
          }
        }, 10000);
      }
      else {
        setTimeLeftOver({ type: 'setDATA', data: 0 });
      }
    }

    return () => clearInterval(stopTimer);
  }, [expiryTime]);

  React.useEffect(() => {
    setActiveStep(
      SUPERData?.actionCaption === "Order Timed Out" ? 2 :
        SUPERData?.superStatus === 2 ? 2
          : SUPERData?.superStatus === 0 ? 0 : 1
    );

    setExpiryTime({ type: 'setDATA', data: SUPERData.orderDetails.expiryTime });
  }, [SUPERData]);

  const [skipped, setSkipped] = React.useState(new Set());
  const [open, setOpen] = useState(false); // Confirm Dialog

  const [isLoading, setIsLoading] = useState(false); // Show loader
  const [appealInputs, setAppealInputs] = useState({ reason: '', message: '', submit: null });

  const [imageToCrop, setImageToCrop] = React.useState(undefined);
  const [croppedImage, setCroppedImage] = React.useState(undefined);

  // Go Back
  const goBack = () => {
    navigate(-1);
  }

  // Content not used
  const steps = ['Disabled step', 'Appeal and Confirm step', 'Completed and Cancelled step'];

  // Appeal reason
  const Reason = [{ Reason: "I have not received payment yet" }, { Reason: "I have received only a partial amount" }];

  // Modal View Style - Appeal
  const modalStyle = {
    position: 'absolute',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1024, height: 'auto',
    bgcolor: theme.palette.mode === 'dark' ? '#131722' : 'text.white',
    border: '1px solid #808080 !important',
    boxShadow: 24, p: 4,
    textAlign: 'center'
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const openConfirmDlg = () => { // Confirm Dialog
    setOpen(true);
  };

  const closeConfirmDlg = () => { // Confirm Dialog
    setOpen(false);
  };

  const onUploadFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        setImageToCrop(reader.result)
      });

      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const releaseCrypto = () => {
    var postData = {
      platformId: orderDetails.platformId,
      orderId: orderDetails.orderId
    };

    setIsLoading(true);
    postDataP2P(P2P_OrderClosure_URL(), postData).then(function (res) {

      setIsLoading(false);
      // console.log(res, 'Release Crypto');

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
        setSnackbarMessage({ msg: 'Crypto Released Successfully', success: false });
        setSnackbarOpen(true);

        mutate(P2P_OrderDetails_URL);

        closeConfirmDlg();
        handleNext();
      }
    }, function (err) {
      console.log(err);
      // Logout User
    });
  };

  // ################################# Appeal Segment #################################

  const [isHidden, setIsHidden] = useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleButtonClick = () => { // Show Appeal Step
    setIsHidden(!isHidden);
  };

  const handleModalOpen = () => {
    document.getElementById('superFile')?.click();
    setTimeout(function () {
      setModalOpen(true);
    }, 1000);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCroppedImage(undefined);
    setImageToCrop(undefined);
  };

  const handleImageCancel = () => {
    setCroppedImage(undefined);
    setImageToCrop(undefined);
    setModalOpen(false);
  }

  const handleImageUpload = () => {
    // setCroppedImage(false);
    setImageToCrop(undefined);
    setModalOpen(false);
  }

  // Handle Appeal
  function handleAppeal(values) {
    if (croppedImage != undefined) {
      var postData = {
        updateInfo: {
          platformId: orderDetails.platformId,
          reasonType: values.reason,
          reasonDesc: values.message,
          orderId: orderDetails.orderId,
        },
        fileName: 'aplScreenshot',
        fileI: croppedImage,
      }

      setIsLoading(true);
      formDataP2P(P2P_AppealToEscrow_URL(), postData).then(function (res) {

        setIsLoading(false);
        // console.log(res, 'Raise Appeal');

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
          setSnackbarMessage({ msg: 'Your appeal posted', success: false });
          setSnackbarOpen(true);

          setAppealInputs({ reason: '', message: '', submit: null });
          setImageToCrop(undefined);
          setCroppedImage(undefined);

          handleButtonClick()
          mutate(P2P_OrderDetails_URL);

          formikAPL.current.resetForm({
            values: {
              reason: '', message: '', submit: null
            }
          });
        }
      }, function (err) {
        console.log(err);
        // Logout User
      });
    }
    else {
      setSnackbarMessage({ msg: 'Upload Screenshot', success: false });
      setSnackbarOpen(true);
    }
  }

  // Cancel Appeal
  const AppealCancel = (orderDetails) => {
    mutate(P2P_OrderDetails_URL);
    setIsLoading(true);
    var postData = {
      platformId: orderDetails?.platformId,
      orderId: orderDetails?.orderId,
    };

    postDataP2P(P2P_Appeal_Cancel(), postData).then(function (res) {
      // console.log(res, 'Cancel Appeal');
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
            console.log('res', res.error.name)
            setSnackbarMessage({ msg: 'Appeal cancelled', success: false });
            setSnackbarOpen(true);
            handleButtonClick()
            mutate(P2P_OrderDetails_URL);
            setIsLoading(false);
          }
          else {
            console.log('res.error', res.error)
            setSnackbarMessage({ msg: res.error, success: false });
            setSnackbarOpen(true);
          }
        }
      } else {
        setSnackbarMessage({ msg: 'Cancelled Appeal', success: false });
        setSnackbarOpen(true);

        // Get Order details
        mutate(P2P_OrderDetails_URL);
      }
    }, function (err) {
      console.log(err);
      // Logout User
    });
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Stack pt={2} pl={2} pr={2} sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
              <Stack pt={2} direction="row" justifyContent="space-between">
                <Stack>
                  <Typography variant="h4" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                    {SUPERData?.actionCaption}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                    {SUPERData?.actionMessage} {timeLeftOver} minutes.
                  </Typography>
                </Stack>
                <Stack pt={0.8}>
                  <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                    {timeLeftOver} minutes
                  </Typography>
                  <Typography textAlign='end' variant="subtitle2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                    Duration
                  </Typography>
                </Stack>
              </Stack>

              {/* buyorderdeatils */}
              <Trade_Price_Dts orderDetails={orderDetails} />

              <Stack pt={3}>
                <Typography variant="h4" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                  Payment Methods
                </Typography>
              </Stack>

              <Stack pt={2}>
                <UpiImpsTabs orderDetails={orderDetails} />
              </Stack>

              <Stack direction="row" spacing={3} pt={3}>
                <Button variant="sellAppealbutton" disabled >
                  Appeal
                </Button>
                <Button disabled type="submit" variant="confirmrecipt">
                  Confirm Receipt
                </Button>
              </Stack>
            </Stack>
          </>
        );
      case 1:
        return (
          <>
            {!isHidden ? (
              <Stack pt={2} pl={2} pr={2} sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                <Stack pt={2} direction="row" justifyContent="space-between">
                  <Stack>
                    <Typography variant="h4" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      {SUPERData?.actionCaption}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                      {SUPERData?.actionMessage} {
                        SUPERData?.appealStatus === '1' ? (
                          <></>
                        ) : (
                          <>
                            {timeLeftOver} minutes.
                          </>
                        )
                      }
                    </Typography>
                  </Stack>
                  <Stack pt={0.8}>
                    {
                      SUPERData?.appealStatus === '1' ? (
                        <></>
                      ) : (
                        <>
                          <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                            {timeLeftOver} minutes
                          </Typography>
                          <Typography textAlign='end' variant="subtitle2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                            Duration
                          </Typography>
                        </>
                      )
                    }
                  </Stack>
                </Stack>

                {/* buyorderdeatils */}
                <Trade_Price_Dts orderDetails={orderDetails} />

                <Stack pt={3}>
                  <Typography variant="h4" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                    Payment Methods
                  </Typography>
                </Stack>

                <Stack pt={2}>
                  <UpiImpsTabs orderDetails={orderDetails} />
                </Stack>

                <Stack direction="row" spacing={3} pt={3}>
                  {
                    SUPERData?.actionLabel_2 === 'Confirm Receipt' ? (
                      <>
                        {SUPERData?.appealStatus === '1' ? (
                          <Button variant="sellAppealbutton" onClick={goBack}>
                            Close
                          </Button>
                        ) : (
                          <Button variant="sellAppealbutton" onClick={handleButtonClick} >
                            Appeal
                          </Button>
                        )}
                        <Button onClick={openConfirmDlg} type="submit" variant="confirmrecipt">
                          Confirm Receipt
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="sellAppealbutton" onClick={goBack} >
                          Close
                        </Button>
                        <Button onClick={() => AppealCancel(orderDetails)} type="submit" variant="confirmrecipt">
                          {isLoading ? <CircularProgress color="inherit" size={30} /> : 'Cancel Appeal'}
                        </Button>
                      </>
                    )
                  }
                </Stack>

                <Dialog
                  onClose={closeConfirmDlg}
                  open={open}
                >
                  <Stack p={3} spacing={1} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: theme.palette.mode === 'dark' ? '#131722' : 'text.white', }}>
                    <img src={warninggif} alt='warninggif' />
                    <Typography variant='h1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      Confirm ?
                    </Typography>
                    <Typography textAlign='center' variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                      I confirm that the payment was received with <br /> the correct amount and sender information.
                    </Typography>
                    <Stack pt={1} direction='row' spacing={2} justifyContent='space-between'>
                      <Button variant="contained5" onClick={closeConfirmDlg}>
                        Cancel
                      </Button>
                      <Button
                        // onClick={handleNext}
                        onClick={releaseCrypto}
                        variant="contained4">
                        {isLoading ? <CircularProgress color="inherit" size={30} /> : 'Confirm'}
                      </Button>
                    </Stack>
                  </Stack>
                </Dialog>
              </Stack>
            ) : (
              <Stack pt={2} pl={2} pr={2} sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                <Stack pt={2} direction="row" justifyContent="space-between">
                  <Stack spacing={1}>
                    <Typography variant="h4" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      Appeal to Escrow
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                      {SUPERData?.actionMessage}
                    </Typography>
                  </Stack>
                  <Stack pt={0.8}>
                    <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      {timeLeftOver} minutes
                    </Typography>
                    <Typography textAlign='end' variant="subtitle2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                      Duration
                    </Typography>
                  </Stack>
                </Stack>
                <Stack pt={3}>
                  <Formik
                    innerRef={formikAPL}
                    initialValues={{
                      reason: null,
                      message: '',
                      submit: null
                    }}
                    validationSchema={Yup.object().shape({
                      reason: Yup.string().max(255).nullable().required('Select the type of reason'),
                      message: Yup.string().max(255).required('Don\'t leave empty')
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                      try {
                        setStatus({ success: false });
                        setSubmitting(false);
                        // handleAppeal(values);
                      } catch (err) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                      }
                    }}
                  >
                    {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
                      <>
                        <form noValidate onSubmit={handleSubmit}>
                          <Typography pt={1} variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                            Reason Type
                          </Typography>
                          <Grid pt={1}>
                            <Autocomplete
                              id="country-customized-option-demo"
                              options={Reason.map((item) => item.Reason)}
                              value={values.reason}
                              onChange={(e, val) => setFieldValue('reason', val)}
                              renderOption={(props, option) => (
                                <Stack {...props} direction='row' spacing={1} backgroundColor={theme.palette.mode === 'dark' ? '#0F121A' : '#FFFFFF'}>
                                  <Typography >
                                    {option}
                                  </Typography>
                                </Stack>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  placeholder="Select your reason type"
                                  name="reason"
                                  value={values.reason}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  error={Boolean(touched.reason && errors.reason)}
                                  sx={{
                                    "& .MuiInputBase-input": {
                                      height: '10px',
                                      borderRadius: '5px',
                                      borderColor: '#959595',
                                    },
                                  }} />
                              )}
                            />
                            {touched.reason && errors.reason && (
                              <FormHelperText error id="standard-weight-helper-text-reason">
                                {errors.reason}
                              </FormHelperText>
                            )}
                          </Grid>

                          <Typography pt={2} variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                            Reason Description
                          </Typography>

                          <Grid container spacing={3} pt={1}>
                            <Grid item xs={12}>
                              <Stack spacing={1}>
                                <StyledTextarea
                                  aria-label="minimum height"
                                  minRows={4}
                                  id="message"
                                  type="message"
                                  value={values.message}
                                  name="message"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  placeholder="Enter your message"
                                  fullWidth
                                  error={Boolean(touched.message && errors.message)} />
                                {touched.message && errors.message && (
                                  <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.message}
                                  </FormHelperText>
                                )}
                              </Stack>
                            </Grid>
                          </Grid>
                          <Stack pt={3}>
                            <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                              Upload Screenshot
                            </Typography>
                          </Stack>

                          <Stack pt={1}>
                            <Card
                              sx={{
                                width: ' 330.98px',
                                height: '100%',
                                boxShadow: 'none',
                                borderRadius: '5px',
                                border: '2px solid',
                                borderColor: theme.palette.mode === 'dark' ? '#232323' : '#EFEFEF',
                                background: theme.palette.mode === 'dark' ? 'transparent' : 'transparent'                              }}
                            >
                              <Stack
                                pt={5}
                                sx={{
                                  alignItems: 'center',
                                  textAlign: 'center'
                                }}
                              >
                                {croppedImage ? (
                                  <Box>
                                    <img src={croppedImage} alt="wew" width="100%" height='auto' />
                                    <Tooltip title="click to clear the image" placement="top" arrow>
                                      <DeleteForever
                                        onClick={() => setCroppedImage(null)}
                                        sx={{
                                          cursor: 'pointer',
                                          color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary'
                                        }}
                                      />
                                    </Tooltip>
                                  </Box>
                                ) : (
                                  <IconButton
                                    disableRipple
                                    onClick={handleModalOpen}
                                    sx={{
                                      paddingBottom: '46px',
                                    }}
                                  >
                                    <AddCircleOutlinedIcon
                                      sx={{
                                        width: '42px',
                                        height: '42px',
                                        color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary'
                                      }}
                                    />
                                    <input id="superFile" type="file" accept="image/*" onChange={onUploadFile} style={{ display: 'none' }} />
                                  </IconButton>
                                )}
                              </Stack>
                            </Card>
                          </Stack>
                          <Modal
                            open={modalOpen}
                            onClose={handleModalClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description">
                            <Box sx={modalStyle}>
                              <Grid container spacing={0} bgcolor={theme.palette.mode === 'dark' ? '#131722' : 'text.white'}>
                                {/* <Stack direction='row' spacing={1}> */}
                                <Grid xs={12} md={6}>
                                  <Stack spacing={1}>
                                    <Typography sx={{ color: theme.palette.mode === "dark" ? 'text.secondarydark' : "text.secondary", }}>
                                      Selected Image
                                    </Typography>
                                    <Typography variant='title1' pb={2} sx={{ color: theme.palette.mode === "dark" ? 'text.secondarydark' : "text.secondary", }}>
                                      Please crop the image before you upload.
                                    </Typography>
                                  </Stack>
                                  <Box >
                                    <ImageCropper
                                      imageToCrop={imageToCrop}
                                      onImageCropped={(croppedImage) => setCroppedImage(croppedImage)}
                                    >
                                    </ImageCropper>
                                  </Box>
                                </Grid>
                                <Grid xs={12} md={6}>
                                  <Typography pb={2} sx={{ color: theme.palette.mode === "dark" ? 'text.secondarydark' : "text.secondary", }}>Cropped Image</Typography>
                                  {
                                    croppedImage &&
                                    <Box
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      maxHeight="auto"
                                      maxWidth="auto"
                                    >
                                      <img
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          minHeight: 'auto',
                                          maxHeight: 'auto',
                                          maxWidth: "auto"
                                        }}
                                        alt="Cropped Img"
                                        src={croppedImage}
                                      />
                                    </Box>
                                  }
                                </Grid>
                                {/* </Stack> */}
                              </Grid>
                              <Stack pt={1} direction="row" spacing={2} justifyContent="space-around">
                                <Button variant="contained5" onClick={handleImageCancel}>
                                  Cancel
                                </Button>
                                <Button variant="contained4"
                                  onClick={handleImageUpload}
                                >
                                  Upload
                                </Button>
                              </Stack>
                            </Box>
                          </Modal>

                          <Stack direction="row" spacing={3} pt={3}>
                            {/* {SUPERData?.action_2 === 'sodc.cancelAppeal()' ? (
                              <Button variant="p2pcancelbutton" onClick={() => AppealCancel(orderDetails)}>Cancel Appeal</Button>
                            ) : (
                              <Button variant="p2pcancelbutton" onClick={handleButtonClick}>Cancel</Button>
                            )} */}
                            <Button variant="p2pcancelbutton" onClick={handleButtonClick}>Cancel</Button>
                            <Button type="submit" variant="confirmrecipt" onClick={() => handleAppeal(values)} >
                              {isLoading ? <CircularProgress color="inherit" size={30} /> : 'File a Appeal'}
                            </Button>
                          </Stack>
                        </form>
                      </>
                    )}
                  </Formik>
                </Stack>
              </Stack>
            )}
          </>
        );
      case 2:
        return (
          <Stack>
            {SUPERData?.actionCaption === "Order Timed Out" ? (
              <>
                {!isHidden ? (
                  <Stack pt={2} pl={2} pr={2} sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                    <Stack pt={0} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <img src={Timeoutgif} alt='Timeoutgif' width={150} />
                    </Stack>
                    <Stack pt={2} direction="row" justifyContent="space-between">
                      <Stack>
                        <Typography variant="h4" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                          {SUPERData?.actionCaption}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                          {SUPERData?.actionMessage} {
                            SUPERData?.appealStatus === '1' ? (
                              <></>
                            ) : (
                              <>
                                {/* {timeLeftOver} minutes. */}
                              </>
                            )
                          }
                        </Typography>
                      </Stack>
                      <Stack pt={0.8}>
                        {
                          SUPERData?.appealStatus === '1' ? (
                            <></>
                          ) : (
                            <>
                              <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                                {timeLeftOver} minutes
                              </Typography>
                              <Typography textAlign='end' variant="subtitle2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                                Duration
                              </Typography>
                            </>
                          )
                        }
                      </Stack>
                    </Stack>

                    {/* buyorderdeatils */}
                    <Trade_Price_Dts orderDetails={orderDetails} />

                    {/* <Stack pt={3}>
                      <Typography variant="h4" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        Payment Methods
                      </Typography>
                    </Stack>

                    <Stack pt={2}>
                      <UpiImpsTabs orderDetails={orderDetails} />
                    </Stack> */}

                    <Stack direction="row" spacing={3} pt={3}>
                      {SUPERData.superStatus === 1 ? (
                        <>
                          <Button variant="sellAppealbutton" onClick={goBack}>
                            Close
                          </Button>
                          <Button variant="confirmrecipt" onClick={handleButtonClick} >
                            Appeal
                          </Button>
                        </>
                      ) : (
                        <>
                        </>
                      )}
                    </Stack>

                    <Dialog
                      onClose={closeConfirmDlg}
                      open={open}
                    >
                      <Stack p={3} spacing={1} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: theme.palette.mode === 'dark' ? '#131722' : 'text.white', }}>
                        <img src={warninggif} alt='warninggif' />
                        <Typography variant='h1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                          Confirm ?
                        </Typography>
                        <Typography textAlign='center' variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                          I confirm that the payment was received with <br /> the correct amount and sender information.
                        </Typography>
                        <Stack pt={1} direction='row' spacing={2} justifyContent='space-between'>
                          <Button variant="contained5" onClick={closeConfirmDlg}>
                            Cancel
                          </Button>
                          <Button
                            // onClick={handleNext}
                            onClick={releaseCrypto}
                            variant="contained4">
                            {isLoading ? <CircularProgress color="inherit" size={30} /> : 'Confirm'}
                          </Button>
                        </Stack>
                      </Stack>
                    </Dialog>
                  </Stack>
                ) : (
                  <Stack pt={2} pl={2} pr={2} sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                    <Stack pt={2} direction="row" justifyContent="space-between">
                      <Stack spacing={1}>
                        <Typography variant="h4" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                          Appeal to Escrow
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                          {SUPERData?.actionMessage}
                        </Typography>
                      </Stack>
                      <Stack pt={0.8}>
                        <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                          {timeLeftOver} minutes
                        </Typography>
                        <Typography textAlign='end' variant="subtitle2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                          Duration
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack pt={3}>
                      <Formik
                        innerRef={formikAPL}
                        initialValues={{
                          reason: null,
                          message: '',
                          submit: null
                        }}
                        validationSchema={Yup.object().shape({
                          reason: Yup.string().max(255).nullable().required('Select the type of reason'),
                          message: Yup.string().max(255).required('Don\'t leave empty')
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                          try {
                            setStatus({ success: false });
                            setSubmitting(false);
                            // handleAppeal(values);
                          } catch (err) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                          }
                        }}
                      >
                        {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
                          <>
                            <form noValidate onSubmit={handleSubmit}>
                              <Typography pt={1} variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                                Reason Type
                              </Typography>
                              <Grid pt={1}>
                                <Autocomplete
                                  id="country-customized-option-demo"
                                  options={Reason.map((item) => item.Reason)}
                                  value={values.reason}
                                  onChange={(e, val) => setFieldValue('reason', val)}
                                  renderOption={(props, option) => (
                                    <Stack {...props} direction='row' spacing={1} backgroundColor={theme.palette.mode === 'dark' ? '#0F121A' : '#FFFFFF'}>
                                      <Typography >
                                        {option}
                                      </Typography>
                                    </Stack>
                                  )}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      placeholder="Select your reason type"
                                      name="reason"
                                      value={values.reason}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      error={Boolean(touched.reason && errors.reason)}
                                      sx={{
                                        "& .MuiInputBase-input": {
                                          height: '10px',
                                          borderRadius: '5px',
                                          borderColor: '#959595',
                                        },
                                      }} />
                                  )}
                                />
                                {touched.reason && errors.reason && (
                                  <FormHelperText error id="standard-weight-helper-text-reason">
                                    {errors.reason}
                                  </FormHelperText>
                                )}
                              </Grid>

                              <Typography pt={2} variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                                Reason Description
                              </Typography>

                              <Grid container spacing={3} pt={1}>
                                <Grid item xs={12}>
                                  <Stack spacing={1}>
                                    <StyledTextarea
                                      aria-label="minimum height"
                                      minRows={4}
                                      id="message"
                                      type="message"
                                      value={values.message}
                                      name="message"
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      placeholder="Enter your message"
                                      fullWidth
                                      error={Boolean(touched.message && errors.message)} />
                                    {touched.message && errors.message && (
                                      <FormHelperText error id="standard-weight-helper-text-email-login">
                                        {errors.message}
                                      </FormHelperText>
                                    )}
                                  </Stack>
                                </Grid>
                              </Grid>
                              <Stack pt={3}>
                                <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                                  Upload Screenshot
                                </Typography>
                              </Stack>

                              <Stack pt={1}>
                                <Card
                                  sx={{
                                    width: ' 330.98px',
                                    height: '100%',
                                    boxShadow: 'none',
                                    borderRadius: '5px',
                                    border: '2px solid',
                                    borderColor: theme.palette.mode === 'dark' ? '#232323' : '#EFEFEF',
                                    background: theme.palette.mode === 'dark' ? 'transparent' : 'transparent'                                  }}
                                >
                                  <Stack
                                    pt={5}
                                    sx={{
                                      alignItems: 'center',
                                      textAlign: 'center'
                                    }}
                                  >
                                    {croppedImage ? (
                                      <Box>
                                        <img src={croppedImage} alt="wew" width="100%" height='auto' />
                                        <Tooltip title="click to clear the image" placement="top" arrow>
                                          <DeleteForever
                                            onClick={() => setCroppedImage(null)}
                                            sx={{
                                              cursor: 'pointer',
                                              color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary'
                                            }}
                                          />
                                        </Tooltip>
                                      </Box>
                                    ) : (
                                      <IconButton
                                        disableRipple
                                        onClick={handleModalOpen}
                                        sx={{
                                          paddingBottom: '46px',
                                        }}
                                      >
                                        <AddCircleOutlinedIcon
                                          sx={{
                                            width: '42px',
                                            height: '42px',
                                            color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary'
                                          }}
                                        />
                                        <input id="superFile" type="file" accept="image/*" onChange={onUploadFile} style={{ display: 'none' }} />
                                      </IconButton>
                                    )}
                                  </Stack>
                                </Card>
                              </Stack>
                              <Modal
                                open={modalOpen}
                                onClose={handleModalClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description">
                                <Box sx={modalStyle}>
                                  <Grid container spacing={0} bgcolor={theme.palette.mode === 'dark' ? '#131722' : 'text.white'}>
                                    {/* <Stack direction='row' spacing={1}> */}
                                    <Grid xs={12} md={6}>
                                      <Stack spacing={1}>
                                        <Typography sx={{ color: theme.palette.mode === "dark" ? 'text.secondarydark' : "text.secondary", }}>
                                          Selected Image
                                        </Typography>
                                        <Typography variant='title1' pb={2} sx={{ color: theme.palette.mode === "dark" ? 'text.secondarydark' : "text.secondary", }}>
                                          Please crop the image before you upload.
                                        </Typography>
                                      </Stack>
                                      <Box >
                                        <ImageCropper
                                          imageToCrop={imageToCrop}
                                          onImageCropped={(croppedImage) => setCroppedImage(croppedImage)}
                                        >
                                        </ImageCropper>
                                      </Box>
                                    </Grid>
                                    <Grid xs={12} md={6}>
                                      <Typography pb={2} sx={{ color: theme.palette.mode === "dark" ? 'text.secondarydark' : "text.secondary", }}>Cropped Image</Typography>
                                      {
                                        croppedImage &&
                                        <Box
                                          display="flex"
                                          justifyContent="center"
                                          alignItems="center"
                                          maxHeight="auto"
                                          maxWidth="auto"
                                        >
                                          <img
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              minHeight: 'auto',
                                              maxHeight: 'auto',
                                              maxWidth: "auto"
                                            }}
                                            alt="Cropped Img"
                                            src={croppedImage}
                                          />
                                        </Box>
                                      }
                                    </Grid>
                                    {/* </Stack> */}
                                  </Grid>
                                  <Stack pt={1} direction="row" spacing={2} justifyContent="space-around">
                                    <Button variant="contained5" onClick={handleImageCancel}>
                                      Cancel
                                    </Button>
                                    <Button variant="contained4"
                                      onClick={handleImageUpload}
                                    >
                                      Upload
                                    </Button>
                                  </Stack>
                                </Box>
                              </Modal>

                              <Stack direction="row" spacing={3} pt={3}>
                                {/* {SUPERData?.action_2 === 'sodc.cancelAppeal()' ? (
                                <Button variant="p2pcancelbutton" onClick={() => AppealCancel(orderDetails)}>Cancel Appeal</Button>
                              ) : (
                                <Button variant="p2pcancelbutton" onClick={handleButtonClick}>Cancel</Button>
                              )} */}
                                <Button variant="p2pcancelbutton" onClick={handleButtonClick}>Cancel</Button>
                                <Button type="submit" variant="confirmrecipt" onClick={() => handleAppeal(values)} >
                                  {isLoading ? <CircularProgress color="inherit" size={30} /> : 'File a Appeal'}
                                </Button>
                              </Stack>
                            </form>
                          </>
                        )}
                      </Formik>
                    </Stack>
                  </Stack>
                )}
              </>

            ) : (
              <>
                <Stack pt={0} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img src={ordersuccessgif} alt='ordersuccessgif' />
                  <Typography pt={3} variant="h1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }} >
                    {SUPERData?.actionCaption}
                  </Typography>
                  <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                    {SUPERData?.actionMessage}
                  </Typography>
                </Stack>

                <Stack pl={2} pr={2} sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                  <Trade_Price_Dts orderDetails={orderDetails} />
                  <Stack pt={3} direction="row" justifyContent="space-between">
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                      Duration
                    </Typography>
                    <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      {timeLeftOver} minutes
                    </Typography>
                  </Stack>
                </Stack>
              </>
            )}
          </Stack>
        );
      default:
        return 'Unknown step';
    }
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#00BBAB',
      color: '#00BBAB',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  }));

  return (
    <Grid item xs={12} sm={12} md={6} lg={6}>
      <Stack direction='row' justifyContent="space-between" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
        <Stack direction="row" alignItems="center" spacing={1} >
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar alt='' src='' sx={{
              width: 28,
              height: 28,
              fontSize: 20
            }} />
          </StyledBadge>
          <Stack >
            <Typography variant='title1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }} >
              {counterPart?.member}
            </Typography>
            <Stack direction='row' spacing={1} sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }} >
              <Typography pt={0.2} variant='subtitle1'  >
                0 Trades
              </Typography>
              <Typography>|</Typography>
              <Typography pt={0.2} variant="subtitle1">
                100%
              </Typography>
              <Typography pt={0.2} variant="subtitle1">
                Completion
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack pr={1.5}>
          <Typography textAlign='end' variant="title1" color="text.sell">
            Sell {orderDetails?.tradePair}
          </Typography>
          <Typography textAlign='end' variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
            {new Date(Number(orderDetails?.timeStamp)).toLocaleString('en-US', {
              timeZone: 'Asia/Kolkata',
              day: 'numeric',
              month: 'short',
              // year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })}
          </Typography>
        </Stack>
      </Stack>

      {/* Stepper */}
      <Box sx={{ width: '100%' }} pt={5}>
        <Stepper activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = <Typography variant="subtitle1"></Typography>;
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              SUPERData?.actionCaption === "Order Timed Out" || SUPERData?.superStatus >= 2 ? (
                <></>
              ) : (
                <Step key={label} {...stepProps}>
                  <StepLabel StepIconComponent={ColorlibStepIcon} {...labelProps}>
                    {' '}
                  </StepLabel>
                </Step>
              )
            );
          })}
        </Stepper>
        <React.Fragment>
          {getStepContent(activeStep)}
        </React.Fragment>
      </Box>
    </Grid>
  )
}

export default Trade_Seller_Dts_Ext;