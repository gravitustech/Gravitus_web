import { Stack, Typography, useTheme } from '@mui/material'
import React from 'react'

function Dialogboxvalue({ title, value, pair }) {
  const theme = useTheme();

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
      <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
        {title}
      </Typography>
      <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
        {value} {pair}
      </Typography>
    </Stack>
  )
}

export default Dialogboxvalue
