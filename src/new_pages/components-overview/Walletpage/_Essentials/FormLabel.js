import React from 'react'
import { Stack, useTheme, Typography } from '@mui/material';

function FormLabel({ number, title, }) {
  const theme = useTheme();

  return (
    <Stack direction='row' spacing={2} alignItems='center'>
      <Typography variant='title1'sx={{ color: theme.palette.mode === 'dark' ? 'text.tertiarydark' : 'text.tertiary' }}>
        {number}
      </Typography>

      <Typography variant='title1'sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }} >
         {title}
      </Typography>
    </Stack>
  )
}

export default FormLabel;