import React from 'react'
import { Grid, Typography, Stack, useTheme } from '@mui/material';

const DepositHeadExt = () => {
  const theme = useTheme();
  return (
    <Grid>
      <Typography variant='title1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
        Disclaimer*
      </Typography>
      <Stack direction='column' spacing={3} pt={5} pb={5}>
        <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          Please ensure you select the correct Network on your senders wallet and use the provided contract address.
        </Typography>
        <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          Sending funds using any other network will result in a significant loss of your valuable assets. Please exercise
          extreme caution and ensure that you are using the correct and secure network for your transactions to safeguard your assets.
        </Typography>
        <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          Make sure to deposit only to the specified deposit address. Depositing any other asset may result in a loss of your funds.
        </Typography>
        <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          Your security and the safety of your assets are important to us. If you have any doubts or concerns,
          please reach out to our support team for assistance before proceeding with your deposit.
        </Typography>
      </Stack>
    </Grid>
  )
}

export default DepositHeadExt;
