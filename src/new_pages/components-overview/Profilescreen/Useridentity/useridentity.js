import React, { useEffect, useRef } from 'react';
import {
  Grid,
  Stack,
  Button,
  Typography,
  FormHelperText,
  OutlinedInput,
  useTheme,
  TextField,
  Card,
  IconButton,
  styled,
  Box,
  Dialog,
  Tooltip
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Notes from '../Payment/Notes';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { updateIdentity } from '../../../../api/profile';
import { useState } from 'react';
import { DeleteForever } from '@mui/icons-material';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

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

const Useridentitygrid = ({ setValue, setSnackbarMessage, setSnackbarOpen, userData }) => {
  const theme = useTheme();
  let formData = new FormData();
  const navigate = useNavigate();
  const imgRef = useRef(null);
  const hiddenAnchorRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const blobUrlRef = useRef('');
  const Identity = [{ Identity: 'PANCARD' }];
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFileURL, setSelectedFileURL] = useState(null);
  const [croppedFileURL, setCroppedFileURL] = useState(null);
  const [selectedIdentity, setSelectedIdentity] = useState(userData?.docType || '');

  const handleNavigate = () => {
    navigate('/profile/support');
    setValue('4');
  };

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
  useEffect(() => {
    setCroppedFileURL(userData.imagePath);
  }, []);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const initialCrop = {
    unit: '25kb', // Change this to 'px' if you want to specify pixel values
    x: 25,
    y: 25,
    width: 50,
    height: 50
  };

  const [crop, setCrop] = useState(initialCrop);
  const [completedCrop, setCompletedCrop] = useState(initialCrop);
  const [aspect, setAspect] = useState(16 / 9);

  // function onImageLoad(e) {
  //   if (aspect) {
  //     const { width, height } = e.currentTarget
  //     setCrop(centerAspectCrop(width, height, aspect))
  //   }
  // }

  const handleImageCrop = async () => {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;

    console.log({ completedCrop }, { previewCanvas });

    if (completedCrop && image) {
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      const offscreen = new OffscreenCanvas(completedCrop.width * scaleX, completedCrop.height * scaleY);
      // You might want { type: "image/jpeg", quality: <0 to 1> } to
      // reduce image size
      const ctx = offscreen.getContext('2d');
      if (!ctx) {
        throw new Error('No 2d context');
      }
      console.log('chk', 0, 0, image.width, image.height, 0, 0, offscreen.width, offscreen.height);
      ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, offscreen.width, offscreen.height);
      const blob = await offscreen.convertToBlob({
        type: 'image/png'
      });
      console.log({ blob });
      const reader = new FileReader();

      reader.onloadend = () => {
        setCroppedFileURL(reader.result);
      };

      reader.readAsDataURL(blob);
      // if (blobUrlRef.current) {
      //   URL.revokeObjectURL(blobUrlRef.current);
      // }
      // blobUrlRef.current = URL.createObjectURL(blob);
      // hiddenAnchorRef.current.href = blobUrlRef.current;
      // hiddenAnchorRef.current.click();
    } else {
      console.log('here');
    }
    handlecloseClick();
  };

  const handlecloseClick = () => {
    handleCloseDialog();
    setSelectedFileURL(null);
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
          console.log({ values });
          formData.append('updateInfo', JSON.stringify({ fullName: values.name, pancard: values.pannumber, docType: values.docType }));
          formData.append('fileName', selectedFile.name);
          if (croppedFileURL) {
            formData.append('fileI', croppedFileURL);
          } else {
            formData.append('fileI', selectedFileURL);
          }

          try {
            const { data } = await updateIdentity(formData);
            if (Object.keys(data.result).length) {
              console.log({ data });
              setSnackbarMessage({ msg: 'Identity updated successfully', success: true });
              setSnackbarOpen(true);
              console.log({ values });
              setStatus({ success: false });
              setSubmitting(false);
            } else {
              setSnackbarMessage({ msg: 'Identity updation failed', success: false });
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
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
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
                    value={values.docType}
                    readOnly={userData.status === '0' ? false : true}
                    onChange={(e, val) => setFieldValue('docType', val)}
                    // getOptionLabel={(option) => `${option.Identity}`}
                    renderOption={(props, option) => (
                      <Stack {...props} direction="row" spacing={1}>
                        <Typography>{option}</Typography>
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
                      // width: ' 330.98px',
                      height: '180px',
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
                      {croppedFileURL ? (
                        <Box>
                          <img src={croppedFileURL} alt="wew" width="120px" height="160px" />
                          {userData.status !== '1' && (
                            <Tooltip title="click to clear the image" placement="top" arrow>
                              <DeleteForever
                                onClick={() => setCroppedFileURL(null)}
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
                          component="label"
                          onClick={handleButtonClick}
                          sx={{
                            pt: 12,
                            alignItems: 'center',
                            textAlign: 'center'
                          }}
                        >
                          <AddCircleOutlinedIcon
                            sx={{
                              width: '46px',
                              height: '46px',
                              color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary'
                            }}
                          />
                          {/* <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFileUpload} /> */}
                        </IconButton>
                      )}
                    </Stack>
                  </Card>
                </Stack>
              </Grid>

              <Dialog open={isDialogOpen} onClose={handlecloseClick}>
                <Stack p={3} spacing={1} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="h1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                    UPLOAD PANCARD
                  </Typography>
                  <Card
                    sx={{
                      height: '180px',
                      width: '100%',
                      boxShadow: 'none',
                      borderRadius: '5px',
                      border: '2px solid',
                      borderColor: theme.palette.mode === 'dark' ? '#232323' : '#EFEFEF',
                      backgroundColor: theme.palette.mode === 'dark' ? 'text.primary' : 'text.cardbackground'
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
                          <ReactCrop crop={crop} onChange={(c) => setCrop(c)} onComplete={(c) => setCompletedCrop(c)}>
                            <img src={selectedFileURL} alt="wew" width="100%" height="180px" ref={imgRef} />
                          </ReactCrop>
                          <Tooltip title="click to clear the image" placement="top" arrow>
                            <DeleteForever
                              onClick={() => setSelectedFileURL(null)}
                              sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                            />
                          </Tooltip>
                        </Box>
                      ) : (
                        <>
                          <IconButton
                            disableRipple
                            component="label"
                            onClick={handleButtonClick}
                            sx={{
                              pt: 12,
                              alignItems: 'center',
                              textAlign: 'center'
                            }}
                          >
                            <Typography
                              variant="title2"
                              sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                            >
                              Select File
                            </Typography>
                            <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFileUpload} />
                          </IconButton>
                        </>
                      )}
                    </Stack>
                  </Card>
                  {/* <canvas
                    ref={previewCanvasRef}
                    style={{
                      border: '1px solid black',
                      objectFit: 'contain',
                      width: completedCrop.width,
                      height: completedCrop.height
                    }}
                  /> */}
                  <Stack pt={1} direction="row" spacing={2} justifyContent="space-between">
                    <Button variant="contained5" onClick={handlecloseClick}>
                      Cancel
                    </Button>
                    <Button variant="contained4" onClick={handleImageCrop}>
                      Upload
                    </Button>
                  </Stack>
                </Stack>
              </Dialog>

              <Grid item xs={12}>
                <Stack direction="row" spacing={3} pt={2}>
                  <Button variant="supportbutton" onClick={handleNavigate}>
                    Support
                  </Button>
                  <Button disableElevation type="submit" variant="updatebutton">
                    Update
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
