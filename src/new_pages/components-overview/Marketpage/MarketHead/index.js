import PropTypes from 'prop-types';

import { Typography, Stack, Grid, useTheme } from '@mui/material';

function ComponentsCoins({ color, pair, icon, changes, marketprice }) {
  const theme = useTheme();
  return (
    <>
      <Stack direction="row" alignItems="center"   >
        <Stack direction="row" spacing={1} alignItems="center">
          {icon}
          <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            {pair}
          </Typography>
        </Stack>

        <Grid lg={2} xs={2}></Grid>
        <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          {marketprice}
        </Typography>

        <div style={{ flexGrow: 1 }} />

        <Stack alignItems="flex-end">
          <Typography color={color} variant="body1" noWrap>
            {changes}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}

ComponentsCoins.propTypes = {
  border: PropTypes.bool
};

export default ComponentsCoins;
