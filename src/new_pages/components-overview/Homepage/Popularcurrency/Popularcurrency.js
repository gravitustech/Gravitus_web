import { Card, Grid, Link, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link as RouterLink } from 'react-router-dom';
import Marketoverview from './Marketoverview';

const Popularcurrency = ({ marketData }) => {
  const theme = useTheme();
  // console.log('marketdata', marketData)
  return (
    <Grid
      container
      pl={{ md: 6, sm: 8, xs: 6, lg: 15 }}
      pr={{ md: 6, sm: 8, xs: 6, lg: 15 }}
      pt={12}
      pb={12}
      sx={{
        background:
          theme.palette.mode === 'dark'
            ? 'radial-gradient(circle,rgba(69, 69, 69, 1),rgba(2, 2, 2, 1))'
            : 'radial-gradient(circle,rgba(255, 255, 255, 1),rgba(173, 231, 226, 1))'
      }}
    >
      <Grid item md={12} lg={12} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typography variant="h1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          Popular Cryptocurrencies
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          component={RouterLink}
          to="/market"
          sx={{
            textDecorationLine: 'none',
            color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary',
            '&:hover': {
              color: 'text.buy'
            }
          }}
        >
          <Typography variant="title2">Go to market overview</Typography>
          <KeyboardArrowRightIcon />
        </Stack>
      </Grid>

      <Grid item lg={12} pt={10}>
        <Card
          sx={{
            paddingTop: '8px',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingBottom: '8px',
            background:
              theme.palette.mode === 'dark'
                ? 'radial-gradient(circle,rgba(38, 38, 38, 1),rgba(21, 21, 21, 0.43))'
                : 'radial-gradient(circle,rgba(236, 255, 253, 1),rgba(236, 255, 253, 0))',
            width: '100%',
            borderRadius: '10px',
            boxShadow: '0px 5.133836269378662px 35.31077575683594px 0px rgba(0, 0, 0, 0.01), 0px 41px 282px 0px rgba(0, 0, 0, 0.02)',
            border: '1px solid',
            borderBottom: 'none',
            borderColor: theme.palette.mode === 'dark' ? '#4C4C4C' : '#60FFF1'
          }}
        >
          <Marketoverview marketData={marketData} />
        </Card>
      </Grid>
    </Grid>
  );
};

export default Popularcurrency;
