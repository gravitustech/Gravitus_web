import React, { useState, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { socket } from '../../../../../socket';
import useSWR, { mutate } from 'swr';

import { P2P_SuperOrders_URL, fetcherP2P } from '../../../../../api_ng/peer2peer_ng';
import { getConfig_ng, getConfig_sp } from '../../../../../utils_ng/localStorage_ng';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useTheme, Stack, Typography, Grid, Tab, Link, Card, Box, IconButton } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import P2P_Post_Buy from './P2P_Post_Buy';
import P2P_Post_Sell from './P2P_Post_Sell';
import Order_Status from './Order_Status';

import CustomSnackBar from 'src/components/snackbar';
import Lodergif from '../../../../../components/Gravitusloader';

const P2P_Manage_Ads = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [value, setValue] = React.useState('0');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  const [P2POrders, setP2POrders] = useReducer(updateData, null);
  const [platformId, setPlatformId] = useState(getConfig_ng('P2PPair').platformId);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const goBack = () => {
    navigate(-1);
  }

  function updateData(state, action) {
    if (action.type === 'getUPDATE') {
      return action.data;
    }
    // else if (action.type === 'sockUPDATE') { // Unused Logic
    //   var superState = JSON.parse(JSON.stringify(action.data));
    //   return superState;
    // }

    throw Error('Unknown action.');
  }

  function useRetrieveAds() {
    var postData = { "platformId": platformId };

    const { data, error, isLoading, } = useSWR([P2P_SuperOrders_URL(), postData], fetcherP2P, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data, error, isLoading }
  }

  const {
    data: PostRc,
    error: PostEr,
    isLoading
  } = useRetrieveAds();

  if (PostEr) {
    // Call Logout User
  }

  useEffect(() => {
    if (PostRc != undefined) {
      if (PostRc.error != 'ok') {
        if (PostRc.error.name === "Missing Authorization") {
          // LogOut User;
        }
        else if (PostRc.error.name === "Invalid Authorization") {
          // LogOut User;
        }
        else if (PostRc.error.name != 'Invalid Authorization') {
          setSnackbarMessage({ msg: PostRc.error.name, success: false });
          setSnackbarOpen(true);
        }
        else {
          setSnackbarMessage({ msg: PostRc.error, success: false });
          setSnackbarOpen(true);
        }
      }
      else {
        // console.log(PostRc.result, 'Update from Use Effect');
        setP2POrders({ type: 'getUPDATE', data: PostRc.result });

        if (PostRc.result.pfStatus.action != 'none') {
          setSnackbarMessage({ msg: PostRc.result.pfStatus.message, success: false });
          setSnackbarOpen(true);
          // Go to Routes
        }
      }
    }

    // Refresh Super Orders if matched by counterpart
    let P2POrderEvent = '/P2POrder_' + getConfig_sp().userId + '/POST';
    socket.on(P2POrderEvent, function (res) {
      mutate(P2P_SuperOrders_URL);
    });

    return () => {
      socket.off(P2POrderEvent);
    };

  }, [PostRc]);

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
          <Typography variant="h1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            Manage Ads
          </Typography>
        </Stack>
      </Grid>

      {P2POrders ? (
        <Grid container pt={3} pb={3} pl={20} pr={15} lg={12}
          sx={{
            backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground',
            borderRadius: '78px 78px 0px 0px',
            boxShadow: '0px 5.133836269378662px 35.31077575683594px 0px rgba(0, 0, 0, 0.01), 0px 41px 282px 0px rgba(0, 0, 0, 0.02)'
          }} >
          <Grid
            sx={{
              minHeight: { xs: 'calc(107vh - 134px)', md: 'calc(107vh - 112px)' },
            }}
            container spacing={2}>
            <Grid item xs={12} sm={5.3} lg={5}>
              <Typography variant='h3' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                Post Ad
              </Typography>

              <Stack pt={3}>
                <TabContext value={value}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" pr={3}>
                    <Stack direction="row">
                      <TabList onChange={handleChange} indicatorColor="none" textColor='inherit'>
                        <Tab
                          disableRipple
                          sx={{
                            fontSize: value === '0' ? '14px' : '14px',
                            fontWeight: value === '0' ? '500' : '500',
                            color: value === '0' ? (theme.palette.mode === 'dark' ? 'white' : 'white') : theme.palette.mode === 'dark' ? 'white' : 'black',
                            backgroundColor: value === '0'
                              ? theme.palette.mode === 'dark'
                                ? 'text.buy'
                                : 'text.buy'
                              : theme.palette.mode === 'dark'
                                ? '#262b39'
                                : '#F1F1F1',
                            borderRadius: '5px  0 0 5px',
                            minHeight: '40px',
                          }}
                          label={<div
                            style={{
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            Buy
                          </div>}
                          value="0" />
                        <Tab
                          disableRipple
                          sx={{
                            fontSize: value === '1' ? '14px' : '14px',
                            fontWeight: value === '1' ? '500' : '500',
                            color: value === '1' ? (theme.palette.mode === 'dark' ? 'white' : 'white') : theme.palette.mode === 'dark' ? 'white' : 'black',
                            backgroundColor: value === '1'
                              ? theme.palette.mode === 'dark'
                                ? 'text.sell'
                                : 'text.sell'
                              : theme.palette.mode === 'dark'
                                ? '#262b39'
                                : '#F1F1F1',
                            borderRadius: '0 5px 5px 0',
                            minHeight: '40px',
                          }}
                          label={<div
                            style={{
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            sell
                          </div>}
                          value="1" />
                      </TabList>
                    </Stack>
                    <Stack>
                      <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {P2POrders.priceInfo.tradePair}
                      </Typography>
                      <Typography variant="caption" pl={2.4} sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        Trade Pair
                      </Typography>
                    </Stack>
                  </Stack>
                  <TabPanel value="0" sx={{ pt: 3, pl: 0 }}>
                    <P2P_Post_Buy pfStatus={P2POrders.pfStatus} priceInfo={P2POrders.priceInfo} pairInfo={P2POrders.pairInfo} walletInfo={P2POrders.walletInfo} setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage} />
                  </TabPanel>
                  <TabPanel value="1" sx={{ pt: 3, pl: 0 }}>
                    <P2P_Post_Sell pfStatus={P2POrders.pfStatus} priceInfo={P2POrders.priceInfo} pairInfo={P2POrders.pairInfo} walletInfo={P2POrders.walletInfo} setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage} />
                  </TabPanel>
                </TabContext>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6.7} lg={7}>
              <Stack>
                <Order_Status orders={P2POrders.orders} pairInfo={P2POrders.pairInfo} setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage} />
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Lodergif />
      )}
      <CustomSnackBar
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        snackbarMessage={snackbarMessage && snackbarMessage.msg}
        success={snackbarMessage && snackbarMessage.success} />
    </>
  )
}

export default P2P_Manage_Ads;