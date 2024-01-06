import React from 'react';

import { Stack, Typography, useTheme } from '@mui/material';

import notesicon from '../../../../assets/images/gravitusimage/notesicon.svg';

const Notes = ({ description }) => {
  const theme = useTheme();
  return (
    <Stack pt={0}
      pl={{ xs: 2, sm: 4, md: 8, lg: 8 }}
      pr={{ xs: 2, sm: 4, md: 8, lg: 8 }}
      pb={2} >
      <Stack direction="row" spacing={1} style={{ alignItems: 'flex-start' }}>
        <img src={notesicon} alt="notesicon" style={{ paddingTop: '8px' }} />
        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          {description}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Notes;
