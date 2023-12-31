import React from 'react'
import { Button, Grid, Stack, Typography, useTheme } from '@mui/material';
import AuthWrapper from './AuthWrapper';
import { Link as RouterLink } from 'react-router-dom';
import AnimateButton from 'src/components/@extended/AnimateButton';

// ================================|| Registerstatus ||================================ //

const Registerstatus = () => {
  const theme = useTheme();
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction='row' justifyContent='space-between' alignItems='baseline' sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant='h1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
              Verify Email
            </Typography>
          </Stack>
          <br />
          <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
            Your verification email link has been sent to your email address.
            Please proceed with the login once you have completed the verification.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <AnimateButton>
            <Button component={RouterLink} to="/login" disableElevation fullWidth size="large" type="submit" variant="contained">
              OKAY
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </AuthWrapper>
  )
}

export default Registerstatus;

