import React from 'react';
import { Stack, Typography, useTheme, Grid, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const FundsGrid = ({ isAuthorised, walletData, priceData }) => {
  const theme = useTheme();
  // console.log(walletData, priceData);
  return (
    <>
      {isAuthorised ? (
        <Stack
          pt={{ xs: 0, sm: 0, md: 0.5, lg: 0.5 }}
          spacing={2} >
          <Typography variant="title2" display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }} sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            Funds
          </Typography>

          <Grid>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                {priceData?.buyPair} Balance
              </Typography>
              <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                {walletData?.buyPair}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" pt={2}>
              <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                {priceData?.sellPair} Balance
              </Typography>
              <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                {walletData?.sellPair}{' '}
              </Typography>
            </Stack>
          </Grid>
          <Stack direction='row' spacing={1} pt={2}>
            <Button variant="fundsbutton" component={RouterLink} to="/deposit">
              DEPOSIT
            </Button>
            <Button variant="fundsbutton" component={RouterLink} to="/withdraw">
              WITHDRAW
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Stack pt={0.5} spacing={2}>
          <Typography variant="title2" display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }} sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            Funds
          </Typography>

          <Grid>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                {priceData?.buyPair} Balance
              </Typography>
              <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                ---
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" pt={2}>
              <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                {priceData?.sellPair} Balance
              </Typography>
              <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                ---
              </Typography>
            </Stack>
          </Grid>
          <Stack direction='row' spacing={1} pt={2}>
            <Button variant="fundsbutton" disabled sx={{ cursor: 'not-allowed' }}>
              DEPOSIT
            </Button>
            <Button variant="fundsbutton" disabled sx={{ cursor: 'not-allowed' }}>
              WITHDRAW
            </Button>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default FundsGrid;
