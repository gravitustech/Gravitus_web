import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useTheme, Card, Stack, Typography, Grid, Box, Tab, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { socket } from '../../../../../socket';
import useSWR, { mutate } from 'swr';

import { P2P_SuperTrades_URL, fetcherP2P } from 'src/api_ng/peer2peer_ng';
import { getConfig_ng, getConfig_sp, setConfig_ng } from '../../../../../utils_ng/localStorage_ng';

import OngoingTrades from './Trades_Open';
import HistoryTrades from './Trades_History';
import Lodergif from '../../../../../components/Gravitusloader';
import Ongoing_Mbl from './Ongoing_Mbl';
import Trades_History_mbl from './Trades_History_mbl';

const P2P_My_Trades = () => {

  const theme = useTheme();
  const navigate = useNavigate();
  const [value, setValue] = React.useState("0");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const goBack = () => {
    navigate(-1);
  }

  function useRetrieveTrades() {
    var postData = { "platformId": getConfig_ng('P2PPair').platformId };

    const { data, error, isLoading, } = useSWR([P2P_SuperTrades_URL(), postData], fetcherP2P, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data: data, error: error, isLoading }
  }

  const {
    data: myTradeRc,
    error: myTradeEr,
    isLoading
  } = useRetrieveTrades();

  if (myTradeEr) {
    // Call Logout User
  }

  if (myTradeRc) {
    setConfig_ng('P2PPair', { platformId: myTradeRc?.result?.pairInfo.id });
  }

  useEffect(() => {
    let P2POrderEvent = '/P2POrder_' + getConfig_sp().userId + '/POST';
    socket.on(P2POrderEvent, function (res) {
      mutate(P2P_SuperTrades_URL);
    });

    return () => {
      socket.off(P2POrderEvent);
    };

  }, []);

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
            My Trades
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
              My Trades
            </Typography>
          </Stack>
        </Stack>
      </Grid>

      {myTradeRc ? (
        <Grid container
          pt={{ xs: 2, sm: 2, md: 2, lg: 3 }}
          pb={{ xs: 2, sm: 2, md: 3, lg: 3 }}
          pl={{ xs: 2, sm: 2, md: 12, lg: 20 }}
          pr={{ xs: 2, sm: 2, md: 6, lg: 15 }}
          xs={12} sm={12} ms={12} lg={12}
          sx={{
            minHeight: { xs: 'calc(107vh - 134px)', md: 'calc(107vh - 112px)' },
            backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground',
            borderRadius: { xs: '0', sm: '0', md: '78px 78px 0 0', lg: '78px 78px 0 0' },
            boxShadow: '0px 5.133836269378662px 35.31077575683594px 0px rgba(0, 0, 0, 0.01), 0px 41px 282px 0px rgba(0, 0, 0, 0.02)'
          }} >
          <Grid item xs={12} sm={12} ms={12} lg={12}>
            <Stack>
              <TabContext value={value}>
                <TabList onChange={handleChange} indicatorColor="none" textColor='inherit'>
                  <Tab
                    disableRipple
                    sx={{
                      padding: '0',
                      fontSize: value === '0' ? '16px' : '16px',
                      fontWeight: value === '0' ? '700' : '400',
                      color:
                        value === '0'
                          ? theme.palette.mode === 'dark'
                            ? 'text.secondarydark'
                            : 'text.secondary'
                          : theme.palette.mode === 'dark'
                            ? 'text.primarydark'
                            : 'text.primary',
                      '&:hover': {
                        color: value === '0' ? theme.palette.mode === 'dark' ? 'text.white' : 'text.black' : theme.palette.mode === 'dark' ? 'text.white' : 'text.black',
                      },
                    }}
                    label={<div style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}>

                      open Orders
                    </div>}
                    value="0" />
                  <Tab
                    disableRipple
                    sx={{
                      padding: '0',
                      fontSize: value === '1' ? '16px' : '16px',
                      fontWeight: value === '1' ? '700' : '400',
                      color:
                        value === '1'
                          ? theme.palette.mode === 'dark'
                            ? 'text.secondarydark'
                            : 'text.secondary'
                          : theme.palette.mode === 'dark'
                            ? 'text.primarydark'
                            : 'text.primary',
                      '&:hover': {
                        color: value === '1' ? theme.palette.mode === 'dark' ? 'text.white' : 'text.black' : theme.palette.mode === 'dark' ? 'text.white' : 'text.black',
                      },
                    }}
                    label={<div style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                      History
                    </div>}
                    value="1" />
                </TabList>

                <TabPanel value="0" sx={{ padding: '0px' }}>
                  <Stack display={{ xs: 'none', sm: 'none', md: 'none', lg: 'block' }}>
                    <OngoingTrades trades={myTradeRc?.result?.trades} pairInfo={myTradeRc?.result?.pairInfo} />
                  </Stack>
                  <Stack display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}
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
                    <Ongoing_Mbl trades={myTradeRc?.result?.trades} pairInfo={myTradeRc?.result?.pairInfo} />
                  </Stack>
                </TabPanel>
                <TabPanel value="1" sx={{ padding: '0px' }}>
                  <Stack display={{ xs: 'none', sm: 'none', md: 'none', lg: 'block' }}>
                    <HistoryTrades trades={myTradeRc?.result?.trades} pairInfo={myTradeRc?.result?.pairInfo} />
                  </Stack>

                  <Stack display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}
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
                    <Trades_History_mbl trades={myTradeRc?.result?.trades} pairInfo={myTradeRc?.result?.pairInfo} />
                  </Stack>
                </TabPanel>
              </TabContext>
            </Stack>
          </Grid>
        </Grid>
      ) : (
        <Lodergif />
      )}
    </>
  )
}

export default P2P_My_Trades;