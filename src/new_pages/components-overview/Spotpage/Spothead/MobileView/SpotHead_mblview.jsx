import React, { useState } from 'react';

import {
  Typography, useTheme, Stack, IconButton, ClickAwayListener, Paper,
  Popper, Card, Divider, ButtonGroup, Box, Button, Drawer
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

import InputBase from '@mui/material/InputBase';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import FavouriteTab from '../FavouriteTab';
import MarketTable from '../MarketTable';
import { MarketOverview_URL, fetcherSystem } from 'src/api_ng/system_ng';
import { getConfig_sp } from 'src/utils_ng/localStorage_ng';
import useSWR from 'swr';
import FavouriteTab_Mobile_Spot from './Fav_mbl';
import MarketTable_Mobile_Spot from './Market_mbl';



const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1, 5),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'end',
  justifyContent: 'end',
  right: 5,
  top: 32
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(0)})`
  }
}));

function getColor(value, theme) {
  if (value > 0) {
    return 'text.buy';
  } else if (value < 0) {
    return 'text.sell';
  } else {
    return theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary';
  }
}

const SpotHead_Mobileview = ({ pairData, priceData, setPlatformId, excType, changeExcType }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();

  function useMarketOverview() {
    var postData = { "callfrom": 'markets', 'superId': getConfig_sp().userId };

    const { data, error, isLoading } = useSWR([MarketOverview_URL(), postData], fetcherSystem, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data, error, isLoading };
  }

  const { data: MarketRc, error } = useMarketOverview();
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let textColor = 'grey'; // Default color for 0 or other cases
  if (value > 0) {
    textColor = 'green';  // Change color to green for positive values
  } else if (value < 0) {
    textColor = 'red';    // Change color to red for negative values
  }

  const [state, setState] = React.useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const drawerClose = () => {
    setState(false)
  }

  return (
    <>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Stack spacing={1} direction="row"  >
          <img src={priceData?.imagePath} alt="ico" height={32} width={32} />
          <Stack >
            <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
              {priceData?.tradePair}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
              {pairData?.buyNetwork}
            </Typography>
          </Stack>
          {["bottom"].map((anchor) => (
            <React.Fragment key={anchor}>
              <IconButton disableRipple onClick={toggleDrawer(anchor, true)} sx={{ paddingTop: '0px', borderRadius: '50%', backgroundColor: 'transparent' }}>
                <ArrowDropDownIcon fontSize="large" />
              </IconButton>
              <Drawer
                backgroundColor='transparent'
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                PaperProps={{
                  style: {
                    borderRadius: '15px 15px 0px 0px',
                  },
                }}
              >
                <Card
                  // variant="outlined"
                  sx={{
                    // border: theme.palette.mode === 'dark' ? '0.5px solid #262626' : '1px solid #fff',
                    // height: '643px',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground',
                    paddingLeft: { xs: '16px', sm: '24px' }, paddingRight: { xs: '16px', sm: '24px' },
                    paddingTop: { xs: '16px', sm: '16px' },
                    paddingBottom: { xs: '16px', sm: '16px' },
                  }}
                >
                  <Stack>
                    <Stack direction='row' spacing={0.5} justifyContent="space-between">
                      <Typography pb={2}
                        variant='body1'
                        sx={{
                          color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary'
                        }}>
                        Martket
                      </Typography>
                      <CloseIcon fontSize="small" onClick={toggleDrawer(anchor, false)} sx={{
                        color: theme.palette.mode === 'dark' ? 'text.primary' : 'text.primary'
                      }} />
                    </Stack>

                    <StyledInputBase
                      sx={{
                        height: '100%',
                        borderRadius: '5px',
                        width: '100%',
                        borderColor: theme.palette.mode === 'dark' ? '#31384b' : 'text.tertiary',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        backgroundColor: 'transparent',
                        color: theme.palette.mode === 'dark' ? 'text.white' : 'text.black'
                      }}
                      placeholder="Search Coin Pair"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      inputProps={{ 'aria-label': 'search' }}
                      endAdornment={
                        <SearchIconWrapper>
                          <SearchIcon
                            sx={{
                              color: theme.palette.mode === 'dark' ? 'text.primary' : 'text.tertiary'
                            }}
                          />
                        </SearchIconWrapper>
                      }
                    />
                  </Stack>

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
                            {/* <StarBorderIcon width={10} /> */}
                            Favourites
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
                            USDT
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
                            INR
                          </div>
                        }
                        value="2"
                      />
                    </TabList>

                    <TabPanel value="0" sx={{ padding: '0px' }}>
                      <FavouriteTab_Mobile_Spot setPlatformId={setPlatformId} handleClose={drawerClose} searchQuery={searchQuery} Marketdata={MarketRc} />
                    </TabPanel>

                    <TabPanel value="1" sx={{ padding: '0px' }}>
                      <MarketTable_Mobile_Spot flag="USDT" setPlatformId={setPlatformId} handleClose={drawerClose} searchQuery={searchQuery} Marketdata={MarketRc} />
                    </TabPanel>

                    <TabPanel value="2" sx={{ padding: '0px' }}>
                      <MarketTable_Mobile_Spot flag="INR" setPlatformId={setPlatformId} handleClose={drawerClose} searchQuery={searchQuery} Marketdata={MarketRc} />
                    </TabPanel>
                  </TabContext>
                </Card>
              </Drawer>
            </React.Fragment>
          ))}

        </Stack>

        <Stack spacing={0.5} textAlign='end' justifyContent='end'>
          <Typography variant="title1" sx={{ color: getColor(priceData && priceData['24hChg'], theme) }}>
            {priceData?.lastPrice}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: getColor(priceData && priceData['24hChg'], theme) }}>
            {priceData && priceData[`24hChg`]}%
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={1} justifyContent="space-between" pt={3}>
        <Stack spacing={0.5} textAlign='start' justifyContent='start'>
          <Typography variant="subtitle3" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            24h High
          </Typography>
          <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
            {priceData[`24hHighPr`]}
          </Typography>
        </Stack>

        <Stack spacing={0.5} textAlign='start' justifyContent='start'>
          <Typography variant="subtitle3" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            24h Low
          </Typography>
          <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
            {priceData[`24hLowPr`]}
          </Typography>
        </Stack>
        <Stack spacing={0.5} textAlign='end' justifyContent='end'>
          <Typography variant="subtitle3" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            24h Volume
          </Typography>
          <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
            {priceData[`24hBuyVol`]}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default SpotHead_Mobileview;