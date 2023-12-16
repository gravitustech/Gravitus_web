import { useTheme, Card, Box } from '@mui/material';
import WalletTableExt from './WalletTableExt';

import useSWR, { mutate } from 'swr';
import React, { useEffect } from 'react';
import { Wallet_Fetch_Info } from 'src/api_ng/wallet_ng';

const WalletTable = ({ walletList }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        border: 'none',
        width: '100%',
        borderRadius: '78px 78px 0px 0px',
        boxShadow: '0px 5.133836269378662px 35.31077575683594px 0px rgba(0, 0, 0, 0.01), 0px 41px 282px 0px rgba(0, 0, 0, 0.02)',
        // position: 'sticky', top: '0',
      }}
    >
      <Box
        pt={3}
        pb={4}
        pl={15}
        pr={15}
        lg={12}
        sx={{
          backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
        }}
      >
        <WalletTableExt walletList={walletList} />
      </Box>
    </Card>
  );
};

export default WalletTable;