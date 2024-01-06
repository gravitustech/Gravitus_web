import { useTheme, Stack, Tab, Link } from '@mui/material';
import { TabContext, TabList, TabPanel } from "@mui/lab";

import CustomSnackBar from 'src/components/snackbar';
import HistoryTab from './Order_History';
import OngoingTab from './Order_OnGoing';

import React from 'react';
import Order_OnGoing_mbl from './Order_OnGoing_mbl';
import Order_History_mbl from './Order_History_mbl';

const Order_Status = ({ orders, pairInfo, setSnackbarOpen, setSnackbarMessage }) => {
  const [value, setValue] = React.useState("0");
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <>
      <TabContext value={value}>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <TabList onChange={handleChange} indicatorColor="none" textColor='inherit'>
            <Tab
              disableRipple
              sx={{
                paddingBottom: '0px',
                paddingLeft: { xs: '0px', sm: '0px', md: '10px', lg: '10px', },
                minHeight: '0px',
                minWidth: '0px',
                padding: '0',
                fontSize: value === '0' ? '16px' : '16px',
                fontWeight: value === '0' ? '700' : '400',
                color:
                  value === '0'
                    ? theme.palette.mode === 'dark'
                      ? 'text.secondarydark'
                      : 'text.secondary'
                    : theme.palette.mode === 'dark'
                      ? 'text.primarydark'
                      : 'text.primary',
                '&:hover': {
                  color: value === '0' ? theme.palette.mode === 'dark' ? 'text.white' : 'text.black' : theme.palette.mode === 'dark' ? 'text.white' : 'text.black',
                },
              }}
              label={<div style={{
                display: 'flex',
                alignItems: 'center',
              }}>
                Ongoing
              </div>}
              value="0" />
            <Tab
              disableRipple
              sx={{
                padding: '0',
                fontSize: value === '1' ? '16px' : '16px',
                fontWeight: value === '1' ? '700' : '400',
                color:
                  value === '1'
                    ? theme.palette.mode === 'dark'
                      ? 'text.secondarydark'
                      : 'text.secondary'
                    : theme.palette.mode === 'dark'
                      ? 'text.primarydark'
                      : 'text.primary',
                '&:hover': {
                  color: value === '1' ? theme.palette.mode === 'dark' ? 'text.white' : 'text.black' : theme.palette.mode === 'dark' ? 'text.white' : 'text.black',
                },
              }}
              label={<div style={{
                display: 'flex',
                alignItems: 'center',
              }}>
                History
              </div>}
              value="1" />
          </TabList>
        </Stack>

        <TabPanel value="0" sx={{ pt: 0, pl: 0, pr: 0 }}>
          <Stack display={{ xs: 'none', sm: 'block', md: 'block', lg: 'block' }}>
            <OngoingTab orders={orders} pairInfo={pairInfo} setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage} />
          </Stack>
          <Stack display={{ xs: 'block', sm: 'none', md: 'none', lg: 'none' }}
            sx={{
              width: '100%',
              maxWidth: '100%',
              '& td, & th': { whiteSpace: 'nowrap' },
              overflowY: 'scroll',
              /* Custom scrollbar styles */
              scrollbarWidth: 'thin',
              scrollbarColor: 'gray lightgray',
              height: '800px',
              '&::-webkit-scrollbar': {
                width: '0px', // Width of the scrollbar
              },
              '&::-webkit-scrollbar-track': {
                background: theme.palette.mode === "dark" ? 'transparent' : "transparent", // Track color
              },
              '&::-webkit-scrollbar-thumb': {
                background: theme.palette.mode === "dark" ? '#262B39' : "lightgray",
                borderRadius: '8px', // Round the corners of the thumb
              },
            }}
          >
            <Order_OnGoing_mbl orders={orders} pairInfo={pairInfo} setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage} />
          </Stack>
        </TabPanel>
        <TabPanel value="1" sx={{ pt: 0, pl: 0, pr: 0 }}>
          <Stack display={{ xs: 'none', sm: 'block', md: 'block', lg: 'block' }}>
            <HistoryTab orders={orders} pairInfo={pairInfo} />
          </Stack>
          <Stack display={{ xs: 'block', sm: 'none', md: 'none', lg: 'none' }}
            sx={{
              width: '100%',
              maxWidth: '100%',
              '& td, & th': { whiteSpace: 'nowrap' },
              overflowY: 'scroll',
              /* Custom scrollbar styles */
              scrollbarWidth: 'thin',
              scrollbarColor: 'gray lightgray',
              height: '800px',
              '&::-webkit-scrollbar': {
                width: '0px', // Width of the scrollbar
              },
              '&::-webkit-scrollbar-track': {
                background: theme.palette.mode === "dark" ? 'transparent' : "transparent", // Track color
              },
              '&::-webkit-scrollbar-thumb': {
                background: theme.palette.mode === "dark" ? '#262B39' : "lightgray",
                borderRadius: '8px', // Round the corners of the thumb
              },
            }}
          >
            <Order_History_mbl orders={orders} pairInfo={pairInfo} />
          </Stack>
        </TabPanel>
      </TabContext>
    </>
  )
}

export default Order_Status;