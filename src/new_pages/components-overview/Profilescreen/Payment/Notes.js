import React from 'react';
import notesicon from '../../../../assets/images/gravitusimage/notesicon.svg';
import { Stack, Typography, useTheme } from '@mui/material';

const Notes = ({ description }) => {
  const theme = useTheme();
  return (
    <Stack pt={1}>
      <Stack direction="row" spacing={1}>
        <img src={notesicon} alt="notesicon" width={16} />
        <Typography pt={2.5} variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          {description}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Notes;
