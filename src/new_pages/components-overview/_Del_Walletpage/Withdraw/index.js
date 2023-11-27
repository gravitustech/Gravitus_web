import React from 'react';
import { Grid, Typography, Stack, Card, useTheme, Box, IconButton } from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Withdrawhead1 from './WithdrawHeads/Withdrawhead1/index';
import Withdrawhead2 from './WithdrawHeads/Withdrawhead2/index';
import WithdrawTable from './WithdrawTable/index';
import { fetcher, getWalletURL, getWalletURLById } from '../../../../api/wallet';
import useSWR from 'swr';
import { useState } from 'react';
import Lodergif from 'src/components/Gravitusloader';
import CustomSnackBar from '../../../../components/snackbar';
import { getSecurityURL } from '../../../../api/profile';

const Withdrawpage = () => {
  const theme = useTheme();
  const location = useLocation();
  const [walletId, setWalletId] = useState(location?.state?.walletId);
  const [historyData, setHistoryData] = useState();
  const [walletData, setWalletData] = useState();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  const {
    data,
    error: walletError,
    isLoading: walletIsLoading
  } = useSWR(
    getWalletURL(),
    (url) => fetcher(url)
    // { suspense: true }
  );

  const {
    data: securityData,
    error,
    isLoading,
    mutate
  } = useSWR(
    getSecurityURL(),
    (url) => fetcher(url, { accountType: 'GRAVITUS' })
    // { suspense: true }
  );
  // console.log('res', data, error, isLoading);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }
  return (
    <>
      <Grid container pl={14} pr={15} pt={3} pb={5}>
        <Stack direction="row" spacing={0.8} alignItems="center">
          <IconButton disableRipple onClick={goBack}>
            <ArrowBackIosNewIcon
              pt={10}
              sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
            />
          </IconButton>
          <Typography
            color="text.title"
            variant="h1"
            sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
          >
            Withdraw Crypto
          </Typography>
        </Stack>
      </Grid>
      {data ? (
        <>
          <Grid container pl={15} pr={15} pb={5}>
            <Grid container>
              <Grid pl={5} xs={12} sm={12} md={6} lg={6}>
                {data && (
                  <Withdrawhead1
                    walletList={data?.result?.walletList.filter((item) => item.listing.id !== 17)}
                    walletId={walletId}
                    walletData={walletData}
                    setWalletId={setWalletId}
                    setHistoryData={setHistoryData}
                    setWalletData={setWalletData}
                    setSnackbarMessage={setSnackbarMessage}
                    setSnackbarOpen={setSnackbarOpen}
                    securityData={securityData?.result}
                  />
                )}
              </Grid>
              <Grid xs={12} md={6} lg={6} display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
                <Withdrawhead2 />
              </Grid>
            </Grid>
          </Grid>
          <Card
            sx={{
              border: 'none',
              width: '100%',
              borderRadius: '78px 78px 0px 0px',
              boxShadow: '0px 5.133836269378662px 35.31077575683594px 0px rgba(0, 0, 0, 0.01), 0px 41px 282px 0px rgba(0, 0, 0, 0.02)'
            }}
          >
            <Box
              pt={3}
              pb={3}
              pl={15}
              pr={15}
              lg={12}
              sx={{
                backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
              }}
            >
              <Typography
                pl={5}
                variant="h4"
                sx={{
                  color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary'
                }}
              >
                Withdraw History
              </Typography>
              <Stack pl={3.6} pt={1}>
                {data && <WithdrawTable historyData={historyData} />}
              </Stack>
            </Box>
          </Card>
        </>
      ) : (
        <Lodergif />
      )}
      <CustomSnackBar
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        snackbarMessage={snackbarMessage && snackbarMessage.msg}
        success={snackbarMessage && snackbarMessage.success}
      />
    </>
  );
};

export default Withdrawpage;
