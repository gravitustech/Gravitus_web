import React, { useEffect, useReducer, useState } from 'react';
import { Typography, Grid, useTheme, Stack } from '@mui/material';
import Marquee from "react-fast-marquee";

import Footer from '../Homepage/Footer/Footer';
import Lodergif from 'src/components/Gravitusloader';
import MarketpageTable from './MarketTable/index.js';
import CurrencyCard from './MarketHead_sp/CurrencyCards.js';

import { useSelector } from 'react-redux';
import { socket } from '../../../socket';
import useSWR, { mutate } from 'swr';

import { MarketOverview_URL, fetcherSystem } from 'src/api_ng/system_ng';
import { getConfig_ng, getConfig_sp } from 'src/utils_ng/localStorage_ng';

const Marketpage = () => {
  const theme = useTheme();

  const isAuthorised = useSelector((state) => state.user.isAuthenticated);
  const [platformId, setPlatformId] = useState(getConfig_ng('spotPair').platformId);
  const [socketData, setSocketData] = useState();

  function useMarketOverview() {
    var postData = { "callfrom": 'markets', 'superId': getConfig_sp().userId };

    const { data, error, isLoading } = useSWR([MarketOverview_URL(), postData], fetcherSystem, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data, error, isLoading };
  }

  const { data: marketRc, error: marketEr, isLoading } = useMarketOverview();

  useEffect(() => {
    var marketOverviewEvt = '/MARKETUpdate/POST';
    socket.on(marketOverviewEvt, function (res) {
      mutate(MarketOverview_URL);
    });

    return () => {
      socket.off(marketOverviewEvt);
    };
  }, []);

  return (
    <>
      {marketRc?.result ? (
        <>
          <Grid pl={15} pr={15} pt={3} pb={3}>
            <Grid item xs={12} lg={12} md={12} pb={3}>
              <Typography sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }} variant="h1">
                Market Overview
              </Typography>
            </Grid>

            <Marquee
              speed={75}
              gradient={true}
              gradientWidth={56}
              gradientColor={theme.palette.mode === 'dark' ? '#0F121A' : '#F7F7F7'}
              // pauseOnHover={true}
              pauseOnClick={true}
            >
              <Stack direction='row' spacing={2} pr={2.5}>
                <CurrencyCard MarketData={marketRc} />
              </Stack>
            </Marquee>

            {/* <Grid container spacing={2} pt={3} pb={3}>
              <Grid item xs={12} sm={6} md={6} lg={4} >
                <ComponentsCardTop title="Top Currencies" TopCurrencies={marketRc} />
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={4} >
                <ComponentsCardGain title="Top Gainers" TopGainers={marketRc} />
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={4} >
                <ComponentsCardLoss title="Top Losers" TopLosers={marketRc} />
              </Grid>
            </Grid> */}

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
        </>
      )}
    </>
  );
};

export default Marketpage;
