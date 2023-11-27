import React, { useState } from 'react';
import { TabContext } from '@mui/lab';
import { useTheme, Stack, Button } from '@mui/material';
import BuyLimitStoplimittab from './BuyLimitStoplimittab';
import BuyLimitSellLimit from './BuyLimitSellLimit';

const BuySellGrid = ({
  isAuthorised,
  priceData,
  selectedOrder,
  setSnackbarOpen,
  setSnackbarMessage,
  walletData,
  orderBookData,
  pairData
}) => {
  const theme = useTheme();
  // buy/sell value
  const [value, setValue] = useState('0');
  // console.log(priceData, isAuthorised);

  const handleOptionChange = (newValue) => {
    setValue(newValue);
  };

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
          orderBookData={orderBookData}
          selectedOrder={selectedOrder}
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
          orderBookData={orderBookData}
          selectedOrder={selectedOrder}
          setSnackbarOpen={setSnackbarOpen}
          setSnackbarMessage={setSnackbarMessage}
          flag="SELL"
        />
      )}
    </TabContext>
  );
};

export default BuySellGrid;
