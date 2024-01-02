import React from 'react';
import { Grid, Stack } from '@mui/material';

import CoinSelectTextfield from './CoinSelectInput';
import FormLabel from '../../../_Essentials/FormLabel';

import DepositAddressCard from './DepositAddressCard';
// import Importantnotes from './ImportantNotes';

const DepositHead = ({ walletList, depositData, setDepositData, setHistoryData }) => {
  return (
    <Grid>
      <Stack
        spacing={{ xs: 3, sm: 3, md: 6, lg: 6 }}
        direction="column">
        <FormLabel number="01." title="Select the coin" />
        <CoinSelectTextfield walletList={walletList} setDepositData={setDepositData} setHistoryData={setHistoryData} />

        <FormLabel number="02." title="Deposit Address" />
        <DepositAddressCard depositData={depositData} />
      </Stack>
    </Grid>
  );
};

export default DepositHead;