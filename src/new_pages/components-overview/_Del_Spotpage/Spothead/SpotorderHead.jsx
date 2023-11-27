import React, { useState } from 'react';
import {
  Typography,
  useTheme,
  Stack,
  IconButton,
  ClickAwayListener,
  Paper,
  Popper,
  Card,
  Divider,
  ButtonGroup,
  Box,
  Button
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavouriteTab from './Favouritetab';
import USDTTable from './Usdtpairtab';
import INRTable from './Inrpairtab';
import MarketTable from './MarketTable';
import Transitions from '../../../../components/@extended/Transitions';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const BitcoinIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M23.6409 14.9029C22.0381 21.3315 15.5262 25.2438 9.09605 23.6407C2.66863 22.038 -1.24415 15.5265 0.359423 9.09837C1.96159 2.66903 8.47348 -1.24361 14.9016 0.359081C21.3313 1.96177 25.2438 8.47404 23.6408 14.903L23.6409 14.9029H23.6409Z"
      fill="#F7931A"
    />
    <path
      d="M17.2923 10.2903C17.5312 8.69333 16.3153 7.83492 14.6526 7.26227L15.192 5.09908L13.875 4.77096L13.3499 6.8772C13.0037 6.79086 12.6482 6.70951 12.2948 6.62886L12.8237 4.50872L11.5075 4.1806L10.9679 6.34309C10.6814 6.27787 10.4 6.21341 10.1269 6.14548L10.1285 6.13868L8.31237 5.68522L7.96204 7.09165C7.96204 7.09165 8.93911 7.31559 8.91852 7.32937C9.45181 7.46246 9.54825 7.81545 9.53223 8.09523L8.91781 10.5596C8.95453 10.5689 9.00217 10.5824 9.05473 10.6035C9.01079 10.5926 8.96404 10.5807 8.91552 10.5691L8.05431 14.0214C7.98914 14.1834 7.82372 14.4265 7.45086 14.3342C7.46406 14.3533 6.49369 14.0953 6.49369 14.0953L5.83984 15.6026L7.55364 16.0298C7.87246 16.1098 8.1849 16.1934 8.49258 16.2721L7.94761 18.4601L9.26304 18.7882L9.80272 16.6234C10.1621 16.721 10.5108 16.8109 10.8522 16.8958L10.3144 19.0503L11.6314 19.3784L12.1763 17.1945C14.422 17.6195 16.1105 17.4482 16.8213 15.4172C17.394 13.782 16.7928 12.8388 15.6113 12.2238C16.4718 12.0253 17.12 11.4594 17.2928 10.2904L17.2924 10.2902L17.2923 10.2903ZM14.2834 14.5091C13.8764 16.1443 11.123 15.2603 10.2302 15.0387L10.9534 12.14C11.8461 12.3628 14.7088 12.8038 14.2835 14.5091H14.2834ZM14.6907 10.2666C14.3194 11.7539 12.0277 10.9983 11.2843 10.813L11.9399 8.18403C12.6834 8.36933 15.0774 8.71515 14.6908 10.2666H14.6907Z"
      fill="white"
    />
  </svg>
);

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

const SpotorderHead = ({ priceData, setPlatformId, pairData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  console.log({ priceData });
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

  //
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

  //
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let textColor = 'grey'; // Default color for 0 or other cases

  if (value > 0) {
    textColor = 'green'; // Change color to green for positive values
  } else if (value < 0) {
    textColor = 'red'; // Change color to red for negative values
  }
  return (
    <Stack direction="row" spacing={5}>
      <Stack direction="row" spacing={1}>
        <Stack spacing={1} direction="row" alignItems="center">
          <img src={priceData?.imagePath} alt="ico" height={32} width={32} />
          <Stack>
            <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
              {priceData?.tradePair}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
              Bitcoin
            </Typography>
          </Stack>
        </Stack>
        <IconButton disableRipple onClick={handleClick} sx={{ paddingTop: '0px', borderRadius: '50%', backgroundColor: 'transparent' }}>
          {isIconUp ? <ArrowDropUpIcon fontSize="large" /> : <ArrowDropDownIcon fontSize="large" />}
        </IconButton>
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
                <Paper sx={{ marginLeft: '12px', marginTop: '12px' }}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <Card
                      variant="outlined"
                      sx={{
                        border: theme.palette.mode === 'dark' ? '0.5px solid #262626' : '1px solid #fff',
                        height: '583px',
                        display: 'flex',
                        flexDirection: 'column',
                        bgcolor: theme.palette.mode === 'dark' ? 'text.black' : 'text.background',
                        padding: '16px'
                      }}
                    >
                      <Stack pl={1} pr={1}>
                        <StyledInputBase
                          sx={{
                            height: '100%',
                            borderRadius: '5px',
                            width: '100%',
                            borderColor: theme.palette.mode === 'dark' ? 'text.secondary' : 'text.tertiary',
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
                          {/* <FavouriteTab /> */}
                          <MarketTable flag="FAV" setPlatformId={setPlatformId} handleClose={handleClose} searchQuery={searchQuery} />
                        </TabPanel>
                        <TabPanel value="1" sx={{ padding: '0px' }}>
                          {/* <USDTTable /> */}
                          <MarketTable flag="USDT" setPlatformId={setPlatformId} handleClose={handleClose} searchQuery={searchQuery} />
                        </TabPanel>
                        <TabPanel value="2" sx={{ padding: '0px' }}>
                          {/* <INRTable /> */}
                          <MarketTable flag="INR" setPlatformId={setPlatformId} handleClose={handleClose} searchQuery={searchQuery} />
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
        <Stack>
          <Button
            disableRipple
            onClick={() => handleOptionChange('0')}
            sx={{
              fontSize: '12px',
              fontWeight: '500',
              color: theme.palette.mode === 'dark' ? 'white' : 'black',
              backgroundColor: theme.palette.mode === 'dark' ? '#2B2B2E' : '#ECECEC',
              borderRadius: '5px 0 0 5px',
              padding: '0'
            }}
          >
            GRA
          </Button>
          <Button
            disableRipple
            // onClick={() => handleOptionChange('1')}
            sx={{
              fontSize: '12px',
              fontWeight: '500',
              color: theme.palette.mode === 'dark' ? 'white' : 'black',
              backgroundColor: theme.palette.mode === 'dark' ? '#2B2B2E' : '#ECECEC',
              borderRadius: '0 5px 5px 0',
              padding: '0'
            }}
          >
            CMC
          </Button>
        </Stack>
      )}

      <Stack spacing={0.5}>
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
  );
};

export default SpotorderHead;
