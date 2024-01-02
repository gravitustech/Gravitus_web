import { Grid, useTheme, Card, Stack } from '@mui/material';

import MarketDrawer from './SpotHead/SpotHead';
import BuySellGrid from './BuySellGrid/Buy_Sell_Grid';

import OrderAndMarket from './OrderBook/OrdersAndMarket';
import MyOrders from './OrderTable/MyOrders';
import FundsGrid from './FundsGrid/FundsGrid';

import Buy_Sell_Mobileview from './BuySellGrid/Mobile_view/Buy_Sell';
import SpotHead_Mobileview from './SpotHead/MobileView/SpotHead_mblview';
import OrderDeatilsTab_Mblview from './SpotHead/MobileView/OrderDeatilsTab';
import Chart_orderbook_Tabs from './SpotHead/MobileView/Chart_orderbook_Tabs';

import Lodergif from '../../../components/Gravitusloader';
import CustomSnackBar from 'src/components/snackbar';

import { TVChartContainer } from './_TVChartContainer';
import { useSelector } from 'react-redux';

import { socket } from '../../../socket';
import useSWR, { mutate } from 'swr';

import React, { useEffect, useState, useRef, useReducer } from 'react';
import { Spot_PreTrade_URL, fetcherSPOT } from 'src/api_ng/spotTrade_ng';
import { getConfig_ng, getConfig_sp, setConfig_ng } from '../../../utils_ng/localStorage_ng';

