import { Grid, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import lineimg from '../../../../assets/images/gravitusimage/lineimg.svg';
import features1img from '../../../../assets/images/gravitusimage/features1img.svg';
import longline from '../../../../assets/images/gravitusimage/longline.svg';
import lineimg1 from '../../../../assets/images/gravitusimage/lineimg1.svg';

const Featuresne = () => {
  const theme = useTheme();

  return (
    <Grid
      container
      pt={24}
      pb={24}
      sx={{
        background:theme.palette.mode === 'dark' ? '#181818' : 'text.white'
      }}
    >
      <Grid item md={12} lg={12} pl={{ md: 6, sm: 8, xs: 6, lg: 15 }} pr={{ md: 6, sm: 8, xs: 6, lg: 15 }}>
        <Typography variant="mainhead" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          Our Features
        </Typography>
      </Grid>
      <Grid
        item
        pt={6}
        pl={{ md: 2, sm: 8, xs: 6, lg: 15 }}
        pr={{ md: 2, sm: 8, xs: 6, lg: 15 }}
        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
      >
        <Grid item md={3} lg={3} pt={25}>
          <Stack spacing={1.5}>
            <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <img src={features1img} alt="features1img" width={40} />
            </Stack>

            <Typography
              variant="title1"
              sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary', textAlign: 'center' }}
            >
              AFFILIATE PROGRAM
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.priary', textAlign: 'center' }}
            >
              Get instant rewards in crypto-currencies for promoting our exchange. Reach us to know more.
            </Typography>

            <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <img src={lineimg} alt="lineimg" />
            </Stack>
          </Stack>
        </Grid>

        <Grid item md={1} lg={1}></Grid>
        <Grid item md={3} lg={3} pt={17}>
          <Stack spacing={1.5}>
            <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <img src={features1img} alt="features1img" width={40} />
            </Stack>

            <Typography
              variant="title1"
              sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary', textAlign: 'center' }}
            >
              TRAINING ON TRADING
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.priary', textAlign: 'center' }}
            >
              Learn trading from our experts and get trading tips during training sessions.
            </Typography>

            <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <img src={lineimg} alt="lineimg" />
            </Stack>
          </Stack>
        </Grid>
        <Grid item md={1} lg={1}></Grid>
        <Grid item md={3} lg={3} pt={8}>
          <Stack spacing={1.5}>
            <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <img src={features1img} alt="features1img" width={40} />
            </Stack>

            <Typography
              variant="title1"
              sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary', textAlign: 'center' }}
            >
              CRYPTO BLOG
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.priary', textAlign: 'center' }}
            >
              Receive regular updates on crypto and market news via social media platforms.
            </Typography>

            <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <img src={lineimg} alt="lineimg" />
            </Stack>
          </Stack>
        </Grid>
        <Grid item md={1} lg={1}></Grid>
        <Grid item md={3} lg={3} pt={-12}>
          <Stack spacing={1.5}>
            <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <img src={features1img} alt="features1img" width={40} />
            </Stack>

            <Typography
              variant="title1"
              sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary', textAlign: 'center' }}
            >
              CUSTOMER SUPPORT
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.priary', textAlign: 'center' }}
            >
              Get help in your preferred language. Our team can assist you in your native language.
            </Typography>
            <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <img src={lineimg} alt="lineimg" />
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <Grid>{/* <img src={longline} alt='longline' style={{ width: '100%', height: '100%' }} /> */}</Grid>
    </Grid>
  );
};

export default Featuresne;
