import { Grid, useTheme, Typography, Stack } from '@mui/material';
import React from 'react'
import p2pmobile from '../../../../assets/images/gravitusimage/p2pmobile.svg';
import ordergif from '../../../../assets/images/gravitusimage/ordergif.svg';
import sellergif from '../../../../assets/images/gravitusimage/sellergif.svg';
import getcrypto from '../../../../assets/images/gravitusimage/getcrypto.svg';
import BuildPortfoliocomponents from './BuildPortfoliocomponents';

const BuildPortfolio = () => {
  const theme = useTheme();

  return (
    <Grid container pl={{ md: 6, sm: 8, xs: 6, lg: 15 }} pr={{ md: 6, sm: 8, xs: 6, lg: 15 }}
      pt={12} pb={12}
      sx={{
        background: theme.palette.mode === 'dark' ? 'radial-gradient(circle,rgba(69, 69, 69, 1),rgba(2, 2, 2, 1))' : 'radial-gradient(circle,rgba(255, 255, 255, 1),rgba(173, 231, 226, 1))',
      }}>
      <Grid item md={12} lg={12} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }} >
        <Typography variant='h1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          Build your crypto portfolio
        </Typography>
      </Grid>

      <Grid container spacing={2} pt={8}>

        <Grid item xs={12} sm={6} lg={6}>
          <Stack direction="column" alignItems="flex-start" spacing={8} pr={2}>

            <BuildPortfoliocomponents
              img={getcrypto}
              title='Verify your identity'
              description='Complete the identity verification process to secure your account and transactions.'
            />
            <BuildPortfoliocomponents
              img={sellergif}
              title='Fund your account'
              description='Add funds to your crypto account to start trading crypto. You can add funds with a variety of payment methods.'
            />

            <BuildPortfoliocomponents
              img={getcrypto}
              title='Start trading'
              description='Buy and Sell crypto, set up recurring buys for your investments, and discover what Gravitus has to offer.'
            />
            {/* Youre good to go  */}
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6} lg={6} className="text-center">
          <Stack alignItems="center"  >
            {/* <img src={p2pmobile} alt='p2pmobile' /> */}
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default BuildPortfolio;
