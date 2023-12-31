import React from 'react';

import { Box, Card, Grid, Stack, Typography, useTheme } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';

import { P2P_MatchedOrders_URL, fetcherP2P } from '../../../../../api_ng/peer2peer_ng';
import { getConfig_ng, setConfig_ng } from '../../../../../utils_ng/localStorage_ng';

import P2PTradeTable from './P2P_Trade_Table';
import Lodergif from '../../../../../components/Gravitusloader';

const P2P_Trades = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  function useMatchedorders() {
    var postData = { "platformId":getConfig_ng('P2PPair').platformId };
    const { data, error, isLoading, } = useSWR([P2P_MatchedOrders_URL(), postData], fetcherP2P, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data: data, error: error, isLoading }
  }

  const { data, error, isLoading } = useMatchedorders();

  return (
    <>
      <Grid container pl={15} pr={15} pt={3} pb={5}>
        <Stack direction='row' spacing={2} alignItems='center'>
          <ArrowBackIosNewIcon onClick={goBack} pt={10} sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }} />
          <Typography variant='h1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            P2P Trades
          </Typography>
        </Stack>
      </Grid>

      {data ? (
        <>
          <Card
            sx={{
              border: 'none',
              width: '100%',
              borderRadius: '78px 78px 0px 0px',
              boxShadow: '0px 5.133836269378662px 35.31077575683594px 0px rgba(0, 0, 0, 0.01), 0px 41px 282px 0px rgba(0, 0, 0, 0.02)'
            }}
          >
            <Box
              pt={1}
              pb={3}
              pl={20}
              pr={15}
              lg={12}
              sx={{
                backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground',
              }}>
              <P2PTradeTable orderInfo={data?.result?.orderInfo} />
            </Box>

          </Card>
        </>
      ) : (
        <Lodergif />
      )}
    </>
  )
}

export default P2P_Trades;
