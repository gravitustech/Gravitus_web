import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useTheme, Card, Stack, Typography, Grid, Box, Tab } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { socket } from '../../../../../socket';
import useSWR, { mutate } from 'swr';

import { P2P_SuperTrades_URL, fetcherP2P } from 'src/api_ng/peer2peer_ng';
import { getConfig_ng, getConfig_sp, setConfig_ng } from '../../../../../utils_ng/localStorage_ng';

import OngoingTrades from './Trades_Open';
import HistoryTrades from './Trades_History';
import Lodergif from '../../../../../components/Gravitusloader';

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
    data  : myTradeRc,
    error : myTradeEr,
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
              My Trades
            </Typography>
          </Stack>
        </Grid>
        <Box
          pt={3}
          pb={3}
          pl={20}
          pr={15}
          lg={12}
          sx={{
            minHeight: { xs: 'calc(107vh - 134px)', md: 'calc(107vh - 112px)' },
            backgroundColor: theme.palette.mode === 'dark' ? '#0F121A' : 'text.cardbackground',
          }}>
          {myTradeRc ? (
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
                  <OngoingTrades trades={myTradeRc?.result?.trades} pairInfo={myTradeRc?.result?.pairInfo} />
                </TabPanel>
                <TabPanel value="1" sx={{ padding: '0px' }}>
                  <HistoryTrades trades={myTradeRc?.result?.trades} pairInfo={myTradeRc?.result?.pairInfo} />
                </TabPanel>
              </TabContext>
            </Stack>
          ) : (
            <Lodergif />
          )}

        </Box>
      </Card>
    </>
  )
}

export default P2P_My_Trades;