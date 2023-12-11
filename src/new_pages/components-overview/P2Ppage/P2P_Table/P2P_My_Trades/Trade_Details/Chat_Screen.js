import React, { useState, useRef } from "react";

import {
  Box, Typography, OutlinedInput, Card, Stack, useTheme, Avatar,
  InputAdornment, IconButton, Badge, Tooltip, Modal, Grid, Button
} from "@mui/material";

import { styled } from "@mui/material/styles";
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

import useSWR, { mutate } from 'swr';
import { P2P_TradeMessages_URL, P2P_SendMessage_URL, P2P_SendPicture_URL, formDataP2P, postDataP2P } from "src/api_ng/peer2peer_ng";
import { getConfig_ng, setConfig_ng } from '../../../../../../utils_ng/localStorage_ng';

import ImageCropper from "src/components/_cropper";
import { Formik } from "formik";

const Chatscreen = ({ messages, orderDetails, counterPart, mutate, setSnackbarMessage, setSnackbarOpen }) => {
  const reversedMessages = messages && [...messages].reverse();
  const [input, setInput] = React.useState(""); // Message in Use Sate

  const theme = useTheme();
  const formikMSG = useRef();

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#00BBAB',
      color: '#00BBAB',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  }));

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleConfirm = () => {
    if (input.trim() === '') {
      return;
    }

    var postData = {
      platformId: getConfig_ng('P2PPair').platformId,
      orderId: orderDetails?.orderId,
      message: input,
    };

    postDataP2P(P2P_SendMessage_URL(), postData).then(function (res) {
      console.log(res);
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
        mutate(P2P_TradeMessages_URL);
        setInput('');

        // Reset Formik using ref & update based on sock
        formikMSG.current.resetForm({
          values: {
            message: '',
            submit: null
          }
        });
      }
    }, function (err) {
      console.log(err);
      // Logout User
    });
  };

  // Submit On Enter Key Down
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      // Prevent the default behavior of the enter key (e.g., new line)
      event.preventDefault();
      handleConfirm();
    }
  };

  // ################################### For Image Uplod ####################################

  // Show Loader
  const [isLoading, setIsLoading] = useState(false);

  //Upload Image Modal View
  const [modalOpen, setModalOpen] = React.useState(false);
  const [imageToCrop, setImageToCrop] = React.useState(undefined);
  const [croppedImage, setCroppedImage] = React.useState(undefined);

  // Image Cropper Modal Style
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

  const handleModalOpen = () => {
    document.getElementById('superFile')?.click();
    setTimeout(function () {
      setModalOpen(true);
    }, 1000);
  };

  const handleModalClose = () => {
    setCroppedImage(undefined);
    // setImageToCrop(undefined);
    setModalOpen(false);
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

  const handleSendPicture = () => {
    if (croppedImage != undefined) {
      var postData = {
        updateInfo: {
          platformId: getConfig_ng('P2PPair').platformId,
          orderId: orderDetails.orderId,
        },
        fileName: 'chatMessage',
        fileI: croppedImage,
      };

      formDataP2P(P2P_SendPicture_URL(), postData).then(function (res) {

        handleModalClose();
        setIsLoading(false);

        console.log(res);
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
          setSnackbarMessage({ msg: "Picture Uploaded", success: false });
          setSnackbarOpen(true);

          mutate(P2P_TradeMessages_URL);
          setCroppedImage('undefined');
          setImageToCrop('undefined');
          // Update based on sock
        }
      }, function (err) {
        console.log(err);
        // Logout User
      });
    }
    else {
      setSnackbarMessage({ msg: "Image is empty", success: false });
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Stack pl={10} pr={5}>
        <Card sx={{
          height: '100%',
          borderRadius: '5px',
          border: `2px solid`,
          borderColor: theme.palette.mode === 'dark' ? '#212121' : '#F0F0F0',
          boxShadow: `0px 2.726541757583618px 29.951322555541992px 0px rgba(0, 0, 0, 0.02),
                0px 9.157886505126953px 48.472755432128906px 0px rgba(0, 0, 0, 0.02)`,
        }}>
          <Stack direction="row" alignItems="center" spacing={1} p={1.5}
            sx={{
              bgcolor: theme.palette.mode === "dark" ? '#212121' : "#fafafa",
              color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary'
            }}>
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
            <Typography variant='title1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}  >
              {counterPart?.member}
            </Typography>
          </Stack>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              bgcolor: theme.palette.mode === "dark" ? 'text.black' : "text.background",
              overflowY: 'scroll',
              height: '575px',
              /* Custom scrollbar styles */
              scrollbarWidth: 'thin', // For Firefox
              scrollbarColor: 'gray lightgray', // For Firefox
              '&::-webkit-scrollbar': {
                width: '4px', // Width of the scrollbar
              },
              '&::-webkit-scrollbar-track': {
                background: theme.palette.mode === "dark" ? 'black' : "text.background",  // Track color
              },
              '&::-webkit-scrollbar-thumb': {
                background: theme.palette.mode === "dark" ? 'lightgray' : "lightgray",
                borderRadius: '8px', // Round the corners of the thumb
              },
            }}
          >
            <Box sx={{ flexGrow: 1, p: 1, pt: 2, }}>
              {reversedMessages && reversedMessages.map((message, index) => (
                <Message key={index} message={message} />
              ))}
            </Box>
          </Box>

          <Box sx={{
            bgcolor: theme.palette.mode === "dark" ? 'text.black' : "text.background",
          }} >
            <Stack  >
              <Formik
                innerRef={formikMSG}
                initialValues={{
                  message: '',
                  submit: null
                }}
                // validationSchema={Yup.object().shape({
                //   receiptNo: Yup.string().max(255).required('UTR number is required*')
                // })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                  try {
                    handleConfirm(values);
                    setStatus({ success: false });
                    setSubmitting(false);
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
                      <Grid item xs={12} pt={0} lg={12} p={2}>
                        <OutlinedInput
                          multiline
                          rowsMax={4}
                          size="large"
                          fullWidth
                          placeholder="Message"
                          value={input}
                          onChange={handleInputChange}
                          onKeyDown={handleKeyDown}
                          startAdornment={
                            <InputAdornment position="start" >
                              <Tooltip title="click to upload image" placement="top" arrow>
                                <IconButton onClick={handleModalOpen}>
                                  <AddCircleOutlinedIcon />
                                  <input id="superFile" type="file" accept="image/*" onChange={onUploadFile} style={{ display: 'none' }} />
                                </IconButton>
                              </Tooltip>
                            </InputAdornment>}
                          endAdornment={
                            <InputAdornment position="end" >
                              <IconButton onClick={handleConfirm}>
                                <SendIcon />
                              </IconButton>
                            </InputAdornment>}
                        />
                      </Grid>
                    </form>
                  </>
                )}
              </Formik>
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
                      onClick={() => handleSendPicture()} >
                      Upload
                    </Button>
                  </Stack>
                </Box>
              </Modal>
            </Stack>
          </Box>
        </Card>
      </Stack>
    </>
  );
};

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) =>
    props.theme.palette.mode === 'dark' ? props.theme.palette.text.white : props.theme.palette.text.white};
  padding: 16px;
  border-radius: 5px;
  outline: none;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 15px;
  right: 15px;
