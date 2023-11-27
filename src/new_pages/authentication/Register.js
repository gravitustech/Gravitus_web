// import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography,useTheme } from '@mui/material';

// project import
import AuthWrapper from './AuthWrapper';
import GravitusAuthRegister from './auth-forms/AuthRegister';

// ================================|| REGISTER ||================================ //
import React from 'react'

const Register = () => {
  const theme = useTheme();

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction='row' justifyContent='space-between' alignItems='baseline' sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant='h1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>Signup</Typography>
          </Stack>
          <Typography variant='body2' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>Signup to create a new account</Typography>
        </Grid>
        <Grid item xs={12}>
          <GravitusAuthRegister />
        </Grid>
      </Grid>
    </AuthWrapper>
  )
}

export default Register;

