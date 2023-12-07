import React from 'react';

import Footer from './Footer/Footer';
import Features from './Features/Features';
import HomepageHead from './Homehead/HomepageHead';
import Lodergif from 'src/components/Gravitusloader';
import BuildPortfolio from './BuildPortfolio/BuildPortfolio';
import Popularcurrency from './Popularcurrency/Popularcurrency';
import HomepageHeadnewuser from './Homehead/HomepageHeadnewuser';

import useSWR from 'swr';
import { useSelector } from 'react-redux';
import { MarketOverview_URL, fetcherSystem } from 'src/api_ng/system_ng';

const GravitusHomePage = () => {
  const isAuthorised = useSelector((state) => state.user.isAuthenticated);

  function useMarketOverview() {
    var postData = { "callfrom": 'markets' };

    const { data, error, isLoading } = useSWR([MarketOverview_URL(), postData], fetcherSystem, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data, error, isLoading };
  }

  const { data, error, isLoading } = useMarketOverview();
  return (
    <>
      {data ? (
        <>
          {isAuthorised ? (
            <HomepageHead />
          ) : (
            <HomepageHeadnewuser />
          )}
          <Popularcurrency marketData={data?.result} />
          <BuildPortfolio />
          <Features />
          <Footer isAuthorised={isAuthorised} />
        </>
      ) : (
        <Lodergif />
      )}

    </>
  );
};

export default GravitusHomePage;
