import { Grid, Stack } from '@mui/material';
import FormFields from './FormFields';
import React from 'react';

const WithdrawHead = ({
  walletList,
  walletId,
  walletData,
  setWalletId,
  setWalletData,
  setHistoryData,
  setSnackbarMessage,
  setSnackbarOpen
}) => {

  return (
    <Grid>
      <Stack spacing={4} direction="column">
        <FormFields
          walletList={walletList}
          walletId={walletId}
          walletData={walletData}
          setWalletId={setWalletId}
          setWalletData={setWalletData}
          setHistoryData={setHistoryData}
          setSnackbarMessage={setSnackbarMessage}
          setSnackbarOpen={setSnackbarOpen}
        />
      </Stack>
    </Grid>
  );
};

export default WithdrawHead;