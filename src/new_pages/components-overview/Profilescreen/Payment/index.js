import { Grid, Box, useTheme } from '@mui/material';
import React from 'react';
import AddUpi from './AddUpi';
import AddImps from './AddImps';
import paymentlight from '../../../../assets/images/gravitusimage/paymentlight.svg';
import paymentdark from '../../../../assets/images/gravitusimage/paymentdark.svg';
const Payment = ({ setValue, setSnackbarMessage, setSnackbarOpen, userData, mutate }) => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container pl={6} pr={6} pb={3}>
        <Grid item xs={12} md={12}>
          <img
            src={theme.palette.mode === 'dark' ? paymentdark : paymentlight}
            alt="paymentlight"
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>
        <Grid item xs={12} md={4.5} pt={3}>
          <AddUpi
            setValue={setValue}
            userData={userData.find((item) => item.mode === 'UPI')}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarOpen={setSnackbarOpen}
            mutate={mutate}
          />
        </Grid>
        <Grid md={1.5}></Grid>
        <Grid item xs={12} md={4.5} pt={3}>
          <AddImps
            setValue={setValue}
            userData={userData.find((item) => item.mode === 'IMPS')}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarOpen={setSnackbarOpen}
            mutate={mutate}
          />
        </Grid>
        <Grid md={1.5}></Grid>
      </Grid>
    </Box>
  );
};

export default Payment;
