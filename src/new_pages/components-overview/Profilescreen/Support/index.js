import React from 'react';

import {
  Grid, Box,
  useTheme, Card
} from '@mui/material';

import useSWR from 'swr';

import SupportScreen from './Support';
import SupportSteps from './supportsteps';
import Tickethistroy from './Tickethistroy';
import Lodergif from 'src/components/Gravitusloader';
import { fetcher, getTicketHistoryURL } from 'src/api/profile';

import supportimagelight from '../../../../assets/images/gravitusimage/supportimagelight.svg';
import supportimagedark from '../../../../assets/images/gravitusimage/supportimagedark.svg';

const Support = ({ setSnackbarMessage, setSnackbarOpen }) => {
  const { data, error, isLoading, mutate } = useSWR(
    getTicketHistoryURL(),
    (url) => fetcher(url, { accountType: 'GRAVITUS' })
    // { suspense: true }
  );

  console.log('res', data, error, isLoading);

  const theme = useTheme();

  return (
    data ? (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container pl={0} pr={2}>
          <Grid item xs={12} md={12}>
            <img
              src={theme.palette.mode === 'dark' ? supportimagedark : supportimagelight}
              alt="supportimagelight" style={{ width: '100%', height: 'auto' }} />
          </Grid>
          <Grid item xs={12} md={5.92355} pt={2}>
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
          <Grid md={0.1529}></Grid>
          <Grid item xs={12} md={5.92355} pt={2}>
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

          <Grid item xs={12} md={12} pt={2} pb={3}>
            {data &&
              <Tickethistroy historyData={data?.result} />}
          </Grid>
        </Grid>
      </Box>
    ) : (
      <Lodergif />
    )
  );
};

export default Support;
