import React from 'react';

import {
  Box, Card, Grid, Stack,
  Typography, useTheme
} from '@mui/material';

import Tickethistroytab from './Tickethistroytable';

const Tickethistroy = ({ historyData }) => {
  const theme = useTheme();

  return (
    <Grid>
      <Card
        variant="outlined"
        sx={{
          borderColor: theme.palette.mode === 'dark' ? '#232730' : '#ececec',
          backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
        }}
      >
        <Stack pt={3} pb={4} pl={4} pr={4}>
          <Typography pb={2} variant="h4" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            Ticket History
          </Typography>
          <Box
            sx={{
              boxShadow: 'none',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
            }}
          >
            <Tickethistroytab historyData={historyData} />
          </Box>
        </Stack>
      </Card>
    </Grid>
  );
};

export default Tickethistroy;
