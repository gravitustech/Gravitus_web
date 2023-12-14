
import { Grid, Typography, Stack, Box, useTheme, Card, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
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
  
  if(statementRc) {
    if (statementRc != undefined) {
      if (statementRc.error != 'ok') {
        if (statementRc?.error?.name === "Missing Authorization") {
          // LogOut User;
        }
        else if (statementRc?.error?.name === "Invalid Authorization") {
          // LogOut User;
        }
        else if (statementRc?.error?.name != 'Invalid Authorization') {
          console.log(statementRc.error.name);
          // Show 'statementRc.error' snack bar
        }
        else {
          console.log(statementRc.error);
          // Show 'statementRc.error' snack bar
        }
      }
      else {
        STATEMENTData = statementRc?.result;
      }
    }
  }
  
  return (
    <>
      <Grid container pl={14} pr={15} pt={3} pb={5}>
        <Stack direction="row" spacing={0.8} alignItems="center">
          <IconButton disableRipple onClick={goBack}>
            <ArrowBackIosNewIcon
              pt={10}
              sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
            />
          </IconButton>

          <Typography variant="h1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            Wallet History
          </Typography>
        </Stack>
      </Grid>

      {STATEMENTData ? (
        <Card
          sx={{
            border: 'none',
            width: '100%',
            borderRadius: '78px 78px 0px 0px',
            boxShadow: '0px 5.133836269378662px 35.31077575683594px 0px rgba(0, 0, 0, 0.01), 0px 41px 282px 0px rgba(0, 0, 0, 0.02)'
          }}
        >
          <Box
            pt={3}
            pb={3}
            pl={20}
            pr={15}
            lg={12}
            sx={{
              backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
            }}
          >
            <Stack>
              <TabContext value={value}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <TabList onChange={handleChange} indicatorColor="none" textColor="inherit">
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
                          color:
                            value === '0'
                              ? theme.palette.mode === 'dark'
                                ? 'text.white'
                                : 'text.black'
                              : theme.palette.mode === 'dark'
                                ? 'text.white'
                                : 'text.black'
                        }
                      }}
                      label={
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          External
                        </div>
                      }
                      value="0"
                    />
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
                          color:
                            value === '1'
                              ? theme.palette.mode === 'dark'
                                ? 'text.white'
                                : 'text.black'
                              : theme.palette.mode === 'dark'
                                ? 'text.white'
                                : 'text.black'
                        }
                      }}
                      label={
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          Internal
                        </div>
                      }
                      value="1"
                    />
                  </TabList>
                </Stack>

                <TabPanel value="0" sx={{ padding: '0px' }}>
                  <HistoryExternalTab tableData={STATEMENTData?.external} />
                </TabPanel>
                <TabPanel value="1" sx={{ padding: '0px' }}>
                  <HistoryInternalTab tableData={STATEMENTData?.internal} />
                </TabPanel>
              </TabContext>
            </Stack>
          </Box>
        </Card>
      ) : (
        <Lodergif />
      )}
    </>
  );
};

export default HistoryPageNG;