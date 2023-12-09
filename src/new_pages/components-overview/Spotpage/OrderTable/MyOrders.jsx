import { Checkbox, FormControlLabel, Grid, Stack, Typography, useTheme } from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import Tabs from '@mui/material/Tabs';

import TabList from '@mui/lab/TabList';
import { TabContext } from '@mui/lab';
import Tab from '@mui/material/Tab';

import HistoryTab from './HistoryTab';
import OpenTab from './OpenTab';
import React from 'react';

const MyOrders = ({ isAuthorised, platformId, orderTableData, setSnackbarOpen, setSnackbarMessage }) => {
  const [value, setValue] = React.useState('0');
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [hideCancelled, setHideCancelled] = React.useState(false);

  const cancelhandleChange = (event) => {
    setHideCancelled(event.target.checked);
  };

  const tabData = [{
    value: '0',
    label: 'Open Orders',
    screen: <OpenTab
      isAuthorised={isAuthorised}
      orderTableData={orderTableData}
      platformId={platformId}
      setSnackbarOpen={setSnackbarOpen}
      setSnackbarMessage={setSnackbarMessage}
    />
  },
  {
    value: '1',
    label: 'Order History',
    screen: <HistoryTab
      isAuthorised={isAuthorised}
      orderTableData={orderTableData}
      platformId={platformId}
      setSnackbarOpen={setSnackbarOpen}
      setSnackbarMessage={setSnackbarMessage}
      cancelhandleChange={cancelhandleChange}
      hideCancelled={hideCancelled}
    />
  }];

  return (
    <Grid>
      <TabContext value={value} >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row">
            <TabList onChange={handleChange} indicatorColor="none" textColor='inherit'>
              {tabData.map((tab, index) => (
                <Tab
                  disableRipple
                  key={index}
                  sx={{
                    paddingBottom: '0px',
                    paddingLeft: '12px',
                    minHeight: '0px',
                    minWidth: '0px',
                    fontSize: value === tab.value ? '14px' : '14px',
                    fontWeight: value === tab.value ? '600' : '500',
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
          </Stack>

          {value === tabData.find(tab => tab.value === '1')?.value ? (
            <FormControlLabel
              control={
                <Checkbox
                  disableRipple
                  checked={hideCancelled}
                  onChange={cancelhandleChange}
                  name="checked"
                  size="small"
                />
              }
              label={
                <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                  Hide Cancelled Orders
                </Typography>
              }
            />
          ) : (
            <></>
          )}


        </Stack>

        {tabData.map((tab, index) => (
          <TabPanel key={index} value={tab.value} sx={{ width: '100%', paddingTop: '0', paddingLeft: '0px', paddingRight: '0px' }}>
            {tab.screen}
          </TabPanel>
        ))}

      </TabContext>
    </Grid>
  );
};

export default MyOrders;