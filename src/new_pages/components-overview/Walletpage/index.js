import WalletHeadExt from './WalletHead/WalletHeadExt';
import WalletHead from './WalletHead/WalletHead';
import { Grid, Divider } from '@mui/material';

import Lodergif from 'src/components/Gravitusloader';
import Footer from '../Homepage/Footer/Footer';
import WalletTable from './WalletTable/index';

import { useSelector } from 'react-redux';
import { socket } from '../../../socket';

import useSWR, { mutate } from 'swr';
import React, { useEffect, useReducer, useState } from 'react';

import { Wallet_Fetch_Info, fetcherWallet } from 'src/api_ng/wallet_ng';
import { getConfig_sp, setConfig_ng } from '../../../utils_ng/localStorage_ng';

const Walletpage = () => {
  const isAuthorised = useSelector((state) => state.user.isAuthenticated);
  const [WALLETData, setWALLETData] = useReducer(updateData, null);
  const [walletId, setWalletId] = useState();

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
  
  console.log(walletRc, 'walletRc');

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
          console.log(walletRc.error);
          // Show 'walletRc.error' snack bar
        }
        else {
          console.log(walletRc.error);
          // Show 'walletRc.error' snack bar
        }
      }
      else {
        console.log(walletRc.result, 'Wallet Info Result');
        setWALLETData({ type: 'UPDATE', data: walletRc.result });
      }
    }

    let WALLETUpdateEvt = '/WALLETUpdate_'+ getConfig_sp().userId +'/POST';
    socket.on(WALLETUpdateEvt, function (res) {
      // Show Loader if necessary
      setWALLETData({ type: 'UPDATE', data: res });
    });

    return () => {
      socket.off(WALLETUpdateEvt);
    };

  }, [walletRc]);

  return (
    <>
      {WALLETData ? (
        <>
          <Grid container pl={15} pr={15} pt={3} pb={5}>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              {WALLETData && <WalletHead total={WALLETData?.totalInUsd} />}
            </Grid>
            <Grid item lg={2} pt={5} pr={6} display={{ xs: 'none', md: 'none', lg: 'block' }}>
              <Divider orientation="vertical" pt={5} sx={{ height: '309px' }} />
            </Grid>
            <Grid item xs={12} md={6} lg={6} display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
              <WalletHeadExt />
            </Grid>
          </Grid>

          { WALLETData && <WalletTable walletList={WALLETData?.walletList} setWalletId={setWalletId} /> }
          
          <Footer isAuthorised={isAuthorised} />
        </>
      ) : (
        <Lodergif />
      )}
    </>
  );
};

export default Walletpage;