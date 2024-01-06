import React from 'react';

import {
  Grid, Box,
  useTheme,
  Stack,
  IconButton,
  Typography
} from '@mui/material';

import Securityscreen from './Security';

import securitypageimagelight from '../../../../assets/images/gravitusimage/securitypageimglight.svg';
import securitypageimagedark from '../../../../assets/images/gravitusimage/securitypageimgdark.svg';

import useSWR from 'swr';
import { Security_Features, fetcherSystem } from 'src/api_ng/system_ng';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router';

const Security = ({ setSnackbarMessage, setSnackbarOpen }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  function useSecurityUrl() {
    var postData = { accountType: 'GRAVITUS' };

    const { data, error, isLoading, mutate } = useSWR([Security_Features(), postData], fetcherSystem, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data, error, isLoading, mutate };
  }

  const { data, error, isLoading, mutate } = useSecurityUrl();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container
        pl={0}
        pr={{ xs: 0, sm: 0, md: 2, lg: 2 }}
        pb={{ xs: 0, sm: 0, md: 3, lg: 3 }}
      >
        <Grid item md={12} lg={12} display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
          <img
            src={theme.palette.mode === 'dark' ? securitypageimagedark : securitypageimagelight}
            alt="securitypageimage"
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
                  Security
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} md={12}>
          {data && (
            <Securityscreen
              securityData={data?.result}
              setSnackbarMessage={setSnackbarMessage}
              setSnackbarOpen={setSnackbarOpen}
              mutate={mutate}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  )
};

export default Security;
