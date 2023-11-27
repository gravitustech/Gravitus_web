import React, { useEffect, useState, useRef, useReducer } from 'react';
import { Spot_PreTrade_URL, fetcherSPOT} from 'src/api_ng/spotTrade_ng';
import { getConfig_ng, getConfig_sp, setConfig_ng } from '../../../utils_ng/localStorage_ng';

import { Grid, useTheme, Card, CircularProgress } from '@mui/material';
import { TVChartContainer } from './_TVChartContainer';

import Lodergif from '../../../components/Gravitusloader';
import CustomSnackBar from 'src/components/snackbar';

import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';

import { socket } from '../../../socket';
import useSWR, { mutate } from 'swr';

// Import components part of SPOT Trade 
import SpotorderHead from './Spothead/SpotorderHead';
import BuySellGrid from './BuySellGrid/BuySellGrid';

import Ordertable from './Ordertable/Ordertable';
import Orderbook from './Orderbook/Orderbook';
import FundsGrid from './FundsGrid/FundsGrid';
import { fetcherMARKET } from 'src/api_ng/market_ng';

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
      state = action.data;
      return state;
    }
    else if (action.type === 'sockUPDATE') {
      state.pairInfo = action.data.pairInfo;
      state.priceInfo = action.data.priceInfo;
      state.orderBook = action.data.orderBook;
      state.marketTrades = action.data.marketTrades;
      return state;
    }

    throw Error('Unknown action.');
  }

  function useSpotPreTrade() {
    var postData = { "platformId": platformId };
  
    const {data, error, isLoading} = useSWR([Spot_PreTrade_URL(), postData], fetcherSPOT, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return {data, error, isLoading};
  }

  const { 
    data : spotRc, 
    error : spotEr,
    isLoading : isSPOTDataLoading
  } = useSpotPreTrade();

  if(spotEr) {
    // Call Logout User
  }

  useEffect(() => {
    if(spotRc != undefined) {
      if(spotRc.error != 'ok') {
        if(spotRc.error.name === "Missing Authorization") {
          // LogOut User;
        }
        else if (spotRc.error.name === "Invalid Authorization") {
          // LogOut User;
        }
        else if(spotRc.error.name != 'Invalid Authorization') {
          console.log(spotRc.error);
          // Show 'spotRc.error' snack bar
        }
        else {
          console.log(spotRc.error);
          // Show 'spotRc.error' snack bar
        }
      }
      else {
        setSPOTData({ type: 'getUPDATE', data: spotRc.result });
        setConfig_ng('spotPair', {platformId : spotRc.result.pairInfo.id});
        setPlatformId(spotRc.result.pairInfo.id);
      }
    }

    // SPOT Pre Trade Events
    let SPOTPreTradeEvent = '/SPOTPreTrade/POST';
    socket.on(SPOTPreTradeEvent, function(res) {
      if(parseInt(res.pairInfo.id) === parseInt(platformId)) {
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
        <Grid container p={1}>
          <Grid item xs={12} p={1} lg={12}>
            <SpotorderHead priceData={SPOTData?.priceInfo} pairData={SPOTData?.pairInfo} setPlatformId={setPlatformId} excType={excType} changeExcType={changeExcType}/>
          </Grid>

          <Grid container item xs={12} lg={9.5} p={0.5}>
            <Grid item md={9} lg={9}>
              <Card variant="outlined" sx={{ height: 520 }}>
                <TVChartContainer exchangeType={excType} pairData={SPOTData?.pairInfo} />
              </Card>
            </Grid>

            <Grid item md={3} pl={0.5} lg={3}>
              <Card variant="outlined" sx={{ padding: '14px', paddingTop: '2px' }}>
                <Orderbook
                  isAuthorised={isAuthorised}
                  priceData={SPOTData?.priceInfo}
                  orderBookData={SPOTData?.orderBook}
                  marketTradesData={SPOTData?.marketTrades}
                  setSelectedOrder={setSelectedOrder}
                />
              </Card>
            </Grid>

            <Grid item lg={12} md={12} pt={0.5}>
              <Card variant="outlined" sx={{ padding: '4px', paddingTop: '2px', paddingBottom: '1px' }}>
                <Ordertable 
                  isAuthorised={isAuthorised} 
                  orderTableData={SPOTData?.myOrders} 
                  priceData={SPOTData?.priceInfo} 
                  setSnackbarOpen={setSnackbarOpen} 
                  setSnackbarMessage={setSnackbarMessage}
                  />
              </Card>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={2.5} pt={0.5} pr={0.5}>
            <Card variant="outlined" sx={{ padding: '14px' }}>
              <BuySellGrid
                isAuthorised={isAuthorised}
                updateData={updateData}
                pairData={SPOTData?.pairInfo}
                priceData={SPOTData?.priceInfo}
                walletData={SPOTData?.walletInfo}
                selectedOrder={selectedOrder}
                setSelectedOrder={setSelectedOrder}
                setSnackbarOpen={setSnackbarOpen}
                setSnackbarMessage={setSnackbarMessage}
              />
            </Card>
            <Card variant="outlined" sx={{ padding: '14px', mt: 0.5 }}>
              <FundsGrid isAuthorised={isAuthorised} walletData={SPOTData?.walletInfo} priceData={SPOTData?.priceInfo} />
            </Card>
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

export default Spotpage;