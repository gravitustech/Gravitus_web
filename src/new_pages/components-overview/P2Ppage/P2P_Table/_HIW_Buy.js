import React from 'react'
import { Grid, Typography, Stack, useTheme, } from '@mui/material';

import HowItWorks_Comp from './_HIW_Comp';
import ordergif from '../../../../../src/assets/images/gravitusimage/ordergif.svg';
import sellergif from '../../../../../src/assets/images/gravitusimage/sellergif.svg';

import getcrypto from '../../../../../src/assets/images/gravitusimage/getcrypto.svg';
import p2pmobile from '../../../../../src/assets/images/gravitusimage/p2pmobile.svg';

const HIW_Buy = () => {
  const theme = useTheme();
  return (
    <><Stack pt={8}>
      <Typography variant='h1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }} ar>
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
              description='Once you place a P2P order, the crypto asset will be escrowed by Gravitus P2P.'
            />
            <HowItWorks_Comp
              number='02.'
              title='Pay the Seller'
              description='Send money to the seller via the suggested payment methods. Complete the fiat transaction and click "Transferred, notify seller" on Gravitus P2P.'
            />

            <HowItWorks_Comp
              number='03.'
              title='Get the Crypto'
              description='Once the seller confirms receipt of the money, the escrowed crypto will be released to you.'
            />

          </Stack>
        </Grid>
      </Grid>

    </>
  )
}

export default HIW_Buy;
