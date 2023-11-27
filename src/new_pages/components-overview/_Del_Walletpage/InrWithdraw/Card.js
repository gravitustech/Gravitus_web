import PropTypes from 'prop-types';

// material-ui
import { Box, Grid } from '@mui/material';
import AuthCard from '../../../../new_pages/authentication/AuthCard';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const CardInr = ({ children }) => (
  <Box sx={{ minHeight: '100vh' }}>
    <Grid item xs={12}>
      <Grid
        item
        xs={12}
        container
        justifyContent='center'
        alignItems='center'
        sx={{ minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
      >
        <Grid item>
          <AuthCard>{children}</AuthCard>
        </Grid>
      </Grid>
    </Grid>
  </Box>
);

CardInr.propTypes = {
  children: PropTypes.node
};

export default CardInr;
