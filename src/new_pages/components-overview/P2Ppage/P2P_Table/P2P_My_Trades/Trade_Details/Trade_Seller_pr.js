import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Lodergif from '../../../../../../components/Gravitusloader';
import CustomSnackBar from 'src/components/snackbar';

import Trade_Seller_Dts_Ext from './Trade_Seller_sp';
import Chat_Appeal_Tab from './Chat_Screen_Tabs';

import { useTheme, Grid, Stack, Typography, Card, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import useSWR, { mutate } from 'swr';
import React, { useState, useEffect } from 'react';
import { socket } from '../../../../../../socket';

import { P2P_OrderDetails_URL, fetcherP2P } from 'src/api_ng/peer2peer_ng'
import { getConfig_ng, getConfig_sp, setConfig_ng } from '../../../../../../utils_ng/localStorage_ng';

const Trade_Seller_Dts = (route) => {
  const theme = useTheme();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  const location = useLocation();
  const tradeDetails = location.state;

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }

  function useTradeDetails() {
    var postData = { "platformId": getConfig_ng('P2PPair').platformId, "orderId": tradeDetails.orderId };

    const { data, error, isLoading, isValidating } = useSWR([P2P_OrderDetails_URL(), postData], fetcherP2P, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data: data, error: error, isLoading }
  }

  const { data, error } = useTradeDetails();
  const orderData = data?.result; // Overall Data
  const counterPart = data?.result?.counterPart;

  if (data != undefined && data.error != 'ok') {
    console.log(data.error, 'Error in Response');
  }
  // else {
  //   console.log(orderData, 'Order Details');
  // }

  useEffect(() => {
    let P2POrderEvent = '/P2POrder_' + getConfig_sp().userId + '/POST';

    if (orderData != undefined) {
      socket.on(P2POrderEvent, function (res) {

        if (orderData.orderDetails.orderId == res.orderId && res.notifyType == 'orderUpdate') {
          mutate(P2P_OrderDetails_URL);
        }
      });
    }

    return () => {
      socket.off(P2POrderEvent);
    };

  }, [orderData]);

  return (
    <>
      <Card
        sx={{
          border: 'none',
          width: '100%',
          boxShadow: '0px 5.133836269378662px 35.31077575683594px 0px rgba(0, 0, 0, 0.01), 0px 41px 282px 0px rgba(0, 0, 0, 0.02)'
        }}
      >
        <Grid container pl={15} pr={15} pt={2} pb={3} sx={{
          backgroundColor: theme.palette.mode === 'dark' ? '#0F121A' : 'text.cardbackground',
        }}>
          <Stack direction='row' spacing={2} alignItems='center'>
            <ArrowBackIosNewIcon onClick={goBack} pt={10} sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }} />
            <Typography variant='h1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
              Sell USDT
            </Typography>
          </Stack>
        </Grid>
        <Box
          pt={1}
          pb={3}
          pl={18.5}
          pr={15}
          lg={12}
          sx={{
            backgroundColor: theme.palette.mode === 'dark' ? '#0F121A' : 'text.cardbackground',
          }}>
          {data ? (
            <Grid container pt={2} pb={3} sx={{ background: theme.palette.mode === 'dark' ? '#0F121A' : 'text.cardbackground' }} >
              <Trade_Seller_Dts_Ext data={data} setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage} />

              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Chat_Appeal_Tab orderData={orderData} counterPart={counterPart} appealMessage={orderData?.appealMessage} />
              </Grid>
            </Grid>
          ) : (
            <Lodergif />
          )}
        </Box>
      </Card>
      <CustomSnackBar
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        snackbarMessage={snackbarMessage && snackbarMessage.msg}
        success={snackbarMessage && snackbarMessage.success}
      />
    </>
  );
};

export default Trade_Seller_Dts;
