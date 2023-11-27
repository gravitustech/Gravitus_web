import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { useNavigate } from 'react-router-dom';

import { P2P_SuperOrders_URL, fetcherP2P } from '../../../../../api_ng/peer2peer_ng';
import { getConfig_ng, getConfig_sp, setConfig_ng } from '../../../../../utils_ng/localStorage_ng';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useTheme, Stack, Typography, Grid, Tab } from '@mui/material';
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
  const [platformId, setPlatformId] = useState(getConfig_ng('P2PPair').platformId);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const goBack = () => {
    navigate(-1);
  }

  function useRetrieveAds() {
    var postData = { "platformId": platformId};

    const { data, error, isLoading, } = useSWR([P2P_SuperOrders_URL(), postData], fetcherP2P, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data: data, error: error, isLoading }
  }

  const { data, error, isLoading } = useRetrieveAds();
  const P2POrders = data?.result;
  // console.log(P2POrders);

  return (
    <><Grid container pl={15} pr={15} pt={3} pb={5}>
      <Stack direction='row' spacing={2} alignItems='center'>
        <ArrowBackIosNewIcon onClick={goBack} pt={10} sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }} />
        <Typography variant='h1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          Manage Ads
        </Typography>
      </Stack>
    </Grid>
      {P2POrders ? (
        <>
          <Grid container pl={20} pr={15}>
            <Grid container spacing={2} >
              <Grid item xs={12} sm={5.3} lg={5}>
                <Typography variant='h3' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                  Post Ad
                </Typography>

                <Stack pt={5}>
                  <TabContext value={value}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" pr={3}>
                      <Stack direction="row">
                        <TabList onChange={handleChange} indicatorColor="none" textColor='inherit'>
                          <Tab
                            disableRipple
                            sx={{
                              fontSize: value === '0' ? '14px' : '14px',
                              fontWeight: value === '0' ? '500' : '500',
                              color:
                                value === '0' ? (theme.palette.mode === 'dark' ? 'white' : 'white') : theme.palette.mode === 'dark' ? 'white' : 'black',
                              backgroundColor:
                                value === '0'
                                  ? theme.palette.mode === 'dark'
                                    ? 'text.buy'
                                    : 'text.buy'
                                  : theme.palette.mode === 'dark'
                                    ? '#2B2B2E'
                                    : '#ECECEC',
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
                              color:
                                value === '1' ? (theme.palette.mode === 'dark' ? 'white' : 'white') : theme.palette.mode === 'dark' ? 'white' : 'black',
                              backgroundColor:
                                value === '1'
                                  ? theme.palette.mode === 'dark'
                                    ? 'text.sell'
                                    : 'text.sell'
                                  : theme.palette.mode === 'dark'
                                    ? '#2B2B2E'
                                    : '#ECECEC',
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
        </>) :
        (
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

export default P2P_Manage_Ads;