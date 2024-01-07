import React, { useState } from 'react';

import { useTheme, Card, Stack, IconButton, InputBase, Tab, Box, Grid, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { styled } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import SpotTabs from './SpotTabs';
import MarketTable from './MarketTable';
import FavouriteTab from './FavouriteTabs';
import FavouriteTab_Mobile from './FavouriteTabs_Mobile';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(0)})`
  }
}));

const MarketpageTable = ({ marketData, listings, setPlatformId }) => {
  const theme = useTheme();
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [searchQuery, setSearchQuery] = useState('');

  const handleCancel = () => {
    setSearchQuery('');
  };

  return (
    <Card
      sx={{
        border: 'none',
        width: '100%',
        borderRadius: { xs: '0', sm: '0', md: '78px 78px 0 0', lg: '78px 78px 0 0' },
        boxShadow: '0px 5.133836269378662px 35.31077575683594px 0px rgba(0, 0, 0, 0.01), 0px 41px 282px 0px rgba(0, 0, 0, 0.02)'
      }}
    >
      <Box
        pt={{ xs: 2, sm: 2, md: 3, lg: 3 }}
        pb={{ xs: 2, sm: 2, md: 3, lg: 3 }}
        pl={{ xs: 2, sm: 2, md: 6, lg: 15 }}
        pr={{ xs: 2, sm: 2, md: 6, lg: 15 }}
        lg={12}
        sx={{
          backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
        }}
      >

        <Grid
          display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}
          pb={{ xs: 3, sm: 3, md: 3, lg: 3 }}>
          <Typography sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }} variant="h1">
            Market Overview
          </Typography>
        </Grid>

        <Stack
          display={{ xs: 'block', sm: 'none', md: 'none', lg: 'none' }}
          pb={{ xs: 3, sm: 3, md: 3, lg: 3 }}
        >
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
          inputProps={{ 'aria-label': 'search' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          endAdornment={
            <Stack direction='row' alignItems='center' spacing={.8} pr={1} >
              {searchQuery && (
                <IconButton disableRipple edge="end" onClick={handleCancel} size="small">
                  <HighlightOffIcon fontSize="small" sx={{
                    color: theme.palette.mode === 'dark' ? 'text.primary' : 'text.primary'
                  }} />
                </IconButton>
              )}
              <SearchIcon
                sx={{
                  color: theme.palette.mode === 'dark' ? 'text.primary' : 'text.primary'
                }}
              />
            </Stack>
          }
        />
        </Stack>

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
                    <span style={{ marginRight: '4px' }}>
                      <StarBorderIcon />
                    </span>
                    Favourites
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
                    Spot
                  </div>
                }
                value="1"
              />
            </TabList>
            <Stack display={{ xs: 'none', sm: 'block', md: 'block', lg: 'block' }}>
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
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                endAdornment={
                  <Stack direction='row' alignItems='center' spacing={.8} pr={1} >
                    {searchQuery && (
                      <IconButton disableRipple edge="end" onClick={handleCancel} size="small">
                        <HighlightOffIcon fontSize="small" sx={{
                          color: theme.palette.mode === 'dark' ? 'text.primary' : 'text.primary'
                        }} />
                      </IconButton>
                    )}
                    <SearchIcon
                      sx={{
                        color: theme.palette.mode === 'dark' ? 'text.primary' : 'text.primary'
                      }}
                    />
                  </Stack>
                }
              />
            </Stack>
          </Stack>

          <TabPanel value="0" sx={{ padding: '0px', paddingTop: '12px' }}>
            <Stack display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
              <FavouriteTab marketData={marketData} searchQuery={searchQuery} listings={listings} setPlatformId={setPlatformId} />
            </Stack>
            <Stack display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}>
              <FavouriteTab_Mobile marketData={marketData} searchQuery={searchQuery} listings={listings} setPlatformId={setPlatformId} />
            </Stack>
          </TabPanel>
          <TabPanel value="1" sx={{ padding: '0px' }}>
            <SpotTabs marketData={marketData} searchQuery={searchQuery} listings={listings} setPlatformId={setPlatformId} />
          </TabPanel>
        </TabContext>
      </Box>
    </Card>
  );
};

export default MarketpageTable;
