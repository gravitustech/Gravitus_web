import React from 'react';
import { Typography, Stack, useTheme } from '@mui/material';

const UserBankdeatils = ({ bankData }) => {
  const theme = useTheme();
  
  return (
    <Stack>
      <Typography pt={2} variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
        Your Registered Bank Account details
      </Typography>
      <Stack pt={3} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          Account No 
        </Typography>
        <Typography variant="title2" color="text.buy">
          {bankData?.accountNo}
        </Typography>
      </Stack>
      <Stack pt={2} direction="row" justifyContent="space-between">
        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          Beneficiary Name
        </Typography>
        <Typography variant="title2" color="text.buy">
          {bankData?.accountName}
        </Typography>
      </Stack>
      <Stack pt={2} direction="row" justifyContent="space-between">
        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          Bank Name
        </Typography>
        <Typography variant="title2" color="text.buy">
        {bankData?.bankName}
        </Typography>
      </Stack>
      <Stack pt={2} direction="row" justifyContent="space-between">
        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
          IFSC Code
        </Typography>
        <Typography variant="title2" color="text.buy">
          {bankData?.IFSCCode}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default UserBankdeatils;
