import React from 'react';
// import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Button, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// project import
import AnimateButton from '../../../components/@extended/AnimateButton';

// ============================|| FIREBASE - LOGIN ||============================ //

const GravitusAuthForgetpasswordStatus = () => {
  return (
    <>
      <Grid item xs={12}>
        <AnimateButton>
          <Button component={RouterLink} to="/login" disableElevation fullWidth size="large" type="submit" variant="contained">
            OKAY
          </Button>
        </AnimateButton>
      </Grid>
    </>
  );
};

export default GravitusAuthForgetpasswordStatus;
