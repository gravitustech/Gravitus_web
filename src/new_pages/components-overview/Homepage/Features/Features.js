import React from 'react';

import { Card, Divider, Grid, Stack, Typography, useTheme } from '@mui/material';

import blog1img from '../../../../assets/images/gravitusimage/blog1img.svg';
import supporticon from '../../../../assets/images/gravitusimage/supporticon.svg';
import support1img from '../../../../assets/images/gravitusimage/support1img.svg';
import affiliate1img from '../../../../assets/images/gravitusimage/affiliate1img.svg';
import trainning1img from '../../../../assets/images/gravitusimage/trainning1img.svg';
import raiseticketicon from '../../../../assets/images/gravitusimage/raiseticketicon.svg';

const Features = () => {
  const theme = useTheme();

  return (
    <Grid
      container
      pt={20}
      pb={20}
      sx={{
        background: theme.palette.mode === 'dark' ? '#131722' : 'text.white'
      }}
    >
      <Grid item md={12} lg={12} pl={{ md: 6, sm: 8, xs: 6, lg: 15 }} pr={{ md: 6, sm: 8, xs: 6, lg: 15 }}>
        <Typography variant="mainhead" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          Our Features
        </Typography>
      </Grid>
      <Grid
        container
        pt={{ xs: 2, sm: 4, md: 6, lg: 8 }}
        pl={{ xs: 4, sm: 6, md: 8, lg: 15 }}
        pr={{ xs: 4, sm: 6, md: 8, lg: 15 }}
        spacing={2}
      >
        <Grid item xs={12} md={6} lg={2.95}   >
          <Card
            sx={{
              background:
                'transparent',
              boxShadow: 0
            }}>
            <Stack spacing={1.5} pt={4} pr={4} pl={4} pb={4}>
              <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <img src={affiliate1img} alt="affiliate1img" width={80} />
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

            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={2.95} >
          <Card
            sx={{

              background:
                theme.palette.mode === 'dark'
                  ? 'radial-gradient(34.44% 59.83% at 50% 48.03%, #2B3141 2.77%, #131722 100%)'
                  : 'radial-gradient(circle,rgba(255, 255, 255, 1),rgba(173, 231, 226, 1))',
              borderRadius: "6px",
              boxShadow: "0px 1.503px 3.005px 0px rgba(0, 0, 0, 0.06), 0px 7px 11px 0px rgba(0, 0, 0, 0.09)",
              border: '1px solid',
              borderBottom: 'none',
              borderColor: theme.palette.mode === 'dark' ? '#343A4A' : '#60FFF1'
            }}>
            <Stack spacing={1.5} pt={4} pr={4} pl={4} pb={4}>

              <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <img src={trainning1img} alt="trainning1img" width={80} />
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
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={2.95}  >
          <Card
            sx={{
              background:
                'transparent',
              borderRadius: "6px",
              boxShadow: 0,
            }}>
            <Stack spacing={1.5} pt={4} pr={4} pl={4} pb={4}>
              <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <img src={blog1img} alt="blog1img" width={80} />
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

            </Stack>
          </Card>
        </Grid>

        <Grid item lg={.2} display={{ xs: 'none', md: 'none', lg: 'block' }}>
          <Divider orientation="vertical" />
        </Grid>

        <Grid item xs={12} md={6} lg={2.95} >
          <Card
            sx={{
              background:
                'transparent',
              borderRadius: "6px",
              boxShadow: 0,
            }}>
            <Stack spacing={1.5} pt={4} pr={4} pl={4} pb={4} justifyContent='center'>
              <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <img src={support1img} alt="support1img" width={80} />
              </Stack>

              <Typography
                variant="title1"
                sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary', textAlign: 'center' }}
              >
                CUSTOMER SUPPORT
              </Typography>

              <Stack spacing={3} alignItems={{ xs: 'center', lg: 'start' }}>
                <Stack direction="row" spacing={1} style={{ alignItems: 'center' }}>
                  <img src={supporticon} alt="supporticon" width={30} />
                  <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                    Native language Support.
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={3} style={{ alignItems: 'center' }}>
                  <img src={raiseticketicon} alt="raiseticketicon" width={26} />
                  <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                    Raise a ticket (24/7).
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid >
    </Grid >
  );
};

export default Features;
