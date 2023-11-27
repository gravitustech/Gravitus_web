import { Box, Card, Grid, Stack, Typography, useTheme } from '@mui/material';
import React from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Notificationtable from './Notificationtable';
import { useNavigate } from 'react-router-dom';
const Notificationpage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }
  return (
    <>
      <Grid container pl={15} pr={15} pt={3} pb={5}>
        <Stack direction='row' spacing={2} alignItems='center'>
          <ArrowBackIosNewIcon onClick={goBack} pt={10} sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }} />
          <Typography variant='h1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            Notifications
          </Typography>
        </Stack>
      </Grid>

      <Card
        pt={1}
        pb={3}
        pl={20}
        pr={15}
        sx={{
          border: 'none',
          width: '100%',
          borderRadius: '78px 78px 0px 0px',
          boxShadow: '0px 5.133836269378662px 35.31077575683594px 0px rgba(0, 0, 0, 0.01), 0px 41px 282px 0px rgba(0, 0, 0, 0.02)',
        }}
      >
        <Box
          pt={1}
          pb={3}
          pl={20}
          pr={15}
          lg={12}
          sx={{
            backgroundColor: theme.palette.mode === 'dark' ? 'text.black' : 'text.white',
          }}>
          <Notificationtable />
        </Box>
      </Card>
    </>

  )
}

export default Notificationpage;
