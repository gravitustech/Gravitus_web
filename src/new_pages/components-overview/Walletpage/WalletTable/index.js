import { useTheme, Card, Box, Typography, Stack } from '@mui/material';
import WalletTableExt from './WalletTableExt';

import useSWR, { mutate } from 'swr';
import React, { useState } from 'react';
import { Wallet_Fetch_Info } from 'src/api_ng/wallet_ng';
import CustomSnackBar from 'src/components/snackbar';
import CoinListing from './Mobileview/CoinListing';

const WalletTable = ({ walletList }) => {
  const theme = useTheme();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  return (
    <>
      <Card
        sx={{
          border: 'none',
          width: '100%',
          borderRadius: { xs: '0', sm: '0', md: '78px 78px 0 0', lg: '78px 78px 0 0' },
          boxShadow: '0px 5.133836269378662px 35.31077575683594px 0px rgba(0, 0, 0, 0.01), 0px 41px 282px 0px rgba(0, 0, 0, 0.02)'
        }}
      >
        {/* Desktop view */}
        <Box
          pt={{ xs: 2, sm: 2, md: 3, lg: 3 }}
          pb={{ xs: 2, sm: 2, md: 3, lg: 3 }}
          pl={{ xs: 2, sm: 2, md: 6, lg: 15 }}
          pr={{ xs: 2, sm: 2, md: 6, lg: 15 }}
          lg={12}
          sx={{
            backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
          }}
          display={{ xs: 'none', sm: 'block', md: 'block', lg: 'block' }}
        >
          <WalletTableExt walletList={walletList} setSnackbarOpen={setSnackbarOpen}
            setSnackbarMessage={setSnackbarMessage} />
        </Box>
        
        {/* Mobile view */}
        <Box
          pt={{ xs: 2, sm: 2, md: 3, lg: 3 }}
          pb={{ xs: 2, sm: 2, md: 3, lg: 3 }}
          pl={{ xs: 2, sm: 2, md: 6, lg: 15 }}
          pr={{ xs: 2, sm: 2, md: 6, lg: 15 }}
          lg={12}
          sx={{
            backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
          }}
          display={{ xs: 'block', sm: 'none', md: 'none', lg: 'none' }}
        >
          <CoinListing walletList={walletList} setSnackbarOpen={setSnackbarOpen}
            setSnackbarMessage={setSnackbarMessage} />
        </Box>
      </Card>

      <CustomSnackBar
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        snackbarMessage={snackbarMessage && snackbarMessage.msg}
        success={snackbarMessage && snackbarMessage.success} />
    </>
  );
};

export default WalletTable;