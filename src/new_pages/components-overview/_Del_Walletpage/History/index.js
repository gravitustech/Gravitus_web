import React from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Grid, Typography, Stack, Box, useTheme, Card, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import HistroyExternalTab from './HistroyExternalTab';
import HistroyInternalTab from './HistroyInternalTab';
import { fetcher, getWalletURLHistory } from '../../../../api/wallet';
import useSWR from 'swr';
import Lodergif from 'src/components/Gravitusloader';

const HistoryPage = () => {
  const location = useLocation();
  const { walletId } = location.state;
  console.log({ walletId });
  const theme = useTheme();

  const { data, error, isLoading } = useSWR(
    getWalletURLHistory(),
    (url) => fetcher(url, { accountType: 'GRAVITUS', postData: { walletId: walletId } })
    // { suspense: true }
  );

  console.log('res', data, error, isLoading, location);

  const [value, setValue] = React.useState('0');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }
  return (
    <>
      <Grid container pl={14} pr={15} pt={3} pb={5}>
        <Stack direction="row" spacing={0.8} alignItems="center">
          <IconButton disableRipple onClick={goBack}>
            <ArrowBackIosNewIcon
              pt={10}
              sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
            />
          </IconButton>

          <Typography variant="h1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            Wallet Histroy
          </Typography>
        </Stack>
      </Grid>

      {data ? (
        <Card
          sx={{
            border: 'none',
            width: '100%',
            borderRadius: '78px 78px 0px 0px',
            boxShadow: '0px 5.133836269378662px 35.31077575683594px 0px rgba(0, 0, 0, 0.01), 0px 41px 282px 0px rgba(0, 0, 0, 0.02)'
          }}
        >
          <Box
            pt={3}
            pb={3}
            pl={20}
            pr={15}
            lg={12}
            sx={{
              backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
            }}
          >
            <Stack>
              <TabContext value={value}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <TabList onChange={handleChange} indicatorColor="none" textColor="inherit">
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
                          External
                        </div>
                      }
                      value="0"
                    />
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
                          Internal
                        </div>
                      }
                      value="1"
                    />
                  </TabList>
                </Stack>

                <TabPanel value="0" sx={{ padding: '0px' }}>
                  <HistroyExternalTab tableData={data.result.external} />
                </TabPanel>
                <TabPanel value="1" sx={{ padding: '0px' }}>
                  <HistroyInternalTab tableData={data.result.internal} />
                </TabPanel>
              </TabContext>
            </Stack>
          </Box>
        </Card>
      ) : (
        <Lodergif />
      )}
    </>
  );
};

export default HistoryPage;
