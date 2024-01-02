import React from 'react';
import { Stack, useTheme } from '@mui/material';

import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import MarketTable from './MarketTable';
import USDTTable from './UsdtTable';
import INRTable from './InrTable';
import MarketTable_Mobile from './MarketTable_Mobile';

const SpotTabs = ({ marketData, searchQuery, listings, setPlatformId }) => {
  const [value, setValue] = React.useState('0');
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
              USDT
            </div>
          }
          value="0"
        />
        <Tab
          disableRipple
          sx={{
            paddingLeft: '0px',
            minHeight: '0px',
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
              INR
            </div>
          }
          value="1"
        />
      </TabList>
      <TabPanel value="0" sx={{ padding: '0px' }}>
        <Stack display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
          <MarketTable flag="USDT" marketData={marketData} searchQuery={searchQuery} listings={listings} setPlatformId={setPlatformId} />
        </Stack>
        <Stack display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}>
          <MarketTable_Mobile flag="USDT" marketData={marketData} searchQuery={searchQuery} listings={listings} setPlatformId={setPlatformId} />
        </Stack>
      </TabPanel>
      <TabPanel value="1" sx={{ padding: '0px' }}>
        <Stack display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
          <MarketTable flag="INR" marketData={marketData} searchQuery={searchQuery} listings={listings} setPlatformId={setPlatformId} />
        </Stack>
        <Stack display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}>
          <MarketTable_Mobile flag="INR" marketData={marketData} searchQuery={searchQuery} listings={listings} setPlatformId={setPlatformId} />
        </Stack>
      </TabPanel>
    </TabContext>
  );
};

export default SpotTabs;