import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Card, Stack, Tab, useTheme } from '@mui/material';
import React, { useState } from 'react';
import MyOrders_Mblview from '../../OrderTable/Mobile_view/MyOrders_Mblview';
import HistoryTab_mblview from '../../OrderTable/Mobile_view/HistoryTab_mblview';
import FundsGrid from '../../FundsGrid/FundsGrid';

const OrderDeatilsTab_Mblview = ({ isAuthorised, platformId, orderTableData, setSnackbarOpen, setSnackbarMessage, walletData,
  priceData }) => {
  const theme = useTheme();

  const [value, setValue] = useState('0');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [hideCancelled, setHideCancelled] = React.useState(false);
  const cancelhandleChange = (event) => {
    setHideCancelled(event.target.checked);
  };

  return (
    <Stack pt={0.5}>
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
                Open Orders
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
                Order History
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
                Funds
              </div>
            }
            value="2"
          />
        </TabList>

        <TabPanel value="0" sx={{ padding: '0px' }}>
          <Card
            sx={{
              height: 520,
              overflowY: 'scroll',
              /* Custom scrollbar styles */
              scrollbarWidth: 'thin',
              scrollbarColor: 'gray lightgray',
              // height: '254px',
              '&::-webkit-scrollbar': {
                width: '0px', // Width of the scrollbar
              },
              '&::-webkit-scrollbar-track': {
                background: theme.palette.mode === "dark" ? 'transparent' : "transparent", // Track color
              },
              '&::-webkit-scrollbar-thumb': {
                background: theme.palette.mode === "dark" ? '#0F121A' : "lightgray",
                borderRadius: '8px', // Round the corners of the thumb
              },
             
              paddingBottom:'64px',
              background: theme.palette.mode === 'dark' ? '#131722' : 'text.cardbackground',
              boxShadow: '0'
            }}>
            <MyOrders_Mblview
              isAuthorised={isAuthorised}
              orderTableData={orderTableData}
              platformId={platformId}
              setSnackbarOpen={setSnackbarOpen}
              setSnackbarMessage={setSnackbarMessage}
            />
          </Card>
        </TabPanel>

        <TabPanel value="1" sx={{ padding: '0px' }}>
          <Card
            sx={{
              height: 520,
              overflowY: 'scroll',
              /* Custom scrollbar styles */
              scrollbarWidth: 'thin',
              scrollbarColor: 'gray lightgray',
              // height: '254px',
              '&::-webkit-scrollbar': {
                width: '0px', // Width of the scrollbar
              },
              '&::-webkit-scrollbar-track': {
                background: theme.palette.mode === "dark" ? 'transparent' : "transparent", // Track color
              },
              '&::-webkit-scrollbar-thumb': {
                background: theme.palette.mode === "dark" ? '#0F121A' : "lightgray",
                borderRadius: '8px', // Round the corners of the thumb
              },
              
              paddingBottom:'64px',
              background: theme.palette.mode === 'dark' ? '#131722' : 'text.cardbackground',
              boxShadow: '0'
            }}>
            <HistoryTab_mblview
              isAuthorised={isAuthorised}
              orderTableData={orderTableData}
              platformId={platformId}
              setSnackbarOpen={setSnackbarOpen}
              setSnackbarMessage={setSnackbarMessage}
              cancelhandleChange={cancelhandleChange}
              hideCancelled={hideCancelled}
            />
          </Card>
        </TabPanel>

        <TabPanel value="2" sx={{ padding: '0px' }}>
          <Card
            sx={{ height: 220,   background: theme.palette.mode === 'dark' ? '#131722' : 'text.cardbackground', boxShadow: '0' }}>
            <FundsGrid isAuthorised={isAuthorised} walletData={walletData} priceData={priceData} />
          </Card>
        </TabPanel>
      </TabContext>
    </Stack>

  )
}

export default OrderDeatilsTab_Mblview
