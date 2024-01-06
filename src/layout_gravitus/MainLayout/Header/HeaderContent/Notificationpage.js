import { Box, Card, Grid, IconButton, Stack, Typography, useTheme } from '@mui/material';
import React from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Notificationtable from './Notificationtable';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Notificationpage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }
  return (
    <>
      <Grid
        pl={{ md: 5, lg: 14 }}
        pr={15} pt={3} pb={3}
        container display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}
      >
        <Stack direction="row" spacing={0.8} alignItems="center">
          <IconButton onClick={goBack} disableRipple>
            <ArrowBackIosNewIcon
              pt={10}
              sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
            />
          </IconButton>
          <Typography variant="h1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            Notifications
          </Typography>
        </Stack>
      </Grid>

      <Grid
        width='100%'
        sx={{
          backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground',
        }}
        display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}
        pl={2}
        pb={{ xs: 2, sm: 2 }}>
        <Stack direction="row" spacing={1} pl={0} alignItems='center'  >
          <Stack justifyContent='start'>
            <IconButton onClick={goBack} disableRipple>
              <ArrowBackIcon
                sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
              />
            </IconButton>
          </Stack>
          <Stack justifyContent='start'>
            <Typography variant="h4" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
              Notifications
            </Typography>
          </Stack>
        </Stack>
      </Grid>

      <Grid container
        pt={{ xs: 2, sm: 2, md: 3, lg: 3 }}
        pb={{ xs: 2, sm: 2, md: 3, lg: 3 }}
        pl={{ xs: 4, sm: 3, md: 10, lg: 20 }}
        pr={{ xs: 4, sm: 3, md: 6, lg: 15 }}
        lg={12}
        sx={{
          minHeight: { xs: 'calc(107vh - 134px)', md: 'calc(107vh - 112px)' },
          backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground',
          borderRadius: { xs: '0', sm: '0', md: '78px 78px 0 0', lg: '78px 78px 0 0' },
          boxShadow: '0px 5.133836269378662px 35.31077575683594px 0px rgba(0, 0, 0, 0.01), 0px 41px 282px 0px rgba(0, 0, 0, 0.02)'
        }} >
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Notificationtable />
        </Grid>
      </Grid>
    </>

  )
}

export default Notificationpage;