const Spotpage = () => {
  const theme = useTheme();
  const isAuthorised = useSelector((state) => state.user.isAuthenticated);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  const [excType, setExcType] = useState(getConfig_ng('excType'));
  const [platformId, setPlatformId] = useState(getConfig_ng('spotPair').platformId);

  const [SPOTData, setSPOTData] = useReducer(updateData, null);
  const [selectedOrder, setSelectedOrder] = useState();

  function changeExcType(exchangeType) {
    setConfig_ng('excType', exchangeType);
    setExcType(exchangeType);
  }

  function updateData(state, action) {
    if (action.type === 'getUPDATE') {
      return action.data;
    }
    else if (action.type === 'sockUPDATE') {
      var superState = JSON.parse(JSON.stringify(state));
      superState.pairInfo = action.data.pairInfo;
      superState.priceInfo = action.data.priceInfo;

      superState.orderBook = action.data.orderBook;
      superState.marketTrades = action.data.marketTrades;
      return superState;
    }

    throw Error('Unknown action.');
  }

  function useSpotPreTrade() {
    var postData = { "platformId": platformId };

    const { data, error, isLoading } = useSWR([Spot_PreTrade_URL(), postData], fetcherSPOT, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data, error, isLoading };
  }

  const {
    data: spotRc,
    error: spotEr,
    isLoading: isSPOTDataLoading
  } = useSpotPreTrade();

  if (spotEr) {
    // Call Logout User
  }

  useEffect(() => {
    if (spotRc != undefined) {
      if (spotRc.error != 'ok') {
        if (spotRc?.error?.name === "Missing Authorization") {
          // LogOut User;
        }
        else if (spotRc?.error?.name === "Invalid Authorization") {
          // LogOut User;
        }
        else if (spotRc?.error?.name != 'Invalid Authorization') {
          // console.log(spotRc.error);
          // Show 'spotRc.error' snack bar
        }
        else {
          // console.log(spotRc.error);
          // Show 'spotRc.error' snack bar
        }
      }
      else {
        // console.log(spotRc.result, 'Refresh SPOT Data');
        setConfig_ng('spotPair', { platformId: spotRc.result.pairInfo.id });
        setSPOTData({ type: 'getUPDATE', data: spotRc.result });
        setPlatformId(spotRc.result.pairInfo.id);
      }
    }

    // SPOT Pre Trade Events
    let SPOTPreTradeEvent = '/SPOTPreTrade/POST';
    socket.on(SPOTPreTradeEvent, function (res) {

      // console.log(res, 'Refresh SPOT Data SOCK');
      if (parseInt(res.pairInfo.id) === parseInt(platformId)) {
        setSPOTData({ type: 'sockUPDATE', data: res });
      }
    });

    return () => {
      socket.off(SPOTPreTradeEvent);
    };

  }, [spotRc]);

  return (
    <>
      {SPOTData ? (
        <Grid container
          pt={{ xs: 0, sm: 0, md: 0.2, lg: 0.2 }}
          p={{ xs: 0, sm: 0, md: 0.5, lg: 0.5 }}
        >
          {/* Desktop view Head*/}
          <Grid item
            display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}
            md={12} lg={12}
            pt={{ md: 0.5, lg: 0.5 }}
            pl={{ md: 0.5, lg: 0.5 }}
            pr={{ md: 0.5, lg: 0.5 }}
          >
            <Card
              sx={{ padding: '8px', background: theme.palette.mode === 'dark' ? '#131722' : 'text.cardbackground', boxShadow: '0' }}>
              <MarketDrawer priceData={SPOTData?.priceInfo} pairData={SPOTData?.pairInfo} setPlatformId={setPlatformId} excType={excType} changeExcType={changeExcType} />
            </Card>
          </Grid>

          {/* Mobile view Head*/}
          <Grid item
            display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}
            xs={12} sm={12}
          >
            <Card
              sx={{
                paddingLeft: { xs: '16px', sm: '24px' }, paddingRight: { xs: '16px', sm: '24px' },
                paddingTop: { xs: '16px', sm: '16px' },
                background: theme.palette.mode === 'dark' ? '#131722' : 'text.cardbackground', boxShadow: '0'
              }}>
              <SpotHead_Mobileview priceData={SPOTData?.priceInfo} pairData={SPOTData?.pairInfo} setPlatformId={setPlatformId} excType={excType} changeExcType={changeExcType} />
            </Card>
          </Grid>

          <Grid container
            xs={12} md={9.5} lg={9.5}
            p={{ xs: 0, sm: 0, md: 0.5, lg: 0.5 }}
          >
            {/* Desktop view Chart*/}
            <Grid item
              display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}
              md={9} lg={9}>

              <Card
                sx={{ height: 520, background: theme.palette.mode === 'dark' ? '#131722' : 'text.cardbackground', boxShadow: '0' }}>
                <TVChartContainer exchangeType={excType} pairData={SPOTData?.pairInfo} />
              </Card>
            </Grid>

            {/* Desktop view  Orderbook, Markettrades*/}
            <Grid item
              display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}
              md={3} lg={3}
              pl={0.5} >
              <Card
                sx={{ padding: '14px', paddingTop: '2px', background: theme.palette.mode === 'dark' ? '#131722' : 'text.cardbackground', boxShadow: '0' }}>
                <OrderAndMarket
                  isAuthorised={isAuthorised}
                  priceData={SPOTData?.priceInfo}
                  orderBookData={SPOTData?.orderBook}
                  marketTradesData={SPOTData?.marketTrades}
                  setSelectedOrder={setSelectedOrder}
                />
              </Card>
            </Grid>

            {/* Mobile view Chart, Orderbook, Markettrades*/}
            <Grid item
              display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}
              xs={12} sm={12}>
              <Card
                sx={{
                  paddingLeft: { xs: '16px', sm: '24px' }, paddingRight: { xs: '16px', sm: '24px' },
                  paddingTop: { xs: '16px', sm: '16px' },
                  background: theme.palette.mode === 'dark' ? '#131722' : 'text.cardbackground', boxShadow: '0'
                }}>
                <Chart_orderbook_Tabs
                  isAuthorised={isAuthorised}
                  priceData={SPOTData?.priceInfo}
                  orderBookData={SPOTData?.orderBook}
                  marketTradesData={SPOTData?.marketTrades}
                  setSelectedOrder={setSelectedOrder}
                  exchangeType={excType} pairData={SPOTData?.pairInfo}
                />
              </Card>
            </Grid>

            {/* Desktop view Myorders, OrderHistory*/}
            <Grid item
              display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}
              md={12} lg={12}
              pt={0.5}>
              <Card
                sx={{ padding: '4px', paddingTop: '2px', paddingBottom: '1px', background: theme.palette.mode === 'dark' ? '#131722' : 'text.cardbackground', boxShadow: '0' }}>
                <MyOrders
                  isAuthorised={isAuthorised}
                  platformId={platformId}
                  orderTableData={SPOTData?.myOrders}
                  setSnackbarOpen={setSnackbarOpen}
                  setSnackbarMessage={setSnackbarMessage}
                />
              </Card>
            </Grid>

            {/* Mobile view Myorders, OrderHistory, Funds*/}
            <Grid item
              display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}
              xs={12} sm={12}>
              <Card
                sx={{
                  paddingLeft: { xs: '16px', sm: '24px' }, paddingRight: { xs: '16px', sm: '24px' },
                  paddingTop: { xs: '16px', sm: '16px' }, paddingBottom: { xs: '16px', sm: '16px' },
                  background: theme.palette.mode === 'dark' ? '#131722' : 'text.cardbackground', boxShadow: '0'
                }}>
                <OrderDeatilsTab_Mblview isAuthorised={isAuthorised}
                  platformId={platformId}
                  orderTableData={SPOTData?.myOrders}
                  setSnackbarOpen={setSnackbarOpen}
                  setSnackbarMessage={setSnackbarMessage}
                  walletData={SPOTData?.walletInfo}
                  priceData={SPOTData?.priceInfo}
                />
              </Card>
            </Grid>
          </Grid>

          {/* Desktop view Buy/sell, Funds*/}
          <Grid item
            display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}
            md={2.5} lg={2.5}
            pt={0.5} pr={0.5}>
            <Card
              sx={{ padding: '14px', background: theme.palette.mode === 'dark' ? '#131722' : 'text.cardbackground', boxShadow: '0' }}>
              <BuySellGrid
                isAuthorised={isAuthorised}
                platformId={platformId}
                pairData={SPOTData?.pairInfo}
                priceData={SPOTData?.priceInfo}
                walletData={SPOTData?.walletInfo}
                selectedOrder={selectedOrder}
                setSelectedOrder={setSelectedOrder}
                setSnackbarOpen={setSnackbarOpen}
                setSnackbarMessage={setSnackbarMessage}
              />
            </Card>
            <Card
              sx={{ padding: '14px', mt: 0.5, background: theme.palette.mode === 'dark' ? '#131722' : 'text.cardbackground', boxShadow: '0' }}>
              <FundsGrid isAuthorised={isAuthorised} walletData={SPOTData?.walletInfo} priceData={SPOTData?.priceInfo} />
            </Card>
          </Grid>

          {/* Mobile view Buy/Sell*/}
          <Stack display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}>
            <Buy_Sell_Mobileview
              isAuthorised={isAuthorised}
              platformId={platformId}
              pairData={SPOTData?.pairInfo}
              priceData={SPOTData?.priceInfo}
              walletData={SPOTData?.walletInfo}
              selectedOrder={selectedOrder}
              setSelectedOrder={setSelectedOrder}
              setSnackbarOpen={setSnackbarOpen}
              setSnackbarMessage={setSnackbarMessage} />
          </Stack>

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

export default Spotpage;