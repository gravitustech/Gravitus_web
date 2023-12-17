import React, { useState } from 'react';

import {
  Typography, useTheme, Stack, IconButton, ClickAwayListener, Paper,
  Popper, Card, Divider, ButtonGroup, Box, Button
} from '@mui/material';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

import InputBase from '@mui/material/InputBase';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';

// import StarBorderIcon from '@mui/icons-material/StarBorder';
// import FavouriteTab from './_Del_TableFAV';
// import USDTTable from './_Del_TableUSDT';
// import INRTable from './_Del_TableINR';

import Transitions from '../../../../components/@extended/Transitions';
import MarketTable from './MarketTable';
import FavouriteTab from './FavouriteTab';


import useSWR, { mutate } from 'swr';
import { MarketOverview_URL, fetcherSystem } from 'src/api_ng/system_ng';
import { getConfig_ng, getConfig_sp, setConfig_ng } from '../../../../utils_ng/localStorage_ng';

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

const SpotHead = ({ pairData, priceData, setPlatformId, excType, changeExcType }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const MarketInfo = ({ value, label }) => (
    <Stack spacing={0.7}>
      <Typography variant="subtitle3" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
        {label}
      </Typography>
      <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
        {value}
      </Typography>
    </Stack>
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isIconUp, setIsIconUp] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsIconUp(false);
    setIsIconUp((prev) => !prev);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsIconUp(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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

  // For setting up GRA or CMC exchange type 
  const [selectedButton, setSelectedButton] = useState(getConfig_ng('excType'));

  function changeExcTypeButton(exchangeType) {
    setConfig_ng('excType', exchangeType);
    setSelectedButton(exchangeType);
  }

  function useMarketOverview() {
    var postData = { "callfrom": 'markets', 'superId': getConfig_sp().userId };

    const { data, error, isLoading } = useSWR([MarketOverview_URL(), postData], fetcherSystem, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data, error, isLoading };
  }

  const { data:MarketRc, error } = useMarketOverview();

  return (
    <Stack direction="row" >
      <Stack direction="row" spacing={1}>
        <Stack spacing={1} direction="row" alignItems="center">
          <img src={priceData?.imagePath} alt="ico" height={32} width={32} />
          <Stack>
            <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
              {priceData?.tradePair}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
              {pairData?.buyNetwork}
            </Typography>
          </Stack>
        </Stack>
        <IconButton disableRipple onClick={handleClick} sx={{ paddingTop: '0px', borderRadius: '50%', backgroundColor: 'transparent' }}>
          {isIconUp ? <ArrowDropUpIcon fontSize="large" /> : <ArrowDropDownIcon fontSize="large" />}
        </IconButton>
        <Divider orientation="vertical" />
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          role={undefined}
          transition
          // disablePortal
          popperOptions={{
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, 9]
                }
              }
            ]
          }}
        >
          {({ TransitionProps }) => (
            <Transitions type="fade" in={open} {...TransitionProps}>
              {open && (
                <Paper sx={{ marginLeft: '8px', marginTop: '12px' }}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <Card
                      variant="outlined"
                      sx={{
                        // border: theme.palette.mode === 'dark' ? '0.5px solid #262626' : '1px solid #fff',
                        height: '583px',
                        display: 'flex',
                        flexDirection: 'column',
                        bgcolor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground',
                        padding: '16px'
                      }}
                    >
                      <Stack pl={1} pr={1}>
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
                              paddingLeft: '10px',
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
                          <FavouriteTab setPlatformId={setPlatformId} handleClose={handleClose} searchQuery={searchQuery} Marketdata={MarketRc}/>
                        </TabPanel>

                        <TabPanel value="1" sx={{ padding: '0px' }}>
                          <MarketTable flag="USDT" setPlatformId={setPlatformId} handleClose={handleClose} searchQuery={searchQuery} Marketdata={MarketRc}/>
                        </TabPanel>

                        <TabPanel value="2" sx={{ padding: '0px' }}>
                          <MarketTable flag="INR" setPlatformId={setPlatformId} handleClose={handleClose} searchQuery={searchQuery} Marketdata={MarketRc}/>
                        </TabPanel>
                      </TabContext>
                    </Card>
                  </ClickAwayListener>
                </Paper>
              )}
            </Transitions>
          )}
        </Popper>
        {/* <Divider orientation="vertical" sx={{ height: '100%' }} /> */}
      </Stack>

      {pairData?.cmc_chart === 1 && (
        <Stack direction='row' alignItems='center' spacing={3} pl={3}>
          <Stack direction='row'>
            <Button
              disableRipple
              onClick={() => {
                changeExcType('GRA');
                changeExcTypeButton('GRA');
              }}
              sx={{
                height: '50%',
                borderRadius: '5px 0 0 5px',
                minHeight: '32px !important',
                fontSize: selectedButton === 'GRA' ? '12px' : '12px',
                fontWeight: selectedButton === 'GRA' ? '500' : '500',
                color: selectedButton === 'GRA' ? (theme.palette.mode === 'dark' ? 'text.white' : 'text.white') : theme.palette.mode === 'dark' ? 'text.white' : 'text.black',
                backgroundColor: selectedButton === 'GRA' ? 'text.buy' : (theme.palette.mode === 'dark' ? '#1F2434' : '#F1F1F1'),
                '&:hover': {
                  backgroundColor: selectedButton === 'GRA' ? 'text.buy' : (theme.palette.mode === 'dark' ? '#1F2434' : '#F1F1F1'),
                },
              }}
            >
              GRA
            </Button>
            <Button
              disableRipple
              onClick={() => {
                changeExcType('CMC');
                changeExcTypeButton('CMC');
              }}
              sx={{
                borderRadius: '0 5px 5px 0',
                height: '50%',
                minHeight: '32px !important',
                fontSize: selectedButton === 'CMC' ? '12px' : '12px',
                fontWeight: selectedButton === 'CMC' ? '500' : '500',
                color: selectedButton === 'CMC' ? (theme.palette.mode === 'dark' ? 'white' : 'white') : theme.palette.mode === 'dark' ? 'white' : 'black',
                backgroundColor: selectedButton === 'CMC' ? 'text.buy' : (theme.palette.mode === 'dark' ? '#1F2434' : '#F1F1F1'),
                padding: '0',
                '&:hover': {
                  backgroundColor: selectedButton === 'CMC' ? 'text.buy' : (theme.palette.mode === 'dark' ? '#1F2434' : '#F1F1F1'),
                },
              }}
            >
              CMC
            </Button>
          </Stack >
          <Divider orientation="vertical" />
        </Stack>
      )}
      <Stack direction="row" spacing={5}>
        <Stack spacing={0.5} pl={3}>
          <Typography variant="body3" sx={{ color: getColor(priceData && priceData['24hChg'], theme) }}>
            {priceData?.lastPrice}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
            {priceData?.sellPair === 'USDT' ? '$' : '₹'} {priceData?.lastPrice}
          </Typography>
        </Stack>
        <MarketInfo value={priceData?.lastPrice} label="Market Price" />
        <Stack spacing={0.7}>
          <Typography variant="subtitle3" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            24h Change
          </Typography>
          <Typography variant="subtitle1" sx={{ color: getColor(priceData && priceData['24hChg'], theme) }}>
            {priceData && priceData[`24hChg`]}%
          </Typography>
        </Stack>
        <MarketInfo value={priceData && priceData[`24hHighPr`]} label="24h High" />
        <MarketInfo value={priceData && priceData[`24hLowPr`]} label="24h Low" />
        <MarketInfo value={priceData && priceData[`24hBuyVol`]} label={`24h Volume(${priceData?.buyPair})`} />
        <MarketInfo value={priceData && priceData[`24hSellVol`]} label={`24h Volume(${priceData?.sellPair})`} />

      </Stack>
    </Stack >
  );
};

export default SpotHead;