import React from 'react'
import { Grid, Typography, Stack, useTheme, } from '@mui/material';

import HowItWorks_Comp from './_HIW_Comp';

import p2pdarkimg from '../../../../../src/assets/images/gravitusimage/p2pdarkimg.svg';
import p2plightimg from '../../../../../src/assets/images/gravitusimage/p2plightimg.svg';

const HIW_Buy = () => {
  const theme = useTheme();
  return (
    <><Stack
      pt={{ xs: 6, sm: 6, md: 16, lg: 16 }}
    >
      <Typography variant='h1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }} ar>
        How P2P Works
      </Typography>
    </Stack>

      <Grid container spacing={2} sx={{ pt: 6, pb: 6 }}>
        <Grid item xs={12} sm={6} className="text-center"
          display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}
        >
          <Stack pt={10} alignItems="center">
            {theme.palette.mode === 'dark' ?
              <img src={p2pdarkimg} alt='p2pdarkimg' width={550} />
              : <img src={p2plightimg} alt='p2plightimg' width={550} />
            }
          </Stack>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Stack
            pt={{ xs: 1, sm: 1, md: 11, lg: 11 }}
            pr={{ xs: 0, sm: 0, md: 2, lg: 2 }}
            direction="column" alignItems="flex-start" spacing={8} >
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
