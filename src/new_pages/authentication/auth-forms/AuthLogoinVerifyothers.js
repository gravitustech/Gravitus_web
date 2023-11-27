import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Button, Grid, Stack, Typography } from '@mui/material';

// project import
import AnimateButton from '../../../components/@extended/AnimateButton';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

// ============================|| FIREBASE - LOGIN ||============================ //

const GravitusAuthLoginVerifyothers = () => {
  return (
    <>
      <Grid item xs={12}>
        <AnimateButton>
          <Button component={RouterLink} to="/loginverify" disableElevation fullWidth size="large" type="submit" variant="contained2">
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Typography variant="title2">Google Authenticator</Typography>
                <ArrowRightIcon sx={{ color: 'text.buy', fontSize: '32px' }} />
              </Stack>
            </Grid>
          </Button>
        </AnimateButton>
        <br />
        <AnimateButton>
          <Button component={RouterLink} to="/loginverify" disableElevation fullWidth size="large" type="submit" variant="contained2">
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Typography variant="title2">Email Verification</Typography>
                <ArrowRightIcon sx={{ color: 'text.buy', fontSize: '32px' }} />
              </Stack>
            </Grid>
          </Button>
        </AnimateButton>
        <br />
        <AnimateButton>
          <Button component={RouterLink} to="/loginverify" disableElevation fullWidth size="large" type="submit" variant="contained2">
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Typography variant="title2">Phone Number Verification</Typography>
                <ArrowRightIcon sx={{ color: 'text.buy', fontSize: '32px' }} />
              </Stack>
            </Grid>
          </Button>
        </AnimateButton>
      </Grid>
    </>
  );
};

export default GravitusAuthLoginVerifyothers;
