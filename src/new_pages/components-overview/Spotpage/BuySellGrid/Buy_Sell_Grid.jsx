import { useTheme, Stack, Button } from '@mui/material';
import { TabContext } from '@mui/lab';

import BuySellGridPri from './Buy_Sell_Grid_Pri';
import React, { useState, useEffect } from 'react';

const BuySellGrid = ({ isAuthorised, platformId, pairData, priceData, selectedOrder,
  setSelectedOrder, walletData, setSnackbarOpen, setSnackbarMessage }) => {

  const [orderSide, setOrderSide] = useState('1');
  const theme = useTheme();

  const changeOrderSide = (newValue) => {
    setOrderSide(newValue);
  };

  useEffect(() => {
    if(selectedOrder != undefined) {
      if(selectedOrder.side == '2') {
        setOrderSide('1');
      }
      else if(selectedOrder.side == '1') {
        setOrderSide('2');
      }
    }
  }, [selectedOrder]);

  return (
    <TabContext value={orderSide}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" width="100%">
          <Button
            disableRipple
            onClick={() => changeOrderSide('1')}
            sx={{
              fontSize: orderSide === '1' ? '12px' : '12px',
              fontWeight: orderSide === '1' ? '500' : '500',
              color:
              orderSide === '1' ? (theme.palette.mode === 'dark' ? 'white' : 'white') : theme.palette.mode === 'dark' ? 'white' : 'black',
              backgroundColor:
              orderSide === '1'
                  ? theme.palette.mode === 'dark'
                    ? 'text.buy'
                    : 'text.buy'
                  : theme.palette.mode === 'dark'
                  ? '#262b39'
                  : '#F1F1F1',
              borderRadius: '5px 0 0 5px',
              minHeight: '32px !important',
              width: '50%',
              padding: '0',
              '&:hover': {
                backgroundColor:
                  orderSide === '1'
                    ? theme.palette.mode === 'dark'
                      ? 'text.buy'
                      : 'text.buy'
                    : theme.palette.mode === 'dark'
                    ? '#262b39'
                    : '#F1F1F1'
              }
            }}
          >
            Buy
          </Button>
          <Button
            disableRipple
            onClick={() => changeOrderSide('2')}
            sx={{
              fontSize: orderSide === '2' ? '12px' : '12px',
              fontWeight: orderSide === '2' ? '500' : '500',
              color:
              orderSide === '2' ? (theme.palette.mode === 'dark' ? 'white' : 'white') : theme.palette.mode === 'dark' ? 'white' : 'black',
              backgroundColor:
                orderSide === '2'
                  ? theme.palette.mode === 'dark'
                    ? 'text.sell'
                    : 'text.sell'
                  : theme.palette.mode === 'dark'
                  ? '#262b39'
                  : '#F1F1F1',
              borderRadius: '0 5px 5px 0',
              minHeight: '32px !important',
              width: '50%',
              padding: '0',
              '&:hover': {
                backgroundColor:
                  orderSide === '2'
                    ? theme.palette.mode === 'dark'
                      ? 'text.sell'
                      : 'text.sell'
                    : theme.palette.mode === 'dark'
                    ? '#262b39'
                    : '#F1F1F1'
              }
            }}
          >
            Sell
          </Button>
        </Stack>
      </Stack>

      <BuySellGridPri
        isAuthorised={isAuthorised}
        platformId={platformId}
        priceData={priceData}
        pairData={pairData}
        walletData={walletData}
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        setSnackbarOpen={setSnackbarOpen}
        setSnackbarMessage={setSnackbarMessage}
        // orderSide={'BUY'} // "BUY" | "SELL"
        superSide={orderSide}
      />
    </TabContext>
  );
};

export default BuySellGrid;