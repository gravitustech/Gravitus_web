import React, { useEffect, useState } from 'react';
import { Grid, useTheme, Card, CircularProgress } from '@mui/material';
import { TVChartContainer } from './components/TVChartContainer/index';
import { version } from './charting_library';
//
import BuySellGrid from './BuySellGrid/BuySellGrid';
import Orderbook from './Orderbook/Orderbook';
import FundsGrid from './FundsGrid/FundsGrid';
import Ordertable from './Ordertable/Ordertable';
import SpotorderHead from './Spothead/SpotorderHead';
import { useSelector } from 'react-redux';
import useSWR, { mutate } from 'swr';
import { chartFetcher, fetcher, getChartURL, getSpotURL } from '../../../api/spot';
import Lodergif from '../../../components/Gravitusloader';
import CustomSnackBar from 'src/components/snackbar';
import { useLocation } from 'react-router';
import { socket } from '../../../socket';
import TradeChart from './TradeChart';

const Spotpage = () => {
  const theme = useTheme();
  const location = useLocation();
  const isAuthorised = useSelector((state) => state.user.isAuthenticated);
  // console.log({ location });
  const [inputs, setInputs] = useState({ accountType: 'GRAVITUS' });
  const [selectedOrder, setSelectedOrder] = useState();
  const [platformId, setPlatformId] = useState(location.state ? location.state.platformId : 0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  const [newBar, setNewBar] = useState(null);

  useEffect(() => {
    mutate(getSpotURL);
  }, [platformId]);

  const { data, error, isLoading, mutate } = useSWR(
    getSpotURL(),
    (url) => fetcher(url, { ...inputs, postData: { platformId } })
    // { suspense: true }
  );

  const { data: chartData } = useSWR(
    getChartURL(data?.result?.pairInfo.cmc_chart === 1 ? 'CMC' : 'CMC'),
    (url) => chartFetcher(url)
    // { suspense: true }
  );

  useEffect(() => {
    function onSPOTPreTrade(respo) {
      console.log({ respo });
      mutate();
    }
    function onSPOTOrder(respon) {
      console.log({ respon });
    }
    // socket.on('/TICKSUpdate/POST', onTICKSUpdate);
    socket.on('/SPOTPreTrade/POST', onSPOTPreTrade);
    var loggedUser = '8203038';

    socket.on(`/SPOTOrder_${loggedUser}/POST`, onSPOTOrder);
  }, [data]);

  console.log('res', data, error, isLoading, chartData);

  return (
    <>
      {chartData ? (
        <Grid container p={1}>
          <Grid item xs={12} p={1} lg={12}>
            <SpotorderHead priceData={data?.result?.priceInfo} pairData={data?.result?.pairInfo} setPlatformId={setPlatformId} />
          </Grid>

          {chartData && (
            <Grid container item xs={12} lg={9.5} p={0.5}>
              <Grid item md={9} lg={9}>
                <Card variant="outlined" sx={{ height: 520 }}>
                  <TVChartContainer superData={chartData?.result} pairData={data?.result?.pairInfo} />
                </Card>
              </Grid>

              <Grid item md={3} pl={0.5} lg={3}>
                <Card variant="outlined" sx={{ padding: '14px', paddingTop: '2px' }}>
                  <Orderbook
                    priceData={data?.result?.priceInfo}
                    orderBookData={data?.result?.orderBook}
                    marketTradesData={data?.result?.marketTrades}
                    setSelectedOrder={setSelectedOrder}
                    isAuthorised={isAuthorised}
                  />
                </Card>
              </Grid>

              <Grid item lg={12} md={12} pt={0.5}>
                <Card variant="outlined" sx={{ padding: '4px', paddingTop: '2px', paddingBottom: '1px' }}>
                  <Ordertable isAuthorised={isAuthorised} orderTableData={data?.result?.myOrders} priceData={data?.result?.priceInfo} />
                </Card>
              </Grid>
            </Grid>
          )}

          <Grid item xs={12} lg={2.5} pt={0.5} pr={0.5}>
            <Card variant="outlined" sx={{ padding: '14px' }}>
              <BuySellGrid
                isAuthorised={isAuthorised}
                selectedOrder={selectedOrder}
                orderBookData={data?.result?.orderBook}
                priceData={data?.result?.priceInfo}
                walletData={data?.result?.walletInfo}
                pairData={data?.result?.pairInfo}
                setSnackbarOpen={setSnackbarOpen}
                setSnackbarMessage={setSnackbarMessage}
              />
            </Card>
            <Card variant="outlined" sx={{ padding: '14px', mt: 0.5 }}>
              <FundsGrid isAuthorised={isAuthorised} walletData={data?.result?.walletInfo} priceData={data?.result?.priceInfo} />
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Lodergif />
      )}
      <CustomSnackBar
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        snackbarMessage={snackbarMessage && snackbarMessage.msg}
        success={snackbarMessage && snackbarMessage.success}
      />
    </>
  );
};
export default Spotpage;
