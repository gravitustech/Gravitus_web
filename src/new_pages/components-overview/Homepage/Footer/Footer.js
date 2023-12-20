import { Container, Divider, Grid, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import footerlogo from '../../../../assets/images/gravitusimage/footerlogo.svg';
import youtubeicon from '../../../../assets/images/gravitusimage/youtubeicon.svg';
import xicon from '../../../../assets/images/gravitusimage/xicon.svg';
import linkedinicon from '../../../../assets/images/gravitusimage/linkedinicon.svg';
import { Link as RouterLink } from 'react-router-dom';

const Footer = ({ isAuthorised }) => {
  const theme = useTheme();

  return (
    <Grid
      container
      pl={{ md: 6, sm: 8, xs: 6, lg: 8 }}
      pr={{ md: 6, sm: 8, xs: 6, lg: 8 }}
      pt={8}
      pb={3}
      sx={{
        background: theme.palette.mode === 'dark' ? '#0F121A' : '#00413C'
      }}
    >
      <Grid item lg={6} xs={12} md={6}>
        <Stack spacing={8}>
          <img src={footerlogo} alt="footerlogo" width={120} />
          <Grid style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography variant="body1" sx={{ color: 'text.buy' }}>
              Quick links
            </Typography>
            <Typography
              variant="title2"
              component={RouterLink}
              to="/Market"
              sx={{
                textDecorationLine: 'none',
                color: theme.palette.mode === 'dark' ? 'text.white' : 'text.white',
                '&:hover': {
                  color: 'text.buy'
                }
              }}
            >
              Market
            </Typography>
            <Typography
              variant="title2"
              component={RouterLink}
              to="/Spot"
              sx={{
                textDecorationLine: 'none',
                color: theme.palette.mode === 'dark' ? 'text.white' : 'text.white',
                '&:hover': {
                  color: 'text.buy'
                }
              }}
            >
              Spot
            </Typography>
            <Typography
              variant="title2"
              component={RouterLink}
              to="/P2P"
              sx={{
                textDecorationLine: 'none',
                color: theme.palette.mode === 'dark' ? 'text.white' : 'text.white',
                '&:hover': {
                  color: 'text.buy'
                }
              }}
            >
              P2P
            </Typography>
            {isAuthorised ? (
              <Typography
                variant="title2"
                component={RouterLink}
                to="/profile/dashboard"
                sx={{
                  textDecorationLine: 'none',
                  color: theme.palette.mode === 'dark' ? 'text.white' : 'text.white',
                  '&:hover': {
                    color: 'text.buy'
                  }
                }}
              >
                Profile
              </Typography>
            ) : (
              <Typography
                variant="title2"
                component={RouterLink}
                to="/profile"
                sx={{
                  textDecorationLine: 'none',
                  color: theme.palette.mode === 'dark' ? 'text.white' : 'text.white',
                  '&:hover': {
                    color: 'text.buy'
                  }
                }}
              ></Typography>
            )}
          </Grid>
        </Stack>
      </Grid>
      <Grid item pb={5} pl={{ lg: 20, md: 8 }} pt={{ lg: 0, md: 0, xs: 6 }} lg={6} xs={12} md={6} textAlign={{ lg: 'end', md: 'center' }}>
        <Stack spacing={4}>
          <Typography
            variant="h4"
            sx={{ color: theme.palette.mode === 'dark' ? 'text.white' : 'text.white' }}
            textAlign={{ lg: 'end', md: 'end' }}
          >
            Join Our Community
          </Typography>
          <Stack direction="row" spacing={5} justifyContent={{ lg: 'end', md: 'end' }}>
            <a href="https://twitter.com/GravitusAcademy">
              <img src={xicon} alt="xicon" />
            </a>
            <a href="https://www.linkedin.com/company/gravitusepx/mycompany/">
              <img src={linkedinicon} alt="linkedinicon" />
            </a>
            <a href="https://www.youtube.com/@gravitusacademy1169">
              <img src={youtubeicon} alt="youtubeicon" />
            </a>
          </Stack>
        </Stack>
      </Grid>
      <Divider
        pt={10}
        sx={{
          width: '100%',
          borderTop: '1px solid white '
        }}
      ></Divider>
      <Container>
        <Typography pt={5} textAlign="center" sx={{ color: theme.palette.mode === 'dark' ? 'text.white' : 'text.white' }}>
          &copy; 2024 Gravitus
        </Typography>
      </Container>
    </Grid>
  );
};

export default Footer;
