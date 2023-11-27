import { Grid, Stack, Typography, useTheme, Button } from '@mui/material';
import React from 'react'
import backgroundImage from '../../../../assets/images/gravitusimage/backgroundImage.svg';
import homepageimg1 from '../../../../assets/images/gravitusimage/homepageimg1.svg';
import { Link as RouterLink } from 'react-router-dom';

const HomepageHead = () => {
  const theme = useTheme();

  return (
    <Grid container pl={{ md: 6, sm: 8, xs: 6, lg: 15 }} pr={{ md: 6, sm: 8, xs: 6, lg: 15 }}
     pt={{ md: 10, sm: 8, xs: 6, lg: 20 }} pb={{ md: 10, sm: 8, xs: 20, lg: 20 }}
      alignItems='center'
      justifyContent='center'
      height='auto'
      sx={{
        background: theme.palette.mode === 'dark' ? 'radial-gradient(circle,rgba(69, 69, 69, 1),rgba(2, 2, 2, 1))' : 'radial-gradient(circle,rgba(255, 255, 255, 1),rgba(173, 231, 226, 1))',
      }}>
      <Grid container spacing={2} >
        <Grid item xs={12} sm={12} md={7} lg={7} >
          <Stack spacing={3}  pt={{ md: 4, sm: 4, xs: 4, lg: 8 }}>
            <Typography variant='head3' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary', }}>
              Buy, Sell & Hold Your Crypto Currency via Gravitus Exchange
            </Typography>
            <Typography variant='title2' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.priary', }}>
              A foundational tool for novice users to gain insight into the cryptocurrency world.
            </Typography>
            <Stack pt={3}>
              <Button variant='homespotbutton' component={RouterLink} to="/spot">
                TRADE NOW
              </Button>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={12} md={5} lg={5} display={{ xs: 'none', sm: 'block', md: 'block', lg: 'block' }} >
          <Stack textAlign='center' alignItems='center'>
            <img src={homepageimg1} alt='homepageimg1' width={500} />
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default HomepageHead;
