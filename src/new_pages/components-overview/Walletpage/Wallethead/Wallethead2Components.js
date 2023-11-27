import React from 'react'
import { Typography, Stack, useTheme } from '@mui/material';

function WalletHeadComponents({ number, title, description, img }) {
  const theme = useTheme();

  return (
    <Stack pl={3} pt={4} direction='row' spacing={1}>
      <Typography variant='title1'  sx={{
          color: theme.palette.mode === 'dark' ? 'text.tertiarydark' : 'text.tertiary'
        }} >
        {number}
      </Typography>
      <Stack direction='column' spacing={1}>
        <Typography variant='title1' sx={{
          color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary'
        }}  >
          {title}
        </Typography>
        <Typography variant='body2'  sx={{
          color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary'
        }} >
          {description}
        </Typography>
      </Stack>
      <img src={img} alt="Deposite" width={100} />
    </Stack>
  )
}

export default WalletHeadComponents;
