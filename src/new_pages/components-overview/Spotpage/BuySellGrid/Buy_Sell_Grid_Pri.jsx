import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useTheme, Tab } from '@mui/material';

import BuySellGridExt from './Buy_Sell_Grid_Ext';
import React, { useState } from 'react';

const BuySellGridPri = ({ isAuthorised, platformId, priceData, pairData, walletData,
  selectedOrder, setSelectedOrder, setSnackbarOpen, setSnackbarMessage, orderSide, superSide }) => {
  
  const [orderTypeTab, setOrderTypeTab] = useState('0');
  const theme = useTheme();

  const changeOrderType = (event, newValue) => {
    setOrderTypeTab(newValue);
  };

  return (
    <TabContext value={orderTypeTab}>
      <TabList onChange={changeOrderType} indicatorColor="none" textColor="inherit">
        <Tab
          disableRipple
          sx={{
            paddingLeft: '0px',
            minHeight: '0px',
            minWidth: '0px',
            fontSize: orderTypeTab === '0' ? '12px' : '12px',
            fontWeight: orderTypeTab === '0' ? '500' : '400',
            color:
              orderTypeTab === '0'
                ? theme.palette.mode === 'dark'
                  ? 'text.secondarydark'
                  : 'text.secondary'
                : theme.palette.mode === 'dark'
                  ? 'text.primarydark'
                  : 'text.primary',
            '&:hover': {
            color:
              orderTypeTab === '0'
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
            fontSize: orderTypeTab === '1' ? '12px' : '12px',
            fontWeight: orderTypeTab === '1' ? '500' : '400',
            color:
              orderTypeTab === '1'
                ? theme.palette.mode === 'dark'
                  ? 'text.secondarydark'
                  : 'text.secondary'
                : theme.palette.mode === 'dark'
                  ? 'text.primarydark'
                  : 'text.primary',
            '&:hover': {
            color:
              orderTypeTab === '1'
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
        <BuySellGridExt
          isAuthorised={isAuthorised}
          platformId={platformId}
          priceData={priceData}
          pairData={pairData}
          walletData={walletData}
          selectedOrder={selectedOrder}
          setSnackbarOpen={setSnackbarOpen}
          setSnackbarMessage={setSnackbarMessage}
          setSelectedOrder={setSelectedOrder}
          // orderSide={orderSide}
          orderType="LIMIT"
          superSide={superSide}
          superType={orderTypeTab}
        />
      </TabPanel>

      <TabPanel value="1" sx={{ padding: '0px' }}>
        <BuySellGridExt
          isAuthorised={isAuthorised}
          platformId={platformId}
          priceData={priceData}
          pairData={pairData}
          walletData={walletData}
          selectedOrder={selectedOrder}
          setSnackbarOpen={setSnackbarOpen}
          setSnackbarMessage={setSnackbarMessage}
          setSelectedOrder={setSelectedOrder}
          // orderSide={orderSide}
          orderType="STOPLIMIT"
          superSide={superSide}
          superType={orderTypeTab}
        />
      </TabPanel>
    </TabContext>
  );
};

export default BuySellGridPri;