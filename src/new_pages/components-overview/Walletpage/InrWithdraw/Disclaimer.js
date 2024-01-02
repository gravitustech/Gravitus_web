import React from 'react';
import { Grid, Typography, Stack, Card, useTheme } from '@mui/material';


const InrWithdrawDisclaimer = () => {
  const theme = useTheme();

  return (
    <Grid>
      <Typography variant='title1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
        Disclaimer*
      </Typography>
      <Stack direction="column" spacing={3} pt={3}>
        <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          Please be aware that withdrawal transactions are subject to certain limits, both in terms of the maximum amount
          that can be withdrawn per transaction and the total daily or monthly withdrawal limits.
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          Additionally, the processing time for withdrawals may vary based on factors such as banking hours, holidays,
          and unforeseen technical issues.
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          It is advisable to check and understand the specific limits and processing times applicable to your withdrawal
          transactions.
        </Typography>
        {/* <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          Your security and the safety of your assets are important to us. If you have any doubts or concerns,
          please reach out to our support team for assistance before proceeding with your withdrawal.
        </Typography> */}
      </Stack>

      <Grid pt={5}>
        {/* <Importantnotes /> */}
      </Grid>
    </Grid>
  );
};

export default InrWithdrawDisclaimer;
