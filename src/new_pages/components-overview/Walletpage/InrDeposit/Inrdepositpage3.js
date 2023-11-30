import React, { useState } from 'react';

import {
  Grid, Typography, Stack, OutlinedInput, FormHelperText, Button,
  TextField, useTheme, Box, Card, IconButton, styled, Tooltip, Dialog, Autocomplete, Modal
} from '@mui/material';

import { DeleteForever } from '@mui/icons-material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

import CardInr from '../InrWithdraw/Card';
import GravitusBankdeatils from './GravitusBankdeatils';
import warninggif from '../../../../assets/images/gravitusimage/warninggif.svg';
import AnimateButton from '../../../../components/@extended/AnimateButton';

import * as Yup from 'yup';
import { Field, Formik } from 'formik';

import { postINRDepositData } from '../../../../api/wallet';
import ImageCropper from 'src/components/_cropper';


// Modal View Style - Appeal
const modalStyle = {
  position: 'absolute',
  top: '50%', left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1024, height: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid #808080 !important',
  boxShadow: 24, p: 4,
  textAlign: 'center'
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});

const InrDepositpage3 = ({ depositFrom, depositTo, setStep, setFormikValues, formikValues, setSnackbarOpen, setSnackbarMessage, walletId }) => {

  const theme = useTheme();

  let formData = new FormData();

  const [imageToCrop, setImageToCrop] = React.useState(undefined);
  const [croppedImage, setCroppedImage] = React.useState(undefined);

  const [modalOpen, setModalOpen] = React.useState(false); // Show modal

  const handleModalOpen = () => {
    document.getElementById('superFile')?.click();
    setTimeout(function () {
      setModalOpen(true);
    }, 1000);
  };

  const handleModalClose = () => {
    setModalOpen(false)
    setCroppedImage(undefined)
  };
  const handleModalUpolad = () => {
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

  const [open, setOpen] = useState(false); //Dialogbox open
 
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

  const handleConfirm = async () => {
    console.log({ formikValues });

    formData.append(
      'updateInfo',
      JSON.stringify({
        walletId: walletId,
        toAddress: depositTo.accountNo,
        amount: formikValues.amount,
        mode: formikValues.payMode,
        fromAccount: depositFrom.accountNo,
        receiptNo: formikValues.utrId
      })
    );

    formData.append('fileName', croppedImage.name);
    formData.append('fileI', croppedImage);
    try {
      const { data } = await postINRDepositData(formData);
      if (Object.keys(data.result).length) {
        console.log({ data });
        setOtpState(true);
      } else {
        setSnackbarMessage({ msg: 'Deposit Request failed', success: false });
        setSnackbarOpen(true);
      }
    } catch (e) {
      setSnackbarMessage({ msg: e.message, success: false });
      setSnackbarOpen(true);
      console.log(e.message);
    }
    setOpen(false);
  };

  return (
    <>
      {/* <Grid pl={15} pt={2}>
        <Stack direction='row'>
          <ArrowBackIosNewIcon pt={10} sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }} />
        </Stack>
      </Grid> */}
      <CardInr>
        <Box display="flex" alignItems="center">
          <ArrowBackIosNewIcon
            onClick={handlePrev}
            sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
          />
          <Typography pb={0} pl={12} sx={{ textAlign: 'center' }} variant="h1" color="text.buy">
            INR Deposit
          </Typography>
        </Box>
        <Stack pt={2}>
          <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            Deposit the amount to the beneficiary account given below
          </Typography>
        </Stack>

        <GravitusBankdeatils depositTo={depositTo} />
        <Typography pt={2} variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          Once you make the payment to the beneficiary details mentioned above, fill the below form with the correct details to complete the
          deposit process.
        </Typography>
        <Stack pt={2}>
          <Formik
            initialValues={{
              utrId: '',
              bankAccount: null,
              file: null,
              submit: null
            }}
            validationSchema={Yup.object().shape({
              bankAccount: Yup.object().nullable().required('Please select your Bank Account*'),
              utrId: Yup.string().max(255).required('UTR Number is required*'),
              file: Yup.mixed()
                .required('Upload payment screenshot*')
                .test('fileType', 'Unsupported file type', (value) => {
                  if (value) {
                    return ['image/jpeg', 'image/png'].includes(value.type);
                  }
                  return true;
                }),
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              // setFormikValues()
              setOpen(true);
              setFormikValues({ ...formikValues, utrId: values.utrId, fileI: values.file, });
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
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
              <>
                <form noValidate onSubmit={handleSubmit}>
                  <Typography
                    pt={2}
                    variant="body1"
                    sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                  >
                    Transferred from Bank Account
                  </Typography>
                  <Grid pt={1}>
                    <Autocomplete
                      id="country-customized-option-demo"
                      value={values.bankAccount}
                      options={Accounts}
                      getOptionLabel={(option) => `${option.AcNumber} (${option.Beneficiary})`}
                      onChange={(e, val) => setFieldValue('bankAccount', val)}
                      renderOption={(props, option) => (
                        <Stack sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                          {...props} direction="row" spacing={1}>
                          <Typography>{option.AcNumber}</Typography>
                          <Typography>({option.Beneficiary})</Typography>
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
                      Transaction / UTR ID
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
                            borderColor: theme.palette.mode === 'dark' ? '#232323' : '#EFEFEF',
                            backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
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
                            open={modalOpen}
                            onClose={handleModalClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description">
                            <Box sx={modalStyle}>
                              <Grid container spacing={0}>
                                {/* <Stack direction='row' spacing={1}> */}
                                <Grid xs={12} md={6}>
                                  <Typography pb={2} sx={{ color: theme.palette.mode === "dark" ? 'text.secondarydark' : "text.secondary", }}>Selected Image</Typography>
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
                  <Stack p={4} spacing={1} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={warninggif} alt="warninggif" />

                    <Typography
                      variant="h1"
                      sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                      onClick={handleConfirm}
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
                      <Button variant="contained4" onClick={handleConfirm}>
                        Confirm
                      </Button>
                    </Stack>
                  </Stack>
                </Dialog>
              </>
            )}
          </Formik>
        </Stack>
      </CardInr>
    </>
  );
};

export default InrDepositpage3;
