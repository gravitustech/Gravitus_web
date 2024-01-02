import React, { useState } from 'react';
import { Grid, IconButton, Stack, Typography, useTheme } from '@mui/material';

import { useLocation, useNavigate } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import useSWR from 'swr';
import MoreDrawer from '../MoreDrawer';
import Deposit_Withdraw_btn from './Deposit_Withdraw_btn';
import { Wallet_Fetch_ById, fetcherWallet } from 'src/api_ng/wallet_ng';
import CustomSnackBar from 'src/components/snackbar';
import Lodergif from 'src/components/Gravitusloader';

const CoinDetails = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  const goBack = () => {
    navigate(-1);
  }

  const walletId = location.state?.walletId;

  function useWalletFetchById() {
    var postData = { walletId: walletId };
    const { data, error, isLoading } = useSWR([Wallet_Fetch_ById(), postData], fetcherWallet, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data, error, isLoading };
  }

  const {
    data: walletRc,
    error: walletEr,
    isLoading: iswalletDataLoading
  } = useWalletFetchById();

  return (
    <>
      <Grid
        display={{ xs: 'block', sm: 'none', md: 'none', lg: 'none' }}
        pt={{ xs: 2, sm: 2 }}
        pb={{ xs: 2, sm: 2 }}
        pl={{ xs: 0, sm: 0 }}
        pr={{ xs: 0, sm: 0 }}
        lg={12}
        sx={{
          backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
        }}
      >
        <Stack direction="row" spacing={1} alignItems='center' pb={1}>
          <Stack pl={2} justifyContent='start'>
            <IconButton onClick={goBack} disableRipple>
              <ArrowBackIcon
                sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
              />
            </IconButton>
          </Stack>
          <Stack justifyContent='start'>
            <Typography variant="h4" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
              Wallet
            </Typography>
          </Stack>
        </Stack>
        {walletRc ? (
          <>
            <MoreDrawer walletListing={walletRc?.result?.listing} walletData={walletRc?.result} />
            <Deposit_Withdraw_btn walletId={walletId} setSnackbarOpen={setSnackbarOpen}
              setSnackbarMessage={setSnackbarMessage} />
          </>
        ) : (
          <Lodergif />
        )}
      </Grid>
      <>
        <CustomSnackBar
          snackbarOpen={snackbarOpen}
          setSnackbarOpen={setSnackbarOpen}
          snackbarMessage={snackbarMessage && snackbarMessage.msg}
          success={snackbarMessage && snackbarMessage.success}
        /></>

    </>
  )
}

export default CoinDetails;
