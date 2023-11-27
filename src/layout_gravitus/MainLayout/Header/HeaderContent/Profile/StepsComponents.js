import { Typography, Stack, useTheme } from '@mui/material';
import React from 'react'

const StepsComponents = ({description}) => {
  const theme = useTheme();

  return (
    <Stack direction='column' spacing={3} pt={3} sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
      <Typography variant='body2' >
        {description}
      </Typography>
    </Stack>
  )
}

export default StepsComponents;
