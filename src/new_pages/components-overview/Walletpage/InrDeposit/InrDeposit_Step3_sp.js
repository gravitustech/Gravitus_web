import React, { useState, useRef } from 'react';

import {
  Grid, Typography, Stack, OutlinedInput, FormHelperText, Button,
  TextField, useTheme, Box, Card, IconButton, styled, Tooltip, Dialog, Autocomplete, Modal, CircularProgress, InputAdornment
} from '@mui/material';

import { DeleteForever } from '@mui/icons-material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import CardInr from '../InrWithdraw/Card';
import GravitusBankdeatils from './GravitusBankdeatils';
import warninggif from '../../../../assets/images/gravitusimage/warninggif.svg';
import AnimateButton from '../../../../components/@extended/AnimateButton';

import * as Yup from 'yup';
import { Field, Formik } from 'formik';

import ImageCropper from 'src/components/_cropper';
import { Post_Rs_Deposit, formDataWallet } from 'src/api_ng/wallet_ng';

const InrDeposit_Step3_sp = ({ depositFrom, depositTo, setStep, setFormikValues, formikValues, setSnackbarOpen, setSnackbarMessage, walletId }) => {
  const theme = useTheme();
  const modalStyle = {
    position: 'absolute',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%', // Default width for larger screens
    maxWidth: 1024, // Set a maximum width if needed
    height: 'auto',
    bgcolor: theme.palette.mode === 'dark' ? '#131722' : 'text.white',
    border: '1px solid #808080 !important',
    boxShadow: 24, p: 4,
    textAlign: 'center',
    '@media (max-width: 600px)': {
      // Adjust styles for screens with a maximum width of 600px
      width: '80%', // Set the width to 100% for smaller screens
      maxHeight: '80vh',
    },
    maxHeight: '100vh', // Set a maximum height for the modal
    overflowY: 'auto',
  };



  const formikMP = useRef();

  const [imageToCrop, setImageToCrop] = React.useState(undefined);
  const [croppedImage, setCroppedImage] = React.useState(undefined);

  const [open, setOpen] = useState(false); //Dialogbox open
  const [isLoading, setIsLoading] = useState(false); // Show Loader
  const [modalOpen, setModalOpen] = React.useState(false); // Show modal

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

  const handleModalUpolad = () => {
    setImageToCrop(undefined);
    setModalOpen(false)
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

  const Accounts = [{
    Beneficiary: depositFrom?.accountName,
    BankName: depositFrom?.bankName,
    AcNumber: depositFrom?.accountNo,
    IFSCCode: depositFrom?.IFSCCode,
    payMode: depositFrom?.payMode,
  }];

  const handlePrev = () => {
    setStep(2);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [depositReq, setDepositReq] = useState({
    utrId: '',
    bankAccount: null,
    submit: null,
  });

  const depositRequest = () => {
    setIsLoading(true);
    if (croppedImage != undefined) {
      var postData = {
        updateInfo: {
          mode: formikValues.payMode,
          amount: formikValues.depositAmount,
          fromAccount: depositFrom.accountNo,
          toAddress: depositTo.accountNo,
          receiptNo: depositReq.utrId,
          walletId: walletId,
        },
        fileName: 'dScreenshot',
        fileI: croppedImage
      };

      formDataWallet(Post_Rs_Deposit(), postData).then(function (res) {
        // setIsLoading(false);
        // console.log(res, 'Post Deposit')
        if (res.error !== 'ok') {
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
              setOpen(false);
              setIsLoading(false);
            }
            else {
              setSnackbarMessage({ msg: res.error, success: false });
              setSnackbarOpen(true);
              // console.log('res.error', res.error);
              setOpen(false);
              setIsLoading(false);
            }
          }
        } else {
          setSnackbarMessage({ msg: 'Deposit request sent', success: false });
          setSnackbarOpen(true);

          setDepositReq(undefined);
          setImageToCrop(undefined);
          setCroppedImage(undefined);
          setFormikValues(false);

          formikMP.current.resetForm({
            values: {
              utrId: '',
              bankAccount: null,
              submit: null
            }
          });

          setStep(1);
        }
      }, function (err) {
        // console.log(err);
        // Logout User
      });
    }
    else {
      setSnackbarMessage({ msg: 'Upload Screenshot', success: false });
      setSnackbarOpen(true);
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Grid container
        display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}
        pt={{ md: 3, lg: 3 }}
        pb={{ md: 3, lg: 3 }}
        pl={{ md: 6, lg: 14 }}
        pr={{ md: 6, lg: 15 }}>
        <Stack direction="row" spacing={0.8} alignItems="center">
          <IconButton onClick={handlePrev} disableRipple>
            <ArrowBackIosNewIcon
              pt={10}
              sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
            />
          </IconButton>
          <Typography variant="h1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            INR Deposit
          </Typography>
        </Stack>
      </Grid>

      <Grid container
        pt={{ xs: 0, sm: 0, md: 3, lg: 3 }}
        pb={{ xs: 1, sm: 1, md: 3, lg: 3 }}
        pl={{ xs: 0, sm: 0, md: 6, lg: 15 }}
        pr={{ xs: 2, sm: 2, md: 6, lg: 15 }} sx={{
          backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground',
          borderRadius: { xs: '0', sm: '0', md: '78px 78px 0 0', lg: '78px 78px 0 0' },
          boxShadow: '0px 5.133836269378662px 35.31077575683594px 0px rgba(0, 0, 0, 0.01), 0px 41px 282px 0px rgba(0, 0, 0, 0.02)'
        }}>
        <Grid
          display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}
        >
          <Stack direction="row" spacing={1} pl={0} alignItems='center'  >
            <Stack justifyContent='start'>
              <IconButton onClick={handlePrev} disableRipple>
                <ArrowBackIcon
                  sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                />
              </IconButton>
            </Stack>
            <Stack justifyContent='start'>
              <Typography variant="h4" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                INR Deposit
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item pb={{ xs: 2, sm: 2, md: 3, lg: 3 }}
          pl={{ xs: 2, sm: 2, md: 5, lg: 5 }}
          pr={{ xs: 2, sm: 2, }} xs={12} sm={12} md={5} lg={5} >
          <Stack pt={2}>
            <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
              Deposit the amount to the beneficiary account given below
            </Typography>
          </Stack>
          <GravitusBankdeatils depositTo={depositTo} />
          <Typography pt={4} variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            Once you make the payment to the beneficiary details mentioned above, fill the form with the correct details to complete the
            deposit process.
          </Typography>
        </Grid>
        <Grid item lg={1} md={1} display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} pt={2} pl={{ xs: 2, sm: 2, md: 0, lg: 0 }} >
          <Stack  >
            <Formik
              innerRef={formikMP}
              initialValues={{
                utrId: '',
                bankAccount: null,
                submit: null
              }}
              validationSchema={Yup.object().shape({
                bankAccount: Yup.object().nullable().required('Please select your Bank Account*'),
                utrId: Yup.string().max(255).required('UTR Number is required*'),
                // file: Yup.mixed()
                //   .required('Upload payment screenshot*')
                //   .test('fileType', 'Unsupported file type', (value) => {
                //     if (value) {
                //       return ['image/jpeg', 'image/png'].includes(value.type);
                //     }
                //     return true;
                //   }),
              })}
              onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                  setDepositReq(values);
                  setOpen(true);
                  setStatus({ success: false });
                  setSubmitting(false);
                } catch (err) {
                  setStatus({ success: false });
                  setErrors({ submit: err.message });
                  setSubmitting(false);
                }
              }}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
                <>
                  <form noValidate onSubmit={handleSubmit}>
                    <Grid item xs={12} sx={{ mt: -1 }} pt={1}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography
                          variant="body1"
                          sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                        >
                          Deposit Amount
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid container spacing={3} pt={1}>
                      <Grid item xs={12}>
                        <Stack spacing={1}>
                          <OutlinedInput
                            readOnly
                            id="depositamount"
                            value={formikValues?.depositAmount}
                            name="depositamount"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder=""
                            fullWidth
                            endAdornment={
                              <InputAdornment position="end">
                                <Stack direction='row' alignItems='center' spacing={.8}>
                                  <Typography
                                    variant="body1"
                                    sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                                  >
                                    INR
                                  </Typography>
                                </Stack>
                              </InputAdornment>
                            } />
                        </Stack>
                      </Grid>
                    </Grid>
                    <Typography
                      pt={2}
                      variant="body1"
                      sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                    >
                      Bank Account
                    </Typography>
                    <Grid pt={1}>
                      <Autocomplete
                        id="country-customized-option-demo"
                        value={values.bankAccount}
                        options={Accounts}
                        getOptionLabel={(option) => `${option.AcNumber} (${option.Beneficiary})`}
                        onChange={(e, val) => setFieldValue('bankAccount', val)}
                        renderOption={(props, option) => (
                          <Stack backgroundColor={theme.palette.mode === 'dark' ? '#262B39' : '#FFFFFF'}
                            sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                            {...props} direction="row" spacing={1}>
                            <Typography sx={{ color: theme.palette.mode === 'dark' ? '#F7F7F7' : 'text.secondary' }}>{option.AcNumber}</Typography>
                            <Typography sx={{ color: theme.palette.mode === 'dark' ? '#F7F7F7' : 'text.secondary' }}>({option.Beneficiary})</Typography>
                          </Stack>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Select the corresponding Bank Account"
                            value={values.bankAccount}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={Boolean(touched.bankAccount && errors.bankAccount)}
                            sx={{
                              '& .MuiInputBase-input': {
                                height: '6px',
                                borderRadius: '5px',
                                borderColor: '#959595'
                              }
                            }}
                          />
                        )}
                      />
                      {touched.bankAccount && errors.bankAccount && (
                        <FormHelperText error id="standard-weight-helper-text-bankAccount">
                          {errors.bankAccount}
                        </FormHelperText>
                      )}
                    </Grid>

                    <Grid item xs={12} sx={{ mt: -1 }} pt={3}>
                      <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        Receipt No / UTR No
                      </Typography>
                    </Grid>
                    <Grid container spacing={3} pt={1}>
                      <Grid item xs={12}>
                        <Stack spacing={1}>
                          <OutlinedInput
                            id="utrId"
                            type="utrId"
                            value={values.utrId}
                            name="utrId"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder=""
                            fullWidth
                            error={Boolean(touched.utrId && errors.utrId)}
                          />
                          {touched.utrId && errors.utrId && (
                            <FormHelperText error id="standard-weight-helper-text-email-login">
                              {errors.utrId}
                            </FormHelperText>
                          )}
                        </Stack>
                        <Stack spacing={1} pt={3}>
                          <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                            Upload the payment Screenshot
                          </Typography>
                        </Stack>

                        <Stack pt={1}>
                          <Card
                            sx={{
                              width: '100%',
                              height: '100%',
                              boxShadow: 'none',
                              borderRadius: '5px',
                              border: '2px solid',
                              borderColor: theme.palette.mode === 'dark' ? '#31384b' : '#EFEFEF',
                              backgroundColor: theme.palette.mode === 'dark' ? 'transparent' : 'transparent'
                            }}
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
                                      width: '46px',
                                      height: '46px',
                                      color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary'
                                    }}
                                  />
                                  <input id="superFile" type="file" accept="image/*" onChange={onUploadFile} style={{ display: 'none' }} />
                                </IconButton>
                              )}
                            </Stack>
                            <Modal
                              xs={12}
                              sm={12}
                              lg={12}
                              width={120}
                              open={modalOpen}
                              onClose={handleModalClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description">
                              <Box sx={modalStyle}>
                                <Grid container spacing={0} bgcolor={theme.palette.mode === 'dark' ? '#131722' : 'text.white'}>
                                  {/* <Stack direction='row' spacing={1}> */}
                                  <Grid xs={12} sm={6} md={6} lg={6}>
                                    <Stack spacing={1}>
                                      <Typography sx={{ color: theme.palette.mode === "dark" ? 'text.secondarydark' : "text.secondary", }}>
                                        Selected Image
                                      </Typography>
                                      <Typography variant='title1' pb={2} sx={{ color: theme.palette.mode === "dark" ? 'text.secondarydark' : "text.secondary", }}>
                                        Please crop the image before you upload.
                                      </Typography>
                                    </Stack>
                                    <Box>
                                      <ImageCropper
                                        imageToCrop={imageToCrop}
                                        onImageCropped={(croppedImage) => setCroppedImage(croppedImage)}
                                      >
                                      </ImageCropper>
                                    </Box>
                                  </Grid>
                                  <Grid xs={12} sm={6} md={6} lg={6}>
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
                                <Stack pt={3} direction="row" spacing={2} justifyContent="space-around">
                                  <Button variant="contained5" onClick={handleModalClose}>
                                    Cancel
                                  </Button>
                                  <Button variant="contained4"
                                    onClick={handleModalUpolad}
                                  >
                                    Upload
                                  </Button>
                                </Stack>
                              </Box>
                            </Modal>
                          </Card>
                        </Stack>
                        {/* {touched.file && errors.file && (
                        <FormHelperText error id="standard-weight-helper-text-file">
                          {errors.file}
                        </FormHelperText>
                      )} */}
                      </Grid>
                    </Grid>

                    <Grid item xs={12} pt={3}>
                      <AnimateButton>
                        <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                          SUBMIT
                        </Button>
                      </AnimateButton>
                    </Grid>
                  </form>

                  <Dialog onClose={handleClose} open={open}>
                    <Stack p={4} spacing={1} style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      background: theme.palette.mode === 'dark' ? '#131722' : 'text.cardbackground'
                    }}>
                      <img src={warninggif} alt="warninggif" />

                      <Typography
                        variant="h1"
                        sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}

                      >
                        Confirm ?
                      </Typography>
                      <Typography textAlign='center' variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        Yes, I have transferred funds from my own <br /> account to the beneficiary account.
                      </Typography>

                      <Stack pt={1} direction="row" spacing={2} justifyContent="space-between">
                        <Button variant="contained5" onClick={handleClose}>
                          Cancel
                        </Button>
                        <Button variant="contained4" onClick={depositRequest}>
                          {isLoading ? <CircularProgress color="inherit" size={30} /> : 'Confirm'}
                        </Button>
                      </Stack>
                    </Stack>
                  </Dialog>
                </>
              )}
            </Formik>
          </Stack>
        </Grid>
      </Grid >
    </>
  );
};

export default InrDeposit_Step3_sp;
