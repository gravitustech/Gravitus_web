import React from 'react';

import { Typography, Box, Stack, Grid, Divider, useTheme } from '@mui/material';
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import TabList from "@mui/lab/TabList";

import ExternalTab from './ExternalTab';
import InternalTab from './InternalTab';



const BitcoinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.6409 14.9029C22.0381 21.3315 15.5262 25.2438 9.09605 23.6407C2.66863 22.038 -1.24415 15.5265 0.359423 9.09837C1.96159 2.66903 8.47348 -1.24361 14.9016 0.359081C21.3313 1.96177 25.2438 8.47404 23.6408 14.903L23.6409 14.9029H23.6409Z" fill="#F7931A" />
    <path d="M17.2923 10.2903C17.5312 8.69333 16.3153 7.83492 14.6526 7.26227L15.192 5.09908L13.875 4.77096L13.3499 6.8772C13.0037 6.79086 12.6482 6.70951 12.2948 6.62886L12.8237 4.50872L11.5075 4.1806L10.9679 6.34309C10.6814 6.27787 10.4 6.21341 10.1269 6.14548L10.1285 6.13868L8.31237 5.68522L7.96204 7.09165C7.96204 7.09165 8.93911 7.31559 8.91852 7.32937C9.45181 7.46246 9.54825 7.81545 9.53223 8.09523L8.91781 10.5596C8.95453 10.5689 9.00217 10.5824 9.05473 10.6035C9.01079 10.5926 8.96404 10.5807 8.91552 10.5691L8.05431 14.0214C7.98914 14.1834 7.82372 14.4265 7.45086 14.3342C7.46406 14.3533 6.49369 14.0953 6.49369 14.0953L5.83984 15.6026L7.55364 16.0298C7.87246 16.1098 8.1849 16.1934 8.49258 16.2721L7.94761 18.4601L9.26304 18.7882L9.80272 16.6234C10.1621 16.721 10.5108 16.8109 10.8522 16.8958L10.3144 19.0503L11.6314 19.3784L12.1763 17.1945C14.422 17.6195 16.1105 17.4482 16.8213 15.4172C17.394 13.782 16.7928 12.8388 15.6113 12.2238C16.4718 12.0253 17.12 11.4594 17.2928 10.2904L17.2924 10.2902L17.2923 10.2903ZM14.2834 14.5091C13.8764 16.1443 11.123 15.2603 10.2302 15.0387L10.9534 12.14C11.8461 12.3628 14.7088 12.8038 14.2835 14.5091H14.2834ZM14.6907 10.2666C14.3194 11.7539 12.0277 10.9983 11.2843 10.813L11.9399 8.18403C12.6834 8.36933 15.0774 8.71515 14.6908 10.2666H14.6907Z" fill="white" />
  </svg>
);

const MoreDrawerContent = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState("0");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (

    <><Grid pl={4} pt={2}>
      <Stack direction="row" spacing={2}>
        <BitcoinIcon />
        <Stack direction='column' spacing={0.5}>
          <Typography variant='title1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }} >Bitcoin</Typography>
          <Typography variant='body2' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>Smart Chain</Typography>
        </Stack>
      </Stack>

      <Stack direction='column' spacing={2} pt={5}>
        <Typography variant='title1' color="text.buy">
          Estimated Balance
        </Typography>
        <Typography variant='h1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          0.0000000000
        </Typography>
      </Stack>

      <Stack direction='row' pt={5} spacing={5}>
        <Stack spacing={2}>
          <Typography variant='title2' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            Spot
          </Typography>
          <Stack direction='row' spacing={11}>
            <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
              In Order
            </Typography>
            <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
              0.0000
            </Typography>
          </Stack>
          <Stack direction='row' justifyContent='space-between'>
            <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
              In Vesting
            </Typography>
            <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
              0.0000
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={2}>
          <Typography variant='title2' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            P2P
          </Typography>
          <Stack direction='row' spacing={11} sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
            <Typography variant='body1' >
              In Order
            </Typography>
            <Typography variant='body1'  >
              0.0000
            </Typography>
          </Stack>
          <Stack direction='row' justifyContent='space-between'>
            <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
              In Listings
            </Typography>
            <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
              0.0000
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Typography variant='h3' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }} pt={5}>
        History
      </Typography>
    </Grid><Box pl={2.4} pt={3}>
        <TabContext value={value}>
          <Stack direction='row' alignItems='center' justifyContent='space-between' pr={4}>
            <TabList onChange={handleChange} indicatorColor="none" textColor='inherit'>
              <Tab
                disableRipple
                sx={{
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

                  External
                </div>}
                value="0" />
              <Tab
                disableRipple
                sx={{
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
                  Internal
                </div>}
                value="1" />
            </TabList>
            <Typography variant='body2' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }} pl={2} >
              Last 25 Transactions
            </Typography>
          </Stack>
          <Grid pl={2} pr={4}>
            <Divider>
            </Divider>
          </Grid>

          <TabPanel value="0" sx={{ pt: 0, pl: 0 }}>
            <ExternalTab />
          </TabPanel>
          <TabPanel value="1" sx={{ pt: 0, pl: 0 }}>
            <InternalTab />
          </TabPanel>
        </TabContext>
      </Box></>

  )
}

export default MoreDrawerContent;
