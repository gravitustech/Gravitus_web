import React from 'react';

import {
  Grid, Box,
  useTheme, Card
} from '@mui/material';

import useSWR from 'swr';

import SupportScreen from './Support';
import SupportSteps from './supportsteps';
import Tickethistroy from './Tickethistroy';

import supportimagelight from '../../../../assets/images/gravitusimage/supportimagelight.svg';
import supportimagedark from '../../../../assets/images/gravitusimage/supportimagedark.svg';

import { mutate } from 'swr';
import { Ticket_History, fetcherSystem } from 'src/api_ng/system_ng';

const Support = ({ setSnackbarMessage, setSnackbarOpen }) => {
  const theme = useTheme();

  function useSupportHistory() {
    var postData = { accountType: 'GRAVITUS' };

    const { data, error, isLoading, mutate } = useSWR([Ticket_History(), postData], fetcherSystem, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data, error, isLoading, mutate };
  }

  const { data, error, isLoading, mutate } = useSupportHistory();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container pl={0} pr={2} pb={3} spacing={2}>
        <Grid item xs={12} md={12}>
          <img
            src={theme.palette.mode === 'dark' ? supportimagedark : supportimagelight}
            alt="supportimagelight" style={{ width: '100%', height: 'auto' }} />
        </Grid>
        <Grid item xs={12} md={6} >
          <Card
            variant="outlined"
            sx={{
              borderColor: theme.palette.mode === 'dark' ? '#232730' : '#ececec',
              backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
            }}
          >
            <SupportScreen setSnackbarMessage={setSnackbarMessage} setSnackbarOpen={setSnackbarOpen} mutate={mutate} />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}  >
          <Card
            variant="outlined"
            sx={{
              borderColor: theme.palette.mode === 'dark' ? '#232730' : '#ececec',
              backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
            }}
          >
            <SupportSteps />
          </Card>
        </Grid>

        <Grid item xs={12} md={12} >
          {data &&
            <Tickethistroy historyData={data?.result} />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Support;
