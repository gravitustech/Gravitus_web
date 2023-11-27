import React from 'react';
import { Typography, Stack, useTheme } from '@mui/material';

function BuildPortfoliocomponents({ img, title, description }) {
  const theme = useTheme();
  return (
    <Stack direction="row" spacing={5}>
      <img src={img} alt="gif" />
      <Stack spacing={2}>
        <Typography variant="head2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
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
