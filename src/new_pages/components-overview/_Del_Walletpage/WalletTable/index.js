import React from 'react';
import { useTheme, Card, Box } from '@mui/material';
import WalletTableContent from './WalletTableContent';

const WalletTable = ({ walletList, walletId }) => {
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
        <WalletTableContent walletList={walletList} walletId={walletId} />
      </Box>
    </Card>
  );
};

export default WalletTable;
