import React from 'react';
import { Typography, Stack, useTheme } from '@mui/material';

function HowItWorks_Comp({ img, title, description }) {
  const theme = useTheme();
  return (
    <Stack direction="row" spacing={3}>
      <img src={img} alt="gif" />
      <Stack spacing={1}>
        <Typography variant="h4" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          {' '}
          {title}
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          {description}{' '}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default HowItWorks_Comp;
