import { Grid, Typography, useTheme } from '@mui/material'
import React from 'react'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

function Norecordfoundcomponents({ description }) {
  const theme = useTheme();
  return (
    <Grid p={5} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <ContentPasteSearchIcon sx={{ width: '44px', height: '44px' }} />
      <Typography
        variant="body1"
        sx={{ padding: '12px', color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}
      >
        {description}
      </Typography>
    </Grid>
  )
}

export default Norecordfoundcomponents

