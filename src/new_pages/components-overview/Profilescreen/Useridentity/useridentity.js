import React, { useEffect, useState } from 'react';

import {
  Grid, Stack, Button, Typography, FormHelperText, OutlinedInput,
  useTheme, TextField, Card, IconButton, Box, Tooltip, Modal, Autocomplete, CircularProgress
} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';

import { useNavigate } from 'react-router';

import DeleteForever from '@mui/icons-material/DeleteForever';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

import ImageCropper from 'src/components/_cropper';
import { updateIdentity } from '../../../../api/profile';


const Useridentitygrid = ({ setValue, setSnackbarMessage, setSnackbarOpen, userData, mutate }) => {
  // console.log('userData', userData)

  const theme = useTheme();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  let formData = new FormData();
  const Identity = [{ Identity: 'PANCARD' }];

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

  const handleNavigate = () => {
    navigate('/profile/support');
    setValue('4');
  };

  useEffect(() => {
    setCroppedImage(userData.imagePath);
  }, []);

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

  return (
    <>
      <Formik
        initialValues={{
          name: userData?.fullName,
          pannumber: userData?.pancard,
          docType: userData?.docType
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required("Don't leave empty"),
          pannumber: Yup.string().max(10).required("Don't leave empty"),
          docType: Yup.string().max(255).nullable().required('Select an Identity Type')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          setIsLoading(true);
          // console.log({ values });
          formData.append('updateInfo', JSON.stringify({ fullName: values.name, pancard: values.pannumber, docType: values.docType }));
          formData.append('fileName', imageToCrop);
          if (croppedImage) {
            formData.append('fileI', croppedImage);
          } else {
            formData.append('fileI', imageToCrop);
          }

          try {
            const { data } = await updateIdentity(formData);
            if (Object.keys(data.result).length) {
              // console.log("data", data);
              setSnackbarMessage({ msg: 'Identity updated successfully', success: true });
              setSnackbarOpen(true);
              // console.log({ values });
              setStatus({ success: false });
              setSubmitting(false);
              setIsLoading(false);
              mutate();
            } else {
              setSnackbarMessage({ msg: 'Identity updation failed', success: false });
              setSnackbarOpen(true);
              setIsLoading(false);
              mutate();
            }
          } catch (err) {
            setSnackbarMessage({ msg: err.message, success: false });
            setSnackbarOpen(true);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
            setIsLoading(false);
            mutate();
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3} pt={4} pb={4} pl={4} pr={4}>
              <Grid item xs={12}>
                <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                  Update Identity
                </Typography>
                <Stack spacing={1} pt={3}>
                  <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                    Name as in PAN Card
                  </Typography>
                  <OutlinedInput
                    id="name"
                    type="name"
                    value={values.name}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder=""
                    fullWidth
                    readOnly={userData.status === '0' ? false : true}
                    error={Boolean(touched.name && errors.name)}
                  />
                  {touched.name && errors.name && (
                    <FormHelperText error id="standard-weight-helper-text-name">
                      {errors.name}
                    </FormHelperText>
                  )}
                </Stack>

                <Stack spacing={1} pt={3}>
                  <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                    PAN Card Number
                  </Typography>
                  <OutlinedInput
                    id="pannumber"
                    type="pannumber"
                    value={values.pannumber ? values.pannumber.toUpperCase() : ''}
                    name="pannumber"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder=""
                    fullWidth
                    readOnly={userData.status === '0' ? false : true}
                    error={Boolean(touched.pannumber && errors.pannumber)}
                  />
                  {touched.pannumber && errors.pannumber && (
                    <FormHelperText error id="standard-weight-helper-text-pannumber">
                      {errors.pannumber}
                    </FormHelperText>
                  )}
                </Stack>

                <Stack spacing={1} pt={3}>
                  <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                    Identity Type
                  </Typography>
                  <Autocomplete
                    id="country-customized-option-demo"
                    options={Identity.map((item) => item.Identity)}
                    // disableCloseOnSelect
                    backgroundColor='#000'
                    value={values.docType}
                    readOnly={userData.status === '0' ? false : true}
                    onChange={(e, val) => setFieldValue('docType', val)}
                    // getOptionLabel={(option) => `${option.Identity}`}
                    renderOption={(props, option) => (
                      <Stack {...props} direction="row" spacing={1} backgroundColor={theme.palette.mode === 'dark' ? '#0F121A' : '#FFFFFF'}>
                        <Typography sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>{option}</Typography>
                      </Stack>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select the type of Identity"
                        name="docType"
                        value={values.docType}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(touched.docType && errors.docType)}
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
                  {touched.docType && errors.docType && (
                    <FormHelperText error id="standard-weight-helper-text-docType">
                      {errors.docType}
                    </FormHelperText>
                  )}
                </Stack>

                <Stack spacing={1} pt={3}>
                  <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                    Upload PAN Card Picture
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
                          {userData.status === '0' && (
                            <Tooltip title="click to clear the image" placement="top" arrow>
                              <DeleteForever
                                onClick={() => setCroppedImage(null)}
                                sx={{
                                  cursor: 'pointer',
                                  color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary'
                                }}
                              />
                            </Tooltip>
                          )}
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
                        <Grid container spacing={0} bgcolor={theme.palette.mode === 'dark' ? '#131722' : 'text.white'}>
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
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" spacing={3} pt={2}>
                  <Button variant="supportbutton" onClick={handleNavigate}>
                    Support
                  </Button>
                  <Button disabled={userData?.status === '1' || userData?.status === '2'} disableElevation type="submit" variant="updatebutton">
                    {isLoading ? <CircularProgress color="inherit" size={30} /> : 'Update'}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      {/* <Notes
        description='Your Upi details will be shown to counter part traders. Please make sure to enter correct data.'
      /> */}
    </>
  );
};

export default Useridentitygrid;
