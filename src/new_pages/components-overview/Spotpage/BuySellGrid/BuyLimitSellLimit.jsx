import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useTheme, Tab } from '@mui/material';

import BuySelloder from './BuySellorder';
import React, { useState } from 'react';

const BuyLimitSellLimit = ({ isAuthorised, platformId, priceData, pairData, selectedOrder, flag, 
  walletData, orderBookData, setSelectedOrder, setSnackbarOpen, setSnackbarMessage }) => {
  
  const [value, setValue] = useState('0');
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <TabList onChange={handleChange} indicatorColor="none" textColor="inherit">
        <Tab
          disableRipple
          sx={{
            paddingLeft: '0px',
            minHeight: '0px',
            minWidth: '0px',
            fontSize: value === '0' ? '12px' : '12px',
            fontWeight: value === '0' ? '500' : '400',
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
              Limit
            </div>
          }
          value={'0'}
        />

        <Tab
          disableRipple
          key={'1'}
          sx={{
            paddingLeft: '12px',
            minHeight: '0px',
            minWidth: '0px',
            fontSize: value === '1' ? '12px' : '12px',
            fontWeight: value === '1' ? '500' : '400',
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
              Stop Limit
            </div>
          }
          value={'1'}
        />
      </TabList>

      <TabPanel value="0" sx={{ padding: '0px' }}>
        <BuySelloder
          isAuthorised={isAuthorised}
          platformId={platformId}
          priceData={priceData}
          walletData={walletData}
          pairData={pairData}
          orderBookData={orderBookData}
          selectedOrder={selectedOrder}
          setSnackbarOpen={setSnackbarOpen}
          setSnackbarMessage={setSnackbarMessage}
          setSelectedOrder={setSelectedOrder}
          flag={flag}
          orderType="LIMIT"
        />
      </TabPanel>

      <TabPanel value="1" sx={{ padding: '0px' }}>
        <BuySelloder
          isAuthorised={isAuthorised}
          platformId={platformId}
          priceData={priceData}
          walletData={walletData}
          pairData={pairData}
          orderBookData={orderBookData}
          selectedOrder={selectedOrder}
          setSnackbarOpen={setSnackbarOpen}
          setSnackbarMessage={setSnackbarMessage}
          setSelectedOrder={setSelectedOrder}
          flag={flag}
          orderType="STOPLIMIT"
        />
      </TabPanel>
    </TabContext>
  );
};

export default BuyLimitSellLimit;
