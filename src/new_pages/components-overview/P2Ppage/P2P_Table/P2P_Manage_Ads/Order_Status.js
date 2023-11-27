import React from 'react';

import { useTheme, Stack, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from "@mui/lab";

import CustomSnackBar from 'src/components/snackbar';
import HistoryTab from './Order_History';
import OngoingTab from './Order_OnGoing';

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
          <OngoingTab ongoing={orders?.ongoing} pairInfo={pairInfo} setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage} />
        </TabPanel>
        <TabPanel value="1" sx={{ pt: 0, pl: 0, pr: 0 }}>
          <HistoryTab history={orders?.history} pairInfo={pairInfo} />
        </TabPanel>
      </TabContext>
    </>
  )
}

export default Order_Status;