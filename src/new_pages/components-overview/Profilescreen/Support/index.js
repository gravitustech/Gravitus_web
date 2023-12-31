import { Grid, Box, useTheme } from '@mui/material';
import React from 'react';
import SupportScreen from './Support';
import Tickethistroy from './Tickethistroy';
import supportimagelight from '../../../../assets/images/gravitusimage/supportimagelight.svg';
import supportimagedark from '../../../../assets/images/gravitusimage/supportimagedark.svg';
import useSWR from 'swr';
import { fetcher, getTicketHistoryURL } from 'src/api/profile';
import Lodergif from 'src/components/Gravitusloader';
import SupportSteps from './supportsteps';

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
        <Grid container pl={6} pr={6}>
          <Grid item xs={12} md={12}>
            <img
              src={theme.palette.mode === 'dark' ? supportimagedark : supportimagelight}
              alt="supportimagelight" style={{ width: '100%', height: 'auto' }} />
          </Grid>
          <Grid item xs={12} md={4.5}>
            <SupportScreen setSnackbarMessage={setSnackbarMessage} setSnackbarOpen={setSnackbarOpen} mutate={mutate} />
          </Grid>
          <Grid md={1}></Grid>
          <Grid item xs={12} md={6.5} pt={3}>
            <SupportSteps />
          </Grid>
          <Grid item xs={12} md={12} pt={3} pb={3}>
            {data && <Tickethistroy historyData={data?.result} />}
          </Grid>
        </Grid>
      </Box>
    ) : (
      <Lodergif />
    )
  );
};

export default Support;
