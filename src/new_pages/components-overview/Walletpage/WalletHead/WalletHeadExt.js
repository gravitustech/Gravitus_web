import DepositLight from '../../../../assets/images/gravitusimage/DepositLight.svg';
import DepositDark from '../../../../assets/images/gravitusimage/DepositDark.svg';

import WithdrawLight from '../../../../assets/images/gravitusimage/WithdrawLight.svg';
import WithdrawDark from '../../../../assets/images/gravitusimage/WithdrawDark.svg';

import { Stack, Grid, useTheme } from '@mui/material';
import WalletHeadSup from './WalletHeadSup';

import React from 'react'

const WalletHeadExt = () => {
  const theme = useTheme();

  return (
    <Grid pt={5}>
      <Stack spacing={2}>
        <WalletHeadSup
          number='01.'
          title='Deposit'
          description='If you own cryptocurrency on another platform or wallet, 
                    you can transfer it to your Gravitus Wallet for trading or grow your 
                    crypto holdings with our suite of services on Gravitus Earn.'
          img={theme.palette.mode === 'dark' ? DepositDark : DepositLight}
        />
        <WalletHeadSup
          number='02.'
          title='Withdraw'
          description='A crypto withdrawal is the process of transferring or moving 
                    cryptocurrency assets from Gravitus wallet to an external wallet address.'
          img={theme.palette.mode === 'dark' ? WithdrawDark : WithdrawLight}
        />
      </Stack>
    </Grid>

  )
}

export default WalletHeadExt;