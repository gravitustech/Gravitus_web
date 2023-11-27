import React, { useState, useEffect } from 'react';
import { useTheme, Stack, Button } from '@mui/material';
import { TabContext } from '@mui/lab';

import BuyLimitSellLimit from './BuyLimitSellLimit';

const BuySellGrid = ({ isAuthorised, pairData, priceData, selectedOrder,
  setSelectedOrder, walletData, setSnackbarOpen, setSnackbarMessage }) => {

  const theme = useTheme();
  const [value, setValue] = useState('0'); // BUY / SELL Tab

  const handleOptionChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if(selectedOrder != undefined) {
      if(selectedOrder.side == '0') {
        setValue('0');
      }
      else if(selectedOrder.side == '1') {
        setValue('1');
      }
    }
  }, [selectedOrder]);

  return (
    <TabContext value={value}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" width="100%">
          <Button
            disableRipple
            onClick={() => handleOptionChange('0')}
            sx={{
              fontSize: value === '0' ? '12px' : '12px',
              fontWeight: value === '0' ? '500' : '500',
              color:
                value === '0' ? (theme.palette.mode === 'dark' ? 'white' : 'white') : theme.palette.mode === 'dark' ? 'white' : 'black',
              backgroundColor:
                value === '0'
                  ? theme.palette.mode === 'dark'
                    ? 'text.buy'
                    : 'text.buy'
                  : theme.palette.mode === 'dark'
                  ? '#2B2B2E'
                  : '#ECECEC',
              borderRadius: '5px 0 0 5px',
              minHeight: '32px !important',
              width: '50%',
              padding: '0',
              '&:hover': {
                backgroundColor:
                  value === '0'
                    ? theme.palette.mode === 'dark'
                      ? 'text.buy'
                      : 'text.buy'
                    : theme.palette.mode === 'dark'
                    ? '#2B2B2E'
                    : '#ECECEC'
              }
            }}
          >
            Buy
          </Button>
          <Button
            disableRipple
            onClick={() => handleOptionChange('1')}
            sx={{
              fontSize: value === '1' ? '12px' : '12px',
              fontWeight: value === '1' ? '500' : '500',
              color:
                value === '1' ? (theme.palette.mode === 'dark' ? 'white' : 'white') : theme.palette.mode === 'dark' ? 'white' : 'black',
              backgroundColor:
                value === '1'
                  ? theme.palette.mode === 'dark'
                    ? 'text.sell'
                    : 'text.sell'
                  : theme.palette.mode === 'dark'
                  ? '#2B2B2E'
                  : '#ECECEC',
              borderRadius: '0 5px 5px 0',
              minHeight: '32px !important',
              width: '50%',
              padding: '0',
              '&:hover': {
                backgroundColor:
                  value === '1'
                    ? theme.palette.mode === 'dark'
                      ? 'text.sell'
                      : 'text.sell'
                    : theme.palette.mode === 'dark'
                    ? '#2B2B2E'
                    : '#ECECEC'
              }
            }}
          >
            Sell
          </Button>
        </Stack>
      </Stack>
      {value === '0' && (
        <BuyLimitSellLimit
          isAuthorised={isAuthorised}
          priceData={priceData}
          walletData={walletData}
          pairData={pairData}
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          setSnackbarOpen={setSnackbarOpen}
          setSnackbarMessage={setSnackbarMessage}
          flag="BUY"
        />
      )}
      {value === '1' && (
        <BuyLimitSellLimit
          isAuthorised={isAuthorised}
          priceData={priceData}
          walletData={walletData}
          pairData={pairData}
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          setSnackbarOpen={setSnackbarOpen}
          setSnackbarMessage={setSnackbarMessage}
          flag="SELL"
        />
      )}
    </TabContext>
  );
};

export default BuySellGrid;
