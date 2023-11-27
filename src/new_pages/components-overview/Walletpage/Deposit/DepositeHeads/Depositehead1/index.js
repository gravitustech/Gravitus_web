import React from 'react';
import { Grid, Stack } from '@mui/material';

import CoinSelectTextfield from './Coin_Select_Input';
import Depositehead1Components from './Depositehead1Components';

import DepositaddressCard from './DepositaddressCard';
import Importantnotes from './Importantnotes';

const Deposithead1 = ({ walletList, depositData, setDepositData, setHistoryData }) => {
  return (
    <Grid>
      <Stack spacing={6} direction="column">
        <Depositehead1Components number="01." title="Select the coin" />
        <CoinSelectTextfield walletList={walletList} setDepositData={setDepositData} setHistoryData={setHistoryData} />

        <Depositehead1Components number="02." title="Deposit Address" />
        <DepositaddressCard depositData={depositData} />
      </Stack>
    </Grid>
  );
};

export default Deposithead1;