import React from 'react';
import { Grid, Box, useTheme } from '@mui/material';
import Securityscreen from './Security';
import securitypageimagelight from '../../../../assets/images/gravitusimage/securitypageimglight.svg';
import securitypageimagedark from '../../../../assets/images/gravitusimage/securitypageimgdark.svg';
import { fetcher, getSecurityURL } from '../../../../api/profile';
import useSWR from 'swr';
import Lodergif from 'src/components/Gravitusloader';

const Security = ({ setSnackbarMessage, setSnackbarOpen }) => {
  const theme = useTheme();
  const { data, error, isLoading, mutate } = useSWR(
    getSecurityURL(),
    (url) => fetcher(url, { accountType: 'GRAVITUS' })
    // { suspense: true }
  );

  console.log('res', data, error, isLoading);

  return data ? (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container pl={6} pr={6}>
        <Grid item xs={12} md={12}>
          <img
            src={theme.palette.mode === 'dark' ? securitypageimagedark : securitypageimagelight}
            alt="securitypageimage"
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          {data && (
            <Securityscreen
              securityData={data.result}
              setSnackbarMessage={setSnackbarMessage}
              setSnackbarOpen={setSnackbarOpen}
              mutate={mutate}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  ) : (
    <Lodergif />
  );
};

export default Security;
