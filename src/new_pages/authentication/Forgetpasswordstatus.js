// import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography, useTheme } from '@mui/material';

// project import
import AuthWrapper from './AuthWrapper';
import GravitusAuthForgetpasswordStatus from './auth-forms/AuthForgetpasswordstatus';

// ================================|| LOGIN ||================================ //
import React from 'react'

const Forgetpasswordstatus = () => {
  const theme = useTheme();
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
            Reset your password via link sent to your Email Login after resetting your password
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


