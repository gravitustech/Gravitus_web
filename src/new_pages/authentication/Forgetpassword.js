// import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography, useTheme } from '@mui/material';

// project import
import AuthWrapper from './AuthWrapper';
import GravitusAuthForgetpassword from './auth-forms/AuthForgetpassword';

// ================================|| LOGIN ||================================ //
import React from 'react'

const Forgetpassword = () => {
  const theme = useTheme();
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction='row' justifyContent='space-between' alignItems='baseline' sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant='h1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>Reset Password</Typography>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <GravitusAuthForgetpassword />
        </Grid>
      </Grid>
    </AuthWrapper>
  )
}

export default Forgetpassword;

