import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Button, Card, Stack, Tab, useTheme } from '@mui/material';
import React, { useState } from 'react';
import MarketTrades from '../../OrderBook/MarketTrades';
import OrderBookTab from '../../OrderBook/OrderBookDts';
import { TVChartContainer } from '../../_TVChartContainer';
import { getConfig_ng, setConfig_ng } from 'src/utils_ng/localStorage_ng';

const Chart_orderbook_Tabs = ({
  isAuthorised,
  orderBookData,
  marketTradesData,
  setSelectedOrder,
  priceData,
  exchangeType, pairData }) => {
  const theme = useTheme();

  const [value, setValue] = React.useState('0');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [selectedButton, setSelectedButton] = useState(getConfig_ng('excType'));

  function changeExcTypeButton(exchangeType) {
    setConfig_ng('excType', exchangeType);
    setSelectedButton(exchangeType);
  }

  const [excType, setExcType] = useState(getConfig_ng('excType'));

  function changeExcType(exchangeType) {
    setConfig_ng('excType', exchangeType);
    setExcType(exchangeType);
  }

  return (
    <Stack>
      <TabContext value={value}>
        <TabList onChange={handleChange} indicatorColor="none" textColor="inherit">
          <Tab
            disableRipple
            sx={{
              paddingLeft: '0px',
              minHeight: '0px',
              minWidth: '10px',
              fontSize: value === '0' ? '14px' : '14px',
              fontWeight: value === '0' ? '700' : '500',
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
                Chart
              </div>
            }
            value="0"
          />
          <Tab
            disableRipple
            sx={{
              paddingLeft: '6px',
              minHeight: '0px',
              minWidth: '0px',
              fontSize: value === '1' ? '14px' : '14px',
              fontWeight: value === '1' ? '700' : '500',
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
                Order Book
              </div>
            }
            value="1"
          />
          <Tab
            disableRipple
            sx={{
              paddingLeft: '6px',
              minWidth: '0',
              fontSize: value === '2' ? '14px' : '14px',
              fontWeight: value === '2' ? '700' : '500',
              color:
                value === '2'
                  ? theme.palette.mode === 'dark'
                    ? 'text.secondarydark'
                    : 'text.secondary'
                  : theme.palette.mode === 'dark'
                    ? 'text.primarydark'
                    : 'text.primary',
              '&:hover': {
                color:
                  value === '2'
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
                Trades
              </div>
            }
            value="2"
          />
        </TabList>

        <TabPanel value="0" sx={{ padding: '0px' }}>
          {pairData?.cmc_chart === 1 && (
            <Stack pb={1} direction='row' alignItems='center' spacing={3}>
              <Stack direction='row'>
                <Button
                  disableRipple
                  onClick={() => {
                    changeExcType('GRA');
                    changeExcTypeButton('GRA');
                  }}
                  sx={{
                    height: '50%',
                    borderRadius: '5px 0 0 5px',
                    minHeight: '32px !important',
                    fontSize: selectedButton === 'GRA' ? '12px' : '12px',
                    fontWeight: selectedButton === 'GRA' ? '500' : '500',
                    color: selectedButton === 'GRA' ? (theme.palette.mode === 'dark' ? 'text.white' : 'text.white') : theme.palette.mode === 'dark' ? 'text.white' : 'text.black',
                    backgroundColor: selectedButton === 'GRA' ? 'text.buy' : (theme.palette.mode === 'dark' ? '#1F2434' : '#F1F1F1'),
                    '&:hover': {
                      backgroundColor: selectedButton === 'GRA' ? 'text.buy' : (theme.palette.mode === 'dark' ? '#1F2434' : '#F1F1F1'),
                    },
                  }}
                >
                  GRA
                </Button>
                <Button
                  disableRipple
                  onClick={() => {
                    changeExcType('CMC');
                    changeExcTypeButton('CMC');
                  }}
                  sx={{
                    borderRadius: '0 5px 5px 0',
                    height: '50%',
                    minHeight: '32px !important',
                    fontSize: selectedButton === 'CMC' ? '12px' : '12px',
                    fontWeight: selectedButton === 'CMC' ? '500' : '500',
                    color: selectedButton === 'CMC' ? (theme.palette.mode === 'dark' ? 'white' : 'white') : theme.palette.mode === 'dark' ? 'white' : 'black',
                    backgroundColor: selectedButton === 'CMC' ? 'text.buy' : (theme.palette.mode === 'dark' ? '#1F2434' : '#F1F1F1'),
                    padding: '0',
                    '&:hover': {
                      backgroundColor: selectedButton === 'CMC' ? 'text.buy' : (theme.palette.mode === 'dark' ? '#1F2434' : '#F1F1F1'),
                    },
                  }}
                >
                  CMC
                </Button>
              </Stack >
            </Stack>
          )}
          <Card
            sx={{ height: 480, background: theme.palette.mode === 'dark' ? '#131722' : 'text.cardbackground', boxShadow: '0' }}>
            <TVChartContainer exchangeType={excType} pairData={pairData} />
          </Card>
        </TabPanel>

        <TabPanel value="1" sx={{ padding: '0px' }}>
          <Card
            sx={{ height: 480, background: theme.palette.mode === 'dark' ? '#131722' : 'text.cardbackground', boxShadow: '0' }}>
            <OrderBookTab isAuthorised={isAuthorised}
              priceData={priceData}
              orderBookData={orderBookData}
              marketTradesData={marketTradesData}
              setSelectedOrder={setSelectedOrder} />
          </Card>
        </TabPanel>

        <TabPanel value="2" sx={{ padding: '0px' }}>
          <Card
            sx={{ height: 480, background: theme.palette.mode === 'dark' ? '#131722' : 'text.cardbackground', boxShadow: '0' }}>
            <MarketTrades marketTradesData={marketTradesData} />
          </Card>
        </TabPanel>
      </TabContext>
    </Stack>

  )
}

export default Chart_orderbook_Tabs;
