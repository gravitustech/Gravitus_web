import React, { useEffect, useState } from 'react';
import { Typography, Grid, useTheme } from '@mui/material';

import Lodergif from 'src/components/Gravitusloader';
import MarketpageTable from './MarketTable/index.js';

import ComponentsCardTop from './MarketHead/TopMarketCard.js';
import ComponentsCardGain from './MarketHead/GainMarketCard.js';
import ComponentsCardLoss from './MarketHead/LossMarketCard.js';
import Footer from '../Homepage/Footer/Footer';

import { fetcher, getMarketURL } from '../../../api/spot';
import { useSelector } from 'react-redux';
import { socket } from '../../../socket';
import useSWR, {mutate} from 'swr';

import { MarketOverview_URL, fetcherSystem } from 'src/api_ng/system_ng';
import { getConfig_ng } from 'src/utils_ng/localStorage_ng';

const Marketpage = () => {
  const isAuthorised = useSelector((state) => state.user.isAuthenticated);
  const [platformId, setPlatformId] = useState(getConfig_ng('spotPair').platformId);

  const [socketData, setSocketData] = useState();
  const theme = useTheme();

  function useMarketOverview() {
    var postData = { "callfrom": 'markets' };

    const { data, error, isLoading } = useSWR([MarketOverview_URL(), postData], fetcherSystem, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data, error, isLoading };
  }

  const { data, error, isLoading } = useMarketOverview();

  useEffect(() => {
    var marketOverviewEvt = '/MARKETUpdate/POST';
    socket.on(marketOverviewEvt, function(res){
      mutate(MarketOverview_URL);
    });

    return () => {
      socket.off(marketOverviewEvt);
    };
  }, []);

  return (
    <>
      {data ? (
        <>
          <Grid pl={15} pr={15} pt={5}>
            <Grid item xs={12} lg={12} md={12}>
              <Typography sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }} variant="h1">
                Market Overview
              </Typography>
            </Grid>

            <Grid container spacing={8} pt={5} pb={5}>
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <ComponentsCardTop title="Top Currencies" marketData={data.result} />
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={4}>
                <ComponentsCardGain title="Top Gainers" marketData={data.result} />
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={4}>
                <ComponentsCardLoss title="Top Losers" marketData={data.result} />
              </Grid>
            </Grid>
          </Grid>
          <MarketpageTable
            marketData={data.result}
            setPlatformId={setPlatformId}
            listings={
              socketData
                ? data?.result?.listings.map((item) => {
                  if (item.platformId === Number(socketData.platformId)) {
                    return { ...item, lastPrice: socketData.lastPrice, '24hVolume': socketData['24hVolume'] };
                  }
                  return item;
                })
                : data.result.listings
            }
            socketData={socketData}
            setSocketData={setSocketData}
          />
          <Footer isAuthorised={isAuthorised} />
        </>
      ) : (
        <Lodergif />
      )}
    </>
  );
};

export default Marketpage;
