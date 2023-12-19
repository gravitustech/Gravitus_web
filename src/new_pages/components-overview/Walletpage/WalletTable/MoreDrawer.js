import React from 'react';

import { Typography, Box, Stack, Grid, Divider, useTheme, Tab } from '@mui/material';
import { TabContext, TabPanel, TabList } from "@mui/lab";

import ExternalTab from './MoreEssentials/ExternalTab';
import InternalTab from './MoreEssentials/InternalTab';
import ScheduleTab from './ScheduleTab';

const MoreDrawer = ({ walletListing, walletData }) => {
  const theme = useTheme();
  
  const [value, setValue] = React.useState("0");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const ExternalData = walletData?.external;
  const InternalData = walletData?.internal;
  const ScheduleData = walletData?.schedules;

  return (
    <>
      <Grid pl={4} >
        <Stack direction="row" spacing={1} alignItems="center">
          <img src={walletListing?.additionalI} alt="ico" width="32" height="32" />

          <Stack direction='column'>
            <Typography variant='title1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }} >
              {walletListing?.crypto} ({walletListing?.ticker})
            </Typography>
            <Typography variant='body2' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
              {walletListing?.networkInfo}
            </Typography>
          </Stack>
        </Stack>

        <Stack pt={3} spacing={2}>
          <Typography variant='title1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            Available Balance
          </Typography>
          <Stack direction='row' justifyContent='space-between'>
            <Stack direction='column' spacing={2} >
              <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                In {walletListing?.ticker}
              </Typography>
              <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                In USD
              </Typography>
            </Stack>

            <Stack direction='column' pr={4} spacing={2} alignItems='end' >
              <Typography variant='title1' sx={{ color: theme.palette.mode === 'dark' ? 'text.buy' : 'text.buy' }}>
                {walletData?.totalCrypto} {walletListing?.ticker}
              </Typography>
              <Typography variant='title1' sx={{ color: theme.palette.mode === 'dark' ? 'text.buy' : 'text.buy' }}>
                {walletData?.totalInUsd} USD
              </Typography>
            </Stack>
          </Stack>
          <Grid pr={4} >
            <Divider></Divider>
          </Grid>
        </Stack>

        <Stack pt={2} spacing={2}>
          <Typography variant='title1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            Spot
          </Typography>
          <Stack direction='row' justifyContent='space-between'>
            <Stack direction='column' spacing={2} >
              <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                In Order
              </Typography>
              <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                In Vesting
              </Typography>
            </Stack>

            <Stack direction='column' pr={4} spacing={2} alignItems='end' >
              <Typography variant='title1' sx={{ color: theme.palette.mode === 'dark' ? 'text.buy' : 'text.buy' }}>
                {walletData?.walletInfo?.sOrders} {walletListing?.ticker}
              </Typography>
              <Typography variant='title1' sx={{ color: theme.palette.mode === 'dark' ? 'text.buy' : 'text.buy' }}>
                {walletData?.walletInfo?.sVesting} {walletListing?.ticker}
              </Typography>
            </Stack>
          </Stack>

          {['Rupees', 'Tether'].includes(walletListing?.crypto) && (
            <>
              <Grid pr={4}>
                <Divider></Divider>
              </Grid>
              <Typography variant='title1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                P2P
              </Typography>
              <Stack spacing={2} direction='row' justifyContent='space-between'>
                <Stack direction='column' spacing={2}>
                  <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                    In Order
                  </Typography>
                  <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                    In Vesting
                  </Typography>
                </Stack>

                <Stack direction='column' pr={4} spacing={2} alignItems='end'>
                  <Typography variant='title1' sx={{ color: theme.palette.mode === 'dark' ? 'text.buy' : 'text.buy' }}>
                    {walletData?.walletInfo?.pOrders} {walletListing?.ticker}
                  </Typography>
                  <Typography variant='title1' sx={{ color: theme.palette.mode === 'dark' ? 'text.buy' : 'text.buy' }}>
                    {walletData?.walletInfo?.pListing} {walletListing?.ticker}
                  </Typography>
                </Stack>
              </Stack>
            </>
          )}
        </Stack>
      </Grid>

      <Box pl={2.4} pt={2}>
        <Grid pl={2} pr={4} pb={2}>
          <Divider></Divider>
        </Grid>
        <Stack direction='row' alignItems='center' justifyContent='space-between' pr={4}>
          <Typography pl={2} pb={1} variant='title1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            History
          </Typography>
          <Typography variant='body2' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }} pl={2} >
            Last 25 Transactions
          </Typography>
        </Stack>

        <TabContext value={value}>
          <TabList onChange={handleChange} indicatorColor="none" textColor='inherit'>
            <Tab
              disableRipple
              sx={{
                fontSize: value === '0' ? '16px' : '16px',
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
                  color: value === '0' ? theme.palette.mode === 'dark' ? 'text.white' : 'text.black' : theme.palette.mode === 'dark' ? 'text.white' : 'text.black',
                },
              }}
              label={<div style={{
                display: 'flex',
                alignItems: 'center',
              }}>

                External
              </div>}
              value="0" />
            <Tab
              disableRipple
              sx={{
                fontSize: value === '1' ? '16px' : '16px',
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
                  color: value === '1' ? theme.palette.mode === 'dark' ? 'text.white' : 'text.black' : theme.palette.mode === 'dark' ? 'text.white' : 'text.black',
                },
              }}
              label={<div style={{
                display: 'flex',
                alignItems: 'center',
              }}>
                Internal
              </div>}
              value="1"
            />

            {walletListing?.crypto === 'Gravitus' && (
              <Tab
                disableRipple
                sx={{
                  fontSize: value === '2' ? '16px' : '16px',
                  fontWeight: value === '2' ? '500' : '400',
                  color:
                    value === '2'
                      ? theme.palette.mode === 'dark'
                        ? 'text.secondarydark'
                        : 'text.secondary'
                      : theme.palette.mode === 'dark'
                        ? 'text.primarydark'
                        : 'text.primary',
                  '&:hover': {
                    color: value === '2' ? theme.palette.mode === 'dark' ? 'text.white' : 'text.black' : theme.palette.mode === 'dark' ? 'text.white' : 'text.black',
                  },
                }}
                label={<div style={{
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  Schedule
                </div>}
                value="2"
              />
            )}
          </TabList>

          <TabPanel value="0" sx={{ pt: 0, pl: 0 }}>
            <ExternalTab externalData={ExternalData} />
          </TabPanel>

          <TabPanel value="1" sx={{ pt: 0, pl: 0 }}>
            <InternalTab internalData={InternalData} />
          </TabPanel>

          {walletListing?.crypto === 'Gravitus' && (
            <TabPanel value="2" sx={{ pt: 0, pl: 0 }}>
              <ScheduleTab scheduleData={ScheduleData} />
            </TabPanel>
          )}

        </TabContext>
      </Box>
    </>
  )
}

export default MoreDrawer;
