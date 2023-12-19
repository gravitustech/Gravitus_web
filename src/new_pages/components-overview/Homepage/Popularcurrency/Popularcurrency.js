import React from 'react';
import { Card, Grid, Stack, Typography, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import Marketoverview from './Marketoverview';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Popularcurrency = ({ marketData }) => {
  const theme = useTheme();
  
  return (
    <Grid
    display={{ xs: 'none', sm: 'block', md: 'block', lg: 'block' }}
      container
      pl={{ md: 6, sm: 8, xs: 6, lg: 15 }}
      pr={{ md: 6, sm: 8, xs: 6, lg: 15 }}
      pt={20}
      pb={20}
      sx={{
        background: theme.palette.mode === 'dark' ? '#131722' : 'text.white'
      }}
    >
      <Grid item md={12} lg={12} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typography variant="mainhead" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          Popular Cryptocurrencies
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          component={RouterLink}
          to="/Market"
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
            paddingTop: '14px',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingBottom: '14px',
            background:
              theme.palette.mode === 'dark'
                ? 'radial-gradient(34.44% 59.83% at 50% 48.03%, #2B3141 2.77%, #131722 100%)'
                : 'text.white',
            width: '100%',
            borderRadius: '10px',
            boxShadow: '0px 5.133836269378662px 35.31077575683594px 0px rgba(0, 0, 0, 0.01), 0px 41px 282px 0px rgba(0, 0, 0, 0.02)',
            border: '1px solid',
            borderBottom: 'none',
            borderColor: theme.palette.mode === 'dark' ? '#343A4A' : '#60FFF1'
          }}
        >
          <Marketoverview marketData={marketData} />
        </Card>
      </Grid>
    </Grid>
  );
};

export default Popularcurrency;
