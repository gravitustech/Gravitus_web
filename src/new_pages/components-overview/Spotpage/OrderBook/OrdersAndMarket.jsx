
import { useTheme, Stack } from '@mui/material';
import { TabContext } from '@mui/lab';

import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';

import MarketTrades from './MarketTrades';
import OrderBook from './OrderBookDts';
import React from 'react';

const OrdersAndMarket = ({ priceData, orderBookData, marketTradesData, setSelectedOrder, isAuthorised}) => {
  const theme = useTheme();

  //orderbook value
  const [value, setValue] = React.useState('0');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //orderbook tabdata
  const tabData = [
    { value: '0', label: 'Order Book' },
    { value: '1', label: 'Market Trades ' }
  ];

  return (
    <TabContext value={value}>
      <TabList onChange={handleChange}
        aria-label="lab API tabs example"
        indicatorColor="none"
        textColor='inherit'
        >
        {tabData.map((tab) => (
          <Tab
          disableRipple
            key={tab.value}
            sx={{
              paddingBottom: '0px',
              paddingLeft: '0px',
              minHeight: '0px',
              minWidth: '0px',
              fontSize: value === tab.value ? '14px' : '14px',
              fontWeight: value === tab.value ? '500' : '400',
              color:
                value === tab.value
                  ? theme.palette.mode === 'dark'
                    ? 'text.secondarydark'
                    : 'text.secondary'
                  : theme.palette.mode === 'dark'
                    ? 'text.primarydark'
                    : 'text.primary',
                     '&:hover': {
                      color: value === tab.value ? theme.palette.mode === 'dark' ? 'text.white' : 'text.black' : theme.palette.mode === 'dark' ? 'text.white' : 'text.black',
                    },
            }}
            label={
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {tab.label}
              </div>
            }
            value={tab.value}
          />
        ))}
      </TabList>

      <TabPanel value="0" sx={{ padding: '0' }}>
        <OrderBook priceData={priceData} orderBookData={orderBookData} setSelectedOrder={setSelectedOrder} isAuthorised={isAuthorised}/>
      </TabPanel>

      <TabPanel value="1" sx={{ padding: '0' }}>
        <MarketTrades marketTradesData={marketTradesData} />
      </TabPanel>
    </TabContext>
  );
};

export default OrdersAndMarket;