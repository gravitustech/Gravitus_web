import WalletHeadExt from './WalletHead/WalletHeadExt';
import WalletHead from './WalletHead/WalletHead';
import { Grid, Divider, useTheme, Stack } from '@mui/material';

import Lodergif from 'src/components/Gravitusloader';
import Footer from '../Homepage/Footer/Footer';
import WalletTable from './WalletTable/index';

import { useSelector } from 'react-redux';
import { socket } from '../../../socket';

import useSWR, { mutate } from 'swr';
import React, { useEffect, useReducer, useState } from 'react';

import { getConfig_sp } from '../../../utils_ng/localStorage_ng';
import { Wallet_Fetch_Info, fetcherWallet } from 'src/api_ng/wallet_ng';

const Walletpage = () => {
  const theme = useTheme();
  const isAuthorised = useSelector((state) => state.user.isAuthenticated);
  const [WALLETData, setWALLETData] = useReducer(updateData, null);

  function updateData(state, action) {
    if (action.type === 'UPDATE') {
      return action.data;
    }

    throw Error('Unknown action.');
  }

  function useWalletFetchInfo() {
    const { data, error, isLoading } = useSWR([Wallet_Fetch_Info(), {}], fetcherWallet, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data, error, isLoading };
  }

  const {
    data: walletRc,
    error: walletEr,
    isLoading: isWALLETDataLoading
  } = useWalletFetchInfo();

  if (walletEr) {
    // Call Logout User
  }

  useEffect(() => {
    if (walletRc != undefined) {
      if (walletRc.error != 'ok') {
        if (walletRc?.error?.name === "Missing Authorization") {
          // LogOut User;
        }
        else if (walletRc?.error?.name === "Invalid Authorization") {
          // LogOut User;
        }
        else if (walletRc?.error?.name != 'Invalid Authorization') {
          // console.log(walletRc.error);
          // Show 'walletRc.error' snack bar
        }
        else {
          // console.log(walletRc.error);
          // Show 'walletRc.error' snack bar
        }
      }
      else {
        // console.log(walletRc.result, 'Wallet Info Result');
        setWALLETData({ type: 'UPDATE', data: walletRc.result });
      }
    }

    let WALLETUpdateEvt = '/WALLETUpdate_' + getConfig_sp().userId + '/POST';
    socket.on(WALLETUpdateEvt, function (res) {
      // Show Loader if necessary
      mutate(Wallet_Fetch_Info);

      // Below code will be updated in next version
      // setWALLETData({ type: 'UPDATE', data: res });
    });

    return () => {
      socket.off(WALLETUpdateEvt);
    };

  }, [walletRc]);

  return (
    <>
      {WALLETData ? (
        <>
          <Grid container
            pt={{ xs: 2, sm: 3, md: 3, lg: 3 }}
            pb={{ xs: 2, sm: 2, md: 3, lg: 3 }}
            pl={{ xs: 2, sm: 3, md: 6, lg: 15 }}
            pr={{ xs: 2, sm: 3, md: 6, lg: 15 }}
            sx={{
              backgroundColor:
              {
                xs: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground',
                sm: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground',
                md: 'transparent',
                lg: 'transparent'
              }
            }}
          >
            <Grid item xs={12} sm={12} md={6} lg={4} pt={{ xs: 0, sm: 0, md: 10, lg: 10 }}>
              {WALLETData && <WalletHead totalInUsd={WALLETData?.totalInUsd} />}
            </Grid>

            <Grid item lg={2} pt={5} pr={6} display={{ xs: 'none', md: 'none', lg: 'block' }}>
              <Divider orientation="vertical" pt={5} sx={{ height: '309px' }} />
            </Grid>

            <Grid item xs={12} md={6} lg={6} display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
              <WalletHeadExt />
            </Grid>
          </Grid>
          {/* <Stack
            display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}
            pl={{ xs: 2, sm: 3 }}
            pr={{ xs: 2, sm: 3 }}
          >
            <Divider></Divider>
          </Stack> */}
          {WALLETData && <WalletTable walletList={WALLETData?.walletList} />}

          <Footer isAuthorised={isAuthorised} />
        </>
      ) : (
        <Lodergif />
      )}
    </>
  );
};

export default Walletpage;