`;

const Message = ({ message }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  // Show image in modal view
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      handleClose();
    }
  };

  const handleDownload = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = message?.messageContent; // Assuming messageContent is the URL of the image
    downloadLink.download = 'downloaded_image'; // You can set the desired filename here
    document.body.appendChild(downloadLink);

    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Align message based on response
  const isBot = message.align === 'left';

  const MessageComponent = () => {
    if (message?.messageType === 'text') {
      return (
        <Stack>
          <Typography
            variant="body1"
            sx={{
              p: 2,
              ml: isBot ? 1 : 10,
              mr: isBot ? 10 : 1,
              backgroundColor: isBot ? 'text.buy' : theme.palette.mode === "dark" ? '#232323' : "#F5F5F5",
              borderRadius: isBot ? '20px 20px 20px 0px' : '20px 20px 0px 20px',
              color: isBot ? 'text.white' : theme.palette.mode === "dark" ? 'text.white' : 'text.black',
            }}
          >
            {message?.messageContent}
          </Typography>
        </Stack>
      );
    } else if (message?.messageType === 'image') {
      return (
        <>
          <Stack>
            <Button onClick={handleOpen}>
              <img
                alt="img"
                src={message?.messageContent}
                style={{
                  maxWidth: '100%',
                  maxHeight: '350px',
                  borderRadius: '15px',
                }}
              />
            </Button>
          </Stack>

          <StyledModal open={open} onClose={handleClose}>
            <ModalContent>
              <CloseButton
                sx={{
                  color: 'text.black', backgroundColor: 'text.white',
                  transition: 'background-color 0.3s ease',
                  ':hover': {
                    backgroundColor: 'white',
                  },
                }}
                onClick={handleClose}>&times;</CloseButton>
              <img
                src={message?.messageContent}
                alt="img"
                style={{ width: "75%", maxWidth: "700px", borderRadius: "5px" }} />
              <Stack pt={3}>
                <Tooltip title="click to download the image" placement="top" arrow>
                  <Button onClick={handleDownload} justifyContent='flex-end' >
                    <DownloadIcon sx={{ color: theme.palette.mode === 'dark' ? 'text.black' : 'text.black', }} />
                    <Typography pl={1} sx={{ color: theme.palette.mode === 'dark' ? 'text.secondary' : 'text.secondary', }}>
                      Download
                    </Typography>
                  </Button>
                </Tooltip>
              </Stack>
            </ModalContent>
          </StyledModal>
        </>
      );
    }
    return null;
  };

  return (
    <><Box
      sx={{
        display: "flex",
        justifyContent: message?.align === 'left' ? 'flex-start' : 'flex-end',
      }}
    >
      <MessageComponent />
    </Box>
      <Typography
        sx={{
          display: "flex",
          fontSize: '10px',
          justifyContent: message?.align === 'left' ? 'flex-start' : 'flex-end',
          ml: message?.align === 'left' ? 1 : 0,
          mr: message?.align === 'left' ? 0 : 1,
          mb: 2
        }}
      >
        {new Date(Number(message?.timeStamp)).toLocaleString('en-US', {
          timeZone: 'Asia/Kolkata',
          // day: 'numeric',
          // month: 'short',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })}
      </Typography></>
  );
};

export default Chatscreen;