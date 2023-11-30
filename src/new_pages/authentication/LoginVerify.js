import { Grid, Stack, Typography, useTheme } from '@mui/material';

import { useNavigate } from 'react-router';

import AuthWrapper from './AuthWrapper';
import GravitusAuthLoginVerify from './auth-forms/AuthLoginVerify';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// ================================|| LOGIN ||================================ //

const LoginVerify = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction='row' alignItems='center' spacing={2} sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            {/* <ArrowBackIosNewIcon onClick={goBack} sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }} /> */}
            <Typography variant='h1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>Signin Verification</Typography>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <GravitusAuthLoginVerify />
        </Grid>
      </Grid>
    </AuthWrapper>
  )
};

export default LoginVerify;
