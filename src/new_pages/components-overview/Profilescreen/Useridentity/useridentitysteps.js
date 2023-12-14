import { Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import StepsComponents from '../../../../layout_gravitus/MainLayout/Header/HeaderContent/Profile/StepsComponents';

const Useridentitysteps = () => {
  const theme = useTheme();
  return (
    <>
      <Grid container pt={4} pb={11.07} pl={4} pr={4}>
        <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          Steps to Upload Your Identity
        </Typography>
        <StepsComponents description=" Enter your full name exactly as it appears on your PAN card. Ensure there are no typos or spelling errors." />
        <StepsComponents description="Enter your Permanent Account Number (PANCARD) accurately. Double-check for any mistakes, as errors here can cause issues with verification." />
        <StepsComponents description="Select the type of identity document you are uploading with your PAN card." />
        <StepsComponents description="Use your device’s Upload a pre-existing picture of your PAN card. Make sure the image is clear and includes all relevant information. " />
        <StepsComponents description="Before updating, carefully review the information you have entered and the uploaded image to ensure accuracy. If everything is correct, proceed to update your identity details." />
        <StepsComponents description="Depending on the platform and the purpose of the identity upload, it may take some time for your identity to be verified. Be patient and wait for confirmation of successful verification." />
        <StepsComponents description="If there are any issues with the uploaded identity information or if further documentation is required, the platform may contact you for clarification. Stay responsive and provide any additional information requested promptly." />
      </Grid>
    </>
  );
};

export default Useridentitysteps;
// Follow any specific guidelines provided on the platform regarding file format, size, and quality.
