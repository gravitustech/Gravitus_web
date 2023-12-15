import React from 'react';

import { Stack, Typography, useTheme } from '@mui/material';

import notesicon from '../../../../assets/images/gravitusimage/notesicon.svg';

const Notes = ({ description }) => {
  const theme = useTheme();
  return (
    <Stack pt={0} pl={8} pb={4} pr={8}>
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
