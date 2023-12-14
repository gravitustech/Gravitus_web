import { Grid, Box, useTheme, Card } from '@mui/material';
import React from 'react';
import AddUpi from './AddUpi';
import AddImps from './AddImps';
import paymentlight from '../../../../assets/images/gravitusimage/paymentlight.svg';
import paymentdark from '../../../../assets/images/gravitusimage/paymentdark.svg';
const Payment = ({ setValue, setSnackbarMessage, setSnackbarOpen, userData, mutate }) => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container pl={0} pr={2} pb={3}>
        <Grid item xs={12} md={12}>
          <img
            src={theme.palette.mode === 'dark' ? paymentdark : paymentlight}
            alt="paymentlight"
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>
        <Grid item xs={12} md={5.92355} pt={2}>
          <Card
            variant="outlined"
            sx={{
              borderColor: theme.palette.mode === 'dark' ? '#232730' : '#ececec',
              backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
            }}
          >
            <AddUpi
              setValue={setValue}
              userData={userData.find((item) => item.mode === 'UPI')}
              setSnackbarMessage={setSnackbarMessage}
              setSnackbarOpen={setSnackbarOpen}
              mutate={mutate}
            />
          </Card>
        </Grid>
        <Grid md={0.1529}></Grid>
        <Grid item xs={12} md={5.92355} pt={2}>
          <Card
            variant="outlined"
            sx={{
              borderColor: theme.palette.mode === 'dark' ? '#232730' : '#ececec',
              backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
            }}
          >
            <AddImps
              setValue={setValue}
              userData={userData.find((item) => item.mode === 'IMPS')}
              setSnackbarMessage={setSnackbarMessage}
              setSnackbarOpen={setSnackbarOpen}
              mutate={mutate}
            />
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
};

export default Payment;
