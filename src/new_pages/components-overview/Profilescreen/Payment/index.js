import React from 'react';

import {
  Grid, Box, Typography,
  useTheme, Card, Stack, IconButton
} from '@mui/material';

import AddUpi from './AddUpi';
import AddImps from './AddImps';

import paymentlight from '../../../../assets/images/gravitusimage/paymentlight.svg';
import paymentdark from '../../../../assets/images/gravitusimage/paymentdark.svg';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router';

const Payment = ({ setValue, setSnackbarMessage, setSnackbarOpen, userData, mutate }) => {
  const theme = useTheme();

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container
        pl={0}
        pr={{ xs: 0, sm: 0, md: 2, lg: 2 }}
        pb={{ xs: 0, sm: 0, md: 3, lg: 3 }}
        spacing={{ xs: 0, sm: 0, md: 2, lg: 2 }}>
        <Grid item md={12} lg={12} display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
          <img
            src={theme.palette.mode === 'dark' ? paymentdark : paymentlight}
            alt="paymentlight"
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>

        <Grid
          width='100%'
          display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}
          sx={{ backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground' }}
        >
          <Stack direction="row" spacing={1} alignItems='center' pb={1} justifyContent='space-between'>
            <Stack pl={1} spacing={1} justifyContent='start' direction='row' alignItems='center'>
              <IconButton onClick={goBack} disableRipple>
                <ArrowBackIcon
                  sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                />
              </IconButton>
              <Stack justifyContent='start'>
                <Typography variant="h4" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                  Payment
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}
          pt={{ xs: 0, sm: 0, md: 2, lg: 2 }}>
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
        <Grid item xs={12} md={6} pt={{
          xs: 0, sm: 0, md: 2, lg: 2
        }}>
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
