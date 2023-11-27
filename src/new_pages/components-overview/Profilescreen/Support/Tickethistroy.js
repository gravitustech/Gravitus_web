import { Box, Card, Grid, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import Tickethistroytab from './Tickethistroytable';

const Tickethistroy = ({ historyData }) => {
  const theme = useTheme();

  return (
    <Grid>
      <Stack pt={3}>
        <Typography pb={2} variant="h4" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
          Ticket History
        </Typography>
        <Card sx={{ boxShadow: 'none', borderRadius: '0px', backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#fff' }}>
          <Box
            sx={{
              boxShadow: 'none',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
            }}
          >
            <Tickethistroytab historyData={historyData} />
          </Box>
        </Card>
      </Stack>
    </Grid>
  );
};

export default Tickethistroy;
