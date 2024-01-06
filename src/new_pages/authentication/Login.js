// import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography, useTheme } from '@mui/material';

// project import
import AuthWrapper from './AuthWrapper';
import AuthLogin from './auth-forms/AuthLogin';

// ================================|| LOGIN ||================================ //
import React from 'react'

const Login = () => {
  const theme = useTheme();
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Stack direction='row' justifyContent='space-between' alignItems='baseline' sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
              <Typography variant='h1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>Signin</Typography>
            </Stack>
            <Typography variant='body2' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>Signin your account to continue</Typography>
          </Stack>
         </Grid>

        <Grid item xs={12}>
          <AuthLogin />
        </Grid>
      </Grid>
    </AuthWrapper>
  )
}

export default Login;

