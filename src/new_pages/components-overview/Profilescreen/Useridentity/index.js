import React from 'react';
import { Grid, Box, useTheme } from '@mui/material';
import Useridentitygrid from './useridentity';
import Useridentitysteps from './useridentitysteps';
import useridentitylight from '../../../../assets/images/gravitusimage/useridentitylight.svg';
import useridentityimgdark from '../../../../assets/images/gravitusimage/useridentityimgdark.svg';

const Useridentity = ({ setValue, setSnackbarMessage, setSnackbarOpen, userData }) => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container pl={6} pr={6} pb={3}>
        <Grid item xs={12} md={12}>
          <img
            src={theme.palette.mode === 'dark' ? useridentityimgdark : useridentitylight}
            alt="useridentityimgdark"
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>
        <Grid item xs={12} md={4.5} pt={3}>
          <Useridentitygrid
            setValue={setValue}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarOpen={setSnackbarOpen}
            userData={userData}
          />
        </Grid>
        <Grid md={1}></Grid>
        <Grid item xs={12} md={6.5} pt={3}>
          <Useridentitysteps />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Useridentity;
