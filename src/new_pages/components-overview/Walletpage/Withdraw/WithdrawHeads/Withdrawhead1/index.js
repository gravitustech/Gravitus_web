import React from 'react';
import { Grid, Stack } from '@mui/material';
import Textfields from './Textfields';

const Withdrawhead1 = ({
  walletList,
  walletId,
  walletData,
  setWalletId,
  setHistoryData,
  setWalletData,
  setSnackbarMessage,
  setSnackbarOpen,
  securityData
}) => {

  return (
    <Grid>
      <Stack spacing={4} direction="column">
        <Textfields
          walletList={walletList}
          setWalletId={setWalletId}
          setHistoryData={setHistoryData}
          setWalletData={setWalletData}
          walletId={walletId}
          walletData={walletData}
          setSnackbarMessage={setSnackbarMessage}
          setSnackbarOpen={setSnackbarOpen}
          securityData={securityData}
        />
      </Stack>
    </Grid>
  );
};

export default Withdrawhead1;
