import React from 'react'

import { Grid, Stack, Typography, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';

import AuthWrapper from './AuthWrapper';
import GravitusAuthForgetpasswordStatus from './auth-forms/AuthForgetpasswordstatus';

// ================================|| LOGIN ||================================ //

const Forgetpasswordstatus = () => {
  const theme = useTheme();

  const location = useLocation();
  const email = location.state?.email;

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction='row' justifyContent='space-between' alignItems='baseline' sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant='h1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
              Reset Password
            </Typography>
          </Stack>
          <br />
          <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
            Reset your password via a link sent to &nbsp;
            <span style={{ color: theme.palette.mode === 'dark' ? '#f7f7f7' : '#000', fontWeight: 600 }}>
              {email}.
            </span>
            &nbsp; Please Log in after resetting your password.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <GravitusAuthForgetpasswordStatus />
        </Grid>
      </Grid>
    </AuthWrapper>
  )
}

export default Forgetpasswordstatus;


