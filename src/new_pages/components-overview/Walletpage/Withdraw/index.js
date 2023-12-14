import React, { useState } from 'react';

import { Grid, Typography, Stack, Card, useTheme, Box, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import WithdrawHeadExt from './WithdrawHeads/WithdrawHeadExt/index';
import WithdrawHead from './WithdrawHeads/WithdrawHead/index';
import WithdrawTable from './WithdrawTable/index';

import CustomSnackBar from '../../../../components/snackbar';
import Lodergif from 'src/components/Gravitusloader';

import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { socket } from '../../../../socket';

import useSWR, { mutate } from 'swr';
import { Wallet_Fetch_Info, fetcherWallet } from 'src/api_ng/wallet_ng';

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
      {superData ? (
        <>
          <Grid container pl={15} pr={15} pb={5}>
            <Grid container>
              <Grid pl={5} xs={12} sm={12} md={6} lg={6}>
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
              <Grid xs={12} md={6} lg={6} display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
                <WithdrawHeadExt />
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
                {superData && <WithdrawTable historyData={historyData} />}
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