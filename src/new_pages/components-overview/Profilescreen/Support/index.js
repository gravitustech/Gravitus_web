import React, { useState } from 'react';

import {
  Grid, Box,
  useTheme, Card, IconButton, Typography, Stack, Tab
} from '@mui/material';

import useSWR from 'swr';

import SupportScreen from './Support';
import SupportSteps from './supportsteps';
import Tickethistroy from './Tickethistroy';

import supportimagelight from '../../../../assets/images/gravitusimage/supportimagelight.svg';
import supportimagedark from '../../../../assets/images/gravitusimage/supportimagedark.svg';

import { mutate } from 'swr';
import { Ticket_History, fetcherSystem } from 'src/api_ng/system_ng';
import { StackedBarChart } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Tickethistroytab from './Tickethistroytable';
import Tickethistorytable_mbl from './Tickethistorytable_mbl';

const Support = ({ setSnackbarMessage, setSnackbarOpen }) => {
  const theme = useTheme();

  function useSupportHistory() {
    var postData = { accountType: 'GRAVITUS' };

    const { data, error, isLoading, mutate } = useSWR([Ticket_History(), postData], fetcherSystem, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data, error, isLoading, mutate };
  }

  const { data, error, isLoading, mutate } = useSupportHistory();

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  const [value, setValue] = React.useState('0');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container pl={0}
        pr={{ xs: 0, sm: 0, md: 2, lg: 2 }}
        pb={{ xs: 0, sm: 0, md: 3, lg: 3 }}
        spacing={{ xs: 0, sm: 0, md: 2, lg: 2 }}>
        <Grid item md={12} lg={12} display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
          <img
            src={theme.palette.mode === 'dark' ? supportimagedark : supportimagelight}
            alt="supportimagelight" style={{ width: '100%', height: 'auto' }} />
        </Grid>

        <Grid
          width='100%'
          display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}
          sx={{ backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground' }}
        >
          <Stack direction="row" spacing={1} alignItems='center' pb={1} justifyContent='space-between'>
            <Stack pl={1} spacing={1} justifyContent='start' direction='row' alignItems='center'>
              <IconButton onClick={goBack} disableRipple>
                <ArrowBackIcon
                  sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                />
              </IconButton>
              <Stack justifyContent='start'>
                <Typography variant="h4" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                  Support
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
        <Grid
          pl={2}
          width='100%'
          display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}
          sx={{
            minHeight: { xs: 'calc(107vh - 134px)', md: 'calc(107vh - 112px)' },
            backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
          }}
        >
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
                    Create Ticket
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
                    History
                  </div>
                }
                value="1"
              />

            </TabList>

            <TabPanel value="0" sx={{ padding: '0px' }}>
              <Stack
                variant="outlined"
                sx={{
                  borderColor: theme.palette.mode === 'dark' ? '#232730' : '#ececec',
                  backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
                }}
              >
                <SupportScreen setSnackbarMessage={setSnackbarMessage} setSnackbarOpen={setSnackbarOpen} mutate={mutate} />
              </Stack>
            </TabPanel>

            <TabPanel value="1" sx={{ padding: '0px' }}>
              {data &&
                <Tickethistorytable_mbl historyData={data?.result} />
              }
            </TabPanel>

          </TabContext>
        </Grid>


        <Grid item md={6} lg={6}
          display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}
        >
          <Card
            variant="outlined"
            sx={{
              borderColor: theme.palette.mode === 'dark' ? '#232730' : '#ececec',
              backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
            }}
          >
            <SupportScreen setSnackbarMessage={setSnackbarMessage} setSnackbarOpen={setSnackbarOpen} mutate={mutate} />
          </Card>
        </Grid>
        <Grid item md={6} lg={6}
          display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}
        >
          <Card
            variant="outlined"
            sx={{
              borderColor: theme.palette.mode === 'dark' ? '#232730' : '#ececec',
              backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
            }}
          >
            <SupportSteps />
          </Card>
        </Grid>

        <Grid item md={12} lg={12} display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }} >
          {data &&
            <Tickethistroy historyData={data?.result} />}
        </Grid>
      </Grid>
    </Box >
  );
};

export default Support;
