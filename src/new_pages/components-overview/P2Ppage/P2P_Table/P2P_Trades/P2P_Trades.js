import React from 'react';

import { Box, Card, Grid, IconButton, Stack, Typography, useTheme } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';

import { P2P_MatchedOrders_URL, fetcherP2P } from '../../../../../api_ng/peer2peer_ng';
import { getConfig_ng, setConfig_ng } from '../../../../../utils_ng/localStorage_ng';

import P2PTradeTable from './P2P_Trade_Table';
import Lodergif from '../../../../../components/Gravitusloader';
import P2P_Trade_Table_mbl from './Mobileview/P2P_Trade_Table_mbl';

const P2P_Trades = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  function useMatchedorders() {
    var postData = { "platformId": getConfig_ng('P2PPair').platformId };
    const { data, error, isLoading, } = useSWR([P2P_MatchedOrders_URL(), postData], fetcherP2P, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data: data, error: error, isLoading }
  }

  const { data, error, isLoading } = useMatchedorders();

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
          <IconButton onClick={goBack} disableRipple>
            <ArrowBackIosNewIcon
              pt={10}
              sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
            />
          </IconButton>
          <Typography variant="h1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            P2P Trades
          </Typography>
        </Stack>
      </Grid>

      <Grid
        sx={{
          backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground',
        }}
        width='100%'
        display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}
      >
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
              P2P Trades
            </Typography>
          </Stack>
        </Stack>
      </Grid>

      {data ? (
        <Grid container
          pt={{ xs: 2, sm: 2, md: 2, lg: 3 }}
          pb={{ xs: 2, sm: 2, md: 3, lg: 3 }}
          pl={{ xs: 2, sm: 2, md: 10, lg: 18 }}
          pr={{ xs: 2, sm: 2, md: 6, lg: 15 }}
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{
            minHeight: { xs: 'calc(107vh - 134px)', md: 'calc(107vh - 112px)' },
            backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground',
            borderRadius: { xs: '0', sm: '0', md: '78px 78px 0 0', lg: '78px 78px 0 0' },
            boxShadow: '0px 5.133836269378662px 35.31077575683594px 0px rgba(0, 0, 0, 0.01), 0px 41px 282px 0px rgba(0, 0, 0, 0.02)'
          }} >
          <Grid item xs={12} sm={12} lg={12} md={12}>
            <Stack display={{ xs: 'block', sm: 'none', md: 'none', lg: 'none' }}
              sx={{
                width: '100%',
                maxWidth: '100%',
                '& td, & th': { whiteSpace: 'nowrap' },
                overflowY: 'scroll',
                /* Custom scrollbar styles */
                scrollbarWidth: 'thin',
                scrollbarColor: 'gray lightgray',
                height: '800px',
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
              <P2P_Trade_Table_mbl orderInfo={data?.result?.orderInfo} />
            </Stack>
            <Stack display={{ xs: 'none', sm: 'block', md: 'block', lg: 'block' }}>
              <P2PTradeTable orderInfo={data?.result?.orderInfo} />
            </Stack>
          </Grid>
        </Grid>
      ) : (
        <Lodergif />
      )}
    </>

  )
}

export default P2P_Trades;
