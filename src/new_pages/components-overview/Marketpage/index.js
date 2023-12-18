import React, { useEffect, useState } from 'react';
import { Typography, Grid, useTheme } from '@mui/material';

import Lodergif from 'src/components/Gravitusloader';
import MarketpageTable from './MarketTable/index.js';

import ComponentsCardTop from './MarketHead/TopMarketCard.js';
import ComponentsCardGain from './MarketHead/GainMarketCard.js';
import ComponentsCardLoss from './MarketHead/LossMarketCard.js';
import Footer from '../Homepage/Footer/Footer';

import { useSelector } from 'react-redux';
import { socket } from '../../../socket';
import useSWR, { mutate } from 'swr';

import { MarketOverview_URL, fetcherSystem } from 'src/api_ng/system_ng';
import { getConfig_ng, getConfig_sp } from 'src/utils_ng/localStorage_ng';

const Marketpage = () => {
  const isAuthorised = useSelector((state) => state.user.isAuthenticated);
  const [platformId, setPlatformId] = useState(getConfig_ng('spotPair').platformId);

  const [TopCurrencies, setTopCurrencies] = useState(null);
  const [TopGainers, setTopGainers] = useState(null);
  const [TopLosers, setTopLosers] = useState(null);

  const [socketData, setSocketData] = useState();
  const theme = useTheme();

  function getDisplayInfo() {
    // if(TopGainers.length > 0 && TopLosers.length > 0) {
    //   return 4;
    // }
    // else {
    //   return 6
    // }

    return 6
  }

  function filterTopCryptos(marketRc) {
    // setTopCurrencies(marketRc?.listings?.filter((_, index) => selectedIndices.includes(index)));
    // setTopGainers(marketRc?.listings?.filter(row => row[`24hChg`] > 0));
    // setTopLosers(marketRc?.listings?.filter(row => row[`24hChg`] < 0));

    // To be deleted
    // filteredlist?.filter((_, index) => selectedIndices.includes(index))
    // filteredlist?.filter(row => row[`24hChg`] > 0)
    // filteredlist?.filter(row => row[`24hChg`] < 0)
  }

  function useMarketOverview() {
    var postData = { "callfrom": 'markets', 'superId' : getConfig_sp().userId};

    const { data, error, isLoading } = useSWR([MarketOverview_URL(), postData], fetcherSystem, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data, error, isLoading };
  }

  const { data : marketRc, error : marketEr, isLoading } = useMarketOverview();
  filterTopCryptos(marketRc)

  useEffect(() => {
    var marketOverviewEvt = '/MARKETUpdate/POST';
    socket.on(marketOverviewEvt, function (res) {
      mutate(MarketOverview_URL);
    });

    return () => {
      socket.off(marketOverviewEvt);
    };
  }, []);

  console.log(marketRc, "Market Overview");

  return (
    <>
      {marketRc ? (
        <>
          <Grid pl={15} pr={15} pt={3}>
            <Grid item xs={12} lg={12} md={12}>
              <Typography sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }} variant="h1">
                Market Overview
              </Typography>
            </Grid>

            {
              TopCurrencies && 
              <Grid container spacing={2} pt={3} pb={3}>
                <Grid item xs={12} sm={6} md={6} lg={getDisplayInfo()}>
                  <ComponentsCardTop title="Top Currencies" TopCurrencies={TopCurrencies} marketData={marketRc?.result} />
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={getDisplayInfo()}>
                  <ComponentsCardGain title="New Listings" TopGainers={TopGainers} marketData={marketRc?.result} />
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={getDisplayInfo()}>
                  <ComponentsCardLoss title="Top Losers" TopLosers={TopLosers} marketData={marketRc?.result} />
                </Grid>
              </Grid>
            }
            
          </Grid>
          <MarketpageTable
            marketData={marketRc?.result}
            setPlatformId={setPlatformId}
            listings={
              socketData
                ? marketRc?.result?.listings.map((item) => {
                  if (item.platformId === Number(socketData?.platformId)) {
                    return { ...item, lastPrice: socketData?.lastPrice, '24hVolume': socketData['24hVolume'] };
                  }
                  return item;
                })
                : marketRc?.result?.listings
            }
            socketData={socketData}
            setSocketData={setSocketData}
          />
          <Footer isAuthorised={isAuthorised} />
        </>
      ) : (
        <>
        <Lodergif />
        {console.log("marketRc is undefined")}
        </>
      )}
    </>
  );
};

export default Marketpage;
