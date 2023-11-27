import { Grid, Divider } from '@mui/material';
import WalletTable from './WalletTable/index';

import WalletHead1 from './Wallethead/Wallethead1';
import WalletHead2 from './Wallethead/Wallethead2';

import React, { useEffect, useState } from 'react';
import { socket } from '../../../socket';
import useSWR, {mutate} from 'swr';

import { useSelector } from 'react-redux';
import { fetcher, getSpotURL, getWalletURL } from '../../../api/wallet';

import Footer from '../Homepage/Footer/Footer';
import Lodergif from 'src/components/Gravitusloader';

const Walletpage = () => {
  const [walletId, setWalletId] = useState();
  const isAuthorised = useSelector((state) => state.user.isAuthenticated);

  const { data, error, isLoading, mutate } = useSWR(
    getWalletURL(),
    (url) => fetcher(url)
    // { suspense: true }
  );

  useEffect(() => {
    function onWALLETUpdate(res) {
      console.log({ res });
      mutate();
    }
    const loggedUser = '8203038';
  
    console.log('in usf');
    socket.on(`/WALLETUpdate_${loggedUser}/POST`, onWALLETUpdate);
  }, []);

  console.log('resdata', data, error, isLoading);

  return (
    <>
      {data ? (
        <>
          <Grid container pl={15} pr={15} pt={3} pb={5}>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              {data && <WalletHead1 total={data.result.totalInUsd} />}
            </Grid>
            <Grid item lg={2} pt={5} pr={6} display={{ xs: 'none', md: 'none', lg: 'block' }}>
              <Divider orientation="vertical" pt={5} sx={{ height: '309px' }} />
            </Grid>
            <Grid item xs={12} md={6} lg={6} display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
              <WalletHead2 />
            </Grid>
          </Grid>

          {data && 
            <WalletTable walletList={data.result.walletList} setWalletId={setWalletId} 
          />}
          <Footer isAuthorised={isAuthorised} />
        </>
      ) : (
        <Lodergif />
      )}
    </>
  );
};

export default Walletpage;