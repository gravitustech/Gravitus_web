import p2pimg1 from '../../../assets/images/gravitusimage/p2pimage1.svg';
import p2pimg2 from '../../../assets/images/gravitusimage/p2pimage2.svg';

import React, { useState, useEffect, useReducer } from 'react';
import { fetcherP2P, P2P_PreTrade_URL } from '../../../api_ng/peer2peer_ng';
import { getConfig_ng, setConfig_ng } from '../../../utils_ng/localStorage_ng';

import { Grid, Stack, Typography, useTheme } from "@mui/material";

import P2P_Table from "./P2P_Table/index";
import Footer from "../Homepage/Footer/Footer";
import CustomSnackBar from 'src/components/snackbar';
import Lodergif from '../../../components/Gravitusloader';

import useSWR, { mutate } from 'swr';
import { socket } from '../../../socket';
import { useSelector } from 'react-redux';

const P2Ppage = () => {
  const theme = useTheme();
  const isAuthorised = useSelector((state) => state.user.isAuthenticated);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  const [platformId, setPlatformId] = useState(getConfig_ng('P2PPair').platformId);
  const [P2PData, setP2PData] = useReducer(updateData, null);

  function updateData(state, action) {
    if (action.type === 'getUPDATE') {
      return action.data;
    }
    else if (action.type === 'sockUPDATE') {
      var superState = JSON.parse(JSON.stringify(state));
      superState.pairInfo = action.data.pairInfo;

      superState.priceInfo = action.data.priceInfo;
      superState.orderBook = action.data.orderBook;
      return superState;
    }

    throw Error('Unknown action.');
  }

  function useP2PPreTrade() {
    var postData = { "platformId": platformId };
  
    const {data, error, isLoading} = useSWR([P2P_PreTrade_URL(), postData], fetcherP2P, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });
    
    return {data, error, isLoading};
  }

  const {
    data : P2PRc, 
    error : P2PEr,
    isLoading : isP2PDataLoading
  } = useP2PPreTrade();

  if(P2PEr) {
    // Call Logout User
  }

  useEffect(() => {
    if(P2PRc != undefined) {
      if(P2PRc.error != 'ok') {
        if(P2PRc.error.name === "Missing Authorization") {
          // LogOut User;
        }
        else if (P2PRc.error.name === "Invalid Authorization") {
          // LogOut User;
        }
        else if(P2PRc.error.name != 'Invalid Authorization') {
          setSnackbarMessage({ msg: P2PRc.error.name, success: false });
          setSnackbarOpen(true);
        }
        else {
          setSnackbarMessage({ msg: P2PRc.error, success: false });
          setSnackbarOpen(true);
        }
      }
      else {
        setP2PData({ type: 'getUPDATE', data: P2PRc.result });
        setConfig_ng('P2PPair', {platformId : P2PRc.result.pairInfo.id});
        setPlatformId(P2PRc.result.pairInfo.id);
      }
    }

    // P2P Pre Trade Events
    let P2PPreTradeEvent = '/P2PPreTrade/POST';
    socket.on(P2PPreTradeEvent, function(res) {
      if(parseInt(res.pairInfo.id) === parseInt(platformId)) {
        setP2PData({ type: 'sockUPDATE', data: res });
      }
    });

    return () => {
      socket.off(P2PPreTradeEvent);
    };

  }, [P2PRc]);

  return (
    <>
      {P2PData ? (
        <>
          <Grid pt={6} pb={0} pl={15} pr={15}
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
            sx={{
              margin: '0',
              background: theme.palette.mode === 'dark' ? 'radial-gradient(circle,rgba(69, 69, 69, 1),rgba(2, 2, 2, 1))' : 'radial-gradient(58.07% 58.07% at 50% 41.93%, #FFF 0%, #AFE8E3 100%)',
            }}>
            <Grid item pb={0} md={2} lg={2} style={{ flexDirection: 'column', }} display={{ xs: 'none', md: 'block', lg: 'block' }}>
              {/* <img src={p2pimg1} alt='p2pimg1' width={100} /> */}
            </Grid>

            <Grid item md={8} lg={8} pt={1} pb={5} sx={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
              <Stack spacing={2} >
                <Typography variant='h1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary', textAlign: 'center' }}>
                  Buy and Sell TetherUSD With Your INR Payment Method
                </Typography>
                <Typography variant='title2' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.priary', textAlign: 'center' }}>
                  Make P2P trades today with zero fees and your preferred INR payment method!
                </Typography>
              </Stack>
            </Grid>

            <Grid item pt={0} pb={0} md={2} lg={2} textAlign='end' style={{ flexDirection: 'column', }} display={{ xs: 'none', md: 'block', lg: 'block' }}>
              {/* <img src={p2pimg2} alt='p2pimg2' width={100} /> */}
            </Grid>
          </Grid>

          <Grid sx={{
            background: theme.palette.mode === 'dark' ? 'radial-gradient(circle,rgba(69, 69, 69, 1),rgba(2, 2, 2, 1))' : 'radial-gradient(circle,rgba(255, 255, 255, 1),rgba(173, 231, 226, 1))',
          }}>
            <P2P_Table isAuthorised={isAuthorised} P2PData={P2PData} setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage} />
          </Grid>

          <Footer isAuthorised={isAuthorised} />
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
  )

}

export default P2Ppage;