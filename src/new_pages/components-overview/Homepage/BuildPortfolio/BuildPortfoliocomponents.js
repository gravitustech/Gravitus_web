import React from 'react';
import { Typography, Stack, useTheme } from '@mui/material';

function BuildPortfoliocomponents({ number, title, description }) {
  const theme = useTheme();
  return (
    <Stack direction="row" spacing={3}>
      <Typography variant="h1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
        {number}
      </Typography>
      <Stack spacing={2}>
        <Typography variant="h1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          {' '}
          {title}
        </Typography>
        <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          {description}{' '}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default BuildPortfoliocomponents;
