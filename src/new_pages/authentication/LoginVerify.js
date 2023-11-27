// import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography ,useTheme} from '@mui/material';

// project import
import AuthWrapper from './AuthWrapper';
import GravitusAuthLoginVerify from './auth-forms/AuthLoginVerify';

// ================================|| LOGIN ||================================ //

const LoginVerify = () => {
  const theme = useTheme();
  return(
    <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack direction='row' justifyContent='space-between' alignItems='baseline' sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <Typography variant='h1' sx={{color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary'}}>Signin Verification</Typography>
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
