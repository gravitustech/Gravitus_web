import React from 'react'
import { Grid, Typography, Stack, useTheme, } from '@mui/material';
import HowItWorks_Comp from './_HIW_Comp';

import ordergif from '../../../../../src/assets/images/gravitusimage/ordergif.svg';
import sellergif from '../../../../../src/assets/images/gravitusimage/sellergif.svg';
import getcrypto from '../../../../../src/assets/images/gravitusimage/getcrypto.svg';
import p2pmobile from '../../../../../src/assets/images/gravitusimage/p2pmobile.svg';

const HIW_Sell = () => {
  const theme = useTheme();
  return (
    <><Stack pt={8}>
      <Typography variant='title' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }} ar>
        How P2P Works
      </Typography>
    </Stack>

      <Grid container spacing={2} sx={{ pt: 2 }}>
        <Grid item xs={12} sm={6} className="text-center">
          <Stack pt={5} alignItems="center"  >
            <img src={p2pmobile} alt='p2pmobile' />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <Stack pt={11} direction="column" alignItems="flex-start" spacing={8} pr={2}>

            <HowItWorks_Comp
              number='01.'
              title='Place an Order'
              description='Once you place an order, your crypto assets will be escrowed by Gravitus P2P.'
            />
            <HowItWorks_Comp
              number='02.'
              title='Confirm the Payment'
              description='Check the transaction record in the given payment account, and make sure you receive the money sent by the buyer.'
            />

            <HowItWorks_Comp
              number='03.'
              title='Release Crypto'
              description='Once you confirm the receipt of the money, release crypto to the buyer on Gravitus P2P.'
            />

          </Stack>
        </Grid>
      </Grid>

    </>
  )
}

export default HIW_Sell;
