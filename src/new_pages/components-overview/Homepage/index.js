import React from 'react';
import Popularcurrency from './Popularcurrency/Popularcurrency';
import Features from './Features/Features';
import BuildPortfolio from './BuildPortfolio/BuildPortfolio';
import Footer from './Footer/Footer';
import Featuresn from './Features/Featuresn';
import HomepageHeadnewuser from './Homehead/HomepageHeadnewuser';
import { useSelector } from 'react-redux';
import HomepageHead from './Homehead/HomepageHead';
import { fetcher, getMarketURL } from 'src/api/spot';
import useSWR from 'swr';
import Lodergif from 'src/components/Gravitusloader';

const GravitusHomePage = () => {
  const isAuthorised = useSelector((state) => state.user.isAuthenticated);

  const { data, error, isLoading } = useSWR(
    getMarketURL(),
    (url) => fetcher(url, { accountType: 'GRAVITUS', postData: { callfrom: 'markets' } })
    // { suspense: true }
  );
  console.log('res', data, error, isLoading);

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
