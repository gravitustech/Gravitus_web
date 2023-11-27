import React from 'react';

import { Stack, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

function Importantnotescomponents({ img, description }) {

  const theme = useTheme();

  return (
    <Stack direction="row" spacing={2}>
      <img src={img} alt="Noteicon" />
      <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
        {description}
      </Typography>
    </Stack>
  );
}
Importantnotescomponents.propTypes = {
  img: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};


export default Importantnotescomponents;
