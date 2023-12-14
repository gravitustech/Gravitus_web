import React from 'react';
import { Stack, Typography, useTheme } from '@mui/material';

function ImportantNotesExt({ img, description }) {
  const theme = useTheme();
  return (
    <Stack direction="row" spacing={2}>
      <img src={img} alt="Noteicon" />
      <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
        {description}
      </Typography>
    </Stack>
  );
}

export default ImportantNotesExt;
