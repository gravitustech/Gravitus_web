import React from 'react';
import { Grid, Box, useTheme, Card } from '@mui/material';
import Useridentitygrid from './useridentity';
import Useridentitysteps from './useridentitysteps';
import useridentitylight from '../../../../assets/images/gravitusimage/useridentitylight.svg';
import useridentityimgdark from '../../../../assets/images/gravitusimage/useridentityimgdark.svg';

const Useridentity = ({ setValue, setSnackbarMessage, setSnackbarOpen, userData }) => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container pl={0} pr={2} pb={3}>
        <Grid item xs={12} md={12}>
          <img
            src={theme.palette.mode === 'dark' ? useridentityimgdark : useridentitylight}
            alt="useridentityimgdark"
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>
        <Grid item xs={12} md={5} pt={2}>
          <Card
            variant="outlined"
            sx={{
              borderColor: theme.palette.mode === 'dark' ? '#232730' : '#ececec',
              backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
            }}
          >
            <Useridentitygrid
              setValue={setValue}
              setSnackbarMessage={setSnackbarMessage}
              setSnackbarOpen={setSnackbarOpen}
              userData={userData}
            />
          </Card>
        </Grid>
        <Grid md={0.1529}></Grid>
        <Grid item xs={12} md={6.8471} pt={2}>
          <Card
            variant="outlined"
            sx={{
              borderColor: theme.palette.mode === 'dark' ? '#232730' : '#ececec',
              backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
            }}
          >
            <Useridentitysteps />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Useridentity;
