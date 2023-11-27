import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Stack,
  OutlinedInput,
  FormHelperText,
  Button,
  TextField,
  useTheme,
  Box,
  Card,
  IconButton,
  styled,
  Tooltip
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import AnimateButton from '../../../../components/@extended/AnimateButton';
import Autocomplete from '@mui/material/Autocomplete';
// import { Link as RouterLink } from 'react-router-dom';
import CardInr from '../InrWithdraw/Card';
import GravitusBankdeatils from './GravitusBankdeatils';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import warninggif from '../../../../assets/images/gravitusimage/warninggif.svg';
import { postINRDepositData } from '../../../../api/wallet';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { DeleteForever } from '@mui/icons-material';
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
const InrDepositpage3 = ({
  depositFrom,
  depositTo,
  setStep,
  setFormikValues,
  formikValues,
  setSnackbarOpen,
  setSnackbarMessage,
  walletId
}) => {
  const [open, setOpen] = useState(false);
  let formData = new FormData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFileURL, setSelectedFileURL] = useState();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log({ file });
    setSelectedFile(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedFileURL(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const handleOpen = () => {
    setOpen(true);
  };
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
    formData.append('fileName', selectedFile.name);
    formData.append('fileI', selectedFileURL);
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

  const theme = useTheme();
  const Accounts = [{
    Beneficiary: depositFrom?.accountName,
    BankName: depositFrom?.bankName,
    AcNumber: depositFrom?.accountNo,
    IFSCCode: depositFrom?.IFSCCode,
    payMode: depositFrom?.payMode,
  }];
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
                        <Field name="file">
                          {({ field }) => {
                            const { value, name } = field;
                            const touched = values.file !== null;
                            return (
                              <Card
                                sx={{
                                  // width: ' 330.98px',
                                  height: '100%',
                                  boxShadow: 'none',
                                  borderRadius: '5px',
                                  border: '2px solid',
                                  borderColor: theme.palette.mode === 'dark' ? '#232323' : '#EFEFEF',
                                  backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
                                }}
                              >
                                <Stack alignItems="center" textAlign="center">
                                  {selectedFileURL ? (
                                    <Box>
                                      <img src={selectedFileURL} alt="wew" width="90%" height="100%" />
                                      <Tooltip title="click to clear the image" placement="top" arrow>
                                        <DeleteForever
                                          onClick={() => setSelectedFileURL(null)}
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
                                      component="label"
                                      sx={{
                                        p: 12,
                                        alignItems: 'center',
                                        textAlign: 'center'
                                      }}
                                    >
                                      <Tooltip disableFocusListener disableTouchListener title="click to upload payment screenhot" placement="top" arrow>
                                        <AddCircleOutlinedIcon
                                          sx={{
                                            width: '46px',
                                            height: '46px',
                                            color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary'
                                          }}
                                        />
                                      </Tooltip>

                                      <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFileUpload} />
                                    </IconButton>
                                  )}
                                </Stack>
                              </Card>
                            );
                          }}
                        </Field>
                        {/* <Card
                          sx={{
                            // width: ' 330.98px',
                            height: '100%',
                            boxShadow: 'none',
                            borderRadius: '5px',
                            border: '2px solid',
                            borderColor: theme.palette.mode === 'dark' ? '#232323' : '#EFEFEF',
                            backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
                          }}
                        >
                          <Stack
                            sx={{
                              alignItems: 'center',
                              textAlign: 'center'
                            }}
                          >
                            {selectedFileURL ? (
                              <Box>
                                <img src={selectedFileURL} alt="wew" width="90%" height="100%" />
                                <Tooltip title="click to clear the image" placement="top" arrow>
                                  <DeleteForever
                                    onClick={() => setSelectedFileURL(null)}
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
                                component="label"
                                sx={{
                                  p: 12,
                                  alignItems: 'center',
                                  textAlign: 'center'
                                }}
                              >
                                <Tooltip disableFocusListener disableTouchListener title="click to upload payment screenhot" placement="top" arrow>
                                  <AddCircleOutlinedIcon
                                    sx={{
                                      width: '46px',
                                      height: '46px',
                                      color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary'
                                    }}
                                  />
                                </Tooltip>

                                <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFileUpload} />
                              </IconButton>
                            )}
                          </Stack>
                        </Card> */}
                      </Stack>
                      {touched.file && errors.file && (
                        <FormHelperText error id="standard-weight-helper-text-file">
                          {errors.file}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                  {/* <Typography
                    pt={2}
                    variant="body1"
                    sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                  >
                    Upload the payment Screenshot
                  </Typography> */}
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
