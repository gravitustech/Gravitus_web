import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Lodergif from '../../../../../../components/Gravitusloader';
import CustomSnackBar from 'src/components/snackbar';

import Trade_Seller_Dts_Ext from './Trade_Seller_sp';
import Chat_Appeal_Tab from './Chat_Screen_Tabs';

import { useTheme, Grid, Stack, Typography, Card, Box, IconButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import useSWR, { mutate } from 'swr';
import React, { useState, useEffect, useReducer } from 'react';
import { socket } from '../../../../../../socket';

import { P2P_OrderDetails_URL, fetcherP2P } from 'src/api_ng/peer2peer_ng'
import { getConfig_ng, getConfig_sp, setConfig_ng } from '../../../../../../utils_ng/localStorage_ng';

const Trade_Seller_Dts = (route) => {
  const theme = useTheme();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  const location = useLocation();
  const tradeDetails = JSON.parse(JSON.stringify(location.state));

  const [SUPERData, setSUPERData] = useReducer(updateData, null);
  const [platformId, setPlatformId] = useState(getConfig_ng('spotPair').platformId);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }

  function updateData(state, action) {
    if (action.type === 'getUPDATE') {
      return action.data;
    }
    // sockUPDATE future use case
    // else if (action.type === 'sockUPDATE') {
    //   var superState = JSON.parse(JSON.stringify(state));
    //   superState.pairInfo = action.data.pairInfo;
    //   superState.priceInfo = action.data.priceInfo;

    //   superState.orderBook = action.data.orderBook;
    //   superState.marketTrades = action.data.marketTrades;
    //   return superState;
    // }

    throw Error('Unknown action.');
  }

  function useTradeDetails() {
    var postData = { "platformId": getConfig_ng('P2PPair').platformId, "orderId": tradeDetails.orderId };

    const { data, error, isLoading, isValidating } = useSWR([P2P_OrderDetails_URL(), postData], fetcherP2P, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data: data, error: error, isLoading }
  }

  const { data: tradeRc, error: tradeEr } = useTradeDetails();
  const orderData = tradeRc?.result; // Overall Data
  const counterPart = tradeRc?.result?.counterPart;

  if (tradeEr) {
    // Logout User
  }

  useEffect(() => {
    if (tradeRc != undefined) {
      if (tradeRc.error != 'ok') {
        if (tradeRc?.error?.name === "Missing Authorization") {
          // LogOut User;
        }
        else if (tradeRc?.error?.name === "Invalid Authorization") {
          // LogOut User;
        }
        else if (tradeRc?.error?.name != 'Invalid Authorization') {
          // Show 'tradeRc.error.name' snack bar
        }
        else {
          // Show 'tradeRc.error' snack bar
        }
      }
      else {
        // console.log(tradeRc.result, 'Refresh Trade Record');
        setSUPERData({ type: 'getUPDATE', data: tradeRc.result });
      }
    }
  }, [tradeRc]);

  useEffect(() => {
    if (SUPERData) {
      setConfig_ng('P2PPair', { platformId: SUPERData?.orderDetails?.platformId });
      setPlatformId(SUPERData?.orderDetails?.platformId);

      let P2POrderEvent = '/P2POrder_' + getConfig_sp().userId + '/POST';
      socket.on(P2POrderEvent, function (res) {

        console.log(SUPERData.orderDetails.orderId, 'Order Id in SOCK Seller');
        if (SUPERData?.orderDetails.orderId == res.orderId && res.notifyType == 'orderUpdate') {
          mutate(P2P_OrderDetails_URL);
        }
      });

      return () => {
        console.log('Clear P2P Order Event Seller');
        socket.off(P2POrderEvent);
      };
    }
  }, [SUPERData]);

  return (
    <>
      <Grid container pl={14} pr={15} pt={3} pb={3}>
        <Stack direction="row" spacing={0.8} alignItems="center">
          <IconButton onClick={goBack} disableRipple>
            <ArrowBackIosNewIcon
              pt={10}
              sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
            />
          </IconButton>
          <Typography variant='h1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            Sell USDT
          </Typography>
        </Stack>
      </Grid>

      {SUPERData ? (
        <Grid container pt={3} pb={3} pl={20} pr={15} lg={12}
          sx={{
            minHeight: { xs: 'calc(107vh - 134px)', md: 'calc(107vh - 112px)' },
            backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground',
            borderRadius: '78px 78px 0px 0px',
            boxShadow: '0px 5.133836269378662px 35.31077575683594px 0px rgba(0, 0, 0, 0.01), 0px 41px 282px 0px rgba(0, 0, 0, 0.02)'
          }} >
          <Trade_Seller_Dts_Ext SUPERData={SUPERData} setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage} />

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Chat_Appeal_Tab SUPERData={SUPERData} counterPart={counterPart} />
          </Grid>
        </Grid>
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

export default Trade_Seller_Dts;
