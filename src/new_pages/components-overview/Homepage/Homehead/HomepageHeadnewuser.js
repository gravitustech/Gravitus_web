import { Grid, Typography, useTheme, Stack, Box, Card, Button } from '@mui/material';
import React from 'react';
import head1img from '../../../../assets/images/gravitusimage/head1img.svg';
import head2img from '../../../../assets/images/gravitusimage/head2img.svg';
import head3img from '../../../../assets/images/gravitusimage/head3img.svg';
import head4img from '../../../../assets/images/gravitusimage/head4img.svg';
import headmainimg from '../../../../assets/images/gravitusimage/headmainimg.svg';
import { Link as RouterLink } from 'react-router-dom';

const HomepageHeadnewuser = () => {
  const theme = useTheme();

  const keyframes = `
    @keyframes jump {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-5px);
      }
    }
  `;

  const imageStyle = {
    animation: 'jump 1s ease-in-out infinite'
  };

  return (
    <Grid
      container
      pl={{ md: 2, sm: 8, xs: 6 }}
      pr={{ md: 2, sm: 8, xs: 6 }}
      pt={8.2}
      pb={8}
      style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
      sx={{
        background:
          theme.palette.mode === 'dark'
            ? 'radial-gradient(circle,rgba(69, 69, 69, 1),rgba(2, 2, 2, 1))'
            : 'radial-gradient(circle,rgba(255, 255, 255, 1),rgba(173, 231, 226, 1))',
        height: 'auto'
      }}
    >
      <Grid item container md={2} lg={2} style={{ flexDirection: 'column' }} display={{ xs: 'none', md: 'block', lg: 'block' }}>
        <Grid pt={10} sx={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
          <style dangerouslySetInnerHTML={{ __html: keyframes }} />
          <img src={head1img} alt="head1img" width={75} style={imageStyle} />
        </Grid>
        <Grid pt={20} sx={{ textAlign: 'end', justifyContent: 'end', alignItems: 'end' }}>
          <img src={head2img} alt="head2img" width={75} style={imageStyle} />
        </Grid>
      </Grid>

      <Grid item md={8} lg={8} pt={10} sx={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
        <Stack spacing={2}>
          <Typography
            variant="head1"
            sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary', textAlign: 'center' }}
          >
            Buy, Sell & Hold Your Crypto Currency via Gravitus Exchange
          </Typography>
          <Typography
            variant="title2"
            sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.priary', textAlign: 'center' }}
          >
            A foundational tool for novice users to gain insight into the cryptocurrency world.{' '}
          </Typography>
          <Stack
            pt={3}
            direction={{ xs: 'column', md: 'row', sm: 'row', lg: 'row' }}
            spacing={{ xs: 0.5, md: 2.5, sm: 2.5, lg: 2.5 }}
            sx={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <Button variant="homeregisterbutton" component={RouterLink} to="/register">
              REGISTER
            </Button>
            <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.priary' }}>
              or
            </Typography>
            <Button variant="homeloginbutton" component={RouterLink} to="/login">
              LOGIN
            </Button>
          </Stack>
          <Stack pt={5} sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <img src={headmainimg} alt="headmainimg" width={200} style={imageStyle} />
          </Stack>
        </Stack>
      </Grid>

      <Grid item container md={2} lg={2} style={{ flexDirection: 'column' }} display={{ xs: 'none', md: 'block', lg: 'block' }}>
        <Grid pt={10} sx={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
          <img src={head3img} alt="head3img" width={75} style={imageStyle} />
        </Grid>
        <Grid pt={20} sx={{ textAlign: 'start', justifyContent: 'start', alignItems: 'start' }}>
          <img src={head4img} alt="head4img" width={75} style={imageStyle} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomepageHeadnewuser;
