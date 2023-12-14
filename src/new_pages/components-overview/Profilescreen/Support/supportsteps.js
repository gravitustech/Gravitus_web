import { Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import StepsComponents from 'src/layout_gravitus/MainLayout/Header/HeaderContent/Profile/StepsComponents';

const SupportSteps = () => {
  const theme = useTheme();
  return (
    <>
      <Grid container pt={4} pb={7} pl={4} pr={4}>
        <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          Steps to Create Your Tickets
        </Typography>

        <StepsComponents description="Look for an option that allows you to select the type or category of your issue or request. 
      This is typically presented as a dropdown menu or a list of categories." />

        <StepsComponents description="After selecting the category, you will usually be prompted to provide more specific 
      information about your issue or request" />

        <StepsComponents description="Fill out any required fields, such as a subject line or a description of the problem. 
      Be as detailed and clear as possible to help the support team or relevant department understand your issue." />

        <StepsComponents description="Before submitting your ticket, review all the information you've provided to 
      ensure accuracy and completeness. " />

        <StepsComponents description="After you submit your ticket, our support team aims to address and resolve 
      your issue within 2-4 business days." />
      </Grid>
    </>
  );
};

export default SupportSteps;
