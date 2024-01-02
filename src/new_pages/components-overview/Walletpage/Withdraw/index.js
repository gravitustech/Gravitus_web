import React, { useState } from 'react';

import { Grid, Typography, Stack, Card, useTheme, Box, IconButton, Divider } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import WithdrawHeadExt from './WithdrawHeads/WithdrawHeadExt/index';
import WithdrawHead from './WithdrawHeads/WithdrawHead/index';
import WithdrawTable from './WithdrawTable/index';

import CustomSnackBar from '../../../../components/snackbar';
import Lodergif from 'src/components/Gravitusloader';

import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { socket } from '../../../../socket';

import useSWR, { mutate } from 'swr';
import { Wallet_Fetch_Info, fetcherWallet } from 'src/api_ng/wallet_ng';
import Withdraw_mbl from './WithdrawTable/Mobileview/Withdraw_mbl';

const Withdrawpage = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [walletId, setWalletId] = useState(location?.state?.walletId);
  const [historyData, setHistoryData] = useState();
  const [walletData, setWalletData] = useState();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  var superData = null;

  const goBack = () => {
    navigate(-1);
  }

  function useWalletFetchInfo() {
    const { data, error, isLoading } = useSWR([Wallet_Fetch_Info(), {}], fetcherWallet, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data, error, isLoading };
  }

  const {
    data: walletRc,
    error: walletEr,
    isLoading: isWALLETDataLoading
  } = useWalletFetchInfo();

  if (walletEr) {
    // Call Logout User
  }
  else {
    superData = walletRc?.result;
  }

  return (
    <>
      <Grid container
        display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}
        pt={{ md: 3, lg: 3 }}
        pb={{ md: 3, lg: 3 }}
        pl={{ md: 6, lg: 14 }}
        pr={{ md: 6, lg: 15 }}
      >
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
      {superData ? (
        <>
          <Grid container
            pt={{ xs: 2, sm: 2, md: 3, lg: 3 }}
            pb={{ xs: 2, sm: 2, md: 3, lg: 3 }}
            pl={{ xs: 2, sm: 2, md: 6, lg: 15 }}
            pr={{ xs: 2, sm: 2, md: 6, lg: 15 }}
            sx={{
              backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground',
              borderRadius: { xs: '0', sm: '0', md: '78px 78px 0 0', lg: '78px 78px 0 0' },
              boxShadow: '0px 5.133836269378662px 35.31077575683594px 0px rgba(0, 0, 0, 0.01), 0px 41px 282px 0px rgba(0, 0, 0, 0.02)'
            }}>
            <Grid container>
              <Grid
                display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}
                pb={{ xs: 3, sm: 3 }}>
                <Stack direction="row" spacing={1} pl={0} alignItems='center'  >
                  <Stack justifyContent='start'>
                    <IconButton onClick={goBack} disableRipple>
                      <ArrowBackIcon
                        sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                      />
                    </IconButton>
                  </Stack>
                  <Stack justifyContent='start'>
                    <Typography variant="h4" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      Withdraw Crypto
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
            <Grid container>
              <Grid pl={{ xs: 2, sm: 2, md: 5, lg: 5 }}
                xs={12} sm={12} md={6} lg={6}>
                {superData && (
                  <WithdrawHead
                    walletList={superData?.walletList.filter((item) => item.listing.id !== 17)}
                    walletId={walletId}
                    walletData={walletData}
                    setWalletId={setWalletId}
                    setWalletData={setWalletData}
                    setHistoryData={setHistoryData}
                    setSnackbarMessage={setSnackbarMessage}
                    setSnackbarOpen={setSnackbarOpen}
                  />
                )}
              </Grid>
              <Grid md={6} lg={6} display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
                <WithdrawHeadExt />
              </Grid>
            </Grid>
          </Grid>
          <Card
            sx={{
              border: 'none',
              width: '100%',
              boxShadow: 'none',
            }}
          >
            <Box
              pt={{ xs: 2, sm: 2, md: 3, lg: 3 }}
              pb={{ xs: 2, sm: 2, md: 3, lg: 3 }}
              pl={{ xs: 2, sm: 2, md: 6, lg: 15 }}
              pr={{ xs: 2, sm: 2, md: 6, lg: 15 }}
              lg={12}
              sx={{
                backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
              }}
            >
              <Stack
                pb={{ xs: 2, sm: 2, md: 3, lg: 3 }}
                pl={{ xs: 2, sm: 2, md: 5, lg: 5 }}>
                <Divider></Divider>
              </Stack>
              <Typography
                pl={{ xs: 2, sm: 2, md: 5, lg: 5 }}
                variant="h4"
                sx={{
                  color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary'
                }}
              >
                Withdraw History
              </Typography>
              <Stack pl={{ xs: 0, sm: 0, md: 3.6, lg: 3.6 }}
                pt={1}>
                {superData &&
                  <>
                    <Stack display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
                      <WithdrawTable historyData={historyData} />
                    </Stack>

                    <Stack display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}
                      pt={2}
                      sx={{
                        width: '100%',
                        maxWidth: '100%',
                        '& td, & th': { whiteSpace: 'nowrap' },
                        overflowY: 'scroll',
                        /* Custom scrollbar styles */
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'gray lightgray',
                        height: '462px',
                        '&::-webkit-scrollbar': {
                          width: '0px', // Width of the scrollbar
                        },
                        '&::-webkit-scrollbar-track': {
                          background: theme.palette.mode === "dark" ? 'transparent' : "transparent", // Track color
                        },
                        '&::-webkit-scrollbar-thumb': {
                          background: theme.palette.mode === "dark" ? '#262B39' : "lightgray",
                          borderRadius: '8px', // Round the corners of the thumb
                        },
                      }}
                    >
                      <Withdraw_mbl historyData={historyData} />
                    </Stack>
                  </>
                }
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