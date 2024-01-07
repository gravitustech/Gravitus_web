
import { Grid, Typography, Stack, Box, useTheme, Card, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';

import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';

import Lodergif from 'src/components/Gravitusloader';
import HistoryExternalTab from './HistoryExternalTab';
import HistoryInternalTab from './HistoryInternalTab';

import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useReducer } from 'react';

import { socket } from 'src/socket';
import useSWR from 'swr';

import { fetcher, getWalletURLHistory } from '../../../../api/wallet';
import { Wallet_Statement, fetcherWallet } from 'src/api_ng/wallet_ng';
import HistoryInternal_mbl from './Mobileview/HistoryInternal_mbl';
import HistoryExternal_mbl from './Mobileview/HistoryExternal_mbl';

const HistoryPageNG = () => {
  const theme = useTheme();
  const location = useLocation();

  const [walletId, setWalletId] = useState(location?.state?.walletId);
  var STATEMENTData = null; // Store History Data

  const [value, setValue] = React.useState('0');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }

  function useWalletHistory() {
    var postData = { walletId: walletId };

    const { data, error, isLoading } = useSWR([Wallet_Statement(), postData], fetcherWallet, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data, error, isLoading };
  }

  const {
    data: statementRc,
    error: statementEr,
    isLoading: isSTATEMENTDataLoading
  } = useWalletHistory();

  if (statementEr) {
    // Call Logout User
  }

  if (statementRc) {
    if (statementRc != undefined) {
      if (statementRc.error != 'ok') {
        if (statementRc?.error?.name === "Missing Authorization") {
          // LogOut User;
        }
        else if (statementRc?.error?.name === "Invalid Authorization") {
          // LogOut User;
        }
        else if (statementRc?.error?.name != 'Invalid Authorization') {
          // console.log(statementRc.error.name);
          // Show 'statementRc.error' snack bar
        }
        else {
          // console.log(statementRc.error);
          // Show 'statementRc.error' snack bar
        }
      }
      else {
        STATEMENTData = statementRc?.result;
      }
    }
  }
  // console.log('statementRc', statementRc)
  return (
    <>
      <Grid container display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}
        pt={{ md: 3, lg: 3 }}
        pb={{ md: 3, lg: 3 }}
        pl={{ md: 6, lg: 14 }}
        pr={{ md: 6, lg: 15 }}>
        <Stack direction="row" spacing={0.8} alignItems="center">
          <IconButton onClick={goBack} disableRipple>
            <ArrowBackIosNewIcon
              pt={10}
              sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
            />
          </IconButton>
          <Typography variant="h1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            History
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
              History
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      {STATEMENTData ? (
        <Grid container
          pt={{ xs: 0, sm: 0, md: 2, lg: 2 }}
          pb={{ xs: 2, sm: 2, md: 3, lg: 3 }}
          pl={{ xs: 2, sm: 2, md: 10, lg: 18 }}
          pr={{ xs: 2, sm: 2, md: 6, lg: 15 }}
          lg={12}
          sx={{
            backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground',
            borderRadius: { xs: '0', sm: '0', md: '78px 78px 0 0', lg: '78px 78px 0 0' },
            boxShadow: '0px 5.133836269378662px 35.31077575683594px 0px rgba(0, 0, 0, 0.01), 0px 41px 282px 0px rgba(0, 0, 0, 0.02)'
          }} >
          <Grid
            // sx={{
            //   minHeight: { xs: 'calc(107vh - 134px)', md: 'calc(107vh - 112px)' },
            // }}
            item xs={12} sm={12} md={12} lg={12}>
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

                    External
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
                    Internal
                  </div>}
                  value="1" />
              </TabList>

              <TabPanel value="0" sx={{ padding: '0px' }}>
                <Stack display={{ xs: 'none', sm: 'none', md: 'none', lg: 'block' }}>
                  <HistoryExternalTab tableData={STATEMENTData?.external} />
                </Stack>
                <Stack display={{ xs: 'block', sm: 'block', md: 'block', lg: 'none' }}
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
                  <HistoryExternal_mbl tableData={STATEMENTData?.external} />
                </Stack>
              </TabPanel>
              <TabPanel value="1" sx={{ padding: '0px' }}>
                <Stack display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
                  <HistoryInternalTab tableData={STATEMENTData?.internal} />
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
                  <HistoryInternal_mbl tableData={STATEMENTData?.internal} />
                </Stack>
              </TabPanel>
            </TabContext>
          </Grid>
        </Grid>
      ) : (
        <Lodergif />
      )}
    </>
  );
};

export default HistoryPageNG